import { Moon, Sun } from "lucide-react";
import { useContext } from "react";
import { ThemeContext } from "../App";

function ThemeToggler() {
  const { theme, changeTheme } = useContext(ThemeContext);
  return (
    <button
      onClick={changeTheme}
      className={`${
        theme ? "text-black" : "text-white"
      } absolute top-0 right-0 m-5 cursor-pointer`}
    >
      {theme ? <Moon /> : <Sun />}
    </button>
  );
}

export default ThemeToggler;
