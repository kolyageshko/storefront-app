import Image from 'next/image'
import { Media as MediaType } from '@/types/global'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import { Pagination } from 'swiper/modules'

type ImageGalleryProps = {
	media: MediaType[]
}

const ImageGallery = ({ media }: ImageGalleryProps) => {
	if (!media || media.length === 0) {
		return null
	}

	return (
		<>
			<div className='block md:hidden'>
				<Swiper
					pagination={{
						type: 'fraction',
					}}
					modules={[Pagination]}
					resistanceRatio={0}
				>
					{media.map((m, index) => (
						<SwiperSlide key={`${m.id}_${index}`}>
							<div className='relative aspect-[27/34] w-full flex items-center justify-center'>
								<Image
									src={m.url}
									alt={m.alt}
									className='absolute inset-0 object-cover w-full h-full'
									fill
									priority={true}
									draggable={false}
									style={{
										objectFit: 'cover',
									}}
									unoptimized={true}
								/>
							</div>
						</SwiperSlide>
					))}
				</Swiper>
			</div>

			<div className='hidden items-start relative md:flex'>
				<div className='flex flex-col flex-1'>
					{media.map((m, index) => (
						<div
							key={`${m.id}_${index}`}
							className='relative aspect-[34/34] w-full'
						>
							<Image
								src={m.url}
								priority={index <= 2 ? true : false}
								className='absolute inset-0'
								alt={m.alt}
								fill
								draggable={false}
								sizes='100vw'
								quality={100}
								style={{
									objectFit: 'cover',
								}}
							/>
						</div>
					))}
				</div>
			</div>
		</>
	)
}

export default ImageGallery
