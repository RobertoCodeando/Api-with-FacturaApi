import { Request, Response } from "express";
import { CreateUser, EditUser } from "../interfaces/user.interfaces";
import apiClient from "../config/apiClient";
import { omit } from "ramda";

export const getUsers = async (req: Request, res: Response) => {
    try {
        const usersList = await apiClient({
            method: "GET",
            url: "/customers",
        });

        res.status(200).send({ data: usersList.data });
    } catch (error) {
        res.status(400).json({ error: "Error en la petición" });
    }
};
export const getUserById = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const usersList = await apiClient({
            method: "GET",
            url: `/customers/${id}`,
        });

        res.status(200).send({ data: usersList.data });
    } catch ({ response }) {
        res.status(400).json({
            error: "Error en la petición",
        });
    }
};

export const postUsers = async (req: Request, res: Response) => {
    const postCreateUser: CreateUser = req.body;

    try {
        const fields = omit(["zip"], postCreateUser);
        const response = await apiClient({
            method: "POST",
            url: "/customers",
            data: {
                ...fields,
                address: {
                    zip: postCreateUser.zip,
                },
            },
        });
        res.status(201).json({
            msg: "User created",
            data: response.data,
        });
    } catch (error: any) {
        res.status(401).json({
            error: "Hubo un error en la petición",
            msg: error.response.data,
        });
    }
};

export const putUsers = async (req: Request, res: Response) => {
    const putUser: Partial<EditUser> = req.body;
    const { id } = req.params;
    try {
        const response = await apiClient({
            method: "PUT",
            url: `/customers/${id}`,
            data: {
                ...putUser,
            },
        });
        res.status(200).json({
            msg: "User edited",
            data: response.data,
        });
    } catch (error: any) {
        res.status(400).json({
            error: "Hubo un problema, intenta más tarde",
            msg: error.response.data,
        });
    }
};

export const deleteUser = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const response = await apiClient({
            method: "DELETE",
            url: `/customers/${id}`,
        });
        res.status(201).json({
            msg: "User deleted",
            status: response.status,
        });
    } catch (error: any) {
        res.status(400).json({
            error: "Hubo un problema, intenta más tarde",
            msg: error.response.data,
        });
    }
};
