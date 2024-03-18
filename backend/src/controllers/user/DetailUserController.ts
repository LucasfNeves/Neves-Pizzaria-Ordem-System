import {Request, Response} from 'express';
import { DetailUserService } from '../../services/user/DetailUserService';

class DetailUserController {
  async handle(request: Request, response: Response) {
    const { user_id } = request;

    console.log("D do user: ", user_id)

    const detailUserService = new DetailUserService();

    const user = await detailUserService.execute(user_id);

    return response.json(user);
  }
}

export { DetailUserController };