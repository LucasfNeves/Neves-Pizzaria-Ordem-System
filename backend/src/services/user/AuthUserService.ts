import { sign } from "jsonwebtoken";
import prismaClient from "../../prisma";
import { compare } from "bcryptjs";

interface AuthRequest {
    email: string;
    password: string;
}

class AuthUserService {
    async execute({email, password}: AuthRequest) {
       // Verificar se o email existe
         const user = await prismaClient.user.findFirst({
              where: {
                email: email
              }
         });

        if (!user) {
            throw new Error("User/Password incorrect");
        }

        // Verificar se a senha está correta
        const passwordMatch = await compare(password, user.password);

        if (!passwordMatch) {
            throw new Error("User/Password incorrect");
        }
    
        // Se deu tudo certo, vamos gerar um token para o usuário
        const token = sign({
        // Payload (informações do usuário)
        user: {
            id: user.id,
            email: user.email,
            name: user.name
        }
        // Chave secreta
        } , process.env.JWT_SECRET, {
            // Configurações do token
            subject: user.id,
            expiresIn: "30d"
        });
    
        return {
            id: user.id,
            name: user.name,
            email: user.email,
            token: token
        }

    }
}

export { AuthUserService };