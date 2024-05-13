import { Router, Request, Response } from 'express';

export const authRouter = Router();

authRouter.post('/login', (req: Request, res: Response) => {
    const { username, password } = req.body;
    if (username === 'admin' && password === 'admin') {
        res.send('Login successful');
    } else {
        res.status(401).send('Unauthorized');
    }
});
