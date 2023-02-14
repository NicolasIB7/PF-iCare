var express = require("express");
var router = express.Router();
const PlanController = require("../controllers/planController.js");

/* GET users listing. */

router.get("/", PlanController.getPlans);
router.post("/", PlanController.createPlan);
router.put("/:id", PlanController.editPlan);
router.delete("/:id", PlanController.deletePlan);

module.exports = router;
