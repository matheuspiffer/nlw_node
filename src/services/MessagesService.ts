import { getCustomRepository, Repository } from "typeorm";
import { Message } from "../entities/Message";
import { MessagesRepository } from "../repositories/MessagesRepository";
import { UsersRepository } from "../repositories/UsersRepository";

interface IMessageCreate {
    admin_id?: string;
    text: string;
    user_id: string;
}

class MessagesService {
    private messagesRepository: Repository<Message>;

    constructor() {
        this.messagesRepository = getCustomRepository(MessagesRepository);
    }

    async create({ admin_id, text, user_id }: IMessageCreate) {
        const usersRepository = getCustomRepository(UsersRepository);

        const user = await usersRepository.findOne({
            where: {
                id: user_id,
            },
        });

        if (!user) {
            throw new Error("Usuário Não encontrado!");
        }

        const message = this.messagesRepository.create({
            admin_id,
            text,
            user_id,
        });

        await this.messagesRepository.save(message);

        return message;
    }

    async listByUser(user_id: string) {
        const list = await this.messagesRepository.find({
            where: {
                user_id,
            },
            relations: ["users"],
        });
        return list;
    }
}

export { MessagesService };
