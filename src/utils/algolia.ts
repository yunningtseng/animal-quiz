import algoliasearch from 'algoliasearch/lite';

export const searchClient = algoliasearch(
  process.env.REACT_APP_ALGOLIA_APP_ID ?? '',
  process.env.REACT_APP_ALGOLIA_API_KEY ?? '',
);

const chars = 'ㄅㄆㄇㄈㄉㄊㄋㄌㄍㄎㄏㄐㄑㄒㄓㄔㄕㄖㄗㄘㄙㄧㄨㄩㄚㄛㄜㄝㄞㄟㄠㄡㄢㄣㄤㄥㄦ';
const re = new RegExp(chars.split('').join('|'), 'g');
let lastQuery = '';

export const preprocessQuery = (
  query: string,
  search: (value: string) => void,
) => {
  const newQuery = query.replaceAll(re, '');

  if (lastQuery !== newQuery) {
    lastQuery = newQuery;
    search(newQuery);
  }
};
