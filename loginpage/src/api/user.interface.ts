export interface IUserResponse {
  resultCode: number
  messages: Array<string>
  data: {
    username: string
    email: string
  }
}
