"use client"

import Link from "next/link"
import React, { use, useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import {
    FilePlus,
    FileEdit,
    Trash2,
    BarChart2,
    Printer,
    FileSpreadsheet,
    ArrowLeft,
    Search,
    RefreshCw,
    Filter,
    Eraser,
    Plus,
    Edit,
    Eye,
    CheckCircle,
    X,
    History,
    FileText,
    RefreshCcw,
    CirclePlus,
    User,
    Stethoscope,
    HelpCircle,
    BadgeCheck,
    ClipboardCheck,
    AlertTriangle,
    CheckCircleIcon,
    ClipboardList,
} from "lucide-react"
import { useRouter } from "next/navigation"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"

// Define la interfaz
interface Proforma {
    id: number;
    estado: string;
    ordenId: string;
    numReceta: string;
    cuentaId: string;
    fecha: string;
    hora: string;
    fecha_proceso: string;
    hora_proceso: string;
    numPaciente: string;
    historia: string;
    nombrePaciente: string;
    tipoSeguro: string;
    medico: string;
    nombreAlmacen: string;
    nombreConsultorio: string;
    tipoPago: string;
    total: number;
    usuario: string;
    medicamentos: {
        producto: string;
        cantSolicitada: number;
        cantAsignada: number;
        precio: string;
        importe: string;
        lote: string;
        fechaVenc: string;
    }[];
}

interface Subfila {
    cantAsignada: number;
    precio: string;
    importe: string;
    lote: string;
    venc: string;
}

interface Medicamento {
    item: number;
    producto: string;
    presentacion: string;
    sisMed: string;
    siga: string;
    cantSolicitada: number;
    subfilas: Subfila[];
}

interface Receta {
    fecha: string;
    seguro: string;
    servicio: string;
    farmaco: string;
    presentacion: string;
    cantidad: number;
    indicacion: string;
    via: string;
    diagnostico: string;
    medico: string;
}

interface Lote {
    cantAsignada: number;
    precio: string;
    importe: string;
    lote: string;
    venc: string;
}

interface MedicamentoBase {
    producto: string;
    sisMed: string;
    siga: string;
    presentacion: string;
    cantidadSolicitada?: number;
    lotes: Lote[];
}

const conteoData = [
    { consultorio: "Cirugía", m: 3, t: 2, efectivo: 120.00 },
    { consultorio: "Cardiología", m: 17, t: 0, efectivo: 350.00 },
    { consultorio: "Endocrinología", m: 5, t: 12, efectivo: 280.00 },
    { consultorio: "Gastroenterología", m: 11, t: 8, efectivo: 410.00 },
    { consultorio: "Geriatría", m: 11, t: 8, efectivo: 410.00 },
    { consultorio: "Ginecología", m: 11, t: 8, efectivo: 410.00 },
    { consultorio: "Infectología", m: 11, t: 8, efectivo: 410.00 },
    { consultorio: "Medicina Interna", m: 11, t: 8, efectivo: 410.00 },
    { consultorio: "Medicina Física y Rehabilitación", m: 11, t: 8, efectivo: 410.00 },
    { consultorio: "Neumología", m: 11, t: 8, efectivo: 410.00 },
    { consultorio: "Neurología", m: 11, t: 8, efectivo: 410.00 },
    { consultorio: "Oftalmología", m: 11, t: 8, efectivo: 410.00 },
    { consultorio: "Otorrinolaringología", m: 11, t: 8, efectivo: 410.00 },
    { consultorio: "Psiquiatría", m: 11, t: 8, efectivo: 410.00 },
    { consultorio: "Reumatología", m: 11, t: 8, efectivo: 410.00 },
    { consultorio: "Urología", m: 11, t: 8, efectivo: 410.00 },
    { consultorio: "Laboratorio", m: 11, t: 8, efectivo: 410.00 },
    { consultorio: "SOAT", m: 11, t: 8, efectivo: 410.00 },
    { consultorio: "Programa (TB - MAMIS - VIH - PLANIF)", m: 11, t: 8, efectivo: 410.00 },
    { consultorio: "Pagantes de Consultorios HJATCH", m: 11, t: 8, efectivo: 410.00 },
    { consultorio: "Pagantes Particulares con Receta", m: 11, t: 8, efectivo: 410.00 },
    { consultorio: "Pagantes Particulares sin Receta", m: 11, t: 8, efectivo: 410.00 },
]


export default function SalidasPage() {
    const router = useRouter();
    const hoy = new Date().toISOString().split("T")[0];
    const [fechaFiltro, setFechaFiltro] = useState(hoy);
    const totalM = conteoData.reduce((acc, fila) => acc + fila.m, 0);
    const totalT = conteoData.reduce((acc, fila) => acc + fila.t, 0);
    const totalRecetas = conteoData.reduce((acc, fila) => acc + fila.m + fila.t, 0);
    const montoEfectivo = conteoData.reduce((acc, fila) => acc + fila.efectivo, 0);

    const opcionesBusqueda = [
        { value: "ordenId", label: "Orden ID" },
        { value: "receta", label: "N° Receta" },
        { value: "historia", label: "Historia Clínica" },
        { value: "paciente", label: "Paciente" },
        { value: "almacen", label: "Almacén" },
    ];

    const getEstadoBadge = (estado: string) => {
        const variants = {
            "1": "bg-yellow-100 text-yellow-800 border-yellow-300",
            "2": "bg-green-100 text-green-800 border-green-300",
            "3": "bg-red-100 text-red-800 border-red-300",
        }

        const nombreEstado = {
            "1": "REGISTRADO",
            "2": "PROCESADO",
            "3": "ANULADO",
        }

        return <Badge className={`${variants[estado as keyof typeof variants]}`}>{nombreEstado[estado as keyof typeof nombreEstado]}</Badge>
    }

    // RESETEAR MODAL
    const resetForm = () => { };

    // LIMPIAR FILTROS DE BÚSQUEDA
    const limpiarFiltros = () => { };


    return (
        <div className="container mx-auto py-6">
            <div className="flex items-center gap-4 mb-4">
                <Button
                    variant="outline"
                    className="border border-gray-300 h-9 shadow-sm cursor-pointer hover:shadow-md hover:bg-gray-100 transition"
                    onClick={() => router.push("/dashboard/reportes")}
                >
                    <Link href="/dashboard/reportes">
                        <ArrowLeft className="w-5 h-5" />
                    </Link>
                    Regresar
                </Button>
                <div>
                    <h1 className="text-2xl font-bold tracking-tight">Conteo de Recetas</h1>
                    <p className="text-muted-foreground">Reporte diario sobre la cantidad de recetas en consultorios externos</p>
                </div>
            </div>

            <div className="flex items-center py-4 justify-between">
                <div className="flex items-end gap-4">
                    <div className="flex flex-col">
                        <Label htmlFor="fechaFin" className="mb-1">Fecha:</Label>
                        <Input
                            id="fechaFin"
                            type="date"
                            className="h-10 w-40"
                            value={fechaFiltro}
                            onChange={(e) => setFechaFiltro(e.target.value)}
                        />
                    </div>
                </div>

                <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="gap-1" onClick={limpiarFiltros}>
                        <Eraser className="h-4 w-4" />
                        Limpiar Filtros
                    </Button>

                    <Button variant="outline" size="sm" className="gap-1">
                        <RefreshCw className="h-4 w-4" />
                        Actualizar
                    </Button>
                </div>
            </div>

            <div className="overflow-x-auto border rounded-md">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead rowSpan={2} className="text-center font-semibold bg-gray-100">Consultorio</TableHead>
                            <TableHead colSpan={3} className="text-center font-semibold bg-gray-100">Cantidad de Recetas</TableHead>
                            <TableHead rowSpan={2} className="text-center font-semibold bg-gray-100">Cantidad de Efectivo</TableHead>
                            <TableHead rowSpan={2} className="text-center font-semibold bg-gray-100">Acciones</TableHead>
                        </TableRow>

                        <TableRow>
                            <TableHead className="text-center bg-gray-50">M</TableHead>
                            <TableHead className="text-center bg-gray-50">T</TableHead>
                            <TableHead className="text-center bg-gray-50">Total</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {conteoData.map((fila, index) => (
                            <TableRow key={index}>
                                <TableCell className="font-medium">{fila.consultorio}</TableCell>
                                <TableCell className="text-center">{fila.m}</TableCell>
                                <TableCell className="text-center">{fila.t}</TableCell>
                                <TableCell className="text-center font-semibold">{fila.m + fila.t}</TableCell>
                                <TableCell className="text-right font-bold text-green-700">
                                    S/ {fila.efectivo.toFixed(2)}
                                </TableCell>
                                <TableCell className="text-center">
                                    <button className="text-blue-600 hover:underline flex items-center gap-1">
                                        <Eye className="w-4 h-4" /> Ver detalle
                                    </button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>

            <div className="mt-4 p-4 border rounded-md bg-gray-50">
                <p className="font-semibold">Total de Recetas:</p>
                <ul className="list-disc list-inside text-sm">
                    <li>Mañana (M): {totalM}</li>
                    <li>Tarde (T): {totalT}</li>
                    <li>Total general: {totalRecetas}</li>
                </ul>

                <p className="font-semibold mt-2">Monto Efectivo:</p>
                <p className="text-green-700 font-bold">S/ {montoEfectivo.toFixed(2)}</p>
            </div>

        </div>
    )
}

