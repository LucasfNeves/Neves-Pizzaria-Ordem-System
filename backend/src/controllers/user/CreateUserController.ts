import { Request, Response } from "express";
import { CreatedUserService } from "../../services/user/CreateUserService";

// O controller é responsável por receber a requisição, chamar outro arquivo para tratar a requisição e devolver uma resposta

class CreateUserController {
  async handle(request: Request, response: Response) {
   const { name, email, password } = request.body;

    const createUserService = new CreatedUserService();

    const user = await createUserService.execute({name, email, password});

    return response.json(user);
  }
}

export { CreateUserController };