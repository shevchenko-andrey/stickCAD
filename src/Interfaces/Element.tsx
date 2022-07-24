import { Drawable } from "roughjs/bin/core";
export interface Element {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  roughElement: Drawable | undefined;
}
export interface Dot {
  x1: number;
  y1: number;
  roughElement: Drawable;
}
