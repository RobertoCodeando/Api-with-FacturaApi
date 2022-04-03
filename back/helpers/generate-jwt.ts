import jwt from "jsonwebtoken";

const generateJWT = (id = ""): Promise<string> => {
    return new Promise((resolve, reject) => {
        const payload = { id };

        jwt.sign(
            payload,
            `${process.env.TOKEN_JWT}`,
            {
                expiresIn: 360000,
            },
            (error: Error | null, token: string | undefined) => {
                if (error) {
                    console.log(error);
                    reject("Token in generating token");
                } else {
                    resolve(token || "");
                }
            }
        );
    });
};

export default generateJWT;
