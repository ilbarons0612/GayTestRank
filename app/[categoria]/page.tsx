import Link from "next/link";

export default async function CategoriaPage({
  params,
}: {
  params: Promise<{ categoria: string }>;
}) {
  const { categoria } = await params;

  return (
    <main
      className="
        relative
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
      <Link
        href="/"
        className="
          absolute
          top-4
          left-4
          sm:top-6
          sm:left-6
          bg-zinc-800
          hover:bg-zinc-700
          active:scale-95
          px-4
          py-2
          rounded-2xl
          transition
          text-sm
          sm:text-base
          shadow-lg
        "
      >
        ← Indietro
      </Link>

      <h1
        className="
          text-4xl
          sm:text-5xl
          md:text-6xl
          font-black
          mb-10
          capitalize
          text-center
        "
      >
        🌈 {categoria}
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
        Scegli cosa vuoi fare.
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
          href={`/${categoria}/classifica`}
          className="
            bg-blue-600
            hover:bg-blue-700
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
          🏆 Classifica Gay Ufficiale
        </Link>

        <Link
          href={`/${categoria}/scegli`}
          className="
            bg-pink-600
            hover:bg-pink-700
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
          ⚔️ Cosa è più gay?
        </Link>

        <Link
          href={`/${categoria}/totale`}
          className="
            bg-purple-600
            hover:bg-purple-700
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
          📊 Quanto sei gay?
        </Link>
      </div>
    </main>
  );
}