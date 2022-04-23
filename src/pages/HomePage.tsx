import { Link } from "react-router-dom";

export function HomePage() {
  return (
    <div className="min-h-screen text-xl text-pink-700 bg-yellow-300">
      tHiS iS HomE pAgE{" "}
      <Link to="/friends">(Click here to go to friendSsS page)</Link>
    </div>
  );
}
