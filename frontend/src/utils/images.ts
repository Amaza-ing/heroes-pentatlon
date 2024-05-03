const getBase64Img = (img) => {
  const b64 = img.data.reduce(
    (data, byte) => data + String.fromCharCode(byte),
    ""
  );
  const src = `data:image/png;base64,${b64}`;

  return src;
};

export { getBase64Img };
