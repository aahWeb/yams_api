import express, { Router } from "express";
import pastrie from "./pastrie";
import user from "./user";
import auth from "./auth";
import game from "./game";

const router: Router = express();

router.use("/pastries", pastrie);
router.use("/users", user);
router.use("/auth", auth);
router.use('/game', game);

export default router;