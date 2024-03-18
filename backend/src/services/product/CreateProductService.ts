import prismaClient from "../../prisma";

interface ProductRequest {
    name: string;
    price: number;
    description: string;
    banner: string;
    category_id: string;
}

class CreateProductService {
    async execute({name, price, category_id, description, banner} : ProductRequest) {
        const product = await prismaClient.product.create({
            data: {
                name,
                price,
                category_id,
                description,
                banner
            },
        });

        return product;
    }
}

export { CreateProductService };