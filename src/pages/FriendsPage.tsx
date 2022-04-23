import {FaDiscord} from "react-icons/fa"

const Friends = [
	{
		id: 1,
		discordhandle: "rane#123",
		followed: "no",
		donateButton: "xd"
	}
]

export function FriendsPage() {
  return (
    <div className="w-full h-screen bg-gray-300 ">
		<h2 className="font-bold pt-8 ml-6">Discord Friends</h2>
		<div className="bg-blue-300 w-[400px] h-[400px] rounded-md">
			{}

		</div>

    </div>
  );
}
