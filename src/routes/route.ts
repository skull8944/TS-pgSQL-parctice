import { Router, Request, Response } from "express";
import { 
  getUsers, getUserByName, createUser, updateUser, deleteUser 
} from "../controllers/controllers";

const router = Router();

router.get('/users', getUsers);
router.get('/users/:name', getUserByName);
router.post('/users', createUser);
router.put('/users/:name', updateUser)
router.delete('/users/:name', deleteUser);

export default router;