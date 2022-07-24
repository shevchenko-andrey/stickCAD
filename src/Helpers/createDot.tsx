import { RoughGenerator } from "roughjs/bin/generator";
const generator = new RoughGenerator();
export const createDot = (x1: number, y1: number) => {
  const roughElement = generator.circle(x1, y1, 5, {
    fill: "red",
    stroke: "red",
    fillStyle: "solid",
  });
  return { x1, y1, roughElement };
};
