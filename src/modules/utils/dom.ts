export function hasParentElement(
  element: HTMLElement | null,
  target: HTMLElement,
): HTMLElement | null {
  if (!element || element.parentElement === null) {
    return null;
  }

  if (element.parentElement === target) {
    return element.parentElement;
  }

  return hasParentElement(element.parentElement, target);
}
