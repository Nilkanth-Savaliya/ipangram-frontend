import { useState } from "react";
import Link from "next/link";

const Menu = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <li>
      {props.children ? (
        <button
          type="button"
          className="flex items-center w-full p-2 text-base text-white transition duration-75 rounded-lg group hover:text-black hover:bg-blue-100"
          aria-controls="dropdown-example"
          data-collapse-toggle="dropdown-example"
          onClick={() => setIsOpen((prev) => !prev)}
        >
          {props.icon}
          <span className="flex-1 ms-3 text-left rtl:text-right whitespace-nowrap">
            {props.label}
          </span>
          <svg
            className="w-3 h-3"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 10 6"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="m1 1 4 4 4-4"
            />
          </svg>
        </button>
      ) : (
        <Link
          href={props.link ?? "/maintenance"}
          className="flex items-center p-2 text-white rounded-lg hover:text-black hover:bg-blue-100 group"
        >
          {props.icon}
          <span className="ms-3">{props.label}</span>
        </Link>
      )}
      {props.children && isOpen && (
        <ul id="dropdown-example" className="py-2 space-y-2">
          {props.children.map((child) => (
            <li key={child.label}>
              <Link
                href={child.link ?? "/maintenance"}
                className="flex items-center w-full p-2 text-white transition duration-75 rounded-lg pl-11 group hover:text-black hover:bg-blue-100"
              >
                {child.label}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </li>
  );
};

export default Menu