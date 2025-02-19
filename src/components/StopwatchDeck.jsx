import { useRef, useState } from "react";
import { usePersistedState } from "../hooks/usePersistedState";
import StopwatchCard from "./StopwatchCard";

function StopwatchDeck() {
  const [items, setItems] = useState([
    { id: 1, title: "cooking", status: "stop" },
    { id: 2, title: "doing homework", status: "stop" },
    { id: 3, title: "gooning", status: "stop" },
  ]);

  const id = useRef(items.length + 1);

  console.log(items);

  function add(formData) {
    const title = formData.get("title");
    if (title) {
      setItems((prev) => [
        ...prev,
        {
          id: id.current,
          title: title,
          status: "stop",
        },
      ]);
      id.current++;
    }
  }

  return (
    <ul className="m-7 flex flex-col gap-4 items-center">
      {items.map((item) => (
        <StopwatchCard key={item.id} title={item.title} status={item.status} />
      ))}
    </ul>
  );
}

export default StopwatchDeck;
