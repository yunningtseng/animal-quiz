import { useEffect, useRef, useState } from 'react';
import { useSearchBox } from 'react-instantsearch-hooks-web';
import { preprocessQuery } from '../../utils/algolia';

function SearchAnimalBox() {
  const { query, refine } = useSearchBox({ queryHook: preprocessQuery });
  const [value, setValue] = useState(query);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (query !== value) {
      refine(value);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, refine]);

  useEffect(() => {
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
