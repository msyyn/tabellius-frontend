<script>
  import { goto } from '@sapper/app';
  import Dropdown from './Dropdown.svelte';
  import paginate from '../utils/paginate.js';
  import sortBy from '../utils/sortBy.js';
  export let page;

  // Color sorting
  let sortColor = page.currentParams.merkin_vari || 'Näytä kaikki';
  let allColors = [];
  let colorOptions = ['Näytä kaikki'];

  /*
    let's manipulate the colors data a bit.
    sort it by most items to least items.

    then remove the ones with double color, ie contains the / symbol or 
    color name is combined from two other colors
  */
  page.data.forEach((item) => {
    item.merkin_vari = item.merkin_vari ? item.merkin_vari : 'monivärinen'
    let colorIndex = allColors.findIndex(a => a.merkin_vari == item.merkin_vari);
    if (colorIndex < 0) { allColors.push({ merkin_vari: item.merkin_vari, count: 1 })
    } else { allColors[colorIndex].count = allColors[colorIndex].count + 1 };
  });
  allColors = allColors.sort((a,b) => (a.count > b.count) ? -1 : ((b.count > a.count) ? 1 : 0))
  allColors = allColors.filter(a => a.merkin_vari.includes('/') == false);
  allColors.forEach((item) => {
    let colorIndex = colorOptions.findIndex(a => item.merkin_vari.toLowerCase().includes(a.toLowerCase()));
    if (colorIndex < 0) { colorOptions.push(item.merkin_vari) };
  });

  const updateSortColor = (evt, bubbled, initial) => {
    sortColor = evt.detail ? evt.detail.value : evt;

    let sortedResults;

    // refresh cache if needed
    if (page.dataCache.length == 0) {
      page.dataCache = page.data;
    };

    // clear removals, reset master data to cache¨
    if (sortColor == 'Näytä kaikki') {
      delete page.currentParams.merkin_vari;

      // refresh cache if needed
      if (page.dataCache.length > 0) {
        page.data = page.dataCache;
      };
        
      if (sortOrder__prop) {
        page.data = sortBy(page.data, sortOrder__prop, sortOrder__desc);
        page.visibleData = paginate(page.data, page.paginateBy, 1);
      } else {
        page.visibleData = paginate(page.data, page.paginateBy, 1);
      };

      page.suggestedPage = 1;
      page.currentPage = 1;
      page.currentParams.page = 1;
      let urlQuery = new URLSearchParams(page.currentParams);
      goto(`${page.currentPath}?${urlQuery}`);
      return;
    }; 

    // if we are sorting the order, let's apply it before color filtering.
    if (!bubbled && sortOrder__prop) {sortedResults = sortBy(page.data, sortOrder__prop, sortOrder__desc)};

    page.data = page.dataCache.filter(a => a.merkin_vari.includes(sortColor));

    if (!bubbled) {
      page.suggestedPage = 1;
      page.currentPage = 1;
      page.currentParams.page = 1;
      page.currentParams.merkin_vari = sortColor;
      page.visibleData = paginate(page.data, page.paginateBy, 1);
      delete page.currentParams.search; // reset search on filtering
      page.currentQuery = ''; // reset search on filtering

      let urlQuery = new URLSearchParams(page.currentParams);
      goto(`${page.currentPath}?${urlQuery}`);
    } else {
      page.visibleData = paginate(page.data, page.paginateBy, page.currentParams.page);
    };
  };

  // Basic sorting
  let sortOrder = 'Vaihda näkymän järjestystä';
  let sortOrder__desc = page.currentParams.descending;
  let sortOrder__prop = page.currentParams.sortBy;

  let sortOptions = 
  [
    { key: 'ilmestyspaiva', desc: true, value: 'Vanhimmasta uusimpaan' },
    { key: 'ilmestyspaiva', desc: false, value: 'Uusimmasta vanhimaan' },
    { key: 'merkin_nimi', desc: true, value: 'Merkin nimi (A-Z)' },
    { key: 'merkin_nimi', desc: false, value: 'Merkin nimi (Z-A)' },
    { key: 'taiteilija', desc: true, value: 'Taiteilijan nimi (A-Z)' },
    { key: 'taiteilija', desc: false, value: 'Taiteilijan nimi (Z-A)' }
  ];
  let visibleSortOptions = []; // set empty array for our dropdown's visible values
  sortOptions.forEach((o) => { visibleSortOptions.push(o.value) }); // push the values

  const updateSortOrder = (evt, bubbled) => {
    sortOrder = evt.detail ? evt.detail.value : evt;

    let desiredOptions = sortOptions.filter(s => (s.value == sortOrder || s.key == sortOrder));
    sortOrder = desiredOptions[0].value;
    sortOrder__prop = desiredOptions[0].key;
    if (!bubbled) {
      sortOrder__desc = desiredOptions[0].desc;
    } else {
      sortOrder__desc = sortOrder__desc == 'true' ? true : false;
    };

    let sortedResults;
    if (page.dataCache.length > 0) {
      sortedResults = sortBy(page.dataCache, sortOrder__prop, sortOrder__desc);
    } else {
      sortedResults = sortBy(page.data, sortOrder__prop, sortOrder__desc);
    }
    page.visibleData = paginate(sortedResults, page.paginateBy, 1);

    if (sortColor != 'Näytä kaikki' && !bubbled) {
      updateSortColor(sortColor, true);
      page.currentParams.merkin_vari = sortColor;
    };

    if (!bubbled) {
      page.suggestedPage = 1;
      page.currentPage = 1;
      page.currentParams.page = 1;
      page.currentParams.sortBy = sortOrder__prop;
      page.currentParams.descending = sortOrder__desc;
      delete page.currentParams.search; // reset search on filtering
      page.currentQuery = ''; // reset search on filtering
      
      let urlQuery = new URLSearchParams(page.currentParams);
      goto(`${page.currentPath}?${urlQuery}`);
    }
  };

  // load filters on fresh page load, if url params request it.
  if (page.currentParams.sortBy) {updateSortOrder(page.currentParams.sortBy, true)};
  if (page.currentParams.merkin_vari) {updateSortColor(page.currentParams.merkin_vari, true)};
</script>

<div class="-mt-1 lg:mt-0 mb-4 flex flex-wrap flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-4">
  <Dropdown 
    label="Järjestä"
    bind:value={sortOrder}
    on:select={updateSortOrder}
    options={visibleSortOptions}
    placeholder={sortOrder}>
  </Dropdown>

  <Dropdown 
    label="Värin mukaan"
    bind:value={sortColor}
    on:select={updateSortColor}
    options={colorOptions}
    placeholder={sortColor}>
  </Dropdown>
</div>