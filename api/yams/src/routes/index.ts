import express, { Router } from "express";

import pastrie from "./pastrie";
import user from "./user";
import auth from "./auth";

const router: Router = express.Router();

router.use("/api", [ pastrie, user, auth ]);

export default router;