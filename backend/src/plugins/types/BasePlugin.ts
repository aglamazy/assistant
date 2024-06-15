import { Router } from 'express';

export abstract class BasePlugin {
    public router: Router;
    abstract route: string;

    constructor() {
        this.router = Router();
        this.initRoutes();
    }

    // Abstract method for initializing routes, to be implemented by subclasses
    protected abstract initRoutes(): void;
}
