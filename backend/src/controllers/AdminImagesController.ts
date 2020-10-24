import {Response, Request} from "express"
import {getRepository} from "typeorm"
import Image from "../models/Image"

export default {
    async destroy(req: Request, res: Response) {
        const {id} = req.params
        const repo = getRepository(Image)
        const image = await repo.findOneOrFail(id)

        await repo.delete(image)

        return res.json({deleted: true})
    }
}
