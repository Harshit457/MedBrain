
import  express from "express";
import {createPrescription,getAllPrescriptions, updatePrescriptionById,deletePrescriptionById} from "../controllers/pres.controllers.js";
const router = express.Router();
import { protectRoute } from "../middlewares/auth.middleware.js";

router.post('/prescriptions',protectRoute, createPrescription);
router.get('/prescriptions',protectRoute, getAllPrescriptions);
router.put('/prescriptions/:id',protectRoute, updatePrescriptionById);
router.delete('/prescriptions/:id',protectRoute, deletePrescriptionById);

export default router;