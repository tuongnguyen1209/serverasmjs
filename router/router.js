const express = require("express");
const controller = require("./../controller/index");

const router = express.Router();

router.route("/getdata").get(controller.getMusic);

router.route("/music/:id").get(controller.getMusicInfo);
router.route("/topmusic").get(controller.topMusic);

module.exports = router;
