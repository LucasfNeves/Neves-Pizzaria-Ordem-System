import e, {Request, Response} from "express";
import { ListByCategory } from "../../services/product/ListByCategory";

class ListByCategoryController {
    async handle(request: Request, response: Response) {
        const { category_id } = request.params;

        const listByCategory = new ListByCategory();

        const product = await listByCategory.execute({category_id});

        return response.json(product);
    }
}

export { ListByCategoryController };