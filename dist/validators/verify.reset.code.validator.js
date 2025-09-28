import { body } from "express-validator";
// email, resetTokenCode, newPassword
export const resetTokenCodeVerificationValidator = [
    body('email')
        .notEmpty()
        .isString()
        .isEmail()
        .withMessage('Email should be provided'),
    body('resetTokenCode')
        .notEmpty()
        .isString()
        .isLength({ min: 6, max: 6 })
        .withMessage('Code must be a six digit number'),
    body('newPassword')
        .notEmpty()
        .isString()
        .isStrongPassword()
        .withMessage('Password should be strong and provided')
];
//# sourceMappingURL=verify.reset.code.validator.js.map