import {AllowedSchema} from 'express-json-validator-middleware'
const create: AllowedSchema = {
    type: "object",
    required: ["email", "password"],
    properties: {
        password: {
            type: "string",
            minLength: 6
        },
        email: {
            type: "string",
        }
    }
}


export const usersSchema = {
    create,
}