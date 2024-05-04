const { sign } = require("jsonwebtoken");

const Hero = require("../models/hero");
const fs = require("fs");

const getToken = async (req, res) => {
  const jsontoken = sign({ token: process.env.TOKEN }, process.env.SECRET_KEY, {
    expiresIn: "1d",
    algorithm: "HS512",
  });

  res.status(200).json(jsontoken);
};

const getHeroes = async (req, res) => {
  try {
    const heroes = await Hero.find();
    res.send(heroes);
  } catch (error) {
    res.status(400).send(error);
  }
};

const getHero = async (req, res) => {
  const name = req.params.name;

  try {
    const hero = await Hero.find({ name: name });
    res.send(hero);
  } catch (error) {
    res.status(404).send(error);
  }
};

const postHero = async (req, res) => {
  const img = fs.readFileSync(req.file.path, "base64");
  const body = { ...req.body, img}
  const hero = new Hero(body);

  try {
    await hero.save();
    res.status(200).json(hero);
  } catch (error) {
    res.status(400).send(error);
  }
};

const putHero = async (req, res) => {
  const id = req.params.id;

  try {
    await Hero.findByIdAndUpdate(id, req.body);
    res.send(req.body);
  } catch (error) {
    res.status(404).send(error);
  }
};

const deleteHero = async (req, res) => {
  const id = req.params.id;

  try {
    await Hero.findByIdAndDelete(id);
    res.json({ msg: "Hero deleted" });
  } catch (error) {
    res.status(404).send(error);
  }
};

module.exports = {
  getToken,
  getHeroes,
  getHero,
  postHero,
  putHero,
  deleteHero,
};
