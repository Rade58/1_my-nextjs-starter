const calculatePaginationNumbers = (
  totalNumberOfItems: number,
  // itemsPerPage: number,
  currentPageNumber: number
) => {
  //
  const first = currentPageNumber === 0 ? null : 0;
  const last =
    totalNumberOfItems - 1 === currentPageNumber
      ? null
      : totalNumberOfItems - 1;
  const next =
    currentPageNumber + 1 > totalNumberOfItems - 1
      ? null
      : currentPageNumber + 1;
  const prev = currentPageNumber - 1 < 0 ? null : currentPageNumber - 1;

  // THIS IS THE IDEA FOR PAGINATION IN TERMS OF UI

  /**
   * @description [<< ,Previous,currentNumPageNumber,Next, >>]
   */
  return [first, prev, currentPageNumber, next, last];
};

export default calculatePaginationNumbers;
