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
        p-10
      "
    >
      <Link
        href="/"
        className="
          absolute
          top-6
          left-6
          bg-zinc-800
          hover:bg-zinc-700
          px-4
          py-2
          rounded-xl
          transition
        "
      >
        ← Indietro
      </Link>

      <h1
        className="
          text-5xl
          font-bold
          mb-12
          capitalize
        "
      >
        🌈 {categoria}
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
          href={`/${categoria}/classifica`}
          className="
            bg-blue-600
            hover:bg-blue-700
            transition
            p-6
            rounded-3xl
            text-2xl
            text-center
            shadow-xl
            hover:scale-105
          "
        >
          🏆 Vai alla Classifica
        </Link>

        <Link
          href={`/${categoria}/scegli`}
          className="
            bg-pink-600
            hover:bg-pink-700
            transition
            p-6
            rounded-3xl
            text-2xl
            text-center
            shadow-xl
            hover:scale-105
          "
        >
          ⚔️ Vai alle Scelte
        </Link>

        <Link
          href={`/${categoria}/totale`}
          className="
            bg-purple-600
            hover:bg-purple-700
            transition
            p-6
            rounded-3xl
            text-2xl
            text-center
            shadow-xl
            hover:scale-105
          "
        >
          📊 Vai al Totale
        </Link>
      </div>
    </main>
  );
}