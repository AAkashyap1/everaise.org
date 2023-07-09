// https://stackoverflow.com/questions/55880196/is-there-a-way-to-easily-check-if-the-image-url-is-valid-or-not/55880263
async function checkImage(url) {
  const res = await fetch(url);
  const buff = await res.blob();

  return buff.type.startsWith('image/');
}

export default checkImage;
