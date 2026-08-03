"use client";

import { useState } from "react";
import ServicesHero from "@/sections/ServicesHero";
import SubServicesBands from "@/sections/subservices";

/** Holds the hero-tag ↔ band-filter selection shared between ServicesHero
 *  and SubServicesBands. Split out from services/page.tsx (a Server
 *  Component, for its `metadata` export) since this state has to live in a
 *  Client Component. */
export default function ServicesPageBody() {
  const [selectedService, setSelectedService] = useState<string | null>(null);

  return (
    <>
      <ServicesHero selectedId={selectedService} onSelectService={setSelectedService} />
      <SubServicesBands selectedId={selectedService} />
    </>
  );
}
