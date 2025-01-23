import Link from "next/link"
import { Music } from "lucide-react"

export default function Header() {
  return (
    <header className="bg-gray-800 py-4">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link href="/" className="flex items-center space-x-2 text-xl font-bold">
          <Music size={24} />
          <span>VotePlay</span>
        </Link>
        <nav>
          <ul className="flex space-x-4">
            <li>
              <Link href="#" className="hover:text-purple-400">
                Home
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:text-purple-400">
                Discover
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:text-purple-400">
                Library
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  )
}

