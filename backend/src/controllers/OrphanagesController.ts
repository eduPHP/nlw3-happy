import { Request, Response } from 'express'
import { getRepository } from 'typeorm'
import * as Yup from 'yup'
import Orphanage from '../models/Orphanage'
import orphanages_view from '../views/orphanages_view'
import orphanage_view from '../views/orphanages_view'

export default {
    async store(req: Request, res: Response) {
        const requestImages = req.files as Express.Multer.File[]
        const images = requestImages.map(image => ({path: image.filename}))

        const orphanageRepository = getRepository(Orphanage)
        const schema = Yup.object().shape({
            name: Yup.string().required(),
            latitude: Yup.number().required(),
            longitude: Yup.number().required(),
            about: Yup.string().required().max(300),
            instructions: Yup.string().required(),
            opening_hours: Yup.string().required(),
            open_on_weekends: Yup.bool().required(),
            images: Yup.array(Yup.object().shape({
                path: Yup.string().required()
            }))
        })
        const data = await schema.validate({
            ...req.body,
            images
        }, {
            abortEarly: false
        })

        const orphanage = orphanageRepository.create(data as Orphanage)
        await orphanageRepository.save(orphanage)

        return res.status(201).json({orphanage: orphanage_view.render(orphanage)})
    },

    async index(req: Request, res: Response) {
        const orphanageRepository = getRepository(Orphanage)
        const orphanages = await orphanageRepository.find({
            relations: ['images']
        })

        return res.json({orphanages: orphanages_view.renderMany(orphanages)})
    },

    async show(req: Request, res: Response) {
        const { id } = req.params
        const orphanageRepository = getRepository(Orphanage)
        const orphanage = await orphanageRepository.findOneOrFail(id, {
            relations: ['images']
        })

        return res.json({orphanage: orphanage_view.render(orphanage)})
    }
}
