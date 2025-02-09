import { useState } from "react";
import headerLinks from "../constants/headerlinks.json";
import { NavLink } from "react-router-dom";
import Logout from "../features/auth/components/Logout";
import { CiMenuFries } from "react-icons/ci";
import { TfiClose } from "react-icons/tfi";

export default function Nav() {
  const [isOpen, setIsOpen] = useState(false);
  function toggleMenu() {
    setIsOpen((isOpen) => !isOpen);
  }
  return (
    <header className="relative z-10 flex items-center justify-center">
      <nav className="flex w-full items-center justify-between px-10">
        <button className="absolute right-10 top-6 z-20 text-xl text-white md:hidden" onClick={toggleMenu}>
          {isOpen ? (
            <TfiClose className="text-white text-2xl" />
          ) : (
            <CiMenuFries className="text-white text-2xl" />
          )}
        </button>
        <ul
          className={`${isOpen ? "fixed inset-0 flex bg-slate-900 z-10" : "hidden"} flex-col items-center justify-center md:relative
            md:flex md:flex-row md:bg-transparent md:space-x-5 w-full`}
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
          <li
            className="cursor-pointer rounded-xl py-5 font-sans text-[17px] font-semibold text-white md:px-5 md:py-2 lg:absolute
              lg:right-10"
          >
            <Logout />
          </li>
        </ul>
      </nav>
    </header>
  );
}
