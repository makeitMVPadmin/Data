import { Fragment, useState } from "react";
import { Combobox, Transition } from "@headlessui/react";

const SearchBar = (d) => {
  const data = [
    { id: 1, name: "Durward Reynolds" },
    { id: 2, name: "Kenton Towne" },
    { id: 3, name: "Therese Wunsch" },
    { id: 4, name: "Benedict Kessler" },
    { id: 5, name: "Katelyn Rohan" },
  ];
  const [selectedPerson, setSelectedPerson] = useState(data[0]);
  const [query, setQuery] = useState("");

  const filtereddata =
    query === ""
      ? data
      : data.filter((person) => {
          return person.name.toLowerCase().includes(query.toLowerCase());
        });

  return (
    <Combobox value={selectedPerson} onChange={setSelectedPerson}>
      <div className="relative">
        <Combobox.Input
          className="w-full px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          onChange={(event) => setQuery(event.target.value)}
          displayValue={(person) => person.name}
        />
        <Combobox.Options className="absolute left-0 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto z-10">
          {filtereddata.map((person) => (
            /* Use the `active` state to conditionally style the active option. */
            /* Use the `selected` state to conditionally style the selected option. */
            <Combobox.Option
              key={person.id}
              value={person}
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
                  {person.name}
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
