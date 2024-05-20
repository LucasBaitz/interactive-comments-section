import React, { useState } from "react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Trash } from "lucide-react";
import { Icons } from "../Icons/Icons";

interface DeleteCommentProps {
  onDelete: () => void;
}

const DeleteComment: React.FC<DeleteCommentProps> = ({ onDelete }) => {
  return (
    <Dialog>
      <DialogTrigger className="flex items-center justify-center align-middle group text-red-500 gap-1 text-xs font-bold bg-inherit hover:bg-inherit hover:opacity-50 transition-all duration-300">
        <Icons.trash className="w-3 h-4" />
        Delete
      </DialogTrigger>
      <DialogContent className="max-w-sm p-8">
        <DialogHeader>
          <DialogTitle className="text-xl">Delete comment</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete this comment? This will remove the
            comment and can&apos;t be undone.
          </DialogDescription>
        </DialogHeader>
        <div className="flex gap-3 w-full">
          <DialogClose asChild>
            <Button className="uppercase p-2 bg-[#68727E] text-white w-full">
              No, Cancel
            </Button>
          </DialogClose>

          <Button
            className="uppercase p-2 bg-[#EE6368] text-white w-full"
            onClick={onDelete}
          >
            Yes, Delete
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteComment;
