import { useEffect, useRef, useState } from 'react';
import { useSearchBox } from 'react-instantsearch-hooks-web';
import { preprocessQuery } from '../../utils/algolia';

function SearchAnimalBox() {
  // * query: 上一次 query 的東西，refine: 觸發搜尋，queryHook: 觸發搜尋的前處理，並控制是否要搜尋
  const { query, refine } = useSearchBox({ queryHook: preprocessQuery });
  // * value: 現在輸入要搜尋的文字
  const [value, setValue] = useState(query);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (query !== value) {
      refine(value);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, refine]);

  useEffect(() => {
    // We bypass the state update if the input is focused to avoid concurrent
    // updates when typing.
    if (document.activeElement !== inputRef.current && query !== value) {
      setValue(query);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  function onChange(e: React.ChangeEvent<HTMLInputElement>) {
    setValue(e.currentTarget.value);
  }

  return (
    <input
      className="w-full p-3 border rounded-lg focus:outline-none"
      ref={inputRef}
      type="text"
      placeholder="請輸入關鍵字"
      autoComplete="off"
      autoCorrect="off"
      autoCapitalize="none"
      spellCheck="false"
      maxLength={50}
      value={value}
      onChange={onChange}
    />
  );
}

export default SearchAnimalBox;
