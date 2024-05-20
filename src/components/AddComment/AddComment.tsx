import React, { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { getUserPicture, getUserUsername } from "@/utils/userStorage";

interface AddCommentProps {
  handleAddComment: (content: string) => void;
}

const AddComment: React.FC<AddCommentProps> = ({ handleAddComment }) => {
  const [comment, setComment] = useState<string>("");

  const handleSubmit = () => {
    setComment("");
    handleAddComment(comment);
  };

  return (
    <div className="bg-white flex rounded-xl p-6 gap-3 w-full max-w-4xl md:min-w-4xl">
      <Avatar>
        <AvatarImage src={getUserPicture()} />
        <AvatarFallback>{getUserUsername()[0]}</AvatarFallback>
      </Avatar>
      <Textarea
        value={comment}
        placeholder="Add a comment..."
        onChange={(e) => setComment(e.target.value)}
        className="resize-none w-full focus-visible:ring-[#5259B3] focus-visible:ring-[0.5px] focus:border-none"
      />
      <Button variant="reply" className="py-1 px-6" onClick={handleSubmit}>
        SEND
      </Button>
    </div>
  );
};

export default AddComment;
