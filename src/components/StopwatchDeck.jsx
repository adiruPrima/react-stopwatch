import { useRef, useState } from "react";
import { usePersistedState } from "../hooks/usePersistedState";
import StopwatchCard from "./StopwatchCard";
import {
  closestCorners,
  DndContext,
  KeyboardSensor,
  PointerSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { Plus } from "lucide-react";

function StopwatchDeck() {
  const [items, setItems] = useState([
    { id: 1, title: "cooking", status: "stop" },
    { id: 2, title: "doing homework", status: "stop" },
    { id: 3, title: "gooning", status: "stop" },
  ]);

  const id = useRef(items.length + 1);

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

  // Drag-N-Drop functions

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(TouchSensor),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  function getItemPos(id) {
    return items.findIndex((item) => item.id === id);
  }

  function handleDragEnd(event) {
    // Event will detect which item is being dragged and item that will be overlapped
    const { active, over } = event;

    if (active.id === over.id) return; // drop to the same position does nothing

    setItems((items) => {
      const originalPos = getItemPos(active.id);
      const newPos = getItemPos(over.id);
      return arrayMove(items, originalPos, newPos);
    });
  }

  return (
    <ul className="m-7 flex flex-col gap-4 items-center overflow-hidden">
      {/* Items render */}
      <DndContext
        sensors={sensors}
        onDragEnd={handleDragEnd}
        collisionDetection={closestCorners}
      >
        <SortableContext items={items} strategy={verticalListSortingStrategy}>
          {items.map((item) => (
            <StopwatchCard
              key={item.id}
              id={item.id}
              title={item.title}
              status={item.status}
            />
          ))}
        </SortableContext>
      </DndContext>

      <li className="bg-sky-500/50 border-sky-500 flex justify-center border-4 rounded-2xl p-3 w-80 sm:w-96 cursor-pointer">
        <Plus size={40} strokeWidth={3} />
      </li>
    </ul>
  );
}

export default StopwatchDeck;
