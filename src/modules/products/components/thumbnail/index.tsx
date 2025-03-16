import Image from 'next/image'
import React from 'react'

import clsx from 'clsx'
import {Media} from '@/types/global'

type ThumbnailProps = {
	thumbnail?: Media | null
	className?: string
	size?: 'small' | 'medium' | 'large'
}

const Thumbnail: React.FC<ThumbnailProps> = ({
	thumbnail,
	className,
	size = 'small',
}) => {
	if (!thumbnail) {
		return null
	}

	return (
		<div
			className={clsx('relative aspect-[26/34]', className, {
				'w-[100px]': size === 'small',
				'w-[290px]': size === 'medium',
				'w-[145px]': size === 'large',
			})}
		>
			<Image
				className='absolute inset-0 object-cover object-center'
				src={thumbnail.url}
				alt={thumbnail.alt}
				quality={50}
				fill
				sizes='100vw'
			/>
		</div>
	)
}

export default Thumbnail
