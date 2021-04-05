const express = require("express");
const {
  getBootCamps,
  postBootCamp,

  deleteBootCamp,
  putBootCamp,
  getBootCamp,
} = require("../controllers/bootcamp");

const router = express.Router();

router.route("/").get(getBootCamps).post(postBootCamp);
router.route("/:id").put(putBootCamp).delete(deleteBootCamp).get(getBootCamp);

module.exports = router;
