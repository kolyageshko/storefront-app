import { ErrorMessage } from '@hookform/error-message'
import clsx from 'clsx'
import {
	SelectHTMLAttributes,
	forwardRef,
	useEffect,
	useImperativeHandle,
	useRef,
	useState,
} from 'react'
import { get } from 'react-hook-form'

type Variant = 'default' | 'native';

export type SelectProps = {
	placeholder?: string
	label?: string
	name: string
	errors?: Record<string, unknown>
	touched?: Record<string, unknown>
	required?: boolean
	variant?: Variant
} & SelectHTMLAttributes<HTMLSelectElement>

const Select = forwardRef<HTMLSelectElement, SelectProps>(
	(
		{
			placeholder = 'Select...',
			label,
			name,
			defaultValue,
			className,
			children,
			required,
			errors,
			variant = 'default', // Задаем значение по умолчанию для пропа variant
			...props
		},
		ref
	) => {
		const innerRef = useRef<HTMLSelectElement>(null)
		const [isPlaceholder, setIsPlaceholder] = useState(false)

		useImperativeHandle<HTMLSelectElement | null, HTMLSelectElement | null>(
			ref,
			() => innerRef.current
		)

		const hasError = errors && get(errors, name)

		useEffect(() => {
			if (innerRef.current && innerRef.current.value === '') {
				setIsPlaceholder(true)
			} else {
				setIsPlaceholder(false)
			}
		}, [innerRef.current?.value])

		return (
			<div>
				<div
					onFocus={() => innerRef.current?.focus()}
					onBlur={() => innerRef.current?.blur()}
					className={clsx('relative', className)}
				>
					<select
						ref={innerRef}
						defaultValue={defaultValue}
						{...props}
						className={clsx(
							'block bg-white px-2.5 pb-2.5 pt-5 w-full border rounded-none appearance-none focus:outline-none focus:ring-0 peer',
							{
								'border-red-500 focus:border-red-500': hasError,
								'bg-transparent -ml-1': variant === 'native', // Добавляем классы для варианта "native"
							}
						)}
					>
						<option disabled hidden value=''>
							{placeholder}
						</option>
						{children}
					</select>
					<label
						onClick={() => {}}
						className={clsx(
							'absolute text-gray-500 duration-200 transform uppercase cursor-text -translate-y-3 scale-75 top-4 z-10 origin-[0] start-2.5 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto'
						)}
					>
						{label} {required && '*'}
					</label>
				</div>
				{hasError && (
					<ErrorMessage
						errors={errors}
						name={name}
						render={({ message }) => {
							return (
								<div className='pt-1 text-red-500'>
									<span>{message}</span>
								</div>
							)
						}}
					/>
				)}
			</div>
		)
	}
)

Select.displayName = 'Select'

export default Select
