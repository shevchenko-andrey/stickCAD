import { Element } from "../Interfaces/Element";
export const replaseLastElement = (
  elements: Element[],
  newElement: Element
) => {
  const index = elements.length - 1;
  const copyElements = [...elements];
  copyElements[index] = newElement;
  return copyElements;
};
