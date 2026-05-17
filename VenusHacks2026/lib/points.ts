let pointBalance = 100;

export function getPointBalance() {
  return pointBalance;
}

export function addPoints(points: number) {
  pointBalance += points;
  return pointBalance;
}

export function setPointBalance(points: number) {
  pointBalance = points;
  return pointBalance;
}
