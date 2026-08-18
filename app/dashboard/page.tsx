"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Database, Home, FileText, DollarSign, AlertTriangle } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { AlertDialogHeader } from "@/components/ui/alert-dialog"

// Datos de prueba de medicamentos
const medicamentosPrueba: any[] = [
  {
    producto: "PARACETAMOL 500 MG",
    presentacion: "TAB",
    subfilas: [
      { lote: "LTPAR22222", venc: "31/10/2026" },
      { lote: "LTPAR33333", venc: "31/12/2026" },
    ],
  },
  {
    producto: "AMOXICILINA 500 MG",
    presentacion: "TAB",
    subfilas: [
      { lote: "LTAMOX210702", venc: "30/09/2026" },
    ],
  },
]

// Función para calcular color según vencimiento
const obtenerColorVencimiento = (fechaVenc: string) => {
  const [dia, mes, anio] = fechaVenc.split("/").map(Number)
  const fechaVencimiento = new Date(anio, mes - 1, dia)
  const hoy = new Date()

  const diferenciaMeses =
    (fechaVencimiento.getFullYear() - hoy.getFullYear()) * 12 +
    (fechaVencimiento.getMonth() - hoy.getMonth())

  if (diferenciaMeses <= 3) return "bg-red-500 text-white"
  if (diferenciaMeses <= 6) return "bg-yellow-400 text-black"
  return "bg-green-500 text-white"
}

export default function Dashboard() {
  const [userName, setUserName] = useState("Usuario")
  const [openSemaforo, setOpenSemaforo] = useState(true);

  useEffect(() => {
    // Obtener información del usuario del localStorage
    if (typeof window !== "undefined") {
      const userStr = localStorage.getItem("hospital-user")
      if (userStr) {
        const user = JSON.parse(userStr)
        setUserName(user.name)
      }
    }
  }, [])

  return (
    <div className="space-y-8 pt-4">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Sistema de Farmacia Web</h1>
        <p className="text-muted-foreground text-sm">Seleccione la opción a la que desea acceder</p>
      </div>

      {/* Modal de semaforización */}
      <Dialog open={openSemaforo} onOpenChange={setOpenSemaforo}>
        <DialogContent
          onInteractOutside={(e) => e.preventDefault()}
          onEscapeKeyDown={(e) => e.preventDefault()}
          className="sm:max-w-lg bg-white rounded-lg shadow-lg pt-8 pr-8"
        >
          <DialogHeader className="flex items-center gap-2 bg-blue-50 p-3 rounded-t">
            <AlertTriangle className="h-5 w-5 text-red-500" />
            <DialogTitle className="text-lg font-bold text-gray-800">Medicamentos próximos a vencer</DialogTitle>
          </DialogHeader>
          <div className="space-y-3">
            {medicamentosPrueba.map((med, idx) =>
              med.subfilas.map((subfila: any, i: number) => (
                <div
                  key={`${idx}-${i}`}
                  className="flex items-center justify-between bg-gray-50 border border-gray-200 p-3 rounded-md shadow-sm"
                >
                  <div>
                    <span className="font-semibold text-gray-700">{med.producto}</span>
                    <div className="text-xs text-gray-500">
                      Lote {subfila.lote} - F. Venc: {subfila.venc}
                    </div>
                  </div>
                  
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-bold ${obtenerColorVencimiento(
                      subfila.venc
                    )}`}
                  >
                    {obtenerColorVencimiento(subfila.venc).includes("red")
                      ? "⚠️ Urgente"
                      : obtenerColorVencimiento(subfila.venc).includes("yellow")
                        ? "Medio"
                        : "✔️ OK"}
                  </span>
                </div>
              ))
            )}
          </div>
        </DialogContent>
      </Dialog>

      <div className="grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
        <Link href="/dashboard/tablas" className="block">
          <Card className="hospital-card h-full hover:border-primary cursor-pointer transition-colors shadow-sm hover:shadow-md">
            <CardHeader className="p-6">
              <CardTitle className="text-xl flex items-center gap-3">
                <Database className="h-8 w-8 text-primary" />
                Tablas
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 pt-0">
              <CardDescription className="text-sm">
                Gestión de tablas maestras: Items, Precios, Presentaciones, Familias y más.
              </CardDescription>
            </CardContent>
          </Card>
        </Link>

        <Link href="/dashboard/almacenes" className="block">
          <Card className="hospital-card h-full hover:border-primary cursor-pointer transition-colors shadow-sm hover:shadow-md">
            <CardHeader className="p-6">
              <CardTitle className="text-xl flex items-center gap-3">
                <Home className="h-8 w-8 text-primary" />
                Almacenes
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 pt-0">
              <CardDescription className="text-sm">
                Gestión de ingresos, salidas, transferencias, stock, kardex, inventarios y pedidos.
              </CardDescription>
            </CardContent>
          </Card>
        </Link>

        <Link href="/dashboard/reportes" className="block">
          <Card className="hospital-card h-full hover:border-primary cursor-pointer transition-colors shadow-sm hover:shadow-md">
            <CardHeader className="p-6">
              <CardTitle className="text-xl flex items-center gap-3">
                <FileText className="h-8 w-8 text-primary" />
                Reportes
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 pt-0">
              <CardDescription className="text-sm">
                Parte diario, consumo valorizado, listados, recetas, curvas ABC y más.
              </CardDescription>
            </CardContent>
          </Card>
        </Link>

        <Link href="/dashboard/ventas" className="block">
          <Card className="hospital-card h-full hover:border-primary cursor-pointer transition-colors shadow-sm hover:shadow-md">
            <CardHeader className="p-6">
              <CardTitle className="text-xl flex items-center gap-3">
                <DollarSign className="h-8 w-8 text-primary" />
                Ventas
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 pt-0">
              <CardDescription className="text-sm">
                Proformas contado, crédito, exoneradas, armado de paquetes y devoluciones.
              </CardDescription>
            </CardContent>
          </Card>
        </Link>
      </div>
    </div>
  )
}

