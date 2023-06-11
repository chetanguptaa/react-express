const { object, string } = require('zod');

const createUserSchema = object({
    body: object({
        email: string({
            required_error: 'Email is required'
        }).email('not a valid Email'),
        password: string({
            required_error: 'Password is required'
        }).min(8, "password is too short"),
    })
})

module.exports = createUserSchema