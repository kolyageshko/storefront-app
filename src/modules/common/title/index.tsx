import React, { ReactNode } from 'react'

interface TitleProps {
	children: ReactNode
	className?: string
}

const Title: React.FC<TitleProps> = ({ children, className = '' }) => {
	return <h2 className={`uppercase mb-3 ${className}`}>{children}</h2>
}

export default Title
