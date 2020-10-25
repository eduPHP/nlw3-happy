import {Request, Response} from 'express'
import {getRepository} from 'typeorm'

import orphanages_view from "../views/orphanages_view"
import orphanage_view from "../views/orphanages_view"
import OrphanageSchema from "./OrphanageSchema"
import Orphanage from "../models/Orphanage"

export default {
    async index(req: Request, res: Response) {
        const repo = getRepository(Orphanage)
        const {status} = req.query
        const where = status ? {status} : {status: 'active'}

        const orphanages = await repo.find({relations: ['images'], where})
        const [, hasPending] = await repo.findAndCount({where: {status: 'pending'}, order: {id: 'DESC'}})

        return res.json({
            orphanages: orphanages_view.renderMany(orphanages),
            hasPending: !!hasPending
        })
    },

    async show(req: Request, res: Response) {
        const {id} = req.params
        const repo = getRepository(Orphanage)

        const orphanage = await repo.findOneOrFail(id, {relations: ['images']})

        return res.json({orphanage: orphanages_view.render(orphanage)})
    },

    async update(req: Request, res: Response) {
        const {id} = req.params
        const requestImages = req.files as Express.Multer.File[]
        const images = requestImages.map(image => ({path: image.filename}))
        const repo = getRepository(Orphanage)

        const schema = OrphanageSchema
        const data = await schema.validate({...req.body, images}, {
            abortEarly: false
        }) as Orphanage
        let orphanage = await repo.findOneOrFail(id, {relations: ['images']})

        orphanage = await repo.merge(orphanage, data)
        await repo.save(orphanage)

        return res.status(201).json({orphanage: orphanage_view.render(orphanage)})
    },

    async approve(req: Request, res: Response) {
        const {id} = req.params
        const repo = getRepository(Orphanage)
        const orphanage = await repo.findOneOrFail(id)

        orphanage.status = 'active'

        await repo.update(id, orphanage)

        return res.status(201).json({success: true})
    },

    async destroy(req: Request, res: Response) {
        const {id} = req.params
        const repo = getRepository(Orphanage)
        const orphanage = await repo.findOneOrFail(id)

        await repo.delete(orphanage)

        return res.json({deleted: true})
    }

}
