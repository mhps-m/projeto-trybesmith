export interface User {
  id?: number
  username: string
  vocation: string
  level: number
  password?: string
}

export interface WithUser {
  user?: User
}