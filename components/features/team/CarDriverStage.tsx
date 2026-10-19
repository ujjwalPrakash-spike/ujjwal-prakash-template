// Combined stage mounting the car architecture and factory drivers sections.
"use client";

import React from "react";
import { CarSection } from "./CarSection";
import { DriversSection } from "./DriversSection";

export function CarDriverStage() {
  return (
    <>
      <CarSection />
      <DriversSection />
    </>
  );
}

export default CarDriverStage;
