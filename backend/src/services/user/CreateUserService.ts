import prismaClient from "../../prisma";
import { hash } from "bcryptjs";

interface UserRequest {
    name: string;
    email: string;
    password: string;
}

class CreatedUserService {
    async execute({name, email, password}: UserRequest) {
        // Verificar se ele enviou o email
        if (!email) {
            throw new Error("Email incorrect");
        }

        // Verificar se o email já existe
        const userAlreadyExists = await prismaClient.user.findFirst({
            where: {
                email : email
            }
        });

        if (userAlreadyExists) {
            throw new Error("User already exists");
        }

        // Criptografar a senha
        const passwordHash = await hash(password, 8);

        // Criar o usuário no banco
        const user = await prismaClient.user.create({
            data: {
                name,
                email,
                password: passwordHash
            },
            // O select é para retornar apenas os campos que eu quero
            select: {
                id: true,
                name: true,
                email: true,
            }
        });

        return user;

    }

}

export { CreatedUserService };