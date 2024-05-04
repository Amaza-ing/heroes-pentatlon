const getBase64Img = (img: any) => {
  const b64 = img.data.reduce(
    (data: string, byte: any) => data + String.fromCharCode(byte),
    ""
  );
  const src = `data:image/png;base64,${b64}`;

  return src;
};

export { getBase64Img };
