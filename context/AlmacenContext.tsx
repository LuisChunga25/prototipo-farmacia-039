"use client";

import { createContext, useContext, useState } from "react";

interface Almacen {
  value: string;
  label: string;
}

type AlmacenContextType = {
  almacen: string;
  setAlmacen: (value: string) => void;
};

const AlmacenContext = createContext<AlmacenContextType | undefined>(undefined);

const almacenes = [
  { value: "A", label: "A - ALMACEN GENERAL (MEDICAMENTOS)" },
  { value: "AI", label: "AI - ALMACEN INSUMOS" },
  { value: "CE", label: "CE - CONSULTORIOS EXTERNOS" },
  { value: "DU", label: "DU - FARMACIA DOSIS UNITARIA" },
  { value: "F", label: "F - FARMACIA EMERGENCIA" },
];

export function AlmacenProvider({ children }: { children: React.ReactNode }) {
  const [almacen, setAlmacen] = useState("F"); // valor por defecto

  return (
    <AlmacenContext.Provider value={{ almacen, setAlmacen }}>
      {children}
    </AlmacenContext.Provider>
  );
};

export function useAlmacen() {
  const context = useContext(AlmacenContext);
  if (!context) {
    throw new Error("useAlmacen debe usarse dentro de un AlmacenProvider");
  }
  return context;
}
