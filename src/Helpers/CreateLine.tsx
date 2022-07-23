import { RoughGenerator } from "roughjs/bin/generator";
const generator = new RoughGenerator();
export const createLine = (x1: number, y1: number, x2: number, y2: number) => {
  const roughElement = generator.line(x1, y1, x2, y2, {
    strokeWidth: 1,
    bowing: 0,
    fillStyle: "solid",
  });
  return { x1, y1, x2, y2, roughElement };
};
