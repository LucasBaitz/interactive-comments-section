import CommentVote from "@/interfaces/Comment/CommentVote";
import VoteType from "@/interfaces/Comment/VoteType";
import { Minus, Plus } from "lucide-react";
import React, { useState } from "react";

interface VotingGroupProps {
  score: number;
  initialVote?: VoteType;
  handleVote: (vote: CommentVote) => void;
}

const VotingGroup: React.FC<VotingGroupProps> = ({
  score,
  initialVote = VoteType.None,
  handleVote,
}) => {
  const [commentScore, setCommentScore] = useState<number>(score);
  const [vote, setVote] = useState<VoteType>(initialVote);

  const handleVoting = (newVote: CommentVote) => {
    if (newVote.vote === VoteType.UpVote) {
      if (vote === VoteType.UpVote) {
        setCommentScore((prevScore) => prevScore - 1);
        setVote(VoteType.None);
      } else if (vote === VoteType.DownVote) {
        setCommentScore((prevScore) => prevScore + 2);
        setVote(VoteType.UpVote);
      } else {
        setCommentScore((prevScore) => prevScore + 1);
        setVote(VoteType.UpVote);
      }
    } else if (newVote.vote === VoteType.DownVote) {
      if (vote === VoteType.DownVote) {
        setCommentScore((prevScore) => prevScore + 1);
        setVote(VoteType.None);
      } else if (vote === VoteType.UpVote) {
        setCommentScore((prevScore) => prevScore - 2);
        setVote(VoteType.DownVote);
      } else {
        setCommentScore((prevScore) => prevScore - 1);
        setVote(VoteType.DownVote);
      }
    }
    try {
      handleVote(newVote);
    } catch (error) {
      console.log("Unable to connect to the server");
    }
  };

  return (
    <div className="bg-[#F5F6FA] max-w-[100px] mt-5 md:mt-0 rounded-xl p-2 flex align-middle items-center justify-center max-h-28">
      <div className="flex md:flex-col gap-2 align-middle items-center">
        <button
          className={`text-[#C4C0E4] hover:text-[#5357B6] w-6 h-6 cursor-pointer rounded-xl ${
            vote === VoteType.UpVote
              ? "bg-[#e5e5e5] text-[#5357B6] hover:text-[#6a6dbb]"
              : ""
          }`}
          onClick={() => handleVoting({ vote: VoteType.UpVote })}
        >
          <Plus
            className={`${
              vote === VoteType.UpVote
                ? "text-[#5357B6] hover:text-[#7a7cb3]"
                : ""
            }`}
          />
        </button>
        <span className="text-[#5357B6] font-bold">{commentScore}</span>
        <button
          className={`text-[#C4C0E4] hover:text-[#5357B6] cursor-pointer rounded-xl ${
            vote === VoteType.DownVote ? "bg-[#e5e5e5] text-[#5357B6]" : ""
          }`}
          onClick={() => handleVoting({ vote: VoteType.DownVote })}
        >
          <Minus
            className={`${
              vote === VoteType.DownVote
                ? "text-[#5357B6] hover:text-[#7a7cb3]"
                : ""
            }`}
          />
        </button>
      </div>
    </div>
  );
};

export default VotingGroup;
