import { Router } from "express";
import { check } from "express-validator";
import { authUser } from "../controllers/auth";
import validationForm from "../middlewares/validationForm";

const router = Router();

router.post(
    "/",
    [
        check("email", "Add valid email").isEmail(),
        check("password", "Password must be at least 6 characteres").isLength({
            min: 6,
        }),
        validationForm,
    ],
    authUser
);

export default router;
