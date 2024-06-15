import {BasePlugin} from "./types/BasePlugin";

export class Amadeus extends BasePlugin {
    route = "amadeus";
    protected initRoutes(): void {
        console.log("init amadeus")
        this.router.use((req, res, next) => {
            console.log('SamplePlugin is working');
            next();
        });

        this.router.get('/hello', (req, res) => {
            res.send('Hello from SamplePlugin!');
        });
    }
}
