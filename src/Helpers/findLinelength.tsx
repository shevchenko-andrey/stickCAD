export const findlineLength = (
  x1: number,
  y1: number,
  x2: number,
  y2: number
) => {
  const deltaXSquare = (x2 - x1) ** 2;
  const deltaYSquare = (y2 - y1) ** 2;
  //   const maxNumber = Math.max(x, y);
  //   const minNumber = Math.min(x, y);
  //   return maxNumber - minNumber;

  return Math.sqrt(deltaXSquare + deltaYSquare);
};
