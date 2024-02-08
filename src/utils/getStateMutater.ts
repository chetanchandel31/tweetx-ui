import { TypeSetStateFunction } from "@/types";
import { getDeepCopy } from "./getDeepCopy";

type Params<T> = {
  setState: TypeSetStateFunction<T>;
};

export default function getStateMutater<T>({ setState }: Params<T>) {
  return (mutateCb: (_state: T) => void) => {
    setState((prev) => {
      const updatedState = getDeepCopy(prev);

      mutateCb(updatedState);

      return updatedState;
    });
  };
}
