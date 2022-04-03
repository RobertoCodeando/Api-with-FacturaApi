import { Router } from "express";
import { check, param } from "express-validator";

import {
    deleteUser,
    getUsers,
    postUsers,
    putUsers,
    getUserById,
} from "../controllers/user";
import validateJWT from "../middlewares/authentication";
import validationForm from "../middlewares/validationForm";
const router = Router();

router.get("/", [validateJWT], getUsers);

router.get("/:id", [validateJWT], getUserById);

router.post(
    "/",
    [
        validateJWT,
        check("legal_name", "Name is empty").not().isEmpty(),
        check("email", "Add valid email").isEmail(),
        check("tax_system", "This field must be at least three characters")
            .isLength({ min: 3 })
            .notEmpty(),
        check("tax_id", "Tax Id is incorrect").isLength({ min: 13, max: 13 }),
        check("zip", "Zip is a required field").not().isEmpty(),
        validationForm,
    ],
    postUsers
);

router.put(
    "/:id",
    [
        param("id", "Id of user is invalid")
            .not()
            .isEmpty()
            .isLength({ min: 23 }),
        check(
            "tax_system",
            "This field must be at least three characters"
        ).isLength({ min: 3 }),
        validationForm,
    ],
    putUsers
);

router.delete(
    "/:id",
    [
        validateJWT,
        param("id", "Id of user is invalid")
            .not()
            .isEmpty()
            .isLength({ min: 23 }),
        validationForm,
    ],
    deleteUser
);

export default router;
