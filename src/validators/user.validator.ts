import { body } from 'express-validator';

export const registerValidator = [
    body('firstname')
        .notEmpty()
        .withMessage('First name is required')
        .isLength({ min: 3 })
        .isString()
        .withMessage('First name must be at least 3 characters long'),
    body('middlename')
        .optional() // Made optional since it might not be required
        .isLength({ min: 3 })
        .isString()
        .withMessage('Middle name must be at least 3 characters long'),
    body('lastname')
        .notEmpty()
        .withMessage('Last name is required')
        .isLength({ min: 3 })
        .isString()
        .withMessage('Last name must be at least 3 characters long'),
    body('email')
        .isEmail()
        .withMessage('Invalid email format'),
    body('password')
        .notEmpty()
        .withMessage('Password is required')
        .isString()
        .isLength({ min: 8 })
        .isStrongPassword({
            minLength: 8,
            minLowercase: 1,
            minUppercase: 1,
            minNumbers: 1,
            minSymbols: 1
        })
        .withMessage('Password must be at least 8 characters and include a lowercase and uppercase letter, a number, and a symbol'),
    body('confirmPassword')
        .notEmpty()
        .withMessage('Confirm Password is required')
        .custom((value, { req }) => {
            if (value !== req.body.password) {
                throw new Error('Passwords do not match');
            }
            return true;
        })
];

export const loginValidator = [
    body('email')
        .isEmail()
        .withMessage('Invalid email format'),
    body('password')
        .notEmpty()
        .withMessage('Password is required'),
];