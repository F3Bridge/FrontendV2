import { gql, useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";
import { Post } from "../components/Post";
import { ProfileSuperfluid } from "../components/ProfileSuperfluid";
import { timeAgo } from "../utils/timeAgo";

const PROFILES = gql`
  query Query($request: ProfileQueryRequest!) {
    profiles(request: $request) {
      items {
        id
      }
    }
  }
`;

const POSTS = gql`
  query Publications($request: PublicationsQueryRequest!) {
    publications(request: $request) {
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

export function Profile() {
  const { address } = useParams();
  const profiles = useQuery(PROFILES, {
    variables: { request: { ownedBy: address } },
  });

  const profileId = profiles.data?.profiles.items[0]?.id;

  const posts = useQuery(POSTS, {
    variables: { request: { profileId, publicationTypes: ["POST"] } },
  });

  if (profiles.loading || posts.loading)
    return (
      <div className="max-w-3xl m-auto my-4 px-4">
        <p>Loading...</p>
      </div>
    );

  if (profiles.error)
    return (
      <div className="max-w-3xl m-auto my-4 px-4">
        <pre>{JSON.stringify(profiles.error, null, 2)}</pre>
      </div>
    );

  if (!address || !profileId) {
    return <div className="max-w-3xl m-auto my-4 px-4">Profile not found</div>;
  }

  if (posts.error)
    return (
      <div className="max-w-3xl m-auto my-4 px-4">
        <pre>{JSON.stringify(posts.error, null, 2)}</pre>
      </div>
    );

  return (
    <div className="max-w-3xl m-auto my-4 px-4">
      <div className="text-xl text-bold my-8">Profile of {address}</div>
      <ProfileSuperfluid address={address} />
      {posts.data.publications.items.map((post: any) => (
        <Post post={post} key={post.id} />
      ))}
    </div>
  );
}
