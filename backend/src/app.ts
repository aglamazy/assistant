import express from 'express';
import bodyParser from 'body-parser';
import authRouter from "./routers/authRouter";
import {db} from "./models/database";
import cors from "cors";
import requestLogger from "./utils/requestLogger";
import morganLogger from "./utils/morganLogger";

const app = express();
const port = 3010;

app.use(bodyParser.json());
app.use(cors());

app.use('/auth', authRouter);
app.use(requestLogger); // Log when api starts
app.use(morganLogger);  // Log at the end.

async function checkDatabaseConnection(): Promise<boolean> {
    try {
        const result = await db.raw('SELECT NOW()');
        console.log("Successfully connected to the database.");
        console.log("Current Date and Time:", result.rows[0].now);
        return true;
    } catch (error) {
        console.error("Failed to connect to the database:", error);
        return false;
    }
}

async function startServer() {
    if (await checkDatabaseConnection()) {
        app.listen(port, () => {
            console.log(`Server running on http://localhost:${port}`);
        });
    } else {
        console.log("Server not started due to database connection failure.");
    }
}

startServer();
