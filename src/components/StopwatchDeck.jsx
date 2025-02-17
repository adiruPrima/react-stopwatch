import { usePersistedState } from "../hooks/usePersistedState";

function StopwatchDeck() {
  const [items, setItems] = usePersistedState("items", []);

  return <ul className="m-7 flex flex-col gap-4"></ul>;
}

export default StopwatchDeck;
