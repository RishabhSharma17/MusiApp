"use client"

import { useState } from "react"
import { ChevronUp } from "lucide-react"

const initialSongs = [
  { id: 1, title: "Song 1", artist: "Artist 1", votes: 5 },
  { id: 2, title: "Song 2", artist: "Artist 2", votes: 3 },
  { id: 3, title: "Song 3", artist: "Artist 3", votes: 2 },
]

export default function UpcomingSongs() {
  const [songs, setSongs] = useState(initialSongs)

  const handleVote = (id: number) => {
    setSongs(
      songs
        .map((song) => (song.id === id ? { ...song, votes: song.votes + 1 } : song))
        .sort((a, b) => b.votes - a.votes),
    )
  }

  return (
    <div className="bg-gray-800 p-6 rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Upcoming Songs</h2>
      <ul className="space-y-4">
        {songs.map((song) => (
          <li key={song.id} className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold">{song.title}</h3>
              <p className="text-gray-400">{song.artist}</p>
            </div>
            <div className="flex items-center space-x-2">
              <span>{song.votes}</span>
              <button onClick={() => handleVote(song.id)} className="p-1 rounded-full bg-gray-700 hover:bg-gray-600">
                <ChevronUp size={20} />
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

