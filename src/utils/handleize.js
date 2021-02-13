// Need to manage handle functions here and in handleize.js
export function handleize(str) {
  return str.toLowerCase().replace(/'/g, "").replace(/[^\w\u00C0-\u024f]+/g, "-").replace(/^-+|-+$/g, "").normalize("NFD").replace(/[\u0300-\u036f]/g, "");
};

export function generateHandle(stamp) {
  return handleize(`${stamp.merkin_vari}-${stamp.painosmaara}${stamp.nimellisarvo}-${stamp.ilmestyspaiva.split('.').pop()}`)
}

export default { handleize, generateHandle };
