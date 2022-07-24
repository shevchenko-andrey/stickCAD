import { Element, Dot } from "../Interfaces/Element";
import { RoughGenerator } from "roughjs/bin/generator";
import { RoughCanvas } from "roughjs/bin/canvas";
import { findIntersectDots } from "../Helpers/findIntersectDots";
import { createDot } from "./createDot";
export const redrawCanvas = (
  elements: Element[],
  rc:
    | RoughCanvas
    | {
        canvas: HTMLCanvasElement;
        ctx: CanvasRenderingContext2D;
        gen: RoughGenerator;
        draw: any;
      }
) => {
  const intersectDots: Set<Dot> = new Set();

  elements.forEach((element) => {
    for (const item of elements) {
      if (element === item) {
        continue;
      }

      const { x1, x2, y1, y2 } = item;
      const dot = findIntersectDots(
        x1,
        y1,
        x2,
        y2,
        element.x1,
        element.y1,
        element.x2,
        element.y2
      );
      if (!dot) {
        continue;
      }
      const [dotX, dotY] = dot;
      const dotElement = createDot(dotX, dotY);
      intersectDots.add(dotElement);
    }
  });

  let newElements = [...Array.from(intersectDots), ...elements];

  newElements.forEach((element) => {
    rc.draw(element.roughElement);
  });
};
