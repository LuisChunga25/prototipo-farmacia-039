"use client"

import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, Save, Loader2, CheckCircle, Trash2, PlusCircle } from "lucide-react"
import { useRouter, useParams } from "next/navigation"
import { useState, useEffect } from "react"

// 👉 reutilizas los mismos catálogos
// tipoDocSalida, almOrigen, tipoSalida, etc.
const tipoDocSalida = [
    { id: "ACTA", codigo: "ACTA", nombre: "Acta" },
    { id: "RDS", codigo: "RDS", nombre: "Requerimiento de Servicios" },
    { id: "DDL", codigo: "DDL", nombre: "Distribución de Laboratorio" },
]

const almOrigen = [
    { id: "AG", codigo: "AG", nombre: "Almacén General" },
    { id: "AI", codigo: "AI", nombre: "Almacén Insumos" },
]

const tipoSalida = [
    { id: "STE", codigo: "STE", nombre: "Salida por Transferencias entre Unidades Ejecutoras" },
    { id: "STS", codigo: "STS", nombre: "Salida por Transferencia de Servicios" },
    { id: "STL", codigo: "STL", nombre: "Salida por Transferencia de Laboratorio" },
]

const destUE = [
    { id: "d01", codigo: "d01", nombre: "Hospital Nacional Hipólito Unanue" },
    { id: "d02", codigo: "d02", nombre: "Hospital Lima Este Vitarte" },
    { id: "d03", codigo: "d03", nombre: "Hospital de Huaycán" },
]

const destOperativo = [
    { id: "DE", codigo: "DE", nombre: "Dirección Ejecutiva" },
    { id: "UFGR", codigo: "UFGR", nombre: "Unidad Funcional de Gestión de Riesgo" },
    { id: "DA", codigo: "DA", nombre: "Dirección Adjunta" },
    { id: "UFAL", codigo: "UFAL", nombre: "Unidad Funcional Asesoría Legal" },
    { id: "UFT", codigo: "UFT", nombre: "Unidad Funcional de Telesalud" },
    { id: "UFGDA", codigo: "UFGDA", nombre: "Unidad Funcional de Gestión Documentario y Archivo" },
    { id: "OCI", codigo: "OCI", nombre: "Órgano de Control Institucional" },
    { id: "OPE", codigo: "OPE", nombre: "Oficina de Planeamiento Estratégico" },
    { id: "UESA", codigo: "UESA", nombre: "Unidad de Epidemiología y Salud Ambiental" },
    { id: "UGC", codigo: "UGC", nombre: "Unidad de Gestión de la Calidad" },
]

const labDest = [
    { id: "LDI", codigo: "LDI", nombre: "Laboratorio de Inmunología" },
    { id: "LDB", codigo: "LDB", nombre: "Laboratorio de Bioquímica" },
    { id: "LDH", codigo: "LDH", nombre: "Laboratorio de Hematología" },
    { id: "LDM", codigo: "LDM", nombre: "Laboratorio de Microbiología" },
    { id: "LDE", codigo: "LDE", nombre: "Laboratorio de Emergencia" },
    { id: "BDS", codigo: "BDS", nombre: "Banco de Sangre" },
    { id: "LDHE", codigo: "LDHE", nombre: "Laboratorio de Hemostasia" },
    { id: "SPC", codigo: "SPC", nombre: "Servicio de Patología Clínica" },
]

const tipoUso = [
    { id: "V", codigo: "V", nombre: "Venta" },
    { id: "C", codigo: "C", nombre: "Consumo" },
]

const tipoTransfer = [
    { id: "TD", codigo: "TD", nombre: "Transferencia Definitiva" },
    { id: "TCR", codigo: "TCR", nombre: "Transferencia con Retorno" },
    { id: "AER", codigo: "AER", nombre: "Apoyo en Rotación" },
    { id: "TPD", codigo: "TPD", nombre: "Transferencia por Devolución" },
]

