import { useMemo, useState, useTransition } from "react";

const numbers = [...new Array(20000).fill(0).map((_, index) => index)];

export default function App() {
  const [query, setQuery] = useState("");

  const [isPending, startTransition] = useTransition();

  const handleChange = (e: any) => {
    startTransition(() => {
      setQuery(e.target.value);
    });
  };

  const list = useMemo(() => (
    numbers.map((i, index) => (
      query
        ? i.toString().startsWith(query)
        && <p key={index}>{i}</p>
        : <p key={index}>{i}</p>
    ))
  ), [query]);

  return (
    <div>
      <input type="number" onChange={handleChange} />
      <div>
        {
          isPending
            ? "Loading..."
            : list
        }
      </div>
    </div>
  );
}
