export const findIntersectDots = (
  x1: number,
  y1: number,
  x2: number,
  y2: number,
  x3: number,
  y3: number,
  x4: number,
  y4: number
) => {
  //a(x)*k+b(x)*n=c(x)
  //a(y)*k+b(y)*n=c(y)
  let n;
  const dot = [];
  if (y2 - y1 !== 0) {
    // a(y)
    let q = (x2 - x1) / (y1 - y2);
    let sn = x3 - x4 + (y3 - y4) * q;
    if (!sn) {
      return;
    } // c(x) + c(y)*q
    let fn = x3 - x1 + (y3 - y1) * q; // b(x) + b(y)*q
    n = fn / sn;
  } else {
    if (!(y3 - y4)) {
      return;
    } // b(y)
    n = (y3 - y1) / (y3 - y4); // c(y)/b(y)
  }
  dot[0] = x3 + (x4 - x3) * n; // x3 + (-b(x))*n
  dot[1] = y3 + (y4 - y3) * n; // y3 +(-b(y))*n
  return dot;
};
