import React, { Component, createRef } from "react";
import { RoughCanvas } from "roughjs/bin/canvas";
import { RoughGenerator } from "roughjs/bin/generator";
import { Drawable } from "roughjs/bin/core";
import styles from "./Canvas.module.css";
import { createLine } from "../Helpers/CreateLine";
import { getCursorPosition } from "../Helpers/getCursorPosition";
const { wrapper, button } = styles;
interface Line {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  roughElement: Drawable | undefined;
}
interface State {
  ref: null | HTMLCanvasElement;
  rc:
    | null
    | RoughCanvas
    | {
        canvas: HTMLCanvasElement;
        ctx: CanvasRenderingContext2D;
        gen: RoughGenerator;
        draw: any;
      };
  elements: [] | Line[];
  position: [number, number];
  drawing: boolean;
}
export class Canvas extends Component<{}, State> {
  canvasRef = createRef<HTMLCanvasElement>();
  state: State = {
    ref: null,
    rc: null,
    position: [0, 0],
    elements: [],
    drawing: false,
  };
  componentDidMount = () => {
    const ref = this.canvasRef.current;

    if (!ref) return;

    const rc = new RoughCanvas(ref);
    this.setState({ rc, ref });
  };
  componentDidUpdate = (_: {}, prevState: State) => {
    const { elements, rc, ref } = this.state;
    const context = ref?.getContext("2d");

    console.log(
      elements,
      "!===",
      prevState.elements,
      prevState.elements !== elements,
      rc
    );
    if (prevState.elements !== elements) {
      context?.clearRect(0, 0, ref?.width || 0, ref?.height || 0);
      elements.forEach((element) => {
        rc?.draw(element.roughElement);
      });
    }
  };

  hendleClick = (e: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => {
    const { offsetX, offsetY } = e.nativeEvent;
    const { drawing } = this.state;
    if (!drawing) {
      const newLine = createLine(offsetX, offsetY, offsetX, offsetY);

      if (!newLine) return;

      this.setState((prevState) => {
        return { elements: [...prevState.elements, newLine] };
      });
      this.setState({ drawing: true });
    } else {
      this.setState({ drawing: false });
    }
  };
  hendleContextMenu = (e: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => {
    e.preventDefault();
    e.stopPropagation();
    this.setState({ drawing: false, position: [0, 0] });
    return false;
  };
  hendleMouseMove = (e: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => {
    const { drawing, elements } = this.state;
    if (!drawing) return;
    const { offsetX, offsetY } = e.nativeEvent;

    const index = elements.length - 1;
    const { x1, y1 } = elements[index];
    const updatedLine = createLine(x1, y1, offsetX, offsetY);
    const copyLines = [...elements];
    copyLines[index] = updatedLine;
    this.setState((prevState) => {
      return { elements: copyLines };
    });
  };
  render(): React.ReactNode {
    const { hendleClick, hendleMouseMove, hendleContextMenu, canvasRef } = this;
    return (
      <div className={wrapper}>
        <div>
          <canvas
            ref={canvasRef}
            onMouseMove={hendleMouseMove}
            onContextMenu={hendleContextMenu}
            onClick={hendleClick}
          ></canvas>
        </div>
        <button className={button} type="button">
          collapse lines
        </button>
      </div>
    );
  }
}
