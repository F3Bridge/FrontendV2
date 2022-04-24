import { Link } from "react-router-dom";
import { timeAgo } from "../utils/timeAgo";

export function Post({ post }: { post: any }) {
  return (
    <div className="p-4 m-4 mx-auto bg-white shadow-xl rounded-xl">
      {post.metadata.image && (
        <div className="mb-4 rounded">
          <img className="rounded" src={post.metadata.image} alt="Post" />
        </div>
      )}
      <div className="flex flex-row justify-between">
        <div className="text-sm text-gray-400">#{post.id}</div>
        <div>{timeAgo.format(new Date(post.createdAt))}</div>
      </div>
      <div>
        <Link className="underline" to={`/profile/${post.profile.ownedBy}`}>
          {post.profile.ownedBy.substr(0, 6)}...
          {post.profile.ownedBy.substr(38, 42)}
        </Link>{" "}
        posted:
      </div>
      <div className="break-words">{post.metadata.content}</div>
      <div className="text-right text-sm mt-2 text-gray-400">
        {post.metadata.name}
      </div>
    </div>
  );
}
