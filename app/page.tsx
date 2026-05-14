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
        px-5
        py-10
      "
    >
      <h1
        className="
          text-4xl
          sm:text-5xl
          md:text-6xl
          font-black
          mb-10
          text-center
          leading-tight
        "
      >
        🌈 Gay Test 🌈
      </h1>

      <p
        className="
          text-zinc-400
          text-center
          mb-10
          text-base
          sm:text-lg
          max-w-md
        "
      >
        Scopri il tuo livello
        definitivo.
      </p>

      <div
        className="
          flex
          flex-col
          gap-5
          w-full
          max-w-md
        "
      >
        <Link
          href="/GAY"
          className="
            bg-zinc-800
            hover:bg-pink-600
            active:scale-95
            transition
            duration-300
            px-6
            py-6
            rounded-3xl
            text-xl
            sm:text-2xl
            text-center
            shadow-2xl
            hover:scale-105
            font-bold
          "
        >
          🏳️‍🌈 GAY 💖
        </Link>

        <Link
          href="/LESBIAN"
          className="
            bg-zinc-800
            hover:bg-purple-600
            active:scale-95
            transition
            duration-300
            px-6
            py-6
            rounded-3xl
            text-xl
            sm:text-2xl
            text-center
            shadow-2xl
            hover:scale-105
            font-bold
          "
        >
          ⚽ LESBICHE 🍺
        </Link>
      </div>
    </main>
  );
}