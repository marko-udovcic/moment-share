import { useState } from "react";
import headerLinks from "../constants/headerlinks.json";
import { NavLink } from "react-router-dom";

export default function Nav() {
  const [isOpen, setIsOpen] = useState(false);
  function toggleMenu() {
    setIsOpen((isOpen) => !isOpen);
  }
  return (
    <header className="relative z-10 flex items-center justify-center">
      <button className="absolute right-10 top-6 text-xl text-white md:hidden" onClick={toggleMenu}>
        {isOpen ? "X" : "Menu"}
      </button>
      {/* prettier-ignore */}
      <nav
       
        className={`${isOpen ? "absolute top-10 mt-[10%] min-h-[50vh] md:relative md:right-0 md:top-0 md:mt-0 md:min-h-0" 
                             : "min-h-[8vh] md:relative md:top-0"} flex w-full items-center justify-center`}
      >
        {/* prettier-ignore */}
        <ul
          className={`${
            isOpen ? "flex" : "hidden"
          } absolute top-20 h-full w-full flex-col items-center justify-center 
          bg-slate-900 md:relative md:top-0 md:flex md:flex-row md:bg-transparent`}
        >
          {headerLinks.map((link, i) => (
            <li
              key={i}
              className="cursor-pointer rounded-xl py-5 font-sans text-[17px] font-semibold text-white md:px-5 md:py-2"
            >
              <NavLink
                to={link.href}
                className={({ isActive }) =>
                  isActive
                    ? "cursor-pointer rounded-xl bg-blue-400 px-5 py-2 font-sans text-[17px] font-semibold"
                    : "cursor-pointer rounded-xl font-sans text-[17px] font-semibold text-white hover:text-blue-400"
                }
              >
                {link.name}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
