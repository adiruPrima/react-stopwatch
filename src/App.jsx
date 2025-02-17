/* eslint-disable react-refresh/only-export-components */
import { createContext } from "react";
import { usePersistedState } from "./hooks/usePersistedState";
import ThemeToggler from "./components/ThemeToggler";
import StopwatchDeck from "./components/StopwatchDeck";

export const ThemeContext = createContext();

function App() {
  // true: light || false: dark
  const [theme, setTheme] = usePersistedState("theme", false);
  const changeTheme = () => setTheme(!theme);

  return (
    <ThemeContext.Provider value={{ theme, changeTheme }}>
      {/* Screen */}
      <div
        className={`bg-gradient-to-br ${
          theme ? "from-blue-200 to-white" : "from-slate-700 to-slate-950"
        } ${theme ? "text-black" : "text-white"} min-h-screen`}
      >
        <ThemeToggler />

        {/* Main container */}
        <div className="w-full min-h-screen p-8">
          <h1
            className={`${
              theme ? "text-black" : "text-white"
            } text-3xl font-bold text-center`}
          >
            Stopwatch
          </h1>
          <StopwatchDeck />
        </div>
      </div>
    </ThemeContext.Provider>
  );
}

export default App;
