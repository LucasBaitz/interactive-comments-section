"use client";
import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../ui/card";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import CreateComment from "@/interfaces/Comment/CreateComment";
import { postComment } from "@/api/commentsApi";

const AddComment: React.FC = () => {
  const [comment, setComment] = useState<CreateComment>({ content: "" });

  const handleCommentDataChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const { id, value } = e.target;
    setComment((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  const handleCommentSubmit = async () => {
    await postComment(comment);
  };

  return (
    <div>
      <Card>
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl">Add a comment!</CardTitle>
          <CardDescription>Share your thoughts 💭</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="userName">Comment</Label>
            <Textarea
              id="content"
              placeholder="I honestly think that..."
              onChange={handleCommentDataChange}
            />
          </div>
        </CardContent>
        <CardFooter className="flex flex-col gap-2">
          <Button className="w-full" onClick={handleCommentSubmit}>
            Submit
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default AddComment;