const productosMock = [
    {
        id: "P01",
        nombre: "Algodón Hidrófilo x 500 gr",
        precio: 2.7,
        lote: "PT12402",
        registro: "EE-11024",
        vencimiento: "2027-08-01",
    },
    {
        id: "P02",
        nombre: "Ácido Tranexámico 1g 10ml",
        precio: 8.5,
        lote: "LT88991",
        registro: "RS-99221",
        vencimiento: "2026-12-31",
    },
];

export default function EditarSalidaPage() {
    const router = useRouter()
    const params = useParams()
    const salidaId = params.salidaId
    
    // 🔹 estados (idénticos a nueva-page.tsx)
    const [tipoDocumento, setTipoDocumento] = useState("")
    const [almacenOrigen, setAlmacenOrigen] = useState("")
    const [tipoDeSalida, setTipoDeSalida] = useState("")
    const [tipoDeUso, setTipoDeUso] = useState("")
    const [productos, setProductos] = useState<any[]>([])
    const [guardando, setGuardando] = useState(false)
    const [openModalExito, setOpenModalExito] = useState(false)
    const [destino, setDestino] = useState("");
    const [destinoOperativo, setDestinoOperativo] = useState("");
    const [laboratorioDestino, setLaboratorioDestino] = useState("");
    const [tipoDeTransferencia, setTipoDeTransferencia] = useState("");
    const [productoId, setProductoId] = useState("");
    const [productoSeleccionado, setProductoSeleccionado] = useState<any>(null);
    const [cantidad, setCantidad] = useState<number>(1);

    const puedeGuardarSalida = productos.length > 0

    const isACTA = tipoDocumento === "ACTA"
    const isRDS = tipoDocumento === "RDS"
    const isDDL = tipoDocumento === "DDL"

    // 🔹 CARGA SIMULADA DEL DOCUMENTO
    useEffect(() => {
        // Simulación de fetch por ID
        const salidaMock = {
            tipoDocumento: "ACTA",
            almacenOrigen: "AG",
            tipoDeSalida: "STE",
            tipoDeUso: "V",
            productos: [
                {
                    nombre: "Algodón Hidrófilo x 500 gr",
                    precio: "2.70",
                    cantidad: 15,
                    importe: "40.50",
                },
            ],
        }

        setTipoDocumento(salidaMock.tipoDocumento)
        setAlmacenOrigen(salidaMock.almacenOrigen)
        setTipoDeSalida(salidaMock.tipoDeSalida)
        setTipoDeUso(salidaMock.tipoDeUso)
        setProductos(salidaMock.productos)
    }, [salidaId])

    const handleActualizarSalida = () => {
        setGuardando(true)

        setTimeout(() => {
            setGuardando(false)
            setOpenModalExito(true)
        }, 1500)
    }

    return (
        <div className="max-w-7xl mx-auto p-6 space-y-6 bg-slate-50/50 min-h-screen">

            {/* Header */}
            <div className="flex justify-between items-center bg-white rounded-lg p-4 shadow-sm border">
                <div className="flex items-center gap-4 w-full">
                    <Button variant="outline" onClick={() => router.back()}>
                        <ArrowLeft className="w-4 h-4 mr-1" />
                        Regresar
                    </Button>

                    <div>
                        <h1 className="text-xl font-bold">Editar Documento de Salida</h1>
                        <p className="text-muted-foreground">
                            Modifique los datos del documento de salida
                        </p>
                    </div>

                    <div className="ml-auto flex items-center gap-4 bg-cyan-50 px-4 py-2 rounded-lg border border-cyan-200">
                        <div className="flex items-center gap-2">
                            <span className="text-sm text-slate-600 font-medium">ID:</span>
                            <Input disabled className="w-24 bg-white border-slate-300 font-mono font-bold text-slate-700 h-8" />
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="text-sm text-slate-600 font-medium">Fecha:</span>
                            <Input disabled className="w-28 bg-white border-slate-300 text-slate-700 h-8" />
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="text-sm text-slate-600 font-medium">Hora:</span>
                            <Input disabled className="w-24 bg-white border-slate-300 text-slate-700 h-8" />
                        </div>
                    </div>
                </div>
            </div>

            {/* 🔁 Todo el JSX intermedio es EL MISMO que nueva-page.tsx */}
            {/* Solo cambian valores iniciales */}
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
                <div className="bg-white border border-slate-200 rounded-lg shadow-sm overflow-hidden">
                    <div className="bg-gradient-to-r from-cyan-600 to-cyan-700 px-4 py-3">
                        <h2 className="font-semibold text-white">Detalle del documento de salida</h2>
                    </div>
                    <div className="p-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {(isACTA || isRDS) && (
                                <div>
                                    <Label>Almacén Origen: <span className="text-red-500">*</span></Label>
                                    <Select
                                        value={almacenOrigen}
                                        onValueChange={setAlmacenOrigen}
                                        disabled={isRDS}
                                    >
                                        <SelectTrigger className="w-full bg-white">
                                            <SelectValue placeholder="Seleccionar almacén de origen" />
                                        </SelectTrigger>
                                        <SelectContent className="bg-white border shadow-md">
                                            {almOrigen.map((alm) => (
                                                <SelectItem key={alm.id} value={alm.codigo}>
                                                    {alm.nombre}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                            )}

                            {isACTA && (
                                <div>
                                    <Label>Destino: <span className="text-red-500">*</span></Label>
                                    <Select
                                        value={destino}
                                        onValueChange={setDestino}
                                    >
                                        <SelectTrigger className="w-full bg-white">
                                            <SelectValue placeholder="Seleccionar destino" />
                                        </SelectTrigger>
                                        <SelectContent className="bg-white border shadow-md">
                                            {destUE.map((dest) => (
                                                <SelectItem key={dest.id} value={dest.codigo}>
                                                    {dest.nombre}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                            )}

                            {isRDS && (
                                <div>
                                    <Label>Destino Operativo: <span className="text-red-500">*</span></Label>
                                    <Select
                                        value={destinoOperativo}
                                        onValueChange={setDestinoOperativo}
                                    >
                                        <SelectTrigger className="w-full bg-white">
                                            <SelectValue placeholder="Seleccionar destino operativo" />
                                        </SelectTrigger>
                                        <SelectContent className="bg-white border shadow-md">
                                            {destOperativo.map((destOp) => (
                                                <SelectItem key={destOp.id} value={destOp.codigo}>
                                                    {destOp.nombre}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                            )}

                            {isDDL && (
                                <>
                                    <div>
                                        <Label>Origen: <span className="text-red-500">*</span></Label>
                                        <Input value="Laboratorio General" disabled />
                                    </div>
                                    <div>
                                        <Label>Laboratorio Destino: <span className="text-red-500">*</span></Label>
                                        <Select
                                            value={laboratorioDestino}
                                            onValueChange={setLaboratorioDestino}
                                        >
                                            <SelectTrigger className="w-full bg-white">
                                                <SelectValue placeholder="Seleccionar laboratorio destino" />
                                            </SelectTrigger>
                                            <SelectContent className="bg-white border shadow-md">
                                                {labDest.map((lab) => (
                                                    <SelectItem key={lab.id} value={lab.codigo}>
                                                        {lab.nombre}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </>
                            )}

                            <div>
                                <Label>Tipo de Salida: <span className="text-red-500">*</span></Label>
                                {isACTA ? (
                                    <Select
                                        value={tipoDeSalida}
                                        onValueChange={setTipoDeSalida}
                                    >
                                        <SelectTrigger className="w-full bg-white">
                                            <SelectValue placeholder="Seleccionar tipo de salida" />
                                        </SelectTrigger>
                                        <SelectContent className="bg-white border shadow-md">
                                            {tipoSalida.map((tipoS) => (
                                                <SelectItem key={tipoS.id} value={tipoS.codigo}>
                                                    {tipoS.nombre}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                ) : (
                                    <Input
                                        disabled
                                        value={
                                            isRDS
                                                ? "Salida por Transferencia de Servicios"
                                                : "Salida por Transferencia de Laboratorio"
                                        }
                                    />
                                )}
                            </div>

                            <div>
                                <Label>Documento: <span className="text-red-500">*</span></Label>
                                <Input />
                            </div>

                            {isACTA && (
                                <>
                                    <div>
                                        <Label>Tipo de Transferencia: <span className="text-red-500">*</span></Label>
                                        <Select
                                            value={tipoDeTransferencia}
                                            onValueChange={setTipoDeTransferencia}
                                        >
                                            <SelectTrigger className="w-full bg-white">
                                                <SelectValue placeholder="Seleccionar tipo de transferencia" />
                                            </SelectTrigger>
                                            <SelectContent className="bg-white border shadow-md">
                                                {tipoTransfer.map((tipoT) => (
                                                    <SelectItem key={tipoT.id} value={tipoT.codigo}>
                                                        {tipoT.nombre}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    <div>
                                        <Label>Motivo: <span className="text-red-500">*</span></Label>
                                        <Input />
                                    </div>
                                </>
                            )}

                            <div>
                                <Label>Tipo de Uso <span className="text-red-500">*</span></Label>
                                {isACTA ? (
                                    <Select
                                        value={tipoDeUso}
                                        onValueChange={setTipoDeUso}
                                    >
                                        <SelectTrigger className="w-full bg-white">
                                            <SelectValue placeholder="Seleccionar tipo de uso" />
                                        </SelectTrigger>
                                        <SelectContent className="bg-white border shadow-md">
                                            {tipoUso.map((tipoU) => (
                                                <SelectItem key={tipoU.id} value={tipoU.codigo}>
                                                    {tipoU.nombre}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                ) : (
                                    <Input disabled value="Consumo" />
                                )}
                            </div>

                            <div>
                                <Label>Fecha Emisión Documento: <span className="text-red-500">*</span></Label>
                                <Input type="date" />
                            </div>

                            <div>
                                <Label>Fecha Ejecución: <span className="text-red-500">*</span></Label>
                                <Input type="date" />
                            </div>

                            <div className="md:col-span-2">
                                <Label>Observación / Comentario:</Label>
                                <Input />
                            </div>

                        </div>
                    </div>
                </div>
            )}

            {tipoDocumento && (
                <div className="bg-white border border-slate-200 rounded-lg shadow-sm overflow-hidden">
                    <div className="bg-gradient-to-r from-cyan-600 to-cyan-700 px-4 py-3">
                        <h2 className="font-semibold text-white">Registrar Producto</h2>
                    </div>
                    <div className="p-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <Label>Producto:</Label>
                                <Select
                                    value={productoId}
                                    onValueChange={setProductoId}
                                >
                                    <SelectTrigger className="w-full bg-white">
                                        <SelectValue placeholder="Seleccionar producto" />
                                    </SelectTrigger>
                                    <SelectContent className="bg-white border shadow-md">
                                        {productosMock.map(prod => (
                                            <SelectItem key={prod.id} value={prod.id}>
                                                {prod.nombre}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>

                            <div>
                                <Label>Cantidad:</Label>
                                <Input
                                    type="number"
                                    min="1"
                                    value={cantidad}
                                    onChange={(e) => setCantidad(Number(e.target.value))}
                                />
                            </div>

                            <div>
                                <Label>Precio de Operación:</Label>
                                <Input
                                    value={productoSeleccionado?.precio ?? ""}
                                    disabled
                                />
                            </div>

                            <div>
                                <Label>Importe Total:</Label>
                                <Input
                                    disabled
                                    value={
                                        productoSeleccionado
                                            ? (productoSeleccionado.precio * cantidad).toFixed(2)
                                            : ""
                                    }
                                />
                            </div>

                            <div>
                                <Label>Lote:</Label>
                                <Input
                                    value={productoSeleccionado?.lote ?? ""}
                                    disabled
                                />
                            </div>

                            <div>
                                <Label>Registro Sanitario:</Label>
                                <Input
                                    value={productoSeleccionado?.registro ?? ""}
                                    disabled
                                />
                            </div>

                            <div>
                                <Label>Fecha de Vencimiento:</Label>
                                <Input
                                    type="date"
                                    value={productoSeleccionado?.vencimiento ?? ""}
                                    disabled
                                />
                            </div>

                        </div>
                        <div className="flex justify-end mt-4">
                            <Button
                                type="button"
                                className="bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-2"
                                onClick={() => {
                                    // lógica se completa luego
                                    if (!productoSeleccionado || cantidad <= 0) return;

                                    const nuevoProducto = {
                                        nombre: productoSeleccionado.nombre,
                                        precio: productoSeleccionado.precio.toFixed(2),
                                        cantidad,
                                        importe: (productoSeleccionado.precio * cantidad).toFixed(2),
                                    };

                                    setProductos([...productos, nuevoProducto]);

                                    // RESET FORM
                                    setProductoId("");
                                    setProductoSeleccionado(null);
                                    setCantidad(1);
                                }}
                            >
                                <PlusCircle className="w-4 h-4" />
                                Agregar Producto
                            </Button>
                        </div>
                        <div className="mt-6 border rounded-lg overflow-hidden">
                            <table className="w-full text-sm">
                                <thead className="bg-slate-100">
                                    <tr>
                                        <th className="px-3 py-2 text-left">Item</th>
                                        <th className="px-3 py-2 text-left">Nombre</th>
                                        <th className="px-3 py-2 text-right">Precio</th>
                                        <th className="px-3 py-2 text-right">Cantidad</th>
                                        <th className="px-3 py-2 text-right">Importe</th>
                                        <th className="px-3 py-2 text-center">Acción</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {productos.length === 0 ? (
                                        <tr>
                                            <td
                                                colSpan={6}
                                                className="px-3 py-4 text-center text-slate-500"
                                            >
                                                No hay productos agregados
                                            </td>
                                        </tr>
                                    ) : (
                                        productos.map((prod, index) => (
                                            <tr key={index} className="border-t">
                                                <td className="px-3 py-2">{index + 1}</td>
                                                <td className="px-3 py-2">{prod.nombre}</td>
                                                <td className="px-3 py-2 text-right">{prod.precio}</td>
                                                <td className="px-3 py-2 text-right">{prod.cantidad}</td>
                                                <td className="px-3 py-2 text-right">{prod.importe}</td>
                                                <td className="px-3 py-2 text-center">
                                                    <Button
                                                        variant="outline"
                                                        size="sm"
                                                        className="border-red-500 text-red-600 hover:bg-red-50"
                                                        onClick={() =>
                                                            setProductos(productos.filter((_, i) => i !== index))
                                                        }
                                                    >
                                                        <Trash2 className="w-4 h-4" />
                                                    </Button>
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>


                </div>
            )}

            {/* Footer */}
            <div className="flex justify-end gap-3">
                <Button variant="outline" onClick={() => router.back()}>
                    Cancelar
                </Button>

                <Button
                    disabled={!puedeGuardarSalida || guardando}
                    onClick={handleActualizarSalida}
                    className="bg-green-600 hover:bg-green-700 text-white flex items-center gap-2"
                >
                    {guardando ? (
                        <>
                            <Loader2 className="w-4 h-4 animate-spin" />
                            Actualizando...
                        </>
                    ) : (
                        <>
                            <Save className="w-4 h-4" />
                            Actualizar Salida
                        </>
                    )}
                </Button>
            </div>

            {/* MODAL ÉXITO */}
            <Dialog open={openModalExito} onOpenChange={setOpenModalExito}>
                <DialogContent className="max-w-sm">
                    <DialogHeader>
                        <DialogTitle className="flex flex-col items-center gap-3">
                            <CheckCircle className="w-16 h-16 text-green-600" />
                            Actualización exitosa
                        </DialogTitle>
                    </DialogHeader>

                    <p className="text-center text-gray-700">
                        El documento de salida fue actualizado correctamente.
                    </p>

                    <DialogFooter className="flex justify-center mt-4">
                        <Button
                            onClick={() => router.push("/dashboard/almacenes/salidas")}
                        >
                            Finalizar
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

        </div>
    )
}
