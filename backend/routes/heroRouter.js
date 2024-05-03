const router = require("express").Router();
const heroController = require("../controllers/heroController");
const passport = require("passport");

const multer = require("multer");
const upload = multer({ dest: "./public/tmp/" });

router.post("/testUpload", upload.single("myFile"), heroController.testUpload);

router.get("/token", heroController.getToken);

router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  heroController.getHeroes
);
router.get(
  "/:name",
  passport.authenticate("jwt", { session: false }),
  heroController.getHero
);
router.post(
  "/",
  upload.single("img"),
  passport.authenticate("jwt", { session: false }),
  heroController.postHero
);
router.put(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  heroController.putHero
);
router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  heroController.deleteHero
);

module.exports = router;
