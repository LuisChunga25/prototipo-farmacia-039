"use client"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, CreditCard, FileSpreadsheet, Package, Printer, RotateCcw, ShoppingCart } from 'lucide-react'
import { useState, useEffect } from "react"

export default function FarmacovigilanciaPage() {
  const [currentDate, setCurrentDate] = useState("")
  const [userName, setUserName] = useState("JHOLGUIN")
  const [almacen, setAlmacen] = useState("FARMACIA")
  const periodo = "Marzo 2025"

  useEffect(() => {
    // Obtener fecha actual
    const now = new Date()
    const formattedDate = now
      .toLocaleDateString("es-ES", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      })
      .replace(/\//g, "/")

    setCurrentDate(formattedDate)

    // Obtener información del usuario del localStorage
    if (typeof window !== "undefined") {
      const userStr = localStorage.getItem("hospital-user")
      if (userStr) {
        const user = JSON.parse(userStr)
        setUserName(user.name || "JHOLGUIN")
      }
    }
  }, [])

  return (
    <div className="space-y-4">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Farmacovigilancia</h1>
          <p className="text-muted-foreground text-sm">Formatos del comité de farmacovigilancia y tecnovigilancia para todos los servicios.</p>
        </div>
        <div className="flex gap-2">
          <Link href="/dashboard">
            <Button variant="outline" size="sm" className="gap-1">
              <ArrowLeft className="h-4 w-4" />
              Volver
            </Button>
          </Link>
        </div>
      </div>

      {/* No info bar needed here as it's already in the footer */}

      <div className="grid gap-4 grid-cols-2 md:grid-cols-3">
        <Link href="/dashboard/farmacovigilancia/medicamentos" className="block">
          <Card className="hospital-card h-full hover:border-primary cursor-pointer transition-colors">
            <CardHeader className="p-4">
              <CardTitle className="text-lg flex items-center gap-2">
                <ShoppingCart className="h-5 w-5 text-primary" />
                Medicamentos
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 pt-0">
              <CardDescription className="text-xs">Notificación de sospechas de reacciones adversas a medicamentos u otros productos farmacéuticos</CardDescription>
            </CardContent>
          </Card>
        </Link>

        <Link href="/dashboard/farmacovigilancia/dispositivos-medicos" className="block">
          <Card className="hospital-card h-full hover:border-primary cursor-pointer transition-colors">
            <CardHeader className="p-4">
              <CardTitle className="text-lg flex items-center gap-2">
                <ShoppingCart className="h-5 w-5 text-primary" />
                Dispositivos médicos
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 pt-0">
              <CardDescription className="text-xs">Notificación de sospechas adversas a dispositivos médicos</CardDescription>
            </CardContent>
          </Card>
        </Link>

        <Link href="/dashboard/farmacovigilancia/vacunas" className="block">
          <Card className="hospital-card h-full hover:border-primary cursor-pointer transition-colors">
            <CardHeader className="p-4">
              <CardTitle className="text-lg flex items-center gap-2">
                <CreditCard className="h-5 w-5 text-primary" />
                Vacunas
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 pt-0">
              <CardDescription className="text-xs">Notificación de eventos supuestamente atribuidos a vacunas</CardDescription>
            </CardContent>
          </Card>
        </Link>

        {/*<Link href="/dashboard/farmacovigilancia/cartilla-medicamentos" className="block">
          <Card className="hospital-card h-full hover:border-primary cursor-pointer transition-colors">
            <CardHeader className="p-4">
              <CardTitle className="text-lg flex items-center gap-2">
                <FileSpreadsheet className="h-5 w-5 text-primary" />
                Cartilla de uso seguro de medicamentos
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 pt-0">
              <CardDescription className="text-xs">Supervisión del consumo de medicamentos realizado al paciente hospitalizado</CardDescription>
            </CardContent>
          </Card>
        </Link>

        <Link href="/dashboard/ventas/paquetes" className="block">
          <Card className="hospital-card h-full hover:border-primary cursor-pointer transition-colors">
            <CardHeader className="p-4">
              <CardTitle className="text-lg flex items-center gap-2">
                <Package className="h-5 w-5 text-primary" />
                Armado de Paquetes
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 pt-0">
              <CardDescription className="text-xs">Configuración y gestión de paquetes de productos</CardDescription>
            </CardContent>
          </Card>
        </Link>

        <Link href="/dashboard/ventas/devoluciones" className="block">
          <Card className="hospital-card h-full hover:border-primary cursor-pointer transition-colors">
            <CardHeader className="p-4">
              <CardTitle className="text-lg flex items-center gap-2">
                <RotateCcw className="h-5 w-5 text-primary" />
                Devolución de Medicamentos
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 pt-0">
              <CardDescription className="text-xs">Gestión de devoluciones de productos</CardDescription>
            </CardContent>
          </Card>
        </Link>

        <Link href="/dashboard/ventas/visualizador" className="block">
          <Card className="hospital-card h-full hover:border-primary cursor-pointer transition-colors">
            <CardHeader className="p-4">
              <CardTitle className="text-lg flex items-center gap-2">
                <Printer className="h-5 w-5 text-primary" />
                Visualizador de Proformas Emitidas
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 pt-0">
              <CardDescription className="text-xs">Consulta y gestión de proformas emitidas</CardDescription>
            </CardContent>
          </Card>
        </Link>*/}
      </div>
    </div>
  )
}

