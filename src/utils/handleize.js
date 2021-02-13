// Need to manage handle functions here and in handleize.js
export function handleize(str) {
  return str.toLowerCase().replace(/'/g, "").replace(/[^\w\u00C0-\u024f]+/g, "-").replace(/^-+|-+$/g, "").normalize("NFD").replace(/[\u0300-\u036f]/g, "");
};

export function generateHandle(stamp) {
  /*
    color-YEARfilename
    e.g. monivärinen-18651204
  */
  return handleize(`${stamp.merkin_vari || 'merkki'}-${stamp.ilmestyspaiva.split('.').pop()}${stamp.kuvan_url.split('/').pop().split('.').shift()}`);
}

export default { handleize, generateHandle };
