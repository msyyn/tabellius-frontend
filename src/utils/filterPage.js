/*
  @array, object      -- array to filter
  @property, string   -- to search for (e.g. asiasanat, merkin_nimi
  @value, string      -- to search with
*/

async function filterPage(array, property, value) {
  value = value.toLowerCase();

  // hack to make search work on taiteilijat / painotalot collections
  let isWrapped = false;
  if (array[0].stamps) { isWrapped = array[0].nimi; array = array[0].stamps; };

  // perform search
  if (property == "all") {
    array = array.filter((res) => {
      if ( 
        (res.asiasanat && res.asiasanat.toLowerCase().includes(value)) || 
        (res.merkin_nimi && res.merkin_nimi.toLowerCase().includes(value)) ||
        (res.merkin_vari && res.merkin_vari.toLowerCase().includes(value)) || 
        (res.taiteilija && res.taiteilija.toLowerCase().includes(value)) || 
        (res.nimi && res.nimi.toLowerCase().includes(value)) || 
        (res.painopaikka && res.painopaikka.toLowerCase().includes(value)) ||
        (res.ilmestyspaiva && res.ilmestyspaiva.includes(value)) ||
        (res.nimellisarvo && res.nimellisarvo.toString().includes(value))
      ) { return res };
    });
  } else {
    array = array.filter((res) => {
      if (res[property] && res[property].toLowerCase().includes(value)) { return res };
    });
  };
  
  // wrap to keep object sturcture correct for taiteilijat / painotalot
  if (isWrapped) { 
    array = {
      nimi: isWrapped,
      stamps: array
    } 
  };

  return array;
};

export default filterPage;