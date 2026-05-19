function rng() {
  let result = Math.floor(Math.random() * 100);
  if (result === 0) {
    rng();
  }
  return result;
}

module.exports = {rng}
