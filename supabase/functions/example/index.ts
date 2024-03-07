import express from "express";
import { Request, Response } from "expressTypes";
import { AuthMiddleware, preFlightMiddleware } from "../_shared/express_utils.ts";

import { dbClient } from "../_shared/db.ts";

const app = express();

app.use(express.json());
app.use(preFlightMiddleware);
app.use(AuthMiddleware);
app.locals.db = dbClient;



app.get("/api/v1/health", (_req: Request, res: Response) => {
    res.status(200).send("OK");
    }); 



app.listen();
