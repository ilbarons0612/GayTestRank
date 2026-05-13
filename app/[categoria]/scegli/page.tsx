"use client";

import Link from "next/link";
import { use, useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

type Elemento = {
  id: number;
  categoria: string;
  nome: string;
  punti: number;
};

export default function Scegli({
  params,
}: {
  params: Promise<{ categoria: string }>;
}) {
  const { categoria } = use(params);

  const [elementi, setElementi] =
    useState<Elemento[]>([]);

  const [coppia, setCoppia] = useState([
    0, 1,
  ]);

  const generaCoppia = (
    lista: Elemento[]
  ) => {
    const primo = Math.floor(
      Math.random() * lista.length
    );

    let secondo = Math.floor(
      Math.random() * lista.length
    );

    while (secondo === primo) {
      secondo = Math.floor(
        Math.random() * lista.length
      );
    }

    return [primo, secondo];
  };

  // CARICA DATI DA SUPABASE
  useEffect(() => {
    caricaElementi();
  }, [categoria]);

  const caricaElementi = async () => {
    const { data, error } = await supabase
      .from("classifica")
      .select("*")
      .eq("categoria", categoria);
      
if (error) {
  console.log("ERRORE SUPABASE:", error);
  return;
}

console.log(data);

    setElementi(data || []);

    if (data && data.length >= 2) {
      setCoppia(generaCoppia(data));
    }
  };

  // VOTO
  const scegliElemento = async (
    elemento: Elemento
  ) => {
    const nuoviPunti =
      elemento.punti + 1;

    const { error } = await supabase
      .from("classifica")
      .update({
        punti: nuoviPunti,
      })
      .eq("id", elemento.id);

    if (error) {
      console.log(error);
      return;
    }

    const nuovaLista = elementi.map((e) =>
      e.id === elemento.id
        ? {
            ...e,
            punti: nuoviPunti,
          }
        : e
    );

    setElementi(nuovaLista);

    setCoppia(
      generaCoppia(nuovaLista)
    );
  };

  if (elementi.length < 2) {
    return (
      <main
        className="
          min-h-screen
          bg-zinc-950
          text-white
          flex
          items-center
          justify-center
        "
      >
        <h1 className="text-3xl">
          Caricamento...
        </h1>
      </main>
    );
  }

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

      <h1
        className="
          text-5xl
          font-bold
          text-center
          mb-16
          capitalize
        "
      >
        ⚔️ Scegli il preferito
      </h1>

      <div
        className="
          flex
          flex-col
          md:flex-row
          items-center
          justify-center
          gap-10
          w-full
          max-w-6xl
        "
      >
        <button
          onClick={() =>
            scegliElemento(
              elementi[coppia[0]]
            )
          }
          className="
            w-full
            md:w-[350px]
            h-[220px]
            bg-pink-600
            hover:bg-pink-700
            rounded-3xl
            text-4xl
            font-bold
            shadow-2xl
            transition
            hover:scale-105
          "
        >
          {
            elementi[coppia[0]]
              .nome
          }
        </button>

        <div
          className="
            text-5xl
            font-bold
            text-zinc-500
          "
        >
          VS
        </div>

        <button
          onClick={() =>
            scegliElemento(
              elementi[coppia[1]]
            )
          }
          className="
            w-full
            md:w-[350px]
            h-[220px]
            bg-purple-600
            hover:bg-purple-700
            rounded-3xl
            text-4xl
            font-bold
            shadow-2xl
            transition
            hover:scale-105
          "
        >
          {
            elementi[coppia[1]]
              .nome
          }
        </button>
      </div>
    </main>
  );
}