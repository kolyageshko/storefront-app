'use client'

import { createContext, useContext, useState, ReactNode } from 'react'

type ModalType = 'cart' | 'other'

type ModalContextType = {
	isOpen: boolean
	modalType: ModalType | null
	openModal: (type: ModalType) => void
	closeModal: () => void
}

const ModalContext = createContext<ModalContextType | undefined>(undefined)

export const ModalProvider: React.FC<{ children: ReactNode }> = ({
	children,
}) => {
	const [modalState, setModalState] = useState({
		isOpen: false,
		modalType: null as ModalType | null,
	})

	const openModal = (type: ModalType) => {
		setModalState({
			isOpen: true,
			modalType: type,
		})
	}

	const closeModal = () => {
		setModalState({
			isOpen: false,
			modalType: null,
		})
	}

	return (
		<ModalContext.Provider value={{ ...modalState, openModal, closeModal }}>
			{children}
		</ModalContext.Provider>
	)
}

export const useModalContext = (): ModalContextType => {
	const context = useContext(ModalContext)
	if (!context) {
		throw new Error('useModalContext must be used within a ModalProvider')
	}
	return context
}
