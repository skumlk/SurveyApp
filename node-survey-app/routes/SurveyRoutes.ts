import * as express from "express";
import SurveyController from "../controllers/SurveyController";
import auth from "../middlwares/auth"

const router = express.Router();

router.post("/create", auth, SurveyController.createSurvey)
router.get("/view/all", SurveyController.viewAllSurveys)
router.get("/view/me", auth, SurveyController.viewMySurveys)
router.get("/view/:id", SurveyController.viewSurvey)

export default router