import {Market, Product, ProductVariant} from '@/types/global'
import React, {useEffect, useState} from 'react'
import Accordion from '@/modules/common/accordion'
import Button from '@/modules/common/button'
import ProductPrice from '../product-price'
import VariantSelect from '../variant-select'
import {addToCart} from '../../../cart/actions'
import {useModalContext} from '@/lib/context/modal-context'
import {useParams} from 'next/navigation'
import {splitLocale} from "@/lib/util/i18n";
import _ from "lodash";

type ProductActionsProps = {
	product: Product
	market: Market
}

const ProductActions: React.FC<ProductActionsProps> = ({ product, market }) => {
	const [isAdding, setIsAdding] = useState(false)
	const [error, setError] = useState<string | null>(null)
	const [selectedVariant, setSelectedVariant] = useState<ProductVariant | null>(null);
	const { openModal } = useModalContext()

	const locale = useParams().locale as string
	const [language, region] = splitLocale(locale);

	const [inStock, setInStock] = useState(false);

	const sortedVariants = _.sortBy(product.variants, (variant) => new Date(variant.created_at));

	useEffect(() => {
		const sortedVariants = _.sortBy(product.variants, (variant) => new Date(variant.created_at));

		if (sortedVariants && sortedVariants.length > 0) {
			setSelectedVariant(sortedVariants[0]);
		}
	}, [product.variants]);

	useEffect(() => {
		if (selectedVariant) {
			setInStock(selectedVariant.available);
		}
	}, [selectedVariant]);

	const handleAddToCart = async () => {
		try {
			setError(null)
			if (!selectedVariant?.id) return
			setIsAdding(true)
			await addToCart({
				variantId: selectedVariant.id,
				quantity: 1,
				countryCode: region,
			})
			openModal('cart')
		} catch (error) {
			setError('Error adding item to cart. Please try again.')
		} finally {
			setIsAdding(false)
		}
	}

	return (
		<div className='flex flex-col gap-y-12 sticky top-[6.5rem]'>
			<div className='flex flex-col gap-y-1 px-4 md:px-0 w-full max-w-[475px] ml-0 md:ml-6'>
				<h1 className='uppercase'>{product.name}</h1>

				<div className='mb-8'>
					<ProductPrice product={product} variant={selectedVariant} market={market} />
				</div>

				{sortedVariants && sortedVariants.length > 0 && (
					<VariantSelect
						variants={sortedVariants}
						selectedVariant={selectedVariant}
						onVariantSelect={setSelectedVariant}
					/>
				)}

				<Button
					onClick={handleAddToCart}
					disabled={!inStock || !selectedVariant}
					isLoading={isAdding}
				>
					{!selectedVariant ? (
						<span>Select variant</span>
					) : !inStock ? (
						<span>Out of stock</span>
					) : selectedVariant.inventory_stock > 0 && selectedVariant.inventory_stock <= 3 ? (
						<>
							<span>{`ONLY ${selectedVariant.inventory_stock} REMAINING`}</span>
							<span>Add to cart</span>
						</>
					) : (
						<span>Add to cart</span>
					)}
				</Button>
				{error && <div className='mt-2 text-gray-500'>{error}</div>}
				<div className='mt-24'>
					<Accordion title='Description'>
						<div
							dangerouslySetInnerHTML={{ __html: product.description }}
						></div>
					</Accordion>
					<Accordion title='Shipping and returns'>
						<p>
							It takes approximately 1-3 days to process and ship your order
						</p>
						<p>
							Customers may return a product within 14 days. The 14-day period
							starts from the day the consumer accepted the product.
						</p>
						<br />
					</Accordion>
				</div>
			</div>
		</div>
	)
}

export default ProductActions
