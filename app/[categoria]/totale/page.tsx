"use client";

import Link from "next/link";
import { use, useEffect, useState } from "react";

type Elemento = {
  nome: string;
  punti: number;
};

export default function Totale({
  params,
}: {
  params: Promise<{ categoria: string }>;
}) {
  const { categoria } = use(params);

  const [classifica, setClassifica] =
    useState<Elemento[]>([]);

  const [selezionati, setSelezionati] =
    useState<string[]>([]);

  const [completato, setCompletato] =
    useState(false);

  // Mescola array
  const mescolaArray = (
    array: Elemento[]
  ) => {
    return [...array].sort(
      () => Math.random() - 0.5
    );
  };

  // Carica classifica
  useEffect(() => {
    const datiSalvati =
      localStorage.getItem(
        `classifica-${categoria}`
      );

    if (datiSalvati) {
      const dati = JSON.parse(
        datiSalvati
      );

      const ordinata = [...dati].sort(
        (a, b) => b.punti - a.punti
      );

      setClassifica(
        mescolaArray(ordinata)
      );
    }
  }, [categoria]);

  // Seleziona/deseleziona
  const toggleElemento = (
    nome: string
  ) => {
    if (selezionati.includes(nome)) {
      setSelezionati(
        selezionati.filter(
          (e) => e !== nome
        )
      );
    } else {
      setSelezionati([
        ...selezionati,
        nome,
      ]);
    }
  };

  // Classifica ordinata
  const classificaOrdinata = [
    ...classifica,
  ].sort((a, b) => b.punti - a.punti);

  // Punti massimi
  const puntiMassimi =
    classificaOrdinata.reduce(
      (totale, _, index) =>
        totale +
        (classificaOrdinata.length -
          index),
      0
    );

  // Punti ottenuti
  const puntiOttenuti =
    classificaOrdinata.reduce(
      (totale, elemento, index) => {
        const valore =
          classificaOrdinata.length -
          index;

        if (
          selezionati.includes(
            elemento.nome
          )
        ) {
          return totale + valore;
        }

        return totale;
      },
      0
    );

  // Percentuale finale
  const percentuale =
    puntiMassimi > 0
      ? (
          (puntiOttenuti /
            puntiMassimi) *
          100
        ).toFixed(1)
      : 0;

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
          max-w-3xl
          mx-auto
        "
      >
        <h1
          className="
            text-5xl
            font-bold
            text-center
            mb-12
            capitalize
          "
        >
          📊 Totale {categoria}
        </h1>

        <div
          className="
            flex
            flex-col
            gap-4
          "
        >
          {classifica.map(
            (elemento, index) => (
              <label
                key={index}
                className="
                  bg-zinc-900
                  border
                  border-zinc-700
                  rounded-2xl
                  p-5
                  flex
                  items-center
                  gap-4
                  text-xl
                  cursor-pointer
                  hover:bg-zinc-800
                  transition
                "
              >
                <input
                  type="checkbox"
                  disabled={completato}
                  onChange={() =>
                    toggleElemento(
                      elemento.nome
                    )
                  }
                  className="
                    w-6
                    h-6
                  "
                />

                {elemento.nome}
              </label>
            )
          )}
        </div>

        {!completato && (
          <div
            className="
              flex
              justify-center
            "
          >
            <button
              onClick={() =>
                setCompletato(true)
              }
              className="
                mt-10
                bg-pink-600
                hover:bg-pink-700
                transition
                px-10
                py-4
                rounded-3xl
                text-2xl
                font-bold
                shadow-2xl
                hover:scale-105
              "
            >
              ✅ Completa
            </button>
          </div>
        )}

        {completato && (
          <div
            className="
              mt-14
              bg-zinc-900
              border
              border-zinc-700
              rounded-3xl
              p-10
              text-center
              shadow-2xl
            "
          >
            <h2
              className="
                text-3xl
                mb-4
              "
            >
              {puntiOttenuti} /{" "}
              {puntiMassimi} punti
            </h2>

            <h1
              className="
                text-7xl
                font-bold
                text-pink-400
                mb-8
              "
            >
              {percentuale}%
            </h1>

            {Number(percentuale) <
              10 && (
              <h2 className="text-4xl">
                🪨 Etero (EW)
              </h2>
            )}

            {Number(percentuale) >=
              10 &&
              Number(percentuale) <
                30 && (
                <h2 className="text-4xl">
                  🥉 Etero tendente al
                  gay
                </h2>
              )}

            {Number(percentuale) >=
              30 &&
              Number(percentuale) <
                50 && (
                <h2 className="text-4xl">
                  🥈 Gay
                </h2>
              )}

            {Number(percentuale) >=
              50 &&
              Number(percentuale) <
                90 && (
                <h2 className="text-4xl">
                  🥇 Gay Esperto
                </h2>
              )}

            {Number(percentuale) >=
              90 && (
              <h2 className="text-4xl">
                👑 Super Gay
                Leggendario
              </h2>
            )}
          </div>
        )}
      </div>
    </main>
  );
}