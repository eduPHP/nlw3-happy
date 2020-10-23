import { Router } from 'express'
import multer from 'multer'
import uploadConfig from './config/upload'
import OrphanagesController from './controllers/OrphanagesController'
import RegisterController from './controllers/RegisterController'

const routes = Router()
const upload = multer(uploadConfig)
// Orphanages
routes.get('/orphanages', OrphanagesController.index)
routes.get('/orphanages/:id', OrphanagesController.show)
routes.post('/orphanages', upload.array('images'), OrphanagesController.store)

// Users
// register
routes.post('/profile', RegisterController.store)

// login
// profile
// recover
// save-password

// admin orphanage
// lista todos
// lista inativos
// aprovar
// editar
// remover
// remover imagem

export default routes
