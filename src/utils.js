export const getSearch = () => window.location.search ?
  Object.fromEntries(window.location
  .search
  .slice(1)
  .split('&')
    .map(clause => clause.split("="))) :
  {};

export const updateSearch = (key, value) => {
  const search = getSearch();
  const newSearch = { ...search, [key]: value };
  const formattedSearch = Object.toEntries(newSearch)
    .map(entry => entry.join('='))
    .join('&');

  window.location.search = `?${formattedSearch}`;
};
