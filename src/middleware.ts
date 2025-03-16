import { NextRequest, NextResponse } from 'next/server';
import { listCountries } from './app/actions';
import { Market } from './types/global';
import {getCountryCodeByRequest, updateCart} from './lib/data';
import { DEFAULT_REGION } from './lib/constants';
import { availableLanguages, defaultLanguage } from "./app/i18n/settings";
import { retrieveCart } from "@/modules/cart/actions";

/**
 * Fetches markets and sets the market cookie.
 * @param request
 * @param marketMap
 */
async function getCountryAndLanguage(
	request: NextRequest,
	marketMap: Map<string, Market>
): Promise<{ language: string, countryCode: string } | undefined> {
	try {
		let countryCode;

		const cart = await retrieveCart();
		const cartCountryCode = cart?.shipping_address?.country?.iso.toLowerCase();

		const vercelCountryCode = request.headers
			.get('x-vercel-ip-country')
			?.toLowerCase();

		const ipCountryCode = (
			await getCountryCodeByRequest(request)
		)?.toLowerCase();

		if (cartCountryCode && marketMap.has(cartCountryCode)) {
			countryCode = cartCountryCode;
		} else if (vercelCountryCode && marketMap.has(vercelCountryCode)) {
			countryCode = vercelCountryCode;
		} else if (ipCountryCode && marketMap.has(ipCountryCode)) {
			countryCode = ipCountryCode;
		} else if (marketMap.has(DEFAULT_REGION)) {
			countryCode = DEFAULT_REGION;
		} else if (marketMap.keys().next().value) {
			countryCode = marketMap.keys().next().value;
		}

		let language = defaultLanguage;

		return { language, countryCode };
	} catch (error) {
		if (process.env.NODE_ENV === 'development') {
			console.error('Middleware.ts: Error getting the country code', error);
		}
	}
}

/**
 * Middleware to handle market selection.
 */
export async function middleware(request: NextRequest) {
	const regionMap = await listCountries();

	const urlLocale = request.nextUrl.pathname.split('/')[1]?.toLowerCase();
	const [urlLanguage, urlRegion] = urlLocale ? urlLocale.split('-') : [];

	// Проверяем, является ли urlLocale действительной локалью
	// @ts-ignore
	const isValidLocale = urlLanguage && urlRegion && availableLanguages.includes(urlLanguage) && regionMap.has(urlRegion);

	// Если urlLocale - действительная локаль, продолжаем без изменений
	if (isValidLocale) {
		const cart = await retrieveCart();
		if (cart) {
			const cartCountryCode = cart.shipping_address?.country?.iso.toLowerCase();

			if (cartCountryCode && cartCountryCode !== urlRegion) {
				// Обновляем корзину, если страна в корзине не совпадает с регионом в URL
				await updateCart(cart?.token, {
					shipping_address: {
						country_code: urlRegion
					}
				});
			}
		}

		return NextResponse.next();
	}

	const result = regionMap && (await getCountryAndLanguage(request, regionMap));

	if (!result) {
		return NextResponse.next();
	}

	let { language, countryCode } = result;

	// Если язык в URL недействителен, используем значения по умолчанию
	if (!availableLanguages.includes(language)) {
		language = defaultLanguage;
	}

	if (!regionMap.has(countryCode)) {
		countryCode = DEFAULT_REGION;
	}

	const locale = `${language}-${countryCode}`;

	// Если urlLocale не является действительной локалью, не пытаемся её заменить
	const redirectPath = isValidLocale
		? request.nextUrl.pathname.replace(`/${urlLocale}`, '').replace(/^\/+/, '')
		: request.nextUrl.pathname;

	return NextResponse.redirect(
		`${request.nextUrl.origin}/${locale}${redirectPath}`,
		307
	);
}

export const config = {
	matcher: ['/((?!api|_next/static|_next/image|.*\\..*|favicon.ico).*)'],
};
