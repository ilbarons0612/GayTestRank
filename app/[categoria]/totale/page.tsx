"use client";

import Link from "next/link";
import { use, useEffect, useState } from "react";
import { supabase } from "../../../lib/supabase";

type Elemento = {
  nome: string;
  punti: number;
  categoria: string;
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
    const caricaClassifica =
      async () => {
        const { data, error } =
          await supabase
            .from("classifica")
            .select("*")
            .eq(
              "categoria",
              categoria
            );

        if (error) {
          console.log(
            "ERRORE SUPABASE:",
            error
          );
          return;
        }

        const ordinata = [
          ...(data || []),
        ].sort(
          (a, b) =>
            b.punti - a.punti
        );

        setClassifica(
          mescolaArray(ordinata)
        );
      };

    caricaClassifica();
  }, [categoria]);

  // Toggle checkbox
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

  // Percentuale
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
        px-4
        py-10
      "
    >
      <Link
        href={`/${categoria}`}
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
          shadow-lg
          text-sm
          sm:text-base
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
            text-3xl
            sm:text-5xl
            font-black
            text-center
            mb-8
            capitalize
          "
        >
          📊 Totale {categoria}
        </h1>

        <div
          className="
            flex
            flex-col
            gap-3
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
                  p-4
                  sm:p-5
                  flex
                  items-center
                  gap-4
                  text-base
                  sm:text-xl
                  cursor-pointer
                  hover:bg-zinc-800
                  transition
                  break-words
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
                    w-5
                    h-5
                    sm:w-6
                    sm:h-6
                    shrink-0
                  "
                />

                <span>
                  {elemento.nome}
                </span>
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
                mt-8
                w-full
                sm:w-auto
                bg-pink-600
                hover:bg-pink-700
                active:scale-95
                transition
                px-10
                py-4
                rounded-3xl
                text-xl
                sm:text-2xl
                font-black
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
              mt-10
              bg-zinc-900
              border
              border-zinc-700
              rounded-3xl
              p-6
              sm:p-10
              text-center
              shadow-2xl
            "
          >
            <h2
              className="
                text-xl
                sm:text-3xl
                mb-4
              "
            >
              {puntiOttenuti} /{" "}
              {puntiMassimi} punti
            </h2>

            <h1
              className="
                text-5xl
                sm:text-7xl
                font-black
                text-pink-400
                mb-6
              "
            >
              {percentuale}%
            </h1>

            {Number(percentuale) <
              10 && (
              <h2
                className="
                  text-2xl
                  sm:text-4xl
                  font-bold
                "
              >
                🤮 Etero (EW)
              </h2>
            )}

            {Number(percentuale) >=
              10 &&
              Number(percentuale) <
                30 && (
                <h2
                  className="
                    text-2xl
                    sm:text-4xl
                    font-bold
                  "
                >
                  😏 Etero tendente
                  al {categoria}
                </h2>
              )}

            {Number(percentuale) >=
              30 &&
              Number(percentuale) <
                50 && (
                <h2
                  className="
                    text-2xl
                    sm:text-4xl
                    font-bold
                  "
                >
                  🤩 {categoria}
                </h2>
              )}

            {Number(percentuale) >=
              50 &&
              Number(percentuale) <
                90 && (
                <h2
                  className="
                    text-2xl
                    sm:text-4xl
                    font-bold
                  "
                >
                  🥵 {categoria} Esperto
                </h2>
              )}

            {Number(percentuale) >=
              90 && (
              <h2
                className="
                  text-2xl
                  sm:text-4xl
                  font-bold
                "
              >
                🫦👅 Super {categoria}
                Leggendario
              </h2>
            )}
          </div>
        )}
      </div>
    </main>
  );
}