"use client"

import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ArrowLeft, Save, PlusCircle, Trash2, Loader2, CheckCircle } from "lucide-react"
import { useRouter } from "next/navigation"
import { useState, useEffect } from "react"

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

const lotesMock = [
    {
        id: 1,
        stock: 40,
        precio: 1.5,
        regSanitario: "RS-001",
        fechaVcto: "31-01-2026",
        lote: "L001",
        fechaRecepcion: "10-01-2025",
    },
    {
        id: 2,
        stock: 30,
        precio: 2,
        regSanitario: "RS-002",
        fechaVcto: "15-03-2026",
        lote: "L002",
        fechaRecepcion: "10-01-2025",
    },
    {
        id: 3,
        stock: 30,
        precio: 2.5,
        regSanitario: "RS-003",
        fechaVcto: "30-06-2026",
        lote: "L003",
        fechaRecepcion: "20-02-2025",
    },
];

type LoteDisponible = {
    id: number;
    stock: number;
    precio: number;
    regSanitario: string;
    fechaVcto: string;
    lote: string;
    fechaRecepcion: string;
};

type LoteAsignado = {
    id: number;
    lote: string;
    cantidad: number;
    precio: number;
    orden: number;
    regSanitario?: string;
    fechaVcto?: string;
};

type ProductoSalida = {
    id: number;
    nombre: string;
    cantidadSolicitada: number;
    lotesAsignados: LoteAsignado[];
};


