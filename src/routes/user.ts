import express from "express"
import { 
    postTask, 
    getTask, 
    removeTask
} from '../controllers/user'
import { register, registerUser, deleteUser } from "../controllers/auth"

const router = express.Router()

// REGISTER
router.post('/register', registerUser)

// POST TASK
router.post('/assign', postTask)

// GET
router.get('/tasks/common', getTask)

// REMOVE TASK
router.post('/unassign', removeTask)

// REGISTER NEW
router.post('/register-new', register)

// DELETE USER : FOR TESTING onDelete : CASCADE
router.delete('/delete-user', deleteUser)

export {
    router
}