export const getRadius = (relation, radius) => {
  const stroke = (2 * Math.PI * radius).toFixed();
  const offset = +((1 - relation) * stroke).toFixed();
  return {stroke, offset};
};
