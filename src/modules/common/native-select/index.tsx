import React, { ChangeEvent, ReactNode, useState } from 'react'

interface NativeSelectProps {
	value?: string
	onChange?: (event: ChangeEvent<HTMLSelectElement>) => void
	children: ReactNode
	className?: string
}

const NativeSelect: React.FC<NativeSelectProps> = ({
	value,
	onChange,
	children,
	className = '',
}) => {
	const [selectedValue, setSelectedValue] = useState<string>(value || '')

	const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
		setSelectedValue(event.target.value)
		onChange && onChange(event)
	}

	return (
		<select
			value={selectedValue}
			onChange={handleChange}
			className={`bg-transparent -ml-1 ${className}`}
		>
			{children}
		</select>
	)
}

export default NativeSelect
