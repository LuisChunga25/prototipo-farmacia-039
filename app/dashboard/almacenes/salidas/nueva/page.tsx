"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft } from "lucide-react"
import { useRouter } from "next/navigation"
import { useState, useEffect } from "react"

const tipoDocSalida = [
    { id: "ACTA", codigo: "ACTA", nombre: "Acta" },
    { id: "RDS", codigo: "RDS", nombre: "Requerimiento de Servicios" },
    { id: "DDL", codigo: "DDL", nombre: "Distribución de Laboratorio" },
]

export default function NuevaSalidaPage() {
    const router = useRouter();

    const [tipoDocumento, setTipoDocumento] = useState("");
    const [documento, setDocumento] = useState("");
    const [observacion, setObservacion] = useState("");
    const [fechaActual, setFechaActual] = useState("");
    const [horaActual, setHoraActual] = useState("");
    const isACTA = tipoDocumento === "ACTA";
    const isRDS = tipoDocumento === "RDS";
    const isDDL = tipoDocumento === "DDL";

    // CALCULAR LA FECHA Y HORA ACTUALES
    useEffect(() => {
        const ahora = new Date();

        const dia = String(ahora.getDate()).padStart(2, "0");
        const mes = String(ahora.getMonth() + 1).padStart(2, "0");
        const anio = ahora.getFullYear();

        const fechaFormateada = `${dia}-${mes}-${anio}`;

        // Fecha formato YYYY-MM-DD
        const fecha = ahora.toISOString().split("T")[0];

        // Hora formato HH:mm:ss
        const hora = ahora.toLocaleTimeString("es-PE", {
            hour12: false,
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
        });

        setFechaActual(fechaFormateada);
        setHoraActual(hora);
    }, []);


    return (
        <div className="max-w-7xl mx-auto p-6 space-y-6 bg-slate-50/50 min-h-screen">

            {/* Header */}
            <div className="flex justify-between items-center bg-white rounded-lg p-4 shadow-sm border">
                <div className="flex items-center gap-4 w-full">
                    <Button
                        variant="outline"
                        onClick={() => router.push("/dashboard/almacenes/salidas")}
                    >
                        <ArrowLeft className="w-4 h-4 mr-1" />
                        Regresar
                    </Button>

                    <div>
                        <h1 className="text-xl font-bold">Registrar Nueva Salida</h1>
                        <p className="text-muted-foreground">
                            Complete los datos para registrar una salida
                        </p>
                    </div>

                    <div className="ml-auto flex items-center gap-4 bg-cyan-50 px-4 py-2 rounded-lg border border-cyan-200">
                        <div className="flex items-center gap-2">
                            <span className="text-sm text-slate-600 font-medium">ID:</span>
                            <Input disabled className="w-24 bg-white border-slate-300 font-mono font-bold text-slate-700 h-8" />
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="text-sm text-slate-600 font-medium">Fecha:</span>
                            <Input disabled value={fechaActual} className="w-28 bg-white border-slate-300 text-slate-700 h-8" />
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="text-sm text-slate-600 font-medium">Hora:</span>
                            <Input disabled value={horaActual} className="w-24 bg-white border-slate-300 text-slate-700 h-8" />
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-white border border-slate-200 rounded-lg shadow-sm overflow-hidden">
                <div className="bg-gradient-to-r from-cyan-600 to-cyan-700 px-4 py-3">
                    <h2 className="font-semibold text-white">Tipo de Documento</h2>
                </div>
                <div className="p-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        <div className="space-y-2">
                            <Label>Tipo de Documento: <span className="text-red-500">*</span></Label>
                            <Select
                                value={tipoDocumento}
                                onValueChange={setTipoDocumento}
                            >
                                <SelectTrigger className="w-full bg-white">
                                    <SelectValue placeholder="Seleccionar tipo de documento" />
                                </SelectTrigger>
                                <SelectContent className="bg-white border shadow-md">
                                    {tipoDocSalida.map((tipo) => (
                                        <SelectItem key={tipo.id} value={tipo.codigo}>
                                            {tipo.nombre}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                </div>
            </div>

            {/* CAMPOS DINÁMICOS SEGÚN TIPO DE DOCUMENTO */}
            {tipoDocumento && (
                <div className="bg-white border rounded-lg shadow-sm p-4 space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                        <div>
                            <Label>Documento:</Label>
                            <Input />
                        </div>

                        <div>
                            <Label>Producto</Label>
                            <Input />
                        </div>

                        <div>
                            <Label>Cantidad</Label>
                            <Input type="number" />
                        </div>

                        <div>
                            <Label>Precio de Operación</Label>
                            <Input />
                        </div>

                        <div>
                            <Label>Importe Total</Label>
                            <Input disabled />
                        </div>

                        <div>
                            <Label>Lote</Label>
                            <Input />
                        </div>

                        <div>
                            <Label>Registro Sanitario</Label>
                            <Input />
                        </div>

                        <div>
                            <Label>Fecha de Vencimiento</Label>
                            <Input type="date" />
                        </div>

                        {isACTA && (
                            <>
                                <div>
                                    <Label>Tipo de Transferencia</Label>
                                    <Input placeholder="Préstamo con retorno" />
                                </div>

                                <div>
                                    <Label>Motivo</Label>
                                    <Input placeholder="Riesgo de desabastecimiento" />
                                </div>
                            </>
                        )}

                        {isRDS && (
                            <div>
                                <Label>Tipo de Uso</Label>
                                <Input placeholder="Consumo" />
                            </div>
                        )}

                        {isDDL && (
                            <>
                                <div>
                                    <Label>Origen</Label>
                                    <Input />
                                </div>

                                <div>
                                    <Label>Laboratorio Destino</Label>
                                    <Input />
                                </div>
                            </>
                        )}

                        <div className="md:col-span-2">
                            <Label>Observación / Comentario</Label>
                            <Input />
                        </div>

                    </div>
                </div>
            )}

            {/* Footer */}
            {tipoDocumento && (
                <div className="flex justify-end gap-3">
                    <Button variant="outline" onClick={() => router.back()}>
                        Cancelar
                    </Button>
                    <Button className="bg-green-600 hover:bg-green-700 text-white">
                        Guardar Salida
                    </Button>
                </div>
            )}


        </div>
    )
}
