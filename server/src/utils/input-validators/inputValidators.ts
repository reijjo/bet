export const sanitazeValue = (value: string): string => {
  return value.trim().toLowerCase();
};

export const hasMinMaxLength = (
  value: string,
  min: number,
  max: number,
): boolean => {
  const length = value.trim().length;
  return length >= min && length <= max;
};
