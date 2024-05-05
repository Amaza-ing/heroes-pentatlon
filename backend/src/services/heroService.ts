const sharp = require("sharp");

const resizeImage = async (img: any) => {
  const resizedImgBuf = await sharp(img).resize(128, 128).toBuffer();

  return resizedImgBuf.toString("base64");
};

export { resizeImage };
