"use client";
import { useState } from "react";
import { Dropdown } from "./Dropdown";
import { DropdownItem } from "./DropdownItem";

export default function ActionMenu({ editUrl, onDelete }: any) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative dropdown">
      {/* Trigger (3 dots) */}
      <button
        onClick={() => setOpen(!open)}
        className="dropdown-toggle text-gray-500 dark:text-gray-400"
      >
        <svg
          className="fill-current"
          width="24"
          height="24"
          viewBox="0 0 24 24"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M5.99902 10.245C6.96552 10.245 7.74902 11.0285 7.74902 11.995V12.005C7.74902 12.9715 6.96552 13.755 5.99902 13.755C5.03253 13.755 4.24902 12.9715 4.24902 12.005V11.995C4.24902 11.0285 5.03253 10.245 5.99902 10.245ZM17.999 10.245C18.9655 10.245 19.749 11.0285 19.749 11.995V12.005C19.749 12.9715 18.9655 13.755 17.999 13.755C17.0325 13.755 16.249 12.9715 16.249 12.005V11.995C16.249 11.0285 17.0325 10.245 17.999 10.245ZM13.749 11.995C13.749 11.0285 12.9655 10.245 11.999 10.245C11.0325 10.245 10.249 11.0285 10.249 11.995V12.005C10.249 12.9715 11.0325 13.755 11.999 13.755C12.9655 13.755 13.749 12.9715 13.749 12.005V11.995Z"
          />
        </svg>
      </button>

      {/* Dropdown */}
      <Dropdown isOpen={open} onClose={() => setOpen(false)} className="w-40 p-2 space-y-1">
        {/* Edit Action */}
        <DropdownItem
          tag="a"
          href={editUrl}
          className="text-xs font-medium text-gray-500 dark:text-gray-400 
                     hover:bg-gray-100 hover:text-gray-700 
                     dark:hover:bg-white/5 dark:hover:text-gray-300"
          onItemClick={() => setOpen(false)}
        >
          Edit
        </DropdownItem>

        {/* Delete Action */}
        <DropdownItem
          tag="button"
          onClick={() => {
            setOpen(false);
            onDelete();
          }}
          className="text-xs font-medium text-gray-500 dark:text-gray-400 
                     hover:bg-gray-100 hover:text-gray-700 
                     dark:hover:bg-white/5 dark:hover:text-gray-300"
        >
          Delete
        </DropdownItem>

      </Dropdown>
    </div>
  );
}
