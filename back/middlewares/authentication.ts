import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { idUser } from "../interfaces/user.interfaces";

const validateJWT = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const token = req.get("x-auth-token");

        if (!token) {
            res.status(401).json({
                msg: "No authorized",
            });
        }

        try {
            const verify = (await jwt.verify(
                token || "",
                `${process.env.TOKEN_JWT}`
            )) as JwtPayload;
            (req as idUser).id = verify.id;
            next();
        } catch (error) {
            res.status(401).json({
                msg: "No valid token",
            });
        }
    } catch (error) {
        return next([error]);
    }
};

export default validateJWT;
