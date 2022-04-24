import { gql, useQuery } from "@apollo/client";
import { Link } from "react-router-dom";
import { Post } from "../components/Post";
import { timeAgo } from "../utils/timeAgo";

const POSTS = gql`
  query Query {
    explorePublications(
      request: { limit: 25, sortCriteria: LATEST, publicationTypes: [POST] }
    ) {
      items {
        ... on Post {
          id
          appId
          profile {
            id
            name
            ownedBy
          }
          onChainContentURI
          createdAt
          metadata {
            name
            description
            content
            image
          }
        }
      }
    }
  }
`;

export function Posts() {
  const { loading, error, data } = useQuery(POSTS);
  if (loading)
    return (
      <div className="max-w-3xl m-auto my-4 px-4">
        <p>Loading...</p>
      </div>
    );
  if (error)
    return (
      <div className="max-w-3xl m-auto my-4 px-4">
        <pre>{JSON.stringify(error, null, 2)}</pre>
      </div>
    );

  return (
    <div className="max-w-3xl m-auto my-4 px-4">
      {data.explorePublications.items.map((post: any) => (
        <Post post={post} key={post.id} />
      ))}
    </div>
  );
}
