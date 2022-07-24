export const getCursorPosition = (
  event: React.MouseEvent<HTMLCanvasElement, MouseEvent>,
  ref: HTMLCanvasElement | null
) => {
  let totalOffsetX = 0;
  let totalOffsetY = 0;
  let canvasX = 0;
  let canvasY = 0;
  if (!ref) return { canvasX, canvasY };
  var currentElement = ref;

  do {
    totalOffsetX += currentElement.offsetLeft;
    totalOffsetY += currentElement.offsetTop;
  } while (currentElement === currentElement.offsetParent);

  canvasX = event.pageX - totalOffsetX;
  canvasY = event.pageY - totalOffsetY;

  // Fix for variable canvas width
  canvasX = Math.round(canvasX * (ref.width / ref.offsetWidth));
  canvasY = Math.round(canvasY * (ref.height / ref.offsetHeight));

  return { canvasX, canvasY };
};
