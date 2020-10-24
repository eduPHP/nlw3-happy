import {Request, Response} from 'express'
import {getRepository} from "typeorm"

import createToken from "../util/createToken"
import users_view from "../views/users_view"
import bcrypt from "../util/bcrypt"
import User from "../models/User"

export default {
    async store(req: Request, res: Response) {
        const repo = getRepository(User)
        const {email, password} = req.body

        const user = await repo.findOne({email})

        if (!user || !await bcrypt.compare(user.password, password)) {
            return res.status(422).json({
                email: 'Credenciais inválidas.'
            })
        }

        return res.json({
            user: users_view.render(user),
            token: createToken(user)
        })
    }
}
