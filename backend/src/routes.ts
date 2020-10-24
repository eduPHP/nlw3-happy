import { Router } from 'express'
import multer from 'multer'
import uploadConfig from './config/upload'
import OrphanagesController from './controllers/OrphanagesController'
import RegisterController from './controllers/RegisterController'
import LoginController from './controllers/LoginController'
import ProfileController from './controllers/ProfileController'
import authorizeUsers from "./middleware/authorizeUsers";

const routes = Router()
const upload = multer(uploadConfig)
// Orphanages
routes.get('/orphanages', OrphanagesController.index)
routes.get('/orphanages/:id', OrphanagesController.show)
routes.post('/orphanages', upload.array('images'), OrphanagesController.store)

// Users
// register
routes.post('/auth/register', RegisterController.store)

// login
routes.post('/auth/login', LoginController.store)

// profile
routes.get('/user', authorizeUsers, ProfileController.show)
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
