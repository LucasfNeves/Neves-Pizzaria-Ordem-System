import { Request, Response } from "express";
import { CreateCategoryService } from "../../services/category/CreateCategoryService";

class CreateCategoryController {
    async handle(request: Request, response: Response) {
        const { name } = request.body;

        const createCategoryService = new CreateCategoryService();

        const category = await createCategoryService.execute({name});

        return response.json(category);
    }
}

export { CreateCategoryController };

/**
 * handle é o método que será chamado quando a rota for acessada, esse método vem do express
 * handle é um metódo imbutido do express que recebe dois parametros, request e response
 * Ele funciona como um middleware, ele recebe a requisição e a resposta e pode fazer o que quiser com elas
 */