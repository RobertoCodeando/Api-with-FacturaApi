import { Request, Response } from "express";
import generateJWT from "../helpers/generate-jwt";
import { validationResult } from "express-validator";

interface auth {
    password: string;
    email: string;
}

export const authUser = async (req: Request, res: Response) => {
    const { email } = req.body as auth;

    try {
        const isValid = validationResult(req);

        if (!isValid.isEmpty()) {
            res.status(400).json({
                msg: "User is not in database",
            });
        }

        const token = await generateJWT(email);

        res.status(200).json({
            msg: "Auth success",
            token,
        });
    } catch (error: any) {
        res.status(400).json({
            error: error.response.data,
        });
    }
};
