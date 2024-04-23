import { Fragment, useCallback, useState } from "react";
import { Combobox } from "@headlessui/react";

const SearchBar = (d) => {
  const data = [
    { id: 0, content: "All" },
    { id: 1, content: "Durward Reynolds" },
    { id: 2, content: "Kenton Towne" },
    { id: 3, content: "Therese Wunsch" },
    { id: 4, content: "Benedict Kessler" },
    { id: 5, content: "Katelyn Rohan" },
  ];
  const [selectedItem, setSelectedItem] = useState(data[0]);
  const [query, setQuery] = useState("");

  const filteredData =
    query === ""
      ? data
      : data.filter((item) => {
          return item.content.toLowerCase().includes(query.toLowerCase());
        });

  const handleInputFocus = useCallback((event)=> {
    event.target.value = "";
  },[]);

  const handleInputBlur = useCallback((event)=> {
    event.target.value = selectedItem.content;
  },[selectedItem]);

  return (
    <Combobox value={selectedItem} onChange={setSelectedItem} open={selectedItem === "" ? true : false}>
      <div className="relative">
        <Combobox.Input
          className="w-full px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          onChange={(event) => setQuery(event.target.value)}
          displayValue={(item) => item.content}
          onFocus={handleInputFocus}
          onBlur={handleInputBlur} 
        />
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
export default SearchBar;
