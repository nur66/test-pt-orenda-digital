import { Request, Response } from 'express'
import { getManager, getRepository, In } from 'typeorm'

// Entities / Models
import { User } from '../entity/User'
import { Task } from '../entity/Task'

// Post Task
export const postTask = async (req: Request, resp: Response) => {

    const entityManager = getManager()
    const { user, tasks } = req.body

    let data = await entityManager
        .getRepository(User)
        .createQueryBuilder("user")
        .select("user.id")
        .where("user.email = :email", { email: user })
        .getCount()
    if (data === 0) return resp.status(400).json({ message: "Unknow User" })

    const entUser = await User.findOneBy({
        email: user
    })

    for (var i = 0; i < tasks.length; i++) {
        const task = new Task()
        task.name = tasks[i]
        task.user = entUser ? entUser : new User()
        task.status = 'assign'
        await entityManager.save(task)
    }

    resp.status(204).json({ message: "No Content" })
}

// Show All Task
export const getTask = async (req: Request, resp: Response) => {
    const { tasks } = req.body
    
    const entityManager = getManager()
    let data =await entityManager
    .getRepository(User)
    .createQueryBuilder("user")
    .leftJoinAndSelect("user.task","task")
    .where("user.email IN (:userEmail)", { userEmail: tasks })
    .select(['user.email', 'task.name'])
    .getMany()
    resp.status(200).json(data)    

}

// Edit / Update Task
export const removeTask = async (req: Request, resp: Response) => {

    const entityManager = getManager()
    const { user, tasks } = req.body

    // check user
    let data = await entityManager
        .getRepository(User)
        .createQueryBuilder("user")
        .select("user.id")
        .where("user.email = :email", { email: user })
        .getCount()
    if (data === 0) return resp.status(400).json({ message: "Unknow User" })

    const entUser = await User.findOneBy({
        email: user
    })

    if (entUser) {
        const idUser = entUser.id

        const repository = getRepository(Task)
        const data = await repository.findOne({ where: { name: tasks } });
        if (data) {
            for (var i = 0; i < tasks.length; i++) {
                await repository.delete({ name: tasks })
            }
            resp.status(204).json({ message: "No Content" })
        } else {
            resp.status(404).json({ message: "Task Not Found" })
        }
    } else {
        resp.status(404).json({ message: "Not Found" })
    }

}
