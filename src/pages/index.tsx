"use client";
import React from "react";
import TufekGoruntule from "./TufekGoruntule";
import Link from "next/link";
function index() {
  return (
    <div className="flex flex-col gap-2 p-4">
      {/*  <Link
        href={"TufekGoruntule"}
        className="rounded-lg px-4 py-2 bg-orange-500 text-white font-bold w-fit hover:bg-orange-200"
      >
        Tufek Goruntule - Deneme 1 - Sadece 1 Dosya
      </Link> */}
      <Link
        href={"TufekParcalari"}
        className="rounded-lg px-4 py-2 bg-orange-500 text-white font-bold w-fit hover:bg-orange-200"
      >
        Tufek Parcalari - Deneme 1 - Birkac Dosya
      </Link>
    </div>
  );
}

export default index;
