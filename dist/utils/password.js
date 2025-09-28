import bcrypt from 'bcrypt';
const SALT_ROUNDS = Number(process.env.BCRYPT_SALT_ROUNDS) || 12;
export async function hashPassword(password) {
    return bcrypt.hash(password, SALT_ROUNDS);
}
export async function comparePasswords(password, hash) {
    return bcrypt.compare(password, hash);
}
//# sourceMappingURL=password.js.map