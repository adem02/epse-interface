import { useState } from "react"
import type { CommandType, CopyHistoryInterface } from "../core/types";
import { mapCommandTypeToLabel } from "../core/utils";

const copyHistoryKey = 'copyHistory';


export const useCopyHistory = () => {
  const [copyHistory, setCopyHistory] = useState<CopyHistoryInterface[]>(() => {
    const stored = localStorage.getItem(copyHistoryKey);

    return stored ? JSON.parse(stored) : [];
  });

  function moveItemToIndex<T>(arr: T[], fromIndex: number, toIndex: number): T[] {
    const length = arr.length;
    if (length === 0) return arr;

    const normalize = (i: number) => (i < 0 ? length + i : i);
    const clamp = (i: number, min: number, max: number) => Math.min(Math.max(i, min), max);

    const from = normalize(fromIndex);
    if (from < 0 || from >= length) return arr;

    const to = clamp(normalize(toIndex), 0, length - 1);
    if (from === to) return arr;

    const copy = [...arr];
    const [item] = copy.splice(from, 1);
    copy.splice(to, 0, item);
    return copy;
  }

  const addRecentCopied = (
    mode: "interactive" | "manual",
    selectedCommand: CommandType,
    generatedCommand: string
  ) => {
    const command = mode === "interactive" ? `epse ${selectedCommand}` : generatedCommand;
    const type = mapCommandTypeToLabel(selectedCommand);

    setCopyHistory((prev) => {
      const foundIdenticCopiedIndex = prev.findIndex((copied) => {
        return copied.type === type && copied.command === command;
      });

      if (foundIdenticCopiedIndex !== -1) {
        const next = moveItemToIndex<CopyHistoryInterface>(prev, foundIdenticCopiedIndex, 0);
        localStorage.setItem(copyHistoryKey, JSON.stringify(next));
        return next;
      }

      const newCopied: CopyHistoryInterface = {
        id: Date.now().toString(),
        command,
        type,
        time: "now",
      };

      const next = [newCopied, ...prev].slice(0, 5);
      localStorage.setItem(copyHistoryKey, JSON.stringify(next));
      return next;
    });
  }

  return {
    copyHistory,
    addRecentCopied
  }
}