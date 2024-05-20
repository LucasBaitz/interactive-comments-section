import CreateComment from "@/interfaces/Comment/CreateComment";
import clientConfig from "./config/clientConfig";
import { UserComment } from "@/interfaces/Comment/UserComment";
import { AxiosResponse } from "axios";
import CommentVote from "@/interfaces/Comment/CommentVote";

export const postComment = async (
  comment: CreateComment
): Promise<UserComment | null> => {
  try {
    const response: AxiosResponse<UserComment> = await clientConfig.post(
      "/api/Comments/Add",
      comment
    );
    if (response.status === 201) {
      return response.data;
    }
    return null;
  } catch (error) {
    console.error(`Comment creation failed: ${error}`);
    return null;
  }
};

export const postCommentReply = async (
  commentId: string,
  comment: CreateComment
) => {
  try {
    const response: AxiosResponse<UserComment> = await clientConfig.post(
      `/api/Comments/Reply/${commentId}`,
      comment
    );
    if (response.status === 201) {
      return response.data;
    }
    return null;
  } catch (error) {
    console.error(`Comment creation failed: ${error}`);
    return null;
  }
};

export const updateComment = async (
  commentId: string,
  updatedComment: UserComment
) => {
  const response = await clientConfig.put(
    `/api/Comments/Update/${commentId}`,
    updatedComment
  );
};

export const voteOnComment = async (commentId: string, vote: CommentVote) => {
  const response = await clientConfig.post(
    `/api/Comments/Vote/${commentId}`,
    vote
  );

  return response.status === 200;
};

export const deleteComment = async (commentId: string) => {
  const response = await clientConfig.delete(
    `/api/Comments/Delete/${commentId}`
  );
};

export const getAllComments = async (): Promise<UserComment[]> => {
  const commentsReq = await clientConfig.get("/api/Comments/All");
  if (commentsReq.status === 200) {
    return commentsReq.data;
  }
  return [];
};
