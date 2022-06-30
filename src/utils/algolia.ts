import algoliasearch from 'algoliasearch/lite';

export const searchClient = algoliasearch(
  process.env.REACT_APP_ALGOLIA_APP_ID ?? '',
  process.env.REACT_APP_ALGOLIA_API_KEY ?? '',
);

// * 'ㄅㄆㄇ' -> ['ㄅ', 'ㄆ', 'ㄇ'] -> 'ㄅ|ㄆ|ㄇ'
const chars = 'ㄅㄆㄇㄈㄉㄊㄋㄌㄍㄎㄏㄐㄑㄒㄓㄔㄕㄖㄗㄘㄙㄧㄨㄩㄚㄛㄜㄝㄞㄟㄠㄡㄢㄣㄤㄥㄦ';
// * 'g' Global search flag
const re = new RegExp(chars.split('').join('|'), 'g');
let lastQuery = '';

// > 去掉注音符號，並控制何時搜尋
export const preprocessQuery = (
  query: string,
  // * 觸發 algolia 搜尋
  search: (value: string) => void,
) => {
  const newQuery = query.replaceAll(re, '');

  if (lastQuery !== newQuery) {
    lastQuery = newQuery;
    search(newQuery);
  }
};
