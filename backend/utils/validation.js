const { validationResult } = require("express-validator");
const { noExtendLeft } = require("sequelize/lib/operators");

// middleware for formatting errors from express-validator middleware
// can be customized (see express-validator's documentation)
const handleValidationErrors = (req, _res, next) => {
    const validationErrors = validationResult(req);

    // if there are errors
    if (!validationErrors.isEmpty()) {
        const errors = validationErrors
            .array()
            .map((error) => `${error.msg}`);

        const err = Error("Bad request.");
        err.errors = errors;
        err.status = 400;
        err.title = "Bad request.";
        next(err);
    }

    next();
}

module.exports = {
    handleValidationErrors
}
