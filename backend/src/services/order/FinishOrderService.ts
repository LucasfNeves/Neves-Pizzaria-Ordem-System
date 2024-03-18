import prismaClient from "../../prisma";

interface ItemRequest {
   order_id: string;
}

class FinishOrderService {
    async execute({order_id} : ItemRequest) {

        const item = await prismaClient.order.update({
            where: {
                id: order_id
            },
            data: {
               status:true
            }
        })

        return item;

    }
}

export {FinishOrderService};   