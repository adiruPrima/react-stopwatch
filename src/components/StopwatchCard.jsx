import { useContext, useEffect, useRef, useState } from "react";
import { ThemeContext } from "../App";
import { Pause, Play, RotateCcw, Trash2 } from "lucide-react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

/* eslint-disable react/prop-types */
function StopwatchCard({ id, title, onDelete }) {
  const [status, setStatus] = useState(""); // reset | play | pause
  const [elapsedTime, setElapsedTime] = useState(0);
  const intervalIdRef = useRef(null);
  const startTimeRef = useRef(0);

  // Color conditionals
  let bgColor = "";
  let borderColor = "";
  if (status === "pause") {
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

  // Time interval effect
  useEffect(() => {
    if (status === "play") {
      intervalIdRef.current = setInterval(() => {
        setElapsedTime(Date.now() - startTimeRef.current);
      }, 1000);
    } else {
      clearInterval(intervalIdRef.current);
    }

    return () => clearInterval(intervalIdRef.current); // cleanup
  }, [status]);

  // Handle Play/Pause functionality
  const handlePlayPause = () => {
    if (status === "play") {
      setStatus("pause");
    } else if (status === "pause" || status === "") {
      setStatus("play");
      startTimeRef.current = Date.now() - elapsedTime;
    }
  };

  const handleReset = () => {
    setStatus("reset");
    setElapsedTime(0);
    clearInterval(intervalIdRef.current); // stop any running interval
  };

  function timeFormat() {
    let hours = Math.floor(elapsedTime / (1000 * 60 * 60));
    let minutes = Math.floor((elapsedTime / (1000 * 60)) % 60);
    let seconds = Math.floor((elapsedTime / 1000) % 60);
    // let milliseconds = Math.floor((elapsedTime % 1000) / 10);

    hours = hours.toString().padStart(2, "0");
    minutes = minutes.toString().padStart(2, "0");
    seconds = seconds.toString().padStart(2, "0");

    return `${hours}:${minutes}:${seconds}`;
  }

  // Manage mouse hover state for disabling drag
  const [isHovered, setIsHovered] = useState(false);

  return (
    <li
      ref={isHovered ? null : setNodeRef} // Disable drag when hovering over the buttons div
      {...(isHovered ? {} : attributes)} // Only apply drag attributes when not hovered
      {...(isHovered ? {} : listeners)} // Only apply drag listeners when not hovered
      style={isHovered ? {} : style} // Only apply drag style when not hovered
      className={`${bgColor} ${borderColor} border-4 rounded-2xl p-3 w-80 sm:w-96`}
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
        {timeFormat()}
      </p>
      <div
        className="flex justify-between"
        // Disable drag when hovering over buttons div
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onTouchStart={() => setIsHovered(true)}
        onTouchEnd={() => setIsHovered(false)}
      >
        <button
          onClick={handleReset}
          className="bg-yellow-500 py-1 px-6 rounded-full cursor-pointer"
        >
          <RotateCcw />
        </button>
        <button
          onClick={handlePlayPause}
          className="bg-green-500 py-1 px-6 rounded-full cursor-pointer"
        >
          {status === "play" ? <Pause /> : <Play />}
        </button>
        <button
          onClick={onDelete}
          className="bg-red-500 py-1 px-6 rounded-full cursor-pointer"
        >
          <Trash2 />
        </button>
      </div>
    </li>
  );
}

export default StopwatchCard;
