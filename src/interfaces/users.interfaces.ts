
export interface IUserRequest {
    username?: string
    password?: string
}

export interface IUserResponse {
    id: string
    username: string
    password?: string
}

export interface IUserLogin {
    username: string
    password: string
}

export const IUserKeys = {
    username: "string",
    password: "string"
}