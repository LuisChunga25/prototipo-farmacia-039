"use client"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, CreditCard, FileSpreadsheet, Package, Printer, RotateCcw, ShoppingCart } from 'lucide-react'
import { useState, useEffect } from "react"

export default function FarmaciaClinicaPage() {
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
          <h1 className="text-2xl font-bold tracking-tight">Farmacia Clínica</h1>
          <p className="text-muted-foreground text-sm">Seguimiento Farmacoterapéutico, hoja farmacoterapéutica, cartilla y más.</p>
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
        <Link href="/dashboard/farmacia-clinica/seguimiento-farmaco" className="block">
          <Card className="hospital-card h-full hover:border-primary cursor-pointer transition-colors">
            <CardHeader className="p-4">
              <CardTitle className="text-lg flex items-center gap-2">
                <ShoppingCart className="h-5 w-5 text-primary" />
                Seguimiento Farmacoterapéutico
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 pt-0">
              <CardDescription className="text-xs">Problemas relacionados a medicamentos</CardDescription>
            </CardContent>
          </Card>
        </Link>

        <Link href="/dashboard/farmacia-clinica/hoja-farmaco" className="block">
          <Card className="hospital-card h-full hover:border-primary cursor-pointer transition-colors">
            <CardHeader className="p-4">
              <CardTitle className="text-lg flex items-center gap-2">
                <ShoppingCart className="h-5 w-5 text-primary" />
                Hoja Farmacoterapéutica
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 pt-0">
              <CardDescription className="text-xs">Control de medicamentos del paciente hospitalizado</CardDescription>
            </CardContent>
          </Card>
        </Link>

        <Link href="/dashboard/farmacia-clinica/anamnesis-farmaco" className="block">
          <Card className="hospital-card h-full hover:border-primary cursor-pointer transition-colors">
            <CardHeader className="p-4">
              <CardTitle className="text-lg flex items-center gap-2">
                <CreditCard className="h-5 w-5 text-primary" />
                Anamnesis Farmacológica
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 pt-0">
              <CardDescription className="text-xs">Registro de atención realizada al paciente en materia de productos farmacéuticos</CardDescription>
            </CardContent>
          </Card>
        </Link>

        <Link href="/dashboard/farmacia-clinica/cartilla-medicamentos" className="block">
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

        {/*<Link href="/dashboard/ventas/paquetes" className="block">
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

