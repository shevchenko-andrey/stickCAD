import React from "react";
import styles from "./Canvas.module.css";
const { wrapper, button } = styles;
export const Canvas = () => {
  return (
    <div className={wrapper}>
      <div>
        <canvas></canvas>
      </div>
      <button className={button} type="button">
        collapse lines
      </button>
    </div>
  );
};
