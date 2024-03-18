import prismaClient from "../../prisma";

class ListOrderServices {
    async execute() {

        const orders = await prismaClient.order.findMany({
            where: {
                draft: true,
                status: false
            },
            orderBy: {
                createdAt: 'desc'
            }
        })

        return orders;

    }
}

export {ListOrderServices};