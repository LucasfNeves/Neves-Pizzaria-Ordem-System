import { Request, Response } from "express";

import { DetailOrderService } from "../../services/order/DetailOrderService";

class DetailOrderController {
    async handle(request: Request, response: Response) {
        const order_id = request.query.order_id as string;

        const detailOrderService = new DetailOrderService();

        const item = await detailOrderService.execute({
            id: order_id
        });

        return response.json(item);
    }
}

export { DetailOrderController };