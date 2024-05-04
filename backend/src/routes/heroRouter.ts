const router = require("express").Router();
const heroController = require("../controllers/heroController");
const passport = require("passport");

const multer = require("multer");
const upload = multer({ dest: "./public/tmp/" });

/**
 * @openapi
 * components:
 *   schemas:
 *     heroSchema:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           description: The hero id.
 *           example: 66342145a49e82b53e530ac1
 *         name:
 *           type: string
 *           description: The hero name.
 *           example: Superman
 *         img:
 *           type: object
 *           description: The image for the hero.
 *           example: {
 *             type: Buffer,
 *             data: []
 *           }
 *         agility:
 *           type: number
 *           description: The hero agility.
 *           example: 8
 *         strength:
 *           type: number
 *           description: The hero strength.
 *           example: 8
 *         weight:
 *           type: number
 *           description: The hero weight.
 *           example: 8
 *         resistance:
 *           type: number
 *           description: The hero resistance.
 *           example: 8
 *         charm:
 *           type: number
 *           description: The hero charm.
 *           example: 8
 */

/**
 * @openapi
 * /heroes/token:
 *   get:
 *     summary: Retrieve a token.
 *     description: Retrieve a token.
 *     tags:
 *      - heroes
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: A token.
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               example: eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6Ik1ZU1BFQ0lBTFRPS0VOIiwiaWF0IjoxNzE0ODIzOTI5LCJleHAiOjE3MTQ5MTAzMjl9.EOzFwSBQPfj73wn5Eh2SGbaNKqWwlY37HiFdC0Jz9rSNJmZeh6aBBL8K5zmtV3nYP_PPjcKMHXVhzkt04-5Y-A
 *
 */
router.get("/token", heroController.getToken);

/**
 * @openapi
 * /heroes:
 *   get:
 *     summary: Retrieve a list of heroes.
 *     description: Retrieve a list of all heroes.
 *     tags:
 *      - heroes
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: A list of heroes.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/heroSchema'
 */
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  heroController.getHeroes
);

/**
 * @openapi
 * /heroes/{name}:
 *   get:
 *     summary: Retrieve a single hero.
 *     description: Retrieve a single hero.
 *     tags:
 *      - heroes
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: name
 *         required: true
 *         description: Name of the hero to retrieve.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A single hero.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               $ref: '#/components/schemas/heroSchema'
 */
router.get(
  "/:name",
  passport.authenticate("jwt", { session: false }),
  heroController.getHero
);

/**
 * @openapi
 * /heroes:
 *   post:
 *     summary: create a new hero, you don't need to pass the _id on the body.
 *     description: create a new hero.
 *     tags:
 *      - heroes
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             properties:
 *             $ref: '#/components/schemas/heroSchema'
 *     responses:
 *       201:
 *         description: Create a new hero.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               $ref: '#/components/schemas/heroSchema'
 */
router.post(
  "/",
  upload.single("img"),
  passport.authenticate("jwt", { session: false }),
  heroController.postHero
);

/**
 * @openapi
 * /heroes/{id}:
 *   put:
 *     summary: Update a hero, you don't need to pass the _id on the body.
 *     description: Update a hero.
 *     tags:
 *      - heroes
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: _id
 *         required: true
 *         description: Id of the hero to update.
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             properties:
 *             $ref: '#/components/schemas/heroSchema'
 *     responses:
 *       201:
 *         description: Update a hero.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               $ref: '#/components/schemas/heroSchema'
 */
router.put(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  heroController.putHero
);

/**
 * @openapi
 * /heroes/{name}:
 *   delete:
 *     summary: Delete a single hero.
 *     description: Delete a single hero.
 *     tags:
 *      - heroes
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: _id
 *         required: true
 *         description: id of the hero to delete.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A single hero.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               $ref: '#/components/schemas/heroSchema'
 */
router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  heroController.deleteHero
);

module.exports = router;
