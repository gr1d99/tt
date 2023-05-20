import User, {UserAttributes} from "../db/models/user";

class UsersService {
    static async create(data: Required<UserAttributes>) {
        const user = User.build(data)
        await user.save()
        return user
    }

    static async all() {
        return await User.findAll()
    }
}

export default UsersService
