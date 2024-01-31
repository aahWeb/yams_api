import express, { Router } from "express";
import pastry from "./pastry";
import user from "./user";
import auth from "./auth";
import game from "./game";

const router: Router = express();

router.use("/api", pastry);
router.use("/user", user);
router.use("/auth", auth);
router.use('/game', game);

export default router;