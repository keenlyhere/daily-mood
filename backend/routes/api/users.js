const express = require("express");

const { setTokenCookie, requireAuth } = require("../../utils/auth");
const { User, UserItem, Pet, Background } = require("../../db/models");

const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");
const { singlePublicFileUpload, singleMulterUpload } = require("../../awsS3");

const router = express.Router();

// validateSignup middleware
// checks if req.body.email exists and if it is an email
       // if req.body.password is not empty and a min length of 6
// if any one of those fail, return error reesponse
const validateSignup = [
    check("email")
        .exists({ checkFalsy: true })
        .withMessage("Email is required.")
        .bail()
        .isEmail()
        .withMessage("Please provide a valid email."),
    check("password")
        .exists({ checkFalsy: true })
        .withMessage("Password is required.")
        .bail()
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
router.post("/", singleMulterUpload("image"), validateSignup, async (req, res, next) => {
    const { email, password, firstName, lastName, birthday } = req.body;
    let displayPic;

    if (req.file) {
        displayPic = await singlePublicFileUpload(req.file);
    }

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

    // comment in once schema is approved and pet, background, and useritem tables are created

    // add the pet and background into UserItems
    const petUserItem = await UserItem.create({
        userId: user.id,
        itemType: "pet"
    })

    const bgUserItem = await UserItem.create({
        userId: user.id,
        itemType: "background"
    })

    // create default pet
    // note to self: (remove later) - pet will have default values so can just create a new pet on user creation
    const pet = await Pet.create({
        userItemId: petUserItem.id
    })

    // create default background
    const bg = await Background.create({
        userItemId: bgUserItem.id
    })

    user.activePet = petUserItem.id;
    user.activeBg = bgUserItem.id;

    await user.save();

    await setTokenCookie(res, user);

    console.log("User signup backend - user:", user);

    return res.json(user);
});

// PUT /api/users to edit profile picture
router.put("/", singleMulterUpload("image"), async (req, res, next) => {
    const { user } = req;
    const { userId } = req.body;
    const displayPic = await singlePublicFileUpload(req.file);

    const updateUser = await User.findByPk(userId);

    console.log("updateUser:", updateUser);
    console.log("userId:", userId);

    if (!updateUser) {
        err.status = 404;
        err.statusCode = 404;
        err.title = "Not found"
        err.message = "User couldn't be found";
        return next(err);
    }

    if (user.id !== updateUser.id) {
        err.title = "Forbidden";
        err.status = 403;
        err.statusCode = 403;
        err.message = "Forbidden: cannot edit a Spot that is not yours";
        return next(err);
    }

    updateUser.displayPic = displayPic;

    await updateUser.save();
    // console.log("updateUser - updated:", updateUser);

    res.json(updateUser);
})

module.exports = router;
