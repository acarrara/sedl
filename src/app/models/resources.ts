export const worthOf: (type: string) => number = (type: string) => {
  switch (type) {
    case 'm':
      return 3;
    case 'f':
      return 2;
    case 'p':
      return 1;
    case 'h':
      return 1;
    case 'w':
      return 1;
    case 's':
      return 0;
    default:
      return 0;
  }
};
export const costOf: (type: string) => number = (type: string) => {
  switch (type) {
    case 'm':
      return 10;
    case 'f':
      return 8;
    case 'p':
      return 4;
    case 'h':
      return 6;
    case 'w':
      return 6;
    case 's':
      return 0;
    default:
      return 0;
  }
};
export const sustenanceOf: (type: string) => number = (type: string) => {
  if (type === 's') {
    return 4;
  } else {
    return costOf(type);
  }
};
