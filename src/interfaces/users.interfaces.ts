
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

export interface IUserCallback {
    username: string
    password?: string
    account: {
        id: string
        balance: number
    }
}

export const IUserKeys = {
    username: "string",
    password: "string"
}