import { Fragment, useCallback, useEffect, useState } from "react";
import { Combobox } from "@headlessui/react";

// {
//   id: 0,
//   content: ""
// }
const SearchInput = ({ data, handleSelect, selected }) => {
  const [query, setQuery] = useState("");

  useEffect(() => {
    // console.log("SearchInput");
  },[])

  const filteredData =
    query === ""
      ? data
      : data.filter((item) => {
          return item.content.toLowerCase().includes(query.toLowerCase());
        });

  const handleInputFocus = useCallback((event) => {
    event.target.value = "";
  }, []);

  const handleInputBlur = useCallback(
    (event) => {
      event.target.value = selected ? selected.content : "";
    },
    [selected]
  );

  return (
    <Combobox
      value={selected}
      onChange={handleSelect}
      open={selected ? true : false}
    >
      <div className="relative">
        <div>
          <Combobox.Input
            className="w-full px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            onChange={(event) => setQuery(event.target.value)}
            displayValue={(item) => item.content}
            onFocus={handleInputFocus}
            onBlur={handleInputBlur}
          />
          <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2 text-center">
            v
          </Combobox.Button>
        </div>
        <Combobox.Options className="absolute left-0 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto z-10">
          {filteredData.map((item) => (
            /* Use the `active` state to conditionally style the active option. */
            /* Use the `selected` state to conditionally style the selected option. */
            <Combobox.Option
              key={item.id}
              value={item}
              as={Fragment}
              className={({ active }) =>
                `${active ? "text-white bg-blue-500" : "text-gray-900"}
            cursor-default select-none relative py-2 pl-4 pr-8`
              }
            >
              {({ active, selected }) => (
                <li
                  className={`${
                    active ? "bg-blue-500 text-white" : "bg-white text-black"
                  }`}
                >
                  {item.content}
                </li>
              )}
            </Combobox.Option>
          ))}
        </Combobox.Options>
      </div>
    </Combobox>
  );
};
export default SearchInput;