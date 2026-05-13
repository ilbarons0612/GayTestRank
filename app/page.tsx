import Link from "next/link";

export default function Home() {
  return (
    <main
      className="
        min-h-screen
        bg-zinc-950
        text-white
        flex
        flex-col
        items-center
        justify-center
        p-10
      "
    >
      <h1
        className="
          text-5xl
          md:text-6xl
          font-bold
          mb-12
          text-center
        "
      >
        🌈 Gay Test Rank
      </h1>

      <div
        className="
          flex
          flex-col
          gap-6
          w-full
          max-w-md
        "
      >
        <Link
          href="/GAY"
          className="
            bg-zinc-800
            hover:bg-pink-600
            transition
            duration-300
            p-6
            rounded-3xl
            text-2xl
            text-center
            shadow-xl
            hover:scale-105
          "
        >
          🏳️‍🌈 Classifica GAY
        </Link>

        <Link
          href="/LESBIAN"
          className="
            bg-zinc-800
            hover:bg-purple-600
            transition
            duration-300
            p-6
            rounded-3xl
            text-2xl
            text-center
            shadow-xl
            hover:scale-105
          "
        >
          💜 Classifica LESBICHE
        </Link>
      </div>
    </main>
  );
}