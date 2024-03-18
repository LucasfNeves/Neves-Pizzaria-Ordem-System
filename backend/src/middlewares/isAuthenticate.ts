import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

interface Payload {
    sub: string;
}

// Middleware de autenticação verifica se o usuário está autenticado
export function isAuthenticate(request: Request, response: Response, next: NextFunction) {
    // Receber o token
    const authToken = request.headers.authorization;

    // Verificar se o token está preenchido
    if (!authToken) {
        return response.status(401).end({
            errorCode: "token.invalid"
        });
    }

    // Estamos pegando o token e dividindo em duas partes, a primeira parte é o Bearer e a segunda parte é o token a , serve para ignorar o Bearer
    const [, token] = authToken.split(" ");

    try {
        // Validar o token
        const { sub } = verify(token, process.env.JWT_SECRET) as Payload;

        // Recuperar o id do token e colcar dentro de uma variavel user_id que está dentro do request
        request.user_id = sub;

        return next();

    } catch (error) {
        return response.status(401).end();
    }
}