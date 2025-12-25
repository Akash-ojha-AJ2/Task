import express from 'express'
const router = express.Router();
import UserController from '../Controller/UserController.js';

router.post("/register" , UserController.register);
router.post("/login", UserController.Login);
router.post("/refreshtoken", UserController.refreshTok);

export default router