import User, {UserAttributes} from "../db/models/user";
import bcrypt from 'bcrypt'

const SALT_ROUNDS = 10;

class UsersService {
    static async create(data: Required<Pick<UserAttributes, 'email' | 'password'>>) {
        const emailTaken = await User.findOne({ where: {
            email: data.email.trim()
        } })
        const hash = await bcrypt.hash(data.password, SALT_ROUNDS)
        const user = User.build({...data, password: hash })
        await user.save()
        return user
    }

    static async all() {
        return await User.findAll()
    }
}

export default UsersService
