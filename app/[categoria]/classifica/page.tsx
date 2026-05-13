"use client";

import Link from "next/link";
import { use, useEffect, useState } from "react";
import { classifiche } from "../../data/classifiche";

export default function Classifica({
  params,
}: {
  params: Promise<{ categoria: string }>;
}) {
  const { categoria } = use(params);

  const [classifica, setClassifica] =
    useState<any[]>([]);

  useEffect(() => {
    const datiSalvati =
      localStorage.getItem(
        `classifica-${categoria}`
      );

    if (datiSalvati) {
      setClassifica(
        JSON.parse(datiSalvati)
      );
    } else {
      const base =
        classifiche[
          categoria as keyof typeof classifiche
        ] || [];

      localStorage.setItem(
        `classifica-${categoria}`,
        JSON.stringify(base)
      );

      setClassifica(base);
    }
  }, [categoria]);

  const classificaOrdinata = [
    ...classifica,
  ].sort((a, b) => b.punti - a.punti);

  const resetClassifica = () => {
    const base =
      classifiche[
        categoria as keyof typeof classifiche
      ] || [];

    localStorage.setItem(
      `classifica-${categoria}`,
      JSON.stringify(base)
    );

    setClassifica(base);
  };

  return (
    <main
      className="
        relative
        min-h-screen
        bg-zinc-950
        text-white
        p-10
      "
    >
      <Link
        href={`/${categoria}`}
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

      <div
        className="
          max-w-2xl
          mx-auto
        "
      >
        <h1
          className="
            text-5xl
            font-bold
            text-center
            mb-10
            capitalize
          "
        >
          🏆 Classifica {categoria}
        </h1>

        <div
          className="
            flex
            flex-wrap
            gap-4
            justify-center
            mb-10
          "
        >
          <Link
            href={`/${categoria}/scegli`}
            className="
              bg-pink-600
              hover:bg-pink-700
              transition
              px-6
              py-3
              rounded-2xl
              shadow-lg
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
              px-6
              py-3
              rounded-2xl
              shadow-lg
            "
          >
            📊 Vai al Totale
          </Link>

          <button
            onClick={resetClassifica}
            className="
              bg-red-600
              hover:bg-red-700
              transition
              px-6
              py-3
              rounded-2xl
              shadow-lg
            "
          >
            🔄 Reset
          </button>
        </div>

        <div className="flex flex-col gap-4">
          {classificaOrdinata.map(
            (elemento, index) => (
              <div
                key={index}
                className="
                  bg-zinc-900
                  border
                  border-zinc-700
                  rounded-3xl
                  p-5
                  flex
                  justify-between
                  items-center
                  shadow-lg
                "
              >
                <div
                  className="
                    flex
                    items-center
                    gap-4
                  "
                >
                  <div
                    className="
                      text-3xl
                      font-bold
                    "
                  >
                    #{index + 1}
                  </div>

                  <div
                    className="
                      text-2xl
                    "
                  >
                    {elemento.nome}
                  </div>
                </div>

                <div
                  className="
                    text-xl
                    text-pink-400
                    font-bold
                  "
                >
                  {elemento.punti} pt
                </div>
              </div>
            )
          )}
        </div>
      </div>
    </main>
  );
}