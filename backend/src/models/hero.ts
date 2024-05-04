import mongoose from "mongoose";
const Schema = mongoose.Schema;

const heroSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  img: {
    type: Buffer,
    required: true,
  },
  agility: {
    type: Number,
    required: true,
    min: 0,
    max: 10,
  },
  strength: {
    type: Number,
    required: true,
    min: 0,
    max: 10,
  },
  weight: {
    type: Number,
    required: true,
    min: 0,
    max: 10,
  },
  resistance: {
    type: Number,
    required: true,
    min: 0,
    max: 10,
  },
  charm: {
    type: Number,
    required: true,
    min: 0,
    max: 10,
  },
});

const Hero = mongoose.model("Hero", heroSchema);
module.exports = Hero;
