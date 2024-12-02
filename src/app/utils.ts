export const createKey = (string: string) => {
  return string.replace(" ", "-").toLowerCase();
};
