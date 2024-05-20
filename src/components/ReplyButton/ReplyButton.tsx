import React from "react";
import { Button } from "../ui/button";
import { Icons } from "../Icons/Icons";

interface ReplyButtonProps {
  onClick?: () => void;
}

const ReplyButton: React.FC<ReplyButtonProps> = ({ onClick }) => {
  return (
    <Button
      onClick={onClick}
      className="bg-inherit hover:bg-inherit hover:opacity-50 transition-all duration-300 flex align-middle items-center justify-center gap-2 font-bold text-[#5357B6]"
    >
      <Icons.reply />
      Reply
    </Button>
  );
};

export default ReplyButton;
