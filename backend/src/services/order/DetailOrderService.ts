import prismaClient from "../../prisma";

interface DetailRequest {
   id: string;
}

class DetailOrderService {
    async execute({id} : DetailRequest) {

        const orders = await prismaClient.item.findMany({
            where: {
                order_id: id
            },
            include: {
                product: true,
                order: true
            }
           
        })

        return orders;

    }
}

export {DetailOrderService};