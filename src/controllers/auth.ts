import { Request, Response } from 'express'
import { getManager, getRepository } from 'typeorm'
import { User } from '../entity/User'
import bcrypt from 'bcrypt'

export const registerUser = async (req: Request, resp: Response) => {

    try {
        const entityManager = getManager()
        const { user } = req.body

        // Cek User
        let data = await entityManager
        .getRepository(User)
        .createQueryBuilder("user")
        .where("user.email IN (:userEmail)", { userEmail: user })
        .getCount()
        if(data > 0) return resp.status(400).json({message: "Username or Email Has used"})

        for (var i = 0; i < user.length; i++) {
            const newUser = new User()
            newUser.email = user[i]
            await entityManager.save(newUser)
        }

        resp.status(204).json({ message: "No Content" })

    } catch (error) {
        resp.send(error)
    }
}

// For Testing onDelete : Cascade 
export const deleteUser = async (req: Request, resp: Response) => {
    const { user } = req.body
    const userRepository = getRepository(User)
    await userRepository.delete({email : user})
    resp.send("Data Deleted")
}

// Register Common Credential
export const register = async (req: Request, resp: Response) => {

    try {
        const entityManager = getManager()

        const { name, email, password, confPassword } = req.body
        if(password !== confPassword) return resp.status(400).json({message: "Password not match"})

        let data = await entityManager
        .getRepository(User)
        .createQueryBuilder("user")
        .where("user.name = :name", { name: name })
        .orWhere("user.email = :email", { email: email })
        .getCount()
        if(data > 0) return resp.status(400).json({message: "Username or Email Has used"})

        console.log("console name : ", data)

        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt);

        const user = new User()
        user.name = name
        user.email = email
        user.password = hash
        await entityManager.save(user)

        resp.status(204).json({message: "No Content"})
    } catch (error) {
        resp.send(error)
    }
}