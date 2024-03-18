import multer from 'multer';

// O crypto é uma biblioteca nativa do node que serve para gerar caracteres aleatórios, isso é útil para gerar um nome único para o arquivo
import crypto from 'crypto';

// O path é uma biblioteca nativa do node que serve para lidar com caminhos de arquivos
import { extname, resolve } from 'path';

export default {
    upload(folder: string) {
        return {
            storage: multer.diskStorage({
                destination: resolve(__dirname, '..', '..', folder),
                filename: (request, file, callback) => {
                    const fileHash = crypto.randomBytes(16).toString('hex');
                    const fileName = `${fileHash}-${file.originalname}`;

                    return callback(null, fileName);
                }
            })
        }
    }
}

