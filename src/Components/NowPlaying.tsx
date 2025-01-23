import { Play, SkipForward } from "lucide-react"

export default function NowPlaying() {
  return (
    <div className="bg-gray-800 p-6 rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Now Playing</h2>
      <div className="flex items-center space-x-4">
        <div className="w-16 h-16 bg-gray-700 rounded-md flex-shrink-0"></div>
        <div>
          <h3 className="font-semibold">Song Title</h3>
          <p className="text-gray-400">Artist Name</p>
        </div>
      </div>
      <div className="mt-4 flex justify-center space-x-4">
        <button className="p-2 rounded-full bg-purple-600 hover:bg-purple-700">
          <Play size={24} />
        </button>
        <button className="p-2 rounded-full bg-gray-700 hover:bg-gray-600">
          <SkipForward size={24} />
        </button>
      </div>
    </div>
  )
}

