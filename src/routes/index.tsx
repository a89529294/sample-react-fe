import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  const [data, setData] = useState(null);
  const fetchData = async () => {
    const res = await fetch("https://awstesthonobe.zapto.org");
    const data = await res.json();
    setData(data);
  };

  return (
    <div>
      <button onClick={fetchData}>Fetch Data</button>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}
