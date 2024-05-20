import React, { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { postCommentReply } from "@/api/commentsApi";
import CreateComment from "@/interfaces/Comment/CreateComment";
import { UserComment } from "@/interfaces/Comment/UserComment";
import { getUserPicture, getUserUsername } from "@/utils/userStorage";

interface ReplyComment {
  replyTo: string;
  commentId: string;
  onSubmitReply: (replyData: UserComment) => void;
}

const ReplyComment: React.FC<ReplyComment> = ({
  replyTo,
  commentId,
  onSubmitReply,
}) => {
  const [commentData, setCommentData] = useState<CreateComment>({
    content: `@${replyTo} `,
  });

  const handleSubmitCommentReply = async () => {
    const createdReply = await postCommentReply(commentId, commentData);
    if (createdReply) {
      console.log(createdReply)
      onSubmitReply(createdReply);
      return;
    }
    onSubmitReply({
      content: commentData.content,
      createdAt: new Date().toUTCString(),
      id: crypto.randomUUID(),
      replies: [],
      score: 0,
      user: { userName: getUserUsername(), image: getUserPicture() },
      votes: [],
    });
  };

  return (
    <div className="bg-white flex rounded-xl p-6 gap-3 max-w-full">
      <Avatar>
        <AvatarImage src={getUserPicture()} />
        <AvatarFallback>{getUserUsername()}</AvatarFallback>
      </Avatar>
      <Textarea
        value={commentData.content}
        onChange={(e) => setCommentData({ content: e.target.value })}
        className="resize-none w-full focus-visible:ring-[#5259B3] focus-visible:ring-[0.5px] focus:border-none"
      />
      <Button
        variant="reply"
        className="px-6 py-5 font-bold"
        onClick={handleSubmitCommentReply}
      >
        Reply
      </Button>
    </div>
  );
};

export default ReplyComment;
