import { Request, Response } from 'express';
import { AuthBusiness } from '../business/authBusiness';

export class AuthController {
    private authBusiness = new AuthBusiness();

    public login = async (req: Request, res: Response) => {
        try {
            const { email, password } = req.body;
            const result = await this.authBusiness.login({ email, senha });
            res.status(200).send(result);
        } catch (error: any) {
            res.status(400).send({ error: error.message });
        }
    };
}