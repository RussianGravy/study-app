import React, { useEffect, useState } from "react";
import { Card } from "./Card";

export default function StudyFeature({ cards, onClose }) {
  const [index, setIndex] = useState(0);
  const [shuffledList, setShuffledList] = useState([]);

  useEffect(() => {
    const list = cards;
    for (let i = list.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [list[i], list[j]] = [list[j], list[i]];
    }
    setShuffledList(list);
  }, []);
  return (
    <div>
      <div>
        <button
          className="w-fit h-10 m-2 px-2 bg-slate-700 text-white font-bold rounded-xl self-center right-0"
          onClick={onClose}
        >
          Exit
        </button>
      </div>
      <Card topic={cards[index].title} content={cards[index].content} />
      <div>
        <button
          className="w-fit h-10 m-2 px-2 bg-slate-700 text-white font-bold rounded-xl self-center"
          onClick={() => {
            setIndex(index + 1);
          }}
        >
          Next
        </button>
      </div>
    </div>
  );
}
