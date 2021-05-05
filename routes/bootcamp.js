const express = require("express");
const {
  getBootCamps,
  createBootCamp,

  deleteBootCamp,
  updateBootCamp,
  getBootCamp,
  getBootCampInRadius
} = require("../controllers/bootcamp");

const router = express.Router();
router.route("/radius/:zipcode/:distance").get(getBootCampInRadius);

router.route("/").get(getBootCamps).post(createBootCamp);
router
  .route("/:id")
  .put(updateBootCamp)
  .delete(deleteBootCamp)
  .get(getBootCamp);

module.exports = router;
