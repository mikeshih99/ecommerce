exports.userSignupValidator = (req, res, next) => {
    req.check('name', 'Name is required').notEmpty() //command from validator
    req.check('email', "Email must be between 3 to 32 characters")
        .matches(/.+\@.+\..+/) //email format
        .withMessage('Email must contain @')
        .isLength({
            min: 4,
            max:32
        });
        req.check('password', 'Password is required').notEmpty()
        req.check('password')
        .isLength({min: 6})
        .withMessage('Password must contain at least 6 characters')
        .matches(/\d/) //at least one digit
        .withMessage("Password must contain a number") //otherwise send errormessage
        const errors = req.validationErrors()
        if(errors) {
            const firstError = errors.map(error => error.msg)[0]
            //send first error message
            return res.status(400).json({ error: firstError});
        }
        next(); //if sucess pass to call back function to continue 

}