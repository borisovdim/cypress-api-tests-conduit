export function getRandomNumber() {
  const min = 1000;
  const max = 9999;
  return Math.round(Math.random() * (max - min)) + min;
}