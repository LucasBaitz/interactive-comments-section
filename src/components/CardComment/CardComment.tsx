import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { getUserPicture, getUserUsername } from "@/utils/userStorage";
import { formatDate } from "@/utils/dateTimeHelper";
import VotingGroup from "../VotingGroup/VotingGroup";
import ReplyButton from "../ReplyButton/ReplyButton";

const CardComment: React.FC = () => {
  return (
    <div className="grid grid-cols-3 grid-rows-2 bg-white rounded-xl">
      <header className="flex flex-row justify-start  align-middle gap-4">
        <Avatar>
          <AvatarImage src={getUserPicture()} />
          <AvatarFallback>{getUserUsername()}</AvatarFallback>
        </Avatar>
        <span className="font-bold">{getUserUsername()}</span>
        <span className="bg-[#5259B3] px-1 text-xs text-white rounded-sm">
          you
        </span>
        <span className="text-gray-500">1 month ago</span>
      </header>
      <div className="text-start text-[16px]">
        Impressive! Though it seems the drag feature could be improved. But
        overall it looks incredible. You&apos;ve nailed the design and the
        responsiveness at various breakpoints works really well.
      </div>
      <VotingGroup handleVote={() => {}} score={10} />
      <div className="2xl:grid-rows-1 2xl:grid-cols-3 flex  justify-end align-middle gap-2 font-bold">
        <ReplyButton />
      </div>
    </div>
  );
};

export default CardComment;
