import React from 'react'
import { ModalProvider } from '@/lib/context/modal-context'

export default function Providers({ children }: { children: React.ReactNode }) {
	return <ModalProvider>{children}</ModalProvider>
}
