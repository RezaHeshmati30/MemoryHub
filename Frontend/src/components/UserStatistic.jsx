import React, { useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { UserStudySetsContext } from "../context/UserStudySetsContext";

function UserStatistic() {
  const { getUserInfo, user } = useContext(AuthContext);
  const { countCardsByStatus } = useContext(UserStudySetsContext);

  useEffect(() => {
    getUserInfo();
  }, []);

  const numberOfStudySets = user?.savedStudySets?.length ?? 0;

  const cardsCount = countCardsByStatus(user?.savedStudySets);

  const totalCards =
    cardsCount.mastered + cardsCount.needPractice + cardsCount.notStudied;

  return (
    <section>
      <h2 className="font-semibold">
        Number of study sets: {numberOfStudySets}{" "}
      </h2>
      <div className="mt-[20px] flex items-center">
        <p>Mastered </p>
        <progress
          aria-label="loading"
          id="p02g"
          max={totalCards}
          value={cardsCount.mastered}
          className="mr-[10px] ml-[10px] h-[10px] w-full overflow-hidden rounded bg-slate-100 [&::-webkit-progress-bar]:bg-slate-100 [&::-webkit-progress-value]:bg-lime-500 [&::-moz-progress-bar]:bg-cyan-500"
        ></progress>
        <p> {cardsCount.mastered}</p>
        <p className="ml-[10px]">Cards</p>
      </div>
      <div className="mt-[20px] flex items-center">
        <p className="flex-none">Need practice</p>
        <progress
          aria-label="loading"
          id="p02g"
          max={totalCards}
          value={cardsCount.needPractice}
          className="mr-[10px] ml-[10px] h-[10px] w-full overflow-hidden rounded bg-slate-100 [&::-webkit-progress-bar]:bg-slate-100 [&::-webkit-progress-value]:bg-amber-500 [&::-moz-progress-bar]:bg-cyan-500"
        ></progress>
        <p> {cardsCount.needPractice}</p>
        <p className="ml-[10px]">Cards</p>
      </div>
      <div className="mt-[20px] flex items-center">
        <p className="flex-none">Not studied</p>
        <progress
          aria-label="loading"
          id="p02g"
          max={totalCards}
          value={cardsCount.notStudied}
          className="mr-[10px] ml-[10px] h-[10px] w-full overflow-hidden rounded bg-slate-100 [&::-webkit-progress-bar]:bg-slate-100 [&::-webkit-progress-value]:bg-red-500 [&::-moz-progress-bar]:bg-cyan-500"
        ></progress>
        <p> {cardsCount.notStudied}</p>
        <p className="ml-[10px]">Cards</p>
      </div>
    </section>
  );
}

export default UserStatistic;
