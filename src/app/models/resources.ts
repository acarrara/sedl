export const yieldOf: (type: string) => number = (type: string) => {
  switch (type) {
    case 'm':
      return 3;
    case 'f':
      return 2;
    case 'p':
      return 4;
    case 'h':
      return 2;
    case 'w':
      return 1;
    default:
      return 0;
  }
};
export const costOf: (type: string) => number = (type: string) => {
  switch (type) {
    case 'm':
      return 16;
    case 'f':
      return 8;
    case 'p':
      return 8;
    case 'h':
      return 12;
    case 'w':
      return 3;
  }
};
