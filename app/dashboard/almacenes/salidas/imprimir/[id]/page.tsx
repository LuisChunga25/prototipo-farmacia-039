"use client"

import { Button } from "@/components/ui/button"

export default function ImprimirSalidaPage() {
  const handlePrint = () => {
    window.print()
  }

  return (
    <div className="bg-white p-8 text-black print:p-0">

      {/* Botón solo visible en pantalla */}
      <div className="flex justify-end mb-4 print:hidden">
        <Button onClick={handlePrint}>
          Imprimir
        </Button>
      </div>

      {/* DOCUMENTO */}
      <div className="border border-black p-6 text-sm">

        {/* HEADER */}
        <div className="grid grid-cols-3 items-center mb-4">
          <div>
            <p className="font-bold">PERÚ</p>
            <p>Ministerio de Salud</p>
          </div>

          <div className="text-center">
            <p className="font-bold text-lg">
              NOTA DE SALIDA N° 0001589
            </p>
          </div>

          <div className="text-right">
            <p>19/11/2025</p>
            <p>09:52:15</p>
          </div>
        </div>

        <p className="mb-4">
          <strong>USUARIO:</strong> SUPERVISOR
        </p>

        {/* DATOS GENERALES */}
        <table className="w-full border border-black mb-4">
          <tbody>
            <tr>
              <td className="border p-1 font-semibold">ORIGEN</td>
              <td className="border p-1">ALMACÉN GENERAL</td>
              <td className="border p-1 font-semibold">TIPO DOCUMENTO</td>
              <td className="border p-1">ACTA</td>
            </tr>
            <tr>
              <td className="border p-1 font-semibold">DESTINO</td>
              <td className="border p-1">
                HOSPITAL NACIONAL HIPOLITO UNANUE
              </td>
              <td className="border p-1 font-semibold">TIPO DE SALIDA</td>
              <td className="border p-1">
                TRANSFERENCIAS ENTRE UE
              </td>
            </tr>
            <tr>
              <td className="border p-1 font-semibold">FECHA EJECUCIÓN</td>
              <td className="border p-1">19/11/2025</td>
              <td className="border p-1 font-semibold">NRO DOCUMENTO</td>
              <td className="border p-1">ACTA TRANSF. N°75-2025</td>
            </tr>
          </tbody>
        </table>

        {/* OBSERVACIÓN */}
        <div className="mb-4">
          <strong>OBSERVACIÓN:</strong>
          <div className="border border-black h-12"></div>
        </div>

        {/* TABLA PRODUCTOS */}
        <table className="w-full border border-black text-xs">
          <thead>
            <tr className="bg-gray-100">
              <th className="border p-1">N°</th>
              <th className="border p-1">CÓDIGO</th>
              <th className="border p-1">DESCRIPCIÓN</th>
              <th className="border p-1">LOTE</th>
              <th className="border p-1">F.V.</th>
              <th className="border p-1">PRECIO</th>
              <th className="border p-1">CANT.</th>
              <th className="border p-1">IMPORTE</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border p-1 text-center">1</td>
              <td className="border p-1">00070</td>
              <td className="border p-1">
                ACETILCISTEINA 100 MG SOB
              </td>
              <td className="border p-1">LR12345</td>
              <td className="border p-1">02/02/2027</td>
              <td className="border p-1 text-right">0.90</td>
              <td className="border p-1 text-right">100</td>
              <td className="border p-1 text-right">90.00</td>
            </tr>
          </tbody>
        </table>

        {/* TOTAL */}
        <div className="text-right font-bold mt-4">
          TOTAL: S/ 2,308.50
        </div>

        {/* FIRMAS */}
        <div className="grid grid-cols-2 gap-8 mt-12">
          <div className="text-center">
            <div className="border-t border-black mt-8"></div>
            RESPONSABLE
          </div>
          <div className="text-center">
            <div className="border-t border-black mt-8"></div>
            RECIBÍ CONFORME
          </div>
        </div>

      </div>
    </div>
  )
}
