import React from "react";
import { Button } from "../ui/button";
import DeleteComment from "../DeleteComment/DeleteComment";
import { Icons } from "../Icons/Icons";

interface CommentActionsProps {
  onDelete: () => void;
  onEdit?: () => void;
}

const CommentActions: React.FC<CommentActionsProps> = ({
  onDelete,
  onEdit,
}) => {
  return (
    <div className="flex">
      <DeleteComment onDelete={onDelete} />

      <Button
        variant="ghost"
        className="gap-1 font-bold text-[#5358B6] text-xs bg-inherit hover:bg-inherit hover:opacity-50 transition-all duration-300"
        onClick={onEdit}
      >
        <Icons.edit />
        Edit
      </Button>
    </div>
  );
};

export default CommentActions;
