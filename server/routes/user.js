import express from "express";
const router = express.Router();

import { signin, signup, verify } from "../controllers/user.js";

router.post("/signin", signin);
router.post("/signup", signup);
//export const verify = (id) => API.patch(`/user/verify/${id}`)
//export const getVerify = (id) => API.get(`/user/getVerify/${id}`);
router.patch('/verify', verify);
//router.get('/getVerify/:id', getVerify);
export default router;