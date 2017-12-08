export default startTime => (data, headers, finishTime = Date.now()) => {
  if (!data || !data.totalItems) {
    throw Error('No results');
  }

  const { items, totalItems } = data;
  const responseTime = finishTime - startTime;

  return {
    items,
    totalItems: Number(totalItems),
    responseTime,
  };
};
