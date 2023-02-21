const express = require("express");

const { setTokenCookie, requireAuth } = require("../../utils/auth");
const { User } = require("../../db/models");

const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");

const router = express.Router();

// validateSignup middleware
// checks if req.body.email exists and if it is an email
       // if req.body.password is not empty and a min length of 6
// if any one of those fail, return error reesponse
const validateSignup = [
    check("email")
        .exists({ checkFalsy: true })
        .isEmail()
        .withMessage("Please provide a valid email."),
    check("password")
        .exists({ checkFalsy: true })
        .isLength({ min: 6 })
        .withMessage("Password must be 6 characters or more."),
    check("firstName", "First Name is required")
        .exists({ checkFalsy: true }),
    check("lastName", "Last Name is required")
        .exists({ checkFalsy: true }),
    check("birthday")
        .notEmpty()
        .withMessage("Please enter your birthday"),
    handleValidationErrors
];

// POST /api/users to sign up
router.post("/", validateSignup, async (req, res) => {
    const { email, password, firstName, lastName, birthday, displayPic } = req.body;

    const existingEmail = await User.findOne({
        where: {
            email: email
        }
    })

    const err = {};
    err.status = 403;
    err.statusCode = 403;
    err.message = "User already exists"
    err.errors = [];

    if (existingEmail) {
        err.errors.push("User with that email already exists");

        return next(err);
    }

    const user = await User.signup({
        email,
        password,
        firstName,
        lastName,
        birthday,
        displayPic
    });

    await setTokenCookie(res, user);

    return res.json(user);
});

module.exports = router;
