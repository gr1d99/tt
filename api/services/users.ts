import User, {UserAttributes} from "../db/models/user";
import bcrypt from 'bcrypt'

const SALT_ROUNDS = 10;

class UsersService {
    async one(id: string) {
        return await User.findByPk(id)
    }
    async create(data: Required<Pick<UserAttributes, 'email' | 'password'>>) {
        const isEmailTaken = await User.isEmailTaken(data.email)
        if (isEmailTaken) {
            throw new Error('Email is taken')
        }

        const hash = await bcrypt.hash(data.password, SALT_ROUNDS)
        const user = User.build({...data, password: hash })

        await user.save()

        if (user) {
            const attributes = user.toJSON()
            delete attributes.password
            return attributes
        }

        return user
    }

    async all() {
        return await User.findAll({
            include: 'todos'
        })
    }
}

export default new UsersService()
