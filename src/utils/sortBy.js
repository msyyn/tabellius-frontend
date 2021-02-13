/*
  @array, object      -- array to filter
  @prop, string   -- to search for (e.g. asiasanat, merkin_nimi
  @desc, boolean      -- descending (true) or ascending (false)
*/

function sortBy(array, prop, desc) {
  // Modifier to sorting function for ascending or descending
  let sortModifier = desc ? 1 : -1;
  
  let compare = (a, b) => 
    (a[prop] < b[prop]) 
    ? -1 * sortModifier 
    : (a[prop] > b[prop]) 
    ? 1 * sortModifier 
    : 0;

  const sortedData = array.sort(compare);
  return sortedData;
}

export default sortBy;