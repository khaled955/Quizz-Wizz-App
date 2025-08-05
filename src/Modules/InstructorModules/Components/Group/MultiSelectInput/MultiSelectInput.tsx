import { Fragment } from "react";
import { Listbox } from "@headlessui/react";
import { FaChevronDown, FaCheck } from "react-icons/fa";

type Student = {
  _id: string;
  first_name: string;
  last_name: string;
};

export default function MultiSelectInput({
  students,
  selected,
  onChange,
}: {
  students: Student[];
  selected: string[];
  onChange: (value: string[]) => void;
}) {
  return (
    <Listbox value={selected} onChange={onChange} multiple as="div">
      {() => (
        <div className="relative mt-2 border border-main-border-color rounded-2xl">
          {/* Button */}
          <Listbox.Button className="relative w-full cursor-pointer rounded-md border-none bg-white py-2 pl-3 pr-10 text-left focus:outline-none focus:ring-1 focus:ring-amber-500 sm:text-sm">
            {selected.length > 0
              ? `${selected.length} student(s) selected`
              : "Select Students"}
            <span className="absolute inset-y-0 right-2 flex items-center">
              <FaChevronDown className="text-gray-400" />
            </span>
          </Listbox.Button>

          {/* Dropdown */}
          <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-sm shadow-lg ring-1 ring-black/5 focus:outline-none">
            {students.map((student) => (
              <Listbox.Option key={student._id} value={student._id} as={Fragment}>
                {({ active, selected }) => (
                  <li
                    className={`cursor-pointer select-none px-4 py-2 flex items-center gap-2 ${
                      active ? "bg-amber-100" : ""
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={selected}
                      readOnly
                      className="accent-amber-600"
                    />
                    <span className="grow">
                      {student.first_name} {student.last_name}
                    </span>
                    {selected && <FaCheck className="text-amber-600 text-sm" />}
                  </li>
                )}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </div>
      )}
    </Listbox>
  );
}

