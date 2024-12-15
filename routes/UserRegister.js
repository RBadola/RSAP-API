import { Router } from "express";
import UserRegistration from "../controllers/UserRegistration.js";

const router = Router()

router.post('/',UserRegistration)

export default router;