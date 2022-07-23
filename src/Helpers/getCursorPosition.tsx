export const getCursorPosition = (ref: any, event: any) => {
  const rect = ref.getBoundingClientRect();
  const x = event.clientX - rect.left;
  var y = event.clientY - rect.top;
  return [x, y];
};
