import React, { Component, createRef } from "react";
import styles from "./Canvas.module.css";
const { wrapper, button } = styles;
interface State {
  ref: null | HTMLCanvasElement;
  ctx: null | CanvasRenderingContext2D;
  elements: null | number[];
  drawing: boolean;
}
export class Canvas extends Component<{}, State> {
  BIAS_X = 136;
  BIAS_Y = 64 + 27;
  canvasRef = createRef<HTMLCanvasElement>();
  state: State = {
    ref: null,
    ctx: null,
    elements: null,
    drawing: false,
  };
  componentDidMount = () => {
    const ref = this.canvasRef.current;
    if (!ref) return;
    this.setState({ ref });
  };
  componentDidUpdate = () => {
    const { ctx, ref } = this.state;
    if (ctx === null && ref !== null) {
      const ctx = ref.getContext("2d");
      this.setState({ ctx });
    }
  };

  hendleClick = (e: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => {
    this.setState(() => {
      return { drawing: !this.state.drawing };
    });
  };
  hendleContextMenu = (e: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => {
    e.preventDefault();
    e.stopPropagation();
    this.setState({ drawing: false });
    return false;
  };
  hendleMouseMove = (e: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => {
    const { BIAS_X, BIAS_Y, state } = this;
    if (!state.drawing) return;
    const { clientX, clientY } = e;
    console.log(clientX - BIAS_X, clientY - BIAS_Y);
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
