import { CommentAuthor } from "./CommentAuthor";
import { VoteData } from "./VoteData";

export interface UserComment {
  id: string;
  content: string;
  createdAt: string;
  votes: VoteData[];
  score: number;
  user: CommentAuthor;
  replies: UserComment[];
}
