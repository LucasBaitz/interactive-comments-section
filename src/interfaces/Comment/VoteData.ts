import { CommentAuthor } from "./CommentAuthor";
import VoteType from "./VoteType";

export interface VoteData {
  userId: string;
  user: CommentAuthor;
  vote: VoteType;
}
