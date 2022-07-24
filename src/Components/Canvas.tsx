import React, { Component, createRef } from "react";
import { RoughCanvas } from "roughjs/bin/canvas";
import { RoughGenerator } from "roughjs/bin/generator";
import styles from "./Canvas.module.css";
import { createLine } from "../Helpers/createLine";
import { getCursorPosition } from "../Helpers/getCursorPosition";
import { Element } from "../Interfaces/Element";
import { replaseLastElement } from "../Helpers/replaseLastElement";
import { createDot } from "../Helpers/createDot";
import { redrawCanvas } from "../Helpers/redrawCanvas";
const { wrapper, button } = styles;

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
  elements: [] | Element[];
  drawing: boolean;
}
export class Canvas extends Component<{}, State> {
  canvasRef = createRef<HTMLCanvasElement>();
  state: State = {
    ref: null,
    rc: null,
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
      // rc?.draw(createDot(10, 10));
      // elements.forEach((element) => {
      //   // const interectDot = createDot(element);
      //   // if (interectDot) {
      //   // rc?.draw(interectDot);
      //   // }

      //   rc?.draw(element.roughElement);
      // });
      if (rc) redrawCanvas(elements, rc);
    }
  };

  hendleClick = (e: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => {
    const { drawing, ref } = this.state;
    const { canvasX, canvasY } = getCursorPosition(e, ref);
    if (!drawing) {
      const newLine = createLine(canvasX, canvasY, canvasX, canvasY);

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
    const { elements } = this.state;
    e.preventDefault();
    e.stopPropagation();
    this.setState({
      drawing: false,
      elements: elements.slice(0, elements.length - 1),
    });
    return false;
  };
  hendleMouseMove = (e: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => {
    const { drawing, elements, ref } = this.state;
    if (!drawing) return;
    const { canvasX, canvasY } = getCursorPosition(e, ref);
    const index = elements.length - 1;
    const { x1, y1 } = elements[index];
    const updatedLine = createLine(x1, y1, canvasX, canvasY);
    const newLines = replaseLastElement(elements, updatedLine);

    this.setState({ elements: newLines });
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
