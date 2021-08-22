export interface User {
    id: number;
    email: string;
    name: string;
    password: string;
    role: Role;
}

export enum Role {
    USER = 0,
    ADMIN = 1
}