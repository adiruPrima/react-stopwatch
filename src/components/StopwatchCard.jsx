import { useContext } from "react";
import { ThemeContext } from "../App";
import { Pause, Play, RotateCcw, Trash2 } from "lucide-react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

/* eslint-disable react/prop-types */
function StopwatchCard({ id, title, status }) {
  // Color conditionals
  let bgColor = "";
  let borderColor = "";
  if (status === "stop") {
    bgColor = "bg-red-500/25";
    borderColor = "border-red-700";
  } else if (status === "play") {
    bgColor = "bg-green-500/25";
    borderColor = "border-green-700";
  } else {
    bgColor = "bg-yellow-500/25";
    borderColor = "border-yellow-700";
  }

  // Theme context
  const { theme } = useContext(ThemeContext);

  // Drag-N-Drop utilities
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  const style = {
    touchAction: "none",
    transition,
    transform: transform ? CSS.Transform.toString(transform) : "",
  };

  return (
    <li
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      style={style}
      className={`${bgColor}  ${borderColor} border-4 rounded-2xl p-3 w-80 sm:w-96`}
    >
      <h2
        className={`${theme ? "text-black" : "text-white"} font-bold text-xl`}
      >
        {title}
      </h2>
      <p
        className={`${
          theme ? "text-black" : "text-white"
        } font-semibold text-5xl font-mono text-center my-3`}
      >
        00:00:00
      </p>
      <div className="flex justify-between">
        <button className="bg-yellow-500 py-1 px-6 rounded-full cursor-pointer">
          <RotateCcw />
        </button>
        <button className="bg-green-500 py-1 px-6 rounded-full cursor-pointer">
          {status === "play" || status === "stop" ? <Play /> : <Pause />}
        </button>
        <button className="bg-red-500 py-1 px-6 rounded-full cursor-pointer">
          <Trash2 />
        </button>
      </div>
    </li>
  );
}

export default StopwatchCard;
