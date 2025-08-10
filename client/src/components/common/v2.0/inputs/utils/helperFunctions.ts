export const charCounterValidator = (
  text: string,
  minLength: number,
  maxLength: number
): boolean => {
  if (text.length < minLength || text.length > maxLength) {
    return false;
  }
  return true;
};
