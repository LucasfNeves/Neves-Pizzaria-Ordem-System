import express, {Request, Response, NextFunction} from "express";
import "express-async-errors";
import { router } from "./routes";
import cors from "cors";
import path from "path";

const app = express();

app.use(express.json());

app.use(cors());

app.use(router);

// Middleware para servir arquivos estáticos
app.use("/files", express.static(path.resolve(__dirname, "..", "tmp")));

// Middleware de tratamento de erros
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    // Verifica se o que está passando em uma rota é um erro
    if(err instanceof Error){
        return res.status(400).json({
            error: err.message
        })
    }

    // Se não for um erro, retorna um erro 500
    return res.status(500).json({
        status: "error",
        message: "Internal Server Error"
    })
})

app.listen(3333, () => console.log("Server is running!!!"));

