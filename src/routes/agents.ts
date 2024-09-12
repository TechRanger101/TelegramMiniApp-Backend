import { Router } from 'express'
import {agentsList, agentCreate, agentsPair, agentUpgrade} from "../controllers";
import {authenticate, agentPairValidate, agentCreateValidate} from "../middlewares";
const agentRouter = Router();

agentRouter.get("/list", authenticate, agentsList);
agentRouter.post("/create", authenticate, agentCreateValidate, agentCreate);
agentRouter.post("/pair", authenticate, agentPairValidate,agentsPair);
agentRouter.post("/upgrade", authenticate, agentPairValidate,agentUpgrade);

export default agentRouter;