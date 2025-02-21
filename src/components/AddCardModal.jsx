import { Plus, X } from "lucide-react";
import { useContext } from "react";
import { ThemeContext } from "../App";

/* eslint-disable react/prop-types */
function AddCardModal({ onAdd, closeModal }) {
  const { theme } = useContext(ThemeContext);

  function preventClosing(e) {
    e.stopPropagation();
  }

  return (
    <div
      onClick={closeModal}
      className="fixed left-0 top-0 min-h-screen min-w-screen flex justify-center items-start sm:items-center pt-25 sm:p-0 bg-black/50"
    >
      <form
        action={onAdd}
        onClick={(e) => preventClosing(e)}
        className={`${
          theme ? "bg-blue-100" : "bg-slate-800"
        } w-96 sm:w-[30rem] p-6 rounded-2xl`}
      >
        <button onClick={closeModal} className="block ml-auto cursor-pointer">
          <X size={25} />
        </button>
        <label htmlFor="title" className="text-lg font-semibold tracking-wide">
          Title:
        </label>
        <input
          type="text"
          name="title"
          id="title"
          placeholder="Your activity"
          className={`${
            theme ? "bg-white" : "bg-gray-900"
          } text-lg w-full p-3 mt-2 mb-8 block`}
        />
        <button
          type="submit"
          className={`${
            theme
              ? "bg-sky-500 hover:bg-sky-400"
              : "bg-blue-500 hover:bg-blue-400"
          } flex gap-2 ml-auto text-lg font-semibold px-3 py-2 rounded-lg transition-colors duration-200  cursor-pointer`}
        >
          Add <Plus />
        </button>
      </form>
    </div>
  );
}

export default AddCardModal;
