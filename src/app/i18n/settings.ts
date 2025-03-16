export const defaultLanguage: string = 'en';
export const availableLanguages: string[] = [defaultLanguage, 'ru', 'uk'];
export const defaultNS: string = 'translation';
export const cookieName: string = 'i18next';

interface Options {
    availableLanguages: string[];
    defaultLanguage: string;
    lng: string;
    fallbackNS: string;
    defaultNS: string;
    ns: string;
}

export function getOptions(lng: string = defaultLanguage, ns: string = defaultNS): Options {
    return {
        // debug: true,
        availableLanguages: availableLanguages,
        defaultLanguage,
        lng,
        fallbackNS: defaultNS,
        defaultNS,
        ns
    };
}
