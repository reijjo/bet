export const useParsers = () => {
  const parseDate = (date: Date) => {
    return new Date(date).toISOString().split("T")[0];
  };

  return {
    parseDate,
  };
};
