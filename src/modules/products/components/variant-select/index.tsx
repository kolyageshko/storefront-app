import React from 'react';
import clsx from 'clsx';
import {ProductVariant} from '@/types/global';

type VariantSelectProps = {
	variants: ProductVariant[];
	selectedVariant: ProductVariant | null;
	onVariantSelect: (variant: ProductVariant) => void;
}

const VariantSelect: React.FC<VariantSelectProps> = ({ variants, selectedVariant, onVariantSelect }) => {
	const handleVariantSelect = (variant: ProductVariant) => {
		onVariantSelect(variant);
	}

	return (
		<>
			<span className='text-gray-400 uppercase'>Size</span>
			<div className='flex flex-wrap justify-start gap-2.5 mb-2.5 text-xs'>
				{variants.map(variant => (
					<button
						key={variant.id}
						onClick={() => handleVariantSelect(variant)}
						className={clsx('py-1', {
							'underline underline-offset-2': variant.id === selectedVariant?.id,
							'text-gray-400': !variant.available,
						})}
					>
						{variant.name}
					</button>
				))}
			</div>
		</>
	);
}

export default VariantSelect;
