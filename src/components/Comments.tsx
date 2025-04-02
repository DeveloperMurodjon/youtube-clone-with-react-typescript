import { useEffect, useState } from "react";
import { YTService } from "../service/api.service";

interface CommentsProps {
  id: string;
}

interface Comment {
  id: string;
  author_channel_id: string;
  author_name: string;
  like_count: string;
  number_of_replies: string;
  published_time: string;
  text: string;
  thumbnails: { url: string }[];
}

const Comments = ({ id }: CommentsProps) => {
  const [comments, setComments] = useState<Comment[]>([]);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const fetchedData: any = await YTService.getComments(id);
        console.log("Fetched comments:", fetchedData);
        setComments(fetchedData.comments || fetchedData || []);
      } catch (error) {
        console.error("Error fetching comments", error);
      }
    };
    fetchComments();
  }, [id]);

  return (
    <div className="mt-5 mx-auto">
      <h3 className="text-2xl font-semibold text-white">
        {comments.length} Comments
      </h3>
      <ul className="mt-5 space-y-5">
        {comments.length > 0 ? (
          comments.map((comment, index) => (
            <li
              key={index}
              className="flex items-start p-4 bg-gray-800 rounded-xl shadow-lg"
            >
              <img
                src={comment.thumbnails[0].url}
                alt="author thumbnail"
                className="w-10 h-10 mt-2 rounded-full object-cover mr-4"
              />
              <div className="flex flex-col">
                <p className="text-sm font-semibold text-white">
                  {comment.author_name}
                </p>
                <p className="text-md text-gray-400">{comment.text}</p>
                <div className="mt-2 text-sm text-gray-500">
                  <span>1.3K likes</span> • <span>16 replies</span>
                </div>
              </div>
            </li>
          ))
        ) : (
          <p className="text-gray-400">No comments available.</p>
        )}
      </ul>
    </div>
  );
};

export default Comments;
