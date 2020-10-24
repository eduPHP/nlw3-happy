import {Request, Response} from 'express'

export default {
    async show(req: Request, res: Response) {
        return res.json(req.user)
    }
}
