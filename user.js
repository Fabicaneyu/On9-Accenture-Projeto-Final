const User = require('../models/User')
const { signupSchema } = require('../validators/user')
const { hashPassword } = require('../helpers/user')

exports.getAll = () => {
    try {
        User.find()
            .then(user => res.status(200).json(user))
            .catch(res.status(204).json({ message: 'Não há usuários cadastrados' }))

    } catch (e) {
        console.log(e)
        return res.status(400).json({ e: 'Não foi possível fazer busca' })
    }
}

exports.signup = async (req, res) => {
    try {
        const validatedBody = await signupSchema.validate(req.body)
        const user = new User(validatedBody)
        User.findOne({ email: validatedBody.email })
            .then(async existingUser => {
                if (existingUser) {
                    return res.status(400).json({
                        errors: ['This account is registered with other e-mail.']
                    })
                }

                const passwordHashed = await hashPassword(user.password, res)
                user.password = passwordHashed
                user.save()
                    .then(user => res.status(200).json(user))

                    .catch(err => {
                        console.log(err)
                        return res.status(500).json(err)
                    })
            })
    } catch (e) {
        console.log(e)
        return res.status(400).json(e)
    }
}