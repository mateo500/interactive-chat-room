/* eslint-disable @typescript-eslint/no-array-constructor */
/* eslint-disable no-useless-return */
/* eslint-disable no-restricted-properties*/
export function noop(): void {
  return;
}

export function distanceBetweenElements(
  elementOne: HTMLElement,
  elementTwo: HTMLElement
): number {
  const element1 = elementOne.getBoundingClientRect();
  const element2 = elementTwo.getBoundingClientRect();

  const distanceSquared =
    Math.pow(element1.x - element2.x, 2) + Math.pow(element1.y - element2.y, 2);

  return Math.sqrt(distanceSquared);
}

export function getRandomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min)) + min;
}

export const getClosestVisibleElementsSortedByDistance = (
  userName: string
): {
  elementId: string;
  distance: number;
}[] => {
  const selfElement = document.querySelector(`#selector-dragabble-${userName}`);

  if (!selfElement) return [];

  const elements = document.getElementsByClassName("handle react-draggable");

  const elementsWithDistance: {
    elementId: string;
    distance: number;
  }[] = [];

  new Array().forEach.call(elements, (element: HTMLElement) => {
    if (element.id !== selfElement.id) {
      elementsWithDistance.push({
        elementId: element.id,
        distance: distanceBetweenElements(selfElement as HTMLElement, element),
      });
    }
  });

  elementsWithDistance.sort((a, b) => {
    if (a.distance < b.distance) {
      return -1;
    }

    if (a.distance > b.distance) {
      return 1;
    }

    return 0;
  });

  return elementsWithDistance;
};

export const cleanWhiteSpacesInString = (str: string): string =>
  str.replace(/\s/g, "");
