import express from 'express';
import bodyParser from 'body-parser';
import {authRouter} from "./routers/authRouter";

const app = express();
const PORT = 3000;

app.use(bodyParser.json());

app.use('/auth', authRouter);

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
