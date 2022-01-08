import * as bcrypt from 'bcrypt';

export class PasswordHash {
    /**
     * @param plainPassword Plain password
     * @returns Returns a hashed password
     */
    public static async hashPassword(plainPassword: string) {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(plainPassword, salt);

        return hashedPassword;
    }
}