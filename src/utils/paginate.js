/*
  @array, string      -- array to paginate
  @page_size, int     -- size of single page
  @page_number, int   -- number of page
*/

function paginate(array, page_size, page_number) {
  // human-readable page numbers usually start with 1, so we reduce 1 in the first argument
  return array.slice((page_number - 1) * page_size, page_number * page_size);
};

export default paginate;