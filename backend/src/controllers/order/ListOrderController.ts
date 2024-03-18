import { Request, Response } from "express";
import { ListOrderServices } from "../../services/order/ListOrderServices";

class ListOrderController {
    async handle(request: Request, response: Response) {
        const listOrderServices = new ListOrderServices();

        const orders = await listOrderServices.execute();

        return response.json(orders);
    }
}

export { ListOrderController };