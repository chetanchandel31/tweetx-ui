import { useEffect, useState } from "react";

export default function TickingJsx({
  fnToTick,
}: {
  fnToTick: () => JSX.Element;
}) {
  const [tick, setTick] = useState(1);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setTick(tick < Number.MAX_SAFE_INTEGER ? tick + 1 : 0);
    }, 200);
    return () => clearTimeout(timeout);
  }, [tick]);

  return fnToTick();
}
