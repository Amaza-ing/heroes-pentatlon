import { RequestHandler } from "express";

const { sign } = require("jsonwebtoken");

const Hero = require("../models/hero");
const fs = require("fs");

const getToken: RequestHandler = async (req, res) => {
  const jsontoken = sign({ token: process.env.TOKEN }, process.env.SECRET_KEY, {
    expiresIn: "1d",
    algorithm: "HS512",
  });

  res.status(200).json(jsontoken);
};

const getHeroes: RequestHandler = async (req, res) => {
  try {
    const heroes = await Hero.find();
    res.send(heroes);
  } catch (error) {
    res.status(400).send(error);
  }
};

const getHero: RequestHandler = async (req, res) => {
  const name = req.params.name;

  try {
    const hero = await Hero.find({ name: name });
    res.send(hero);
  } catch (error) {
    res.status(404).send(error);
  }
};

const postHero: RequestHandler = async (req: any, res) => {
  try {
    const img = fs.readFileSync(req.file.path, "base64");
    const body = { ...req.body, img };
    const hero = new Hero(body);

    await hero.save();
    fs.unlink(req.file.path, () => {});
    res.status(201).json(hero);
  } catch (error) {
    res.status(400).send(error);
  }
};

const putHero: RequestHandler = async (req, res) => {
  const id = req.params.id;

  try {
    await Hero.findByIdAndUpdate(id, req.body);
    res.send(req.body);
  } catch (error) {
    res.status(404).send(error);
  }
};

const deleteHero: RequestHandler = async (req, res) => {
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
