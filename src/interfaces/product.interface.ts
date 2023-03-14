export interface Product {
  name: string
  amount: string
}

export interface ProductData extends Product {
  id?: number
  orderId?: number
}