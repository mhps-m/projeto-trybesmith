export interface Order {
  id?: number
  userId?: number
}

export interface OrderDetails extends Order {
  productsIds: number[]
}