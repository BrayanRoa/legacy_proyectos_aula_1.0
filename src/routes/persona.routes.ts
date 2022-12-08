import { Router } from 'express'
import { getAll } from '../controllers/persona.controller';

const router = Router()

router.get('/', getAll)

// router.post('/')

export default router
