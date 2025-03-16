// Тип для изображения
export type Media = {
	id: number
	name: string
	alt: string
	url: string
}

// Тип для цены
export type MoneyAmount = {
	id: number
	price: number
	sale_price: number
	currency: Currency
}

// Тип для валюты
export type Currency = {
	code: string
	name: string
	symbol: string
}

// Тип для варианта товара
export type ProductVariant = {
	id: number
	name: string
	sku?: string
	prices: MoneyAmount[]
	inventory_stock: number
	allow_backorder: boolean
	manage_inventory: boolean
	available: boolean
	created_at: Date
}


// Тип для товара
export type Product = {
	id: string
	name: string
	description: string
	handle: string
	variants: ProductVariant[]
	media: Media[]
	thumbnail: Media
	status: ProductStatus
	available: boolean
	created_at: Date
}

export enum ProductStatus {
	PUBLISHED = 'PUBLISHED',
	DRAFT = 'DRAFT',
}

export type Cart = {
	id: string
	email?: string
	token: string
	market: Market
	shipping_address?: Address
	shipping_method?: ShippingMethod
	created_at: Date
	completed_at: Date
	line_items: LineItem[]
	payment_provider?: PaymentProvider
	subtotal: number
	shipping_price: number
	total: number
	item_count: number
}

export type Address = {
	id?: string
	first_name?: string
	last_name?: string
	country?: Country
	country_code?: string
	province?: string
	city?: string
	address_1?: string
	address_2?: string
	postal_code?: string
	phone?: string
}

export type Market = {
	id: string
	name: string
	currency: Currency
	countries: Country[]
	shipping_methods: ShippingMethod[]
	payment_providers: PaymentProvider[]
}

export type PaymentProvider = {
	id: string
}

export type ShippingMethod = {
	id: string
	name: string
	description: string
	price: number
}

export type Country = {
	id: string
	name: string
	iso: string
}

export type CreateCartDto = {
	country_code: string
}

export type UpdateCartDto = {
	email?: string

	shipping_address?: Address

	market_id?: string

	shipping_method_id?: string

	payment_provider_id?: string
}

export type UpdateCartItemDto = {
	quantity: number
}

export type Collection = {
	id: string
	name: string
	handle: string
	products: Product[]
}

export interface Store {
	id: string
	default_market: Market
	currencies: Currency[]
}

export type Order = {
	id: string
	external_id: string
	token: string
	currency: Currency
	market: Market
	shipping_address: Address
	billing_address: Address
	shipping_method: ShippingMethod
	payment_provider: PaymentProvider
	line_items: LineItem[]
	status: OrderStatus
	payment_url: string
	shipping_price: number
	subtotal: number
	total: number
	created_at: Date
	updated_at: Date
}

export enum OrderStatus {
	ARCHIVED = 'ARCHIVED',
	CANCELLED = 'CANCELLED',
	OPEN = 'OPEN',
	DRAFT = 'DRAFT',
}

export type LineItem = {
	id: string
	name: string
	variant_name: string
	variant: ProductVariant
	description: string
	quantity: number
	price: number
	sale_price: number
	thumbnail: Media
	product: Product
	created_at: Date
}
