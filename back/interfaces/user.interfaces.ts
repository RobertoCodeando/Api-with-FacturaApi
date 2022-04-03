import { Request } from "express";

export interface CommonUser {
    legal_name: string;
    email: string;
    tax_id: string;
    tax_system: string;
}

export interface CreateUser extends CommonUser {
    zip: string;
}

type Address = {
    street: string;
    exterior: number;
    interior: number;
    neighborhood: string;
    city: string;
    municipality: string;
    zip: number;
    state: string;
    country: string;
};

export interface EditUser extends CommonUser {
    phone: number;
    address: Address;
}
export interface User extends CommonUser {
    name: string;
    email: string;
    password: string;
    avatar?: string;
}

export interface UserMongoose extends User {
    timestamp: string;
}

export interface Project {
    name: string;
    creator: string;
    timestamp: string;
}

export interface idUser extends Request {
    id: string;
}
