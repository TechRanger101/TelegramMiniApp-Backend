import { Router } from 'express'
import { assignJob,unassignJob, assignAgent } from "../controllers";
import {authenticate, jobValidate, agentValidate} from "../middlewares";
const workForceRouter = Router();

// workForceRouter.get("/agentjobboard", authenticate, agentJobBoard);
workForceRouter.post("/assignjob", authenticate, agentValidate, jobValidate, assignJob);
workForceRouter.post("/unassignjob", authenticate,agentValidate, jobValidate, unassignJob);
workForceRouter.post("/assignagent", authenticate,agentValidate, jobValidate, assignAgent);
// workForceRouter.post("/buygpu", authenticate, buyGpu);
// workForceRouter.post("/buydata", authenticate, buyData);

export default workForceRouter;