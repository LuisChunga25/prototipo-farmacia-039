"use client"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ArrowLeft, Save, PlusCircle, Trash2, Loader2, CheckCircle, PlayCircle, Ban, CalendarCheck, RotateCcw } from "lucide-react"
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

type EventoSuspension = {
    id: number;
    accion: "SUSPENSION" | "REACTIVACION";
    fecha: string;
    motivo?: string;
};

type MedicamentoFarmaco = {
    id: number;
    nombre: string;
    dias: boolean[];
    suspendido: boolean;
    motivoSuspension?: string;
    fechaSuspension?: string;
    historialSuspensiones: EventoSuspension[];

    // Índice del día de la última aplicación
    ultimaAplicacionIndex: number | null;
};

interface HojaFarmacoFormProps {
    modo: "crear" | "editar" | "consulta";
}


export default function HojaFarmacoForm({
    modo,
}: HojaFarmacoFormProps) {
    const router = useRouter();
    const soloLectura = modo === "consulta";

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
    const [openModalSuspension, setOpenModalSuspension] = useState(false);
    const [medicamentoPendienteSuspension, setMedicamentoPendienteSuspension] = useState<number | null>(null);
    const [motivoSuspension, setMotivoSuspension] = useState("");
    const [fechaSuspension, setFechaSuspension] = useState("");

    const obtenerFechaLocal = () => {
        const hoy = new Date();
        const anio = hoy.getFullYear();
        const mes = String(hoy.getMonth() + 1).padStart(2, "0");
        const dia = String(hoy.getDate()).padStart(2, "0");

        return `${anio}-${mes}-${dia}`;
    };

    const [openModalUltimaAplicacion, setOpenModalUltimaAplicacion] = useState(false);
    const [medicamentoUltimaAplicacionId, setMedicamentoUltimaAplicacionId] = useState<number | null>(null);
    const [diaUltimaAplicacionSeleccionado, setDiaUltimaAplicacionSeleccionado] = useState("");

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

    // AGREGAR MEDICAMENTO A LA TABLA
    const agregarMedicamento = () => {

        if (!medicamento.trim()) return;

        const nuevoMedicamento: MedicamentoFarmaco = {
            id: Date.now(),
            nombre: medicamento,
            dias: Array(24).fill(false),
            suspendido: false,
            motivoSuspension: undefined,
            fechaSuspension: undefined,
            historialSuspensiones: [],
            ultimaAplicacionIndex: null,
        };

        setMedicamentosRegistrados((prev) => [
            ...prev,
            nuevoMedicamento,
        ]);

        setMedicamento("");
    };

    // SUSPENDER O REACTIVAR UN MEDICAMENTO

    const solicitarSuspension = (medicamentoId: number) => {
        if (soloLectura) return;

        setMedicamentoPendienteSuspension(medicamentoId);
        setMotivoSuspension("");
        setFechaSuspension(obtenerFechaLocal());
        setOpenModalSuspension(true);
    };

    const confirmarSuspension = () => {
        if (soloLectura) return;
        if (medicamentoPendienteSuspension === null) return;
        if (!motivoSuspension.trim() || !fechaSuspension) return;

        setMedicamentosRegistrados((prev) =>
            prev.map((med) => {
                if (med.id !== medicamentoPendienteSuspension) {
                    return med;
                }

                // Evitar registrar una suspensión duplicada
                if (med.suspendido) {
                    return med;
                }

                const nuevoEvento: EventoSuspension = {
                    id: Date.now(),
                    accion: "SUSPENSION",
                    fecha: fechaSuspension,
                    motivo: motivoSuspension.trim(),
                };

                return {
                    ...med,
                    suspendido: true,
                    motivoSuspension: motivoSuspension.trim(),
                    fechaSuspension,
                    historialSuspensiones: [
                        ...med.historialSuspensiones,
                        nuevoEvento,
                    ],
                };
            })
        );

        setOpenModalSuspension(false);
        setMedicamentoPendienteSuspension(null);
        setMotivoSuspension("");
        setFechaSuspension("");
    };

    const reactivarMedicamento = (medicamentoId: number) => {
        if (soloLectura) return;

        setMedicamentosRegistrados((prev) =>
            prev.map((med) => {
                if (med.id !== medicamentoId || !med.suspendido) {
                    return med;
                }

                const nuevoEvento: EventoSuspension = {
                    id: Date.now(),
                    accion: "REACTIVACION",
                    fecha: obtenerFechaLocal(),
                };

                return {
                    ...med,
                    suspendido: false,
                    historialSuspensiones: [
                        ...med.historialSuspensiones,
                        nuevoEvento,
                    ],
                };
            })
        );
    };

    // REGISTRAR Y QUITAR LA ÚLTIMA APLICACIÓN

    const solicitarUltimaAplicacion = (med: MedicamentoFarmaco) => {
        if (soloLectura || med.suspendido) return;

        // Solo se puede elegir un día que tenga aplicación registrada
        const diasMarcados = med.dias
            .map((marcado, index) => (marcado ? index : -1))
            .filter((index) => index !== -1);

        if (diasMarcados.length === 0) return;

        setMedicamentoUltimaAplicacionId(med.id);

        // Seleccionar inicialmente el último día marcado
        setDiaUltimaAplicacionSeleccionado(
            String(diasMarcados[diasMarcados.length - 1])
        );

        setOpenModalUltimaAplicacion(true);
    };

    const confirmarUltimaAplicacion = () => {
        if (soloLectura) return;
        if (medicamentoUltimaAplicacionId === null) return;
        if (diaUltimaAplicacionSeleccionado === "") return;

        const indice = Number(diaUltimaAplicacionSeleccionado);

        setMedicamentosRegistrados((prev) =>
            prev.map((med) => {
                if (med.id !== medicamentoUltimaAplicacionId) {
                    return med;
                }

                if (med.suspendido) return med;
                if (!med.dias[indice]) return med;

                // No admitir aplicaciones registradas después
                // de la fecha elegida como última aplicación.
                const existenAplicacionesPosteriores = med.dias.some(
                    (marcado, index) => index > indice && marcado
                );

                if (existenAplicacionesPosteriores) {
                    return med;
                }

                return {
                    ...med,
                    ultimaAplicacionIndex: indice,
                };
            })
        );

        setOpenModalUltimaAplicacion(false);
        setMedicamentoUltimaAplicacionId(null);
        setDiaUltimaAplicacionSeleccionado("");
    };

    const quitarUltimaAplicacion = (medicamentoId: number) => {
        if (soloLectura) return;

        setMedicamentosRegistrados((prev) =>
            prev.map((med) =>
                med.id === medicamentoId
                    ? {
                        ...med,
                        ultimaAplicacionIndex: null,
                    }
                    : med
            )
        );
    };


    const toggleDia = (
        medicamentoId: number,
        diaIndex: number
    ) => {

        setMedicamentosRegistrados((prev) =>
            prev.map((med) => {

                if (med.id !== medicamentoId) {
                    return med;
                }

                // Bloquear el día de la última aplicación y todos los posteriores
                if (
                    med.ultimaAplicacionIndex !== null &&
                    diaIndex >= med.ultimaAplicacionIndex
                ) {
                    return med;
                }

                // No permitir modificar los días si está suspendido
                if (med.suspendido) {
                    return med;
                }

                const nuevosDias = [...med.dias];

                nuevosDias[diaIndex] = !nuevosDias[diaIndex];

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
                        <h1 className="text-xl font-bold">
                            {modo === "crear" &&
                                "Registrar Hoja Farmacoterapéutica"}

                            {modo === "editar" &&
                                "Editar Hoja Farmacoterapéutica"}

                            {modo === "consulta" &&
                                "Consultar Hoja Farmacoterapéutica"}
                        </h1>
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
                            <Input
                                disabled={soloLectura}
                                className="border border-slate-900"
                            />
                        </div>
                        <div className="md:col-span-3 space-y-2">
                            <Label>Nombre <span className="text-red-500">*</span></Label>
                            <Input
                                disabled={soloLectura}
                                className="border border-slate-900"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label>Edad <span className="text-red-500">*</span></Label>
                            <Input
                                disabled={soloLectura}
                                className="border border-slate-900"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-7 gap-4 mt-4">
                        <div className="space-y-2">
                            <Label>Fecha de Ingreso <span className="text-red-500">*</span></Label>
                            <Input
                                type="date"
                                disabled={soloLectura}
                                value={fechaIngreso}
                                onChange={(e) => setFechaIngreso(e.target.value)}
                                className="border border-slate-900"
                            />
                        </div>
                        <div className="md:col-span-3 space-y-2">
                            <Label>DX Ingreso <span className="text-red-500">*</span></Label>
                            <Input
                                disabled={soloLectura}
                                className="border border-slate-900"
                            />
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
                                disabled={soloLectura}
                                value={medicamento}
                                onChange={(e) => setMedicamento(e.target.value)}
                            />
                        </div>

                        {!soloLectura && (
                            <Button
                                type="button"
                                onClick={agregarMedicamento}
                                className="bg-green-600 hover:bg-green-700 text-white flex items-center gap-2 h-10"
                            >
                                <PlusCircle className="w-4 h-4" />
                                Agregar
                            </Button>
                        )}
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
                            <div className="w-[500px] flex-shrink-0 border-r">
                                <table className="w-full text-xs">
                                    <thead className="bg-slate-100">
                                        <tr>
                                            <th className="px-3 py-2 text-center h-[32px]">Medicamentos</th>
                                        </tr>

                                        <tr>
                                            <th className="px-3 py-2 h-[32px]"></th>
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
                                                        <div className="flex items-center justify-between gap-1">
                                                            <div className="min-w-0 flex-1">
                                                                <span
                                                                    className={
                                                                        med.suspendido
                                                                            ? "text-slate-500"
                                                                            : "text-slate-900"
                                                                    }
                                                                >
                                                                    {med.nombre}
                                                                </span>

                                                                {med.suspendido && (
                                                                    <div className="text-[10px] font-semibold text-red-600">
                                                                        SUSPENDIDO
                                                                    </div>
                                                                )}

                                                                {/*{med.suspendido && (
                                                                    <div className="mt-1 text-[10px] text-red-600">
                                                                        <div className="font-semibold">SUSPENDIDO</div>
                                                                        <div>
                                                                            Fecha: {med.fechaSuspension?.split("-").reverse().join("/")}
                                                                        </div>
                                                                        <div
                                                                            className="max-w-[220px] whitespace-normal break-words"
                                                                            title={med.motivoSuspension}
                                                                        >
                                                                            Motivo: {med.motivoSuspension}
                                                                        </div>
                                                                    </div>
                                                                )}*/}
                                                            </div>

                                                            {!soloLectura && (
                                                                <div className="flex shrink-0 items-center gap-1">
                                                                    <Button
                                                                        type="button"
                                                                        variant="outline"
                                                                        size="sm"
                                                                        disabled={soloLectura}
                                                                        onClick={() =>
                                                                            med.suspendido
                                                                                ? reactivarMedicamento(med.id)
                                                                                : solicitarSuspension(med.id)
                                                                        }
                                                                        title={
                                                                            med.suspendido
                                                                                ? "Reactivar medicamento"
                                                                                : "Suspender medicamento"
                                                                        }
                                                                        aria-label={
                                                                            med.suspendido
                                                                                ? "Reactivar medicamento"
                                                                                : "Suspender medicamento"
                                                                        }
                                                                        className={`h-7 w-7 p-0 ${med.suspendido
                                                                            ? "border-green-600 text-green-700 hover:bg-green-50"
                                                                            : "border-amber-500 text-amber-700 hover:bg-amber-50"
                                                                            }`}
                                                                    >
                                                                        {med.suspendido ? (
                                                                            <PlayCircle className="h-4 w-4" />
                                                                        ) : (
                                                                            <Ban className="h-4 w-4" />
                                                                        )}
                                                                    </Button>

                                                                    <Button
                                                                        type="button"
                                                                        variant="outline"
                                                                        size="sm"
                                                                        disabled={
                                                                            soloLectura ||
                                                                            med.suspendido ||
                                                                            !med.dias.some(Boolean)
                                                                        }
                                                                        onClick={() => solicitarUltimaAplicacion(med)}
                                                                        title={
                                                                            med.ultimaAplicacionIndex !== null
                                                                                ? "Modificar última aplicación"
                                                                                : "Registrar última aplicación"
                                                                        }
                                                                        aria-label={
                                                                            med.ultimaAplicacionIndex !== null
                                                                                ? "Modificar última aplicación"
                                                                                : "Registrar última aplicación"
                                                                        }
                                                                        className="h-7 w-7 p-0 border-blue-500 text-blue-700 hover:bg-blue-50"
                                                                    >
                                                                        <CalendarCheck className="h-4 w-4" />
                                                                    </Button>

                                                                    {med.ultimaAplicacionIndex !== null && (
                                                                        <Button
                                                                            type="button"
                                                                            variant="ghost"
                                                                            size="sm"
                                                                            disabled={soloLectura}
                                                                            onClick={() => quitarUltimaAplicacion(med.id)}
                                                                            title="Quitar marca de última aplicación"
                                                                            aria-label="Quitar marca de última aplicación"
                                                                            className="h-7 w-7 p-0 text-slate-600 hover:bg-slate-100"
                                                                        >
                                                                            <RotateCcw className="h-4 w-4" />
                                                                        </Button>
                                                                    )}

                                                                    {!soloLectura && (
                                                                        <Button
                                                                            type="button"
                                                                            variant="outline"
                                                                            size="sm"
                                                                            onClick={() => eliminarMedicamento(med.id)}
                                                                            title="Eliminar medicamento"
                                                                            aria-label="Eliminar medicamento"
                                                                            className="h-7 w-7 p-0 border-red-500 text-red-600 hover:bg-red-50"
                                                                        >
                                                                            <Trash2 className="h-4 w-4" />
                                                                        </Button>
                                                                    )}
                                                                </div>
                                                            )}
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
                                                                className={`text-center align-middle h-[52px] ${med.ultimaAplicacionIndex === index
                                                                    ? "bg-amber-100 ring-1 ring-inset ring-amber-500"
                                                                    : ""
                                                                    }`}
                                                                title={
                                                                    med.ultimaAplicacionIndex === index
                                                                        ? "Última aplicación registrada"
                                                                        : undefined
                                                                }
                                                            >
                                                                <Checkbox
                                                                    checked={valor}

                                                                    disabled={
                                                                        soloLectura ||
                                                                        med.suspendido ||
                                                                        (
                                                                            med.ultimaAplicacionIndex !== null &&
                                                                            index >= med.ultimaAplicacionIndex
                                                                        )
                                                                    }

                                                                    onCheckedChange={() =>
                                                                        toggleDia(med.id, index)
                                                                    }
                                                                />

                                                                {med.ultimaAplicacionIndex === index && (
                                                                    <div className="mt-1 text-[9px] font-bold text-amber-800">
                                                                        ÚLTIMA
                                                                    </div>
                                                                )}
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
                {modo !== "consulta" && (
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
                )}
            </div>



            {/* MODAL PARA REGISTRAR LA ÚLTIMA APLICACIÓN */}
            <Dialog
                open={openModalUltimaAplicacion}
                onOpenChange={(open) => {
                    setOpenModalUltimaAplicacion(open);

                    if (!open) {
                        setMedicamentoUltimaAplicacionId(null);
                        setDiaUltimaAplicacionSeleccionado("");
                    }
                }}
            >
                <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                        <DialogTitle>
                            Registrar última aplicación
                        </DialogTitle>
                    </DialogHeader>

                    <div className="space-y-4 py-2">
                        <p className="text-sm text-muted-foreground">
                            Seleccione la última fecha en la que se administró
                            el medicamento. Solo se muestran días con
                            aplicaciones registradas.
                        </p>

                        <div className="space-y-2">
                            <Label>Fecha de última aplicación *</Label>

                            <select
                                value={diaUltimaAplicacionSeleccionado}
                                onChange={(e) =>
                                    setDiaUltimaAplicacionSeleccionado(e.target.value)
                                }
                                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                            >
                                <option value="">
                                    Seleccione una fecha
                                </option>

                                {medicamentosRegistrados
                                    .find(
                                        (med) =>
                                            med.id === medicamentoUltimaAplicacionId
                                    )
                                    ?.dias.map((marcado, index, dias) => {
                                        if (!marcado) return null;

                                        const hayAplicacionesPosteriores =
                                            dias.some(
                                                (otroDia, otroIndex) =>
                                                    otroIndex > index && otroDia
                                            );

                                        return (
                                            <option
                                                key={index}
                                                value={String(index)}
                                                disabled={hayAplicacionesPosteriores}
                                            >
                                                Día {index + 1} — {fechasTratamiento[index]}
                                                {hayAplicacionesPosteriores
                                                    ? " (hay aplicaciones posteriores)"
                                                    : ""}
                                            </option>
                                        );
                                    })}
                            </select>
                        </div>

                        <p className="text-xs text-muted-foreground">
                            Una vez confirmada la fecha, se bloquearán
                            las aplicaciones desde ese día en adelante.
                        </p>
                    </div>

                    <DialogFooter>
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => setOpenModalUltimaAplicacion(false)}
                        >
                            Cancelar
                        </Button>

                        <Button
                            type="button"
                            disabled={!diaUltimaAplicacionSeleccionado}
                            onClick={confirmarUltimaAplicacion}
                            className="bg-blue-600 text-white hover:bg-blue-700"
                        >
                            Confirmar última aplicación
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* MODAL PARA REGISTRAR LA SUSPENSIÓN DE UN MEDICAMENTO */}
            <Dialog
                open={openModalSuspension}
                onOpenChange={(open) => {
                    setOpenModalSuspension(open);

                    if (!open) {
                        setMedicamentoPendienteSuspension(null);
                        setMotivoSuspension("");
                        setFechaSuspension("");
                    }
                }}
            >
                <DialogContent
                    className="sm:max-w-md"
                    onPointerDownOutside={(e) => e.preventDefault()}
                >
                    <DialogHeader>
                        <DialogTitle>
                            Suspender medicamento
                        </DialogTitle>
                    </DialogHeader>

                    <div className="space-y-4 py-2">
                        <p className="text-sm text-muted-foreground">
                            Registre el motivo y la fecha de suspensión
                            antes de confirmar esta acción.
                        </p>

                        <div className="space-y-2">
                            <Label>Motivo de suspensión *</Label>

                            <Input
                                value={motivoSuspension}
                                onChange={(e) =>
                                    setMotivoSuspension(e.target.value)
                                }
                                placeholder="Ej. Reacción adversa del paciente"
                                maxLength={500}
                                autoFocus
                            />
                        </div>

                        <div className="space-y-2">
                            <Label>Fecha de suspensión *</Label>

                            <Input
                                type="date"
                                value={fechaSuspension}
                                onChange={(e) =>
                                    setFechaSuspension(e.target.value)
                                }
                                required
                            />
                        </div>

                        <p className="text-xs text-muted-foreground">
                            Los campos marcados con * son obligatorios.
                        </p>
                    </div>

                    <DialogFooter>
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => setOpenModalSuspension(false)}
                        >
                            Cancelar
                        </Button>

                        <Button
                            type="button"
                            disabled={
                                !motivoSuspension.trim() ||
                                !fechaSuspension
                            }
                            onClick={confirmarSuspension}
                            className="bg-amber-600 text-white hover:bg-amber-700"
                        >
                            Confirmar suspensión
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

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
