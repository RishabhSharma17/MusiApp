import { Button } from "@/components/ui/button"

export default function Hero() {
  return (
    <section className="text-center py-20">
      <h1 className="text-5xl font-bold mb-4">Vote for the Next Track</h1>
      <p className="text-xl mb-8">Shape the playlist by upvoting your favorite songs</p>
      <Button className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded">
        Start Listening
      </Button>
    </section>
  )
}
