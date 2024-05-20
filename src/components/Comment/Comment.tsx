"use client";
import React, { useState } from "react";
import ReplyButton from "../ReplyButton/ReplyButton";
import VotingGroup from "../VotingGroup/VotingGroup";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import ReplyComment from "../ReplyComment/ReplyComment";
import { UserComment } from "@/interfaces/Comment/UserComment";
import { deleteComment, updateComment, voteOnComment } from "@/api/commentsApi";
import CommentVote from "@/interfaces/Comment/CommentVote";
import CommentActions from "../CommentActions/CommentActions";
import { formatDate } from "@/utils/dateTimeHelper";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { getUserPicture, getUserUsername } from "@/utils/userStorage";
import VoteType from "@/interfaces/Comment/VoteType";

interface CommentProps {
  userComment: UserComment;
  onDelete: (commentId: string) => void;
  className?: string;
  maxWidth: number;
}

const Comment: React.FC<CommentProps> = ({
  userComment,
  onDelete,
  className,
  maxWidth,
}) => {
  const [comment, setComment] = useState<UserComment>(userComment);
  const [isReplying, setIsReplying] = useState<boolean>(false);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editingContent, setEditingContent] = useState<string>(
    userComment.content
  );

  const handleVote = async (vote: CommentVote) => {
    try {
      await voteOnComment(comment.id, vote);
    } catch (error) {
      console.error("Unable to connect with the server.");
    }
  };

  const handleDelete = async () => {
    onDelete(userComment.id);
    try {
      await deleteComment(comment.id);
    } catch (error) {
      console.error("Unable to connect with the server.");
    }
  };

  const handleUpdate = async () => {
    const newContent = {
      content: editingContent,
      createdAt: "",
      votes: [],
      id: "",
      replies: [],
      score: 0,
      user: { image: "", userName: "" },
    };

    setComment((prevComment) => ({
      ...prevComment,
      content: editingContent,
    }));

    setEditingContent(comment.content);
    setIsEditing(false);
    try {
      await updateComment(comment.id, newContent);
    } catch (error) {
      console.error("Unable to connect to the server.");
    }
  };

  const handleReplySubmit = (replyData: UserComment) => {
    replyData.user = { userName: getUserUsername(), image: getUserPicture() };
    setComment((prevComment) => ({
      ...prevComment,
      replies: [...prevComment.replies, replyData],
    }));

    setIsReplying(false);
  };

  const changeEditingState = () => {
    setEditingContent(comment.content);
    setIsEditing((prevState) => !prevState);
  };

  return (
    <div
      className={`flex flex-col items-end gap-2 w-full ${className}`}
    >
      <div className="bg-white flex flex-col-reverse md:flex-row rounded-xl p-3 w-full">
        <div className="flex justify-between">
          <VotingGroup
            score={comment.score}
            handleVote={handleVote}
            initialVote={
              comment.votes?.find((v) => v.user.userName === getUserUsername())
                ?.vote ?? VoteType.None
            }
          />

          <div className="items-end flex md:hidden">
            {comment.user.userName === getUserUsername() ? (
              <CommentActions
                onDelete={handleDelete}
                onEdit={changeEditingState}
              />
            ) : (
              <ReplyButton onClick={() => setIsReplying(!isReplying)} />
            )}
          </div>
        </div>

        <div className="flex flex-col align-middle px-5 pr-0 w-full">
          <div className="flex justify-between w-full">
            <header className="flex justify-center items-center gap-2">
              <Avatar>
                <AvatarImage src={comment.user.image} />
                <AvatarFallback>{comment.user.userName[0]}</AvatarFallback>
              </Avatar>
              <span className="font-bold">{comment.user.userName}</span>
              {getUserUsername() === userComment.user.userName && (
                <span className="bg-[#5259B3] px-1 text-xs text-white rounded-sm">
                  you
                </span>
              )}
              <span className="text-gray-500">
                {formatDate(comment.createdAt)}
              </span>
            </header>
            <div className="hidden md:flex items-end ">
              {comment.user.userName === getUserUsername() ? (
                <CommentActions
                  onDelete={handleDelete}
                  onEdit={changeEditingState}
                />
              ) : (
                <ReplyButton onClick={() => setIsReplying(!isReplying)} />
              )}
            </div>
          </div>

          <div className="mt-5">
            {isEditing ? (
              <div className="flex gap-2">
                <Textarea
                  value={editingContent}
                  className="resize-none w-full focus-visible:ring-[#5259B3] focus-visible:ring-[0.5px] focus:border-none"
                  onChange={(e) => setEditingContent(e.target.value)}
                />
                <Button variant="reply" onClick={handleUpdate}>
                  Update
                </Button>
              </div>
            ) : (
              <p className="text-gray-500 font-medium text-base">
                {comment.content}
              </p>
            )}
          </div>
        </div>
      </div>
      <div className="w-full">
        {isReplying && (
          <ReplyComment
            replyTo={comment.user.userName}
            commentId={comment.id}
            onSubmitReply={handleReplySubmit}
          />
        )}
      </div>
      <div className="md:border-l-2 flex flex-col place-items-end w-full pl-5 md:pl-10 md:ml-16">
        {comment.replies.length > 0 &&
          comment.replies.map((r) => (
            <Comment
              key={r.id}
              userComment={r}
              onDelete={onDelete}
              className="ml-10 w-auto"
              maxWidth={maxWidth - 40}
            />
          ))}
      </div>
    </div>
  );
};

export default Comment;
