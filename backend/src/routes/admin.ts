import {Router} from "express"

import AdminOrphanagesController from "../controllers/AdminOrphanagesController"
import AdminImagesController from "../controllers/AdminImagesController"
import authorizeUsers from "../middleware/authorizeUsers"
import multer from "multer"
import uploadConfig from "../config/upload"

const router = Router()
const upload = multer(uploadConfig)

// lista inativos ?status=pending
router.get('/admin/orphanages', authorizeUsers, AdminOrphanagesController.index)
router.get('/admin/orphanages/:id', authorizeUsers, AdminOrphanagesController.show)
router.put('/admin/orphanages/:id', upload.array('images'), authorizeUsers, AdminOrphanagesController.update)
router.delete('/admin/orphanages/:id', authorizeUsers, AdminOrphanagesController.destroy)

// aprovar
router.put('/admin/orphanages/:id/approve', authorizeUsers, AdminOrphanagesController.approve)

// remover imagem
router.delete('/admin/images/:id', authorizeUsers, AdminImagesController.destroy)

export default router
