export interface User {
  username: string
  vocation?: string
  level?: number
  password?: string
}

export interface UserDetails extends User {
  id: number
}