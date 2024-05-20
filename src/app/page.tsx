"use client";
import Comment from "@/components/Comment/Comment";
import { getAllComments, postComment } from "@/api/commentsApi";
import { useEffect, useState } from "react";
import { UserComment } from "@/interfaces/Comment/UserComment";
import AddComment from "@/components/AddComment/AddComment";
import commentsJson from "@/app/data.json";
import Loading from "@/components/Loading/Loading";
import {
  clearUserStorage,
  getUserPicture,
  getUserUsername,
} from "@/utils/userStorage";
import Header from "@/components/Header/Header";

const Home: React.FC = () => {
  const [comments, setComments] = useState<UserComment[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [showNav, setShowNav] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const newComments = await getAllComments();
        setComments([...comments, ...newComments]);
        setShowNav(true);
      } catch {
        setComments(commentsJson.comments as any);
        setShowNav(false);
        clearUserStorage();
      }

      setLoading(false);
    };
    fetchData();
  }, []);

  const onDelete = (commentId: string) => {
    setComments((prevComments) =>
      prevComments.filter((comment) => {
        if (comment.id === commentId) {
          if (comment.replies && comment.replies.length > 0) {
            comment.replies = comment.replies.filter(reply => reply.id !== commentId);
          }

          return false;
        } else {
          comment.replies = comment.replies.filter(
            (reply) => reply.id !== commentId
          );
          return true;
        }
      })
    );
  };

  const onAdd = async (comment: string) => {
    const newComment = await postComment({ content: comment });
    console.log(newComment);
    if (newComment) {
      newComment.replies = [];
      newComment.votes = [];
      newComment.user = {
        userName: getUserUsername(),
        image: getUserPicture(),
      };
      setComments((prevComments) => [...prevComments, newComment]);
      return;
    }

    const mockComment: UserComment = {
      content: comment,
      createdAt: new Date().toISOString(),
      id: crypto.randomUUID(),
      replies: [],
      score: 0,
      user: { image: getUserPicture(), userName: getUserUsername() },
      votes: [],
    };
    setComments((prevComments) => [...prevComments, mockComment]);
  };

  if (loading)
    return (
      <div className="flex h-screen w-full align-middle items-center justify-center">
        <Loading />
      </div>
    );

  return (
    <main className="flex min-h-screen flex-col items-center bg-[#F5F6FA]">
      {showNav && <Header />}
      <section className="mt-10 flex flex-col align-middle justify-center items-center max-w-4xl p-2 md:px-12">
        {comments.length > 0 &&
          comments.map((c) => (
            <Comment
              key={crypto.randomUUID()}
              userComment={c}
              onDelete={onDelete}
              maxWidth={540}
            />
          ))}
        <AddComment handleAddComment={onAdd} />
      </section>
    </main>
  );
};

export default Home;
