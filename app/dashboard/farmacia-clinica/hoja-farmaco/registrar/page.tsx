"use client"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
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

type MedicamentoFarmaco = {
    id: number;
    nombre: string;
    dias: boolean[];
}


export default function RegistrarHojaFarmacoPage() {
    const router = useRouter();

    const [tipoDocumento, setTipoDocumento] = useState("");
    const [fechaActual, setFechaActual] = useState("");
    const [horaActual, setHoraActual] = useState("");
    const [almacenOrigen, setAlmacenOrigen] = useState("");
    const [tipoDeSalida, setTipoDeSalida] = useState("");
    const [tipoDeUso, setTipoDeUso] = useState("");
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
    const [fechaIngreso, setFechaIngreso] = useState("");
    const [medicamento, setMedicamento] = useState("");

    const [medicamentosRegistrados, setMedicamentosRegistrados] = useState<MedicamentoFarmaco[]>([]);

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

    // FUNCIÓN GUARDAR HOJA FARMACOTERAPÉUTICA
    const handleGuardarHojaFarmaco = () => {
        setGuardando(true);

        // Simulación de guardado (API / backend)
        setTimeout(() => {
            setGuardando(false);
            setOpenModalExito(true);
        }, 1500);
    };

    // GENERAR FECHAS PARA LA TABLA DE 24 DÍAS A PARTIR DE LA FECHA DE INGRESO
    const generarFechas = () => {

        if (!fechaIngreso) {
            return Array(24).fill("/");
        }

        const [anio, mes, dia] = fechaIngreso
            .split("-")
            .map(Number);

        const fechaBase = new Date(
            anio,
            mes - 1,
            dia
        );

        return Array.from({ length: 24 }, (_, index) => {

            const fecha = new Date(fechaBase);

            fecha.setDate(fechaBase.getDate() + index);

            const dia = String(fecha.getDate()).padStart(2, "0");
            const mes = String(fecha.getMonth() + 1).padStart(2, "0");

            return `${dia}/${mes}`;
        });
    };

    const fechasTratamiento = generarFechas();

    const agregarMedicamento = () => {

        if (!medicamento.trim()) return;

        const nuevoMedicamento: MedicamentoFarmaco = {
            id: Date.now(),
            nombre: medicamento,
            dias: Array(24).fill(false),
        };

        setMedicamentosRegistrados((prev) => [
            ...prev,
            nuevoMedicamento,
        ]);

        setMedicamento("");
    };

    const toggleDia = (
        medicamentoId: number,
        diaIndex: number
    ) => {

        setMedicamentosRegistrados((prev) =>
            prev.map((med) => {

                if (med.id !== medicamentoId)
                    return med;

                const nuevosDias = [...med.dias];

                nuevosDias[diaIndex] =
                    !nuevosDias[diaIndex];

                return {
                    ...med,
                    dias: nuevosDias,
                };
            })
        );
    };

    const eliminarMedicamento = (id: number) => {

        setMedicamentosRegistrados((prev) =>
            prev.filter((m) => m.id !== id)
        );
    };


    return (
        <div className="max-w-7xl mx-auto p-6 space-y-6 bg-slate-50/50 min-h-screen">

            {/* Header */}
            <div className="flex justify-between items-center bg-white rounded-lg p-4 shadow-sm border">
                <div className="flex items-center gap-4 w-full">
                    <Button
                        variant="outline"
                        onClick={() => router.push("/dashboard/farmacia-clinica/hoja-farmaco")}
                    >
                        <ArrowLeft className="w-4 h-4 mr-1" />
                        Regresar
                    </Button>

                    <div>
                        <h1 className="text-xl font-bold">Registrar Hoja Farmacoterapéutica</h1>
                        <p className="text-muted-foreground">
                            Complete los datos
                        </p>
                    </div>

                    {/*<div className="ml-auto flex items-center gap-4 bg-cyan-50 px-4 py-2 rounded-lg border border-cyan-200">
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
                    </div>*/}
                </div>
            </div>

            <div className="bg-white border border-slate-200 rounded-lg shadow-sm overflow-hidden">
                <div className="bg-gradient-to-r from-cyan-600 to-cyan-700 px-4 py-3">
                    <h2 className="font-semibold text-white">Datos del paciente</h2>
                </div>
                <div className="p-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-7 gap-4">
                        <div className="space-y-2">
                            <Label>Historia Clínica <span className="text-red-500">*</span></Label>
                            <Input className="border border-slate-900" />
                        </div>
                        <div className="md:col-span-3 space-y-2">
                            <Label>Nombre <span className="text-red-500">*</span></Label>
                            <Input className="border border-slate-900" />
                        </div>
                        <div className="space-y-2">
                            <Label>Edad <span className="text-red-500">*</span></Label>
                            <Input className="border border-slate-900" />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-7 gap-4 mt-4">
                        <div className="space-y-2">
                            <Label>Fecha de Ingreso <span className="text-red-500">*</span></Label>
                            <Input
                                type="date"
                                value={fechaIngreso}
                                onChange={(e) => setFechaIngreso(e.target.value)}
                                className="border border-slate-900"
                            />
                        </div>
                        <div className="md:col-span-3 space-y-2">
                            <Label>DX Ingreso <span className="text-red-500">*</span></Label>
                            <Input className="border border-slate-900" />
                        </div>
                    </div>
                </div>
            </div>

            {/* MEDICAMENTOS INVOLUCRADOS */}
            <div className="bg-white border border-slate-200 rounded-lg shadow-sm overflow-hidden">
                <div className="bg-gradient-to-r from-cyan-600 to-cyan-700 px-4 py-3">
                    <h2 className="font-semibold text-white">Registrar Medicamento</h2>
                </div>
                <div className="p-4">
                    <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-4 items-end">
                        <div className="space-y-2">
                            <Label>Medicamento <span className="text-red-500">*</span></Label>
                            <Input
                                className="border border-slate-900"
                                value={medicamento}
                                onChange={(e) => setMedicamento(e.target.value)}
                            />
                        </div>

                        <Button
                            type="button"
                            onClick={agregarMedicamento}
                            className="bg-green-600 hover:bg-green-700 text-white flex items-center gap-2 h-10"
                        >
                            <PlusCircle className="w-4 h-4" />
                            Agregar
                        </Button>
                    </div>

                    {/*<Button
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
                    </Button>*/}

                    <div className="mt-6 border rounded-lg overflow-hidden">
                        <div className="flex">
                            {/* PANEL IZQUIERDO */}
                            <div className="w-[350px] flex-shrink-0 border-r">
                                <table className="w-full text-xs">
                                    <thead className="bg-slate-100">
                                        <tr>
                                            <th
                                                className="px-3 py-2 text-center h-[32px]"
                                            >
                                                Medicamentos
                                            </th>
                                        </tr>

                                        <tr>
                                            <th
                                                className="px-3 py-2 h-[32px]"
                                            >
                                            </th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {medicamentosRegistrados.length === 0 ? (

                                            <tr>
                                                <td className="px-3 py-4 text-center text-slate-500">
                                                    No hay registro de medicamentos involucrados
                                                </td>
                                            </tr>

                                        ) : (

                                            medicamentosRegistrados.map((med) => (

                                                <tr
                                                    key={med.id}
                                                    className="border-t h-[52px]"
                                                >

                                                    <td className="px-3 h-[52px] align-middle">

                                                        <div className="flex items-center justify-between">

                                                            <span>
                                                                {med.nombre}
                                                            </span>

                                                            <Button
                                                                variant="ghost"
                                                                size="sm"
                                                                onClick={() =>
                                                                    eliminarMedicamento(
                                                                        med.id
                                                                    )
                                                                }
                                                                className="text-red-600 hover:bg-red-50"
                                                            >
                                                                <Trash2 className="w-4 h-4" />
                                                            </Button>

                                                        </div>

                                                    </td>

                                                </tr>

                                            ))

                                        )}
                                    </tbody>
                                </table>
                            </div>

                            {/* PANEL DERECHO */}
                            <div className="overflow-x-auto flex-1">
                                <table className="min-w-[1680px] text-xs">

                                    <thead className="bg-slate-100">

                                        <tr>

                                            {Array.from(
                                                { length: 24 },
                                                (_, i) => (
                                                    <th
                                                        key={i}
                                                        className="w-[70px] min-w-[70px] py-2 text-center"
                                                    >
                                                        {i + 1}
                                                    </th>
                                                )
                                            )}

                                        </tr>

                                        <tr>

                                            {fechasTratamiento.map(
                                                (fecha, index) => (
                                                    <th
                                                        key={index}
                                                        className="w-[70px] min-w-[70px] py-2 text-center text-[10px]"
                                                    >
                                                        {fecha}
                                                    </th>
                                                )
                                            )}

                                        </tr>

                                    </thead>

                                    <tbody>

                                        {medicamentosRegistrados.map(
                                            (med) => (

                                                <tr
                                                    key={med.id}
                                                    className="border-t h-[52px]"
                                                >

                                                    {med.dias.map(
                                                        (
                                                            valor,
                                                            index
                                                        ) => (

                                                            <td
                                                                key={index}
                                                                className="text-center align-middle h-[52px]"
                                                            >

                                                                <Checkbox
                                                                    checked={
                                                                        valor
                                                                    }
                                                                    onCheckedChange={() =>
                                                                        toggleDia(
                                                                            med.id,
                                                                            index
                                                                        )
                                                                    }
                                                                />

                                                            </td>

                                                        )
                                                    )}

                                                </tr>

                                            )
                                        )}

                                    </tbody>

                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex justify-end gap-3">
                <Button variant="outline" onClick={() => router.back()}>
                    Cancelar
                </Button>
                <Button
                    className="bg-green-600 hover:bg-green-700 text-white flex items-center gap-2"
                    onClick={handleGuardarHojaFarmaco}
                >
                    {guardando ? (
                        <>
                            <Loader2 className="w-4 h-4 animate-spin" />
                            Guardando...
                        </>
                    ) : (
                        <>
                            <Save className="w-4 h-4" />
                            Guardar Hoja
                        </>
                    )}
                </Button>
            </div>

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
                        La hoja farmacoterapéutica ha sido registrada con éxito.
                    </p>

                    <DialogFooter className="flex justify-center mt-4">
                        <Button
                            className="bg-blue-600 hover:bg-blue-700 text-white"
                            onClick={() => {
                                setOpenModalExito(false);
                                router.push("/dashboard/farmacia-clinica/hoja-farmaco");
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
