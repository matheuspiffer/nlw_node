import { Request, Response } from "express";
import { UsersService } from "../services/UsersService";
class UsersController {
    async create(req: Request, res: Response) {
        const { email } = req.body;
        try {
            const userService = new UsersService();
            const user = await userService.create(email);

            return res.json(user);
        } catch (error) {
            console.log(error);
            return res.status(400);
        }
    }
}

export { UsersController };