export default function NuevaSalidaPage() {
    const router = useRouter();

    const [tipoDocumento, setTipoDocumento] = useState("");
    const [documento, setDocumento] = useState("");
    const [observacion, setObservacion] = useState("");
    const [fechaActual, setFechaActual] = useState("");
    const [horaActual, setHoraActual] = useState("");
    const [almacenOrigen, setAlmacenOrigen] = useState("");
    const [tipoDeSalida, setTipoDeSalida] = useState("");
    const [destino, setDestino] = useState("");
    const [destinoOperativo, setDestinoOperativo] = useState("");
    const [laboratorioDestino, setLaboratorioDestino] = useState("");
    const [tipoDeUso, setTipoDeUso] = useState("");
    const [tipoDeTransferencia, setTipoDeTransferencia] = useState("");
    const [productoId, setProductoId] = useState("");
    const [productos, setProductos] = useState<ProductoSalida[]>([]);
    const [productoSeleccionado, setProductoSeleccionado] = useState<any>(null);
    const [lotesDisponibles, setLotesDisponibles] = useState<LoteDisponible[]>([]);
    const [lotesAsignados, setLotesAsignados] = useState<LoteAsignado[]>([]);
    const [ordenAsignacion, setOrdenAsignacion] = useState(1);
    const [sumaStockAsignado, setSumaStockAsignado] = useState(0);
    const [openConfirmLoteModal, setOpenConfirmLoteModal] = useState(false);
    const [cantidad, setCantidad] = useState<string>("");
    const [guardando, setGuardando] = useState(false);
    const [openModalExito, setOpenModalExito] = useState(false);
    const [mostrarLotes, setMostrarLotes] = useState(false);
    const puedeGuardarSalida = productos.length > 0;
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

    // SETEAR VALORES AUTOMATICOS SEGÚN TIPO DE DOCUMENTO
    useEffect(() => {
        if (isRDS) {
            setAlmacenOrigen("AI");
            setTipoDeSalida("STS");
            setTipoDeUso("C");
        }

        if (isDDL) {
            setTipoDeSalida("STL");
            setTipoDeUso("C");
        }

        if (isACTA) {
            setAlmacenOrigen("");
            setTipoDeSalida("STE");
            setTipoDeUso("");
        }
    }, [tipoDocumento]);

    // AUTOCOMPLETAR CAMPOS AL SELECCIONAR PRODUCTO
    useEffect(() => {
        const prod = productosMock.find(p => p.id === productoId);

        if (prod) {
            setProductoSeleccionado(prod);

            // 🔑 AQUÍ ESTABA EL PROBLEMA
            setLotesDisponibles(lotesMock);

            // reset de asignación
            setLotesAsignados([]);
            setOrdenAsignacion(1);
            setSumaStockAsignado(0);
        } else {
            setProductoSeleccionado(null);
            setLotesDisponibles([]);
        }
    }, [productoId]);

    // FUNCIÓN GUARDAR SALIDA
    const handleGuardarSalida = () => {
        setGuardando(true);

        // Simulación de guardado (API / backend)
        setTimeout(() => {
            setGuardando(false);
            setOpenModalExito(true);
        }, 1500);
    };

    // LÓGICA DE SELECCIÓN DE LOTES
    const seleccionarLote = (lote: LoteDisponible) => {
        if (lotesAsignados.some(l => l.id === lote.id)) return;

        const cantidadSolicitada = Number(cantidad);

        // 🔑 cuánto ya se asignó
        const yaAsignado = lotesAsignados.reduce(
            (acc, l) => acc + l.cantidad,
            0
        );

        // 🔑 cuánto falta por cubrir
        const restante = cantidadSolicitada - yaAsignado;

        if (restante <= 0) return;

        // 🔑 asignación parcial real
        const cantidadAsignada = Math.min(lote.stock, restante);

        const nuevoLote: LoteAsignado = {
            id: lote.id,
            lote: lote.lote,
            cantidad: cantidadAsignada, // luego se puede refinar
            precio: lote.precio,
            orden: ordenAsignacion,
            regSanitario: lote.regSanitario,
            fechaVcto: lote.fechaVcto,
        };

        const nuevos = [...lotesAsignados, nuevoLote];
        const suma = nuevos.reduce((acc, l) => acc + l.cantidad, 0);

        setLotesAsignados(nuevos);
        setOrdenAsignacion(ordenAsignacion + 1);
        setSumaStockAsignado(suma);

        if (suma >= cantidadSolicitada) {
            setOpenConfirmLoteModal(true);
        }
    };

    // CALCULAR TOTAL GENERAL DE LA TABLA
    const totalGeneral = productos.reduce((acc, prod) => {
        const subtotal = prod.lotesAsignados.reduce(
            (s, l) => s + l.precio * l.cantidad,
            0
        );
        return acc + subtotal;
    }, 0);



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
                                <Input
                                    disabled
                                    value={
                                        isACTA
                                            ? "Salida por Transferencias entre Unidades Ejecutoras"
                                            : isRDS
                                                ? "Salida por Transferencia de Servicios"
                                                : "Salida por Transferencia de Laboratorio"
                                    }
                                />
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
                                    disabled={mostrarLotes}
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
                                    type="text"
                                    inputMode="numeric"
                                    pattern="[0-9]*"
                                    placeholder="Ingrese cantidad"
                                    value={cantidad}
                                    disabled={mostrarLotes}
                                    onChange={(e) => {
                                        const val = e.target.value;
                                        if (/^\d*$/.test(val)) setCantidad(val);
                                    }}
                                />
                            </div>
                        </div>

                        {productoSeleccionado && mostrarLotes && (
                            <div className="mt-4 border rounded-md p-3">
                                <h4 className="font-semibold mb-2">
                                    Lotes disponibles para {productoSeleccionado.nombre}
                                </h4>

                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Stock</TableHead>
                                            <TableHead>Precio de Operación</TableHead>
                                            <TableHead>Registro Sanitario</TableHead>
                                            <TableHead>Fecha Venc.</TableHead>
                                            <TableHead>Lote</TableHead>
                                            <TableHead>Fecha Recepción</TableHead>
                                            <TableHead>Acción</TableHead>
                                        </TableRow>
                                    </TableHeader>

                                    <TableBody>
                                        {lotesDisponibles.map((lote) => (
                                            <TableRow key={lote.id}>
                                                <TableCell>{lote.stock}</TableCell>
                                                <TableCell>{lote.precio}</TableCell>
                                                <TableCell>{lote.regSanitario}</TableCell>
                                                <TableCell>{lote.fechaVcto}</TableCell>
                                                <TableCell>{lote.lote}</TableCell>
                                                <TableCell>{lote.fechaRecepcion}</TableCell>
                                                <TableCell>
                                                    {lotesAsignados.some(l => l.id === lote.id) ? (
                                                        <span className="px-2 py-1 bg-blue-600 text-white text-xs rounded">
                                                            #{lotesAsignados.find(l => l.id === lote.id)?.orden}
                                                        </span>
                                                    ) : (
                                                        <Button size="sm" onClick={() => seleccionarLote(lote)}>
                                                            Seleccionar
                                                        </Button>
                                                    )}
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </div>
                        )}

                        <Button
                            variant="outline"
                            className="mt-3"
                            onClick={() => {
                                setMostrarLotes(false);
                                setProductoId("");
                                setProductoSeleccionado(null);
                                setCantidad("");
                                setLotesAsignados([]);
                                setOrdenAsignacion(1);
                                setSumaStockAsignado(0);
                            }}
                        >
                            Resetear
                        </Button>

                        <div className="flex justify-end mt-4">
                            <Button
                                type="button"
                                className="bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-2"
                                disabled={!productoSeleccionado || !cantidad || Number(cantidad) < 1}
                                onClick={() => setMostrarLotes(true)}
                            >
                                <PlusCircle className="w-4 h-4" />
                                Consultar Lotes
                            </Button>
                        </div>

                        <div className="mt-6 border rounded-lg overflow-hidden">
                            <table className="w-full text-sm">
                                <thead className="bg-slate-100">
                                    <tr>
                                        <th className="px-3 py-2 text-left">Item</th>
                                        <th className="px-3 py-2 text-left">Nombre</th>
                                        <th className="px-3 py-2 text-left">Lote</th>
                                        <th className="px-3 py-2 text-right">Precio</th>
                                        <th className="px-3 py-2 text-right">Cantidad</th>
                                        <th className="px-3 py-2 text-right">Importe</th>
                                        <th className="px-3 py-2 text-right">Subtotal</th>
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
                                        productos.map((prod, index) => {
                                            const subtotalProducto = prod.lotesAsignados.reduce(
                                                (acc, l) => acc + l.precio * l.cantidad,
                                                0
                                            );

                                            return (
                                                <tr key={index} className="border-t">
                                                    {/* ITEM */}
                                                    <td className="px-3 py-2">{index + 1}</td>

                                                    {/* NOMBRE */}
                                                    <td className="px-3 py-2 font-medium">
                                                        {prod.nombre}
                                                    </td>

                                                    {/* LOTE */}
                                                    <td className="px-3 py-2">
                                                        {prod.lotesAsignados.map((lote, i) => (
                                                            <div
                                                                key={i}
                                                                className="border-b last:border-b-0 py-1"
                                                            >
                                                                {lote.lote}
                                                            </div>
                                                        ))}
                                                    </td>

                                                    {/* PRECIO POR LOTE */}
                                                    <td className="px-3 py-2 text-right">
                                                        {prod.lotesAsignados.map((lote, i) => (
                                                            <div
                                                                key={i}
                                                                className="border-b last:border-b-0 py-1"
                                                            >
                                                                {lote.precio}
                                                            </div>
                                                        ))}
                                                    </td>

                                                    {/* CANTIDAD POR LOTE */}
                                                    <td className="px-3 py-2 text-right">
                                                        {prod.lotesAsignados.map((lote, i) => (
                                                            <div
                                                                key={i}
                                                                className="border-b last:border-b-0 py-1"
                                                            >
                                                                {lote.cantidad}
                                                            </div>
                                                        ))}
                                                    </td>

                                                    {/* IMPORTE POR LOTE */}
                                                    <td className="px-3 py-2 text-right">
                                                        {prod.lotesAsignados.map((lote, i) => (
                                                            <div
                                                                key={i}
                                                                className="border-b last:border-b-0 py-1"
                                                            >
                                                                {(lote.cantidad * lote.precio).toFixed(2)}
                                                            </div>
                                                        ))}
                                                    </td>

                                                    {/* SUBTOTAL POR PRODUCTO */}
                                                    <td className="px-3 py-2 text-right font-semibold text-slate-700">
                                                        {subtotalProducto.toFixed(2)}
                                                    </td>

                                                    {/* ACCIÓN */}
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
                                            );
                                        })
                                    )}
                                </tbody>

                                <tfoot>
                                    <tr className="bg-slate-200 font-bold">
                                        <td colSpan={6} className="px-3 py-2 text-right">
                                            TOTAL GENERAL:
                                        </td>
                                        <td className="px-3 py-2 text-right">
                                            {totalGeneral.toFixed(2)}
                                        </td>
                                        <td></td>
                                    </tr>
                                </tfoot>

                            </table>
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
                    <Button
                        className={`bg-green-600 hover:bg-green-700 text-white flex items-center gap-2
                            ${!puedeGuardarSalida || guardando ? "opacity-50 cursor-not-allowed" : ""}`}
                        disabled={!puedeGuardarSalida || guardando}
                        onClick={handleGuardarSalida}
                    >
                        {guardando ? (
                            <>
                                <Loader2 className="w-4 h-4 animate-spin" />
                                Guardando...
                            </>
                        ) : (
                            <>
                                <Save className="w-4 h-4" />
                                Guardar Salida
                            </>
                        )}
                    </Button>
                </div>
            )}

            {/* MODAL DE ÉXITO DEL GUARDADO DEL DOCUMENTO DE SALIDA */}
            <Dialog open={openModalExito} onOpenChange={setOpenModalExito}>
                <DialogContent className="max-w-sm">
                    <DialogHeader>
                        <DialogTitle className="flex flex-col items-center gap-3">
                            <CheckCircle className="w-16 h-16 text-green-600" />
                            <span>Registro exitoso</span>
                        </DialogTitle>
                    </DialogHeader>

                    <p className="text-center text-gray-700">
                        El documento de salida ha sido registrado con éxito.
                    </p>

                    <DialogFooter className="flex justify-center mt-4">
                        <Button
                            className="bg-blue-600 hover:bg-blue-700 text-white"
                            onClick={() => {
                                setOpenModalExito(false);
                                router.push("/dashboard/almacenes/salidas");
                            }}
                        >
                            Finalizar
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* MODAL DE CONFIRMACIÓN DEL LOTE */}
            <Dialog open={openConfirmLoteModal} onOpenChange={setOpenConfirmLoteModal}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Confirmar asignación de lotes</DialogTitle>
                    </DialogHeader>

                    <ul className="text-sm">
                        {lotesAsignados.map(l => (
                            <li key={l.id}>
                                Lote {l.lote} – Cantidad {l.cantidad} (Orden #{l.orden})
                            </li>
                        ))}
                    </ul>

                    <DialogFooter>
                        <Button
                            variant="outline"
                            onClick={() => {
                                setOpenConfirmLoteModal(false);
                                setLotesAsignados([]);
                                setOrdenAsignacion(1);
                                setSumaStockAsignado(0);
                            }}
                        >
                            Cancelar
                        </Button>

                        <Button
                            className="bg-green-600 text-white"
                            onClick={() => {
                                const nuevoProducto = {
                                    id: Date.now(),
                                    nombre: productoSeleccionado.nombre,
                                    cantidadSolicitada: Number(cantidad),
                                    lotesAsignados: lotesAsignados.map(l => ({
                                        id: l.id,
                                        lote: l.lote,
                                        cantidad: l.cantidad,
                                        precio: l.precio,
                                        orden: l.orden,
                                        regSanitario: l.regSanitario,
                                        fechaVcto: l.fechaVcto,
                                    })),
                                };

                                setProductos(prev => [...prev, nuevoProducto]);

                                // reset general
                                setOpenConfirmLoteModal(false);
                                setMostrarLotes(false);
                                setProductoId("");
                                setProductoSeleccionado(null);
                                setCantidad("");
                                setLotesAsignados([]);
                                setOrdenAsignacion(1);
                                setSumaStockAsignado(0);
                            }}
                        >
                            Confirmar
                        </Button>

                    </DialogFooter>
                </DialogContent>
            </Dialog>


        </div>
    )
}
