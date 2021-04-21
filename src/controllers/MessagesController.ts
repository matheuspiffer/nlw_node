import { Request, Response } from "express";
import { MessagesService } from "../services/MessagesService";

class MessagesController {
    async create(req: Request, res: Response) {
        const { admin_id, text, user_id } = req.body;
        const messagesService = new MessagesService();
        try {
            if (!text || !user_id) {
                return res.status(404).json({ message: "Não é possível processar os dados" });
            }

            const message = await messagesService.create({
                admin_id,
                text,
                user_id,
            });
            return res.json(message);
        } catch (error) {
            console.log(error);
            return res.status(500).json({ message: error.message });
        }
    }

    async showByUser(req: Request, res: Response) {
        const { id } = req.params;
        try {
            if (!id) {
                return res.status(404).json({ message: "Não é possível processar os dados" });
            }
            const messagesService = new MessagesService();

            const list = await messagesService.listByUser(id);

            return res.json(list);
        } catch (error) {
            console.log(error);
            return res.status(500).json({ message: error.message });
        }
    }
}

export { MessagesController };
