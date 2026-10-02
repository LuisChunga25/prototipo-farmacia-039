"use client"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Textarea } from "@/components/ui/textarea"
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
                        onClick={() => router.push("/dashboard/farmacia-clinica/anamnesis-farmaco")}
                    >
                        <ArrowLeft className="w-4 h-4 mr-1" />
                        Regresar
                    </Button>

                    <div>
                        <h1 className="text-xl font-bold">Registrar Anamnesis Farmacológica</h1>
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
                    <h2 className="font-semibold text-white">1. Datos personales</h2>
                </div>
                <div className="p-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        <div className="space-y-2">
                            <Label>Fecha <span className="text-red-500">*</span></Label>
                            <Input type="date" />
                        </div>
                        <div className="space-y-2">
                            <Label>Apellidos y Nombres <span className="text-red-500">*</span></Label>
                            <Input />
                        </div>
                        <div className="space-y-2">
                            <Label>Edad <span className="text-red-500">*</span></Label>
                            <Input />
                        </div>
                        <div className="space-y-2">
                            <Label>N° HC <span className="text-red-500">*</span></Label>
                            <Input />
                        </div>
                        <div className="space-y-2">
                            <Label>Peso <span className="text-red-500">*</span></Label>
                            <Input />
                        </div>
                        <div className="space-y-2">
                            <Label>Talla <span className="text-red-500">*</span></Label>
                            <Input />
                        </div>
                        <div className="space-y-2">
                            <Label>Procedencia <span className="text-red-500">*</span></Label>
                            <Input />
                        </div>
                    </div>
                </div>
            </div>

            {/* MEDICAMENTOS INVOLUCRADOS */}
            <div className="bg-white border border-slate-200 rounded-lg shadow-sm overflow-hidden">
                <div className="bg-gradient-to-r from-cyan-600 to-cyan-700 px-4 py-3">
                    <h2 className="font-semibold text-white">2. Historia de Salud</h2>
                </div>
                <div className="bg-gradient-to-r from-cyan-800 to-cyan-900 px-4 py-3">
                    <h2 className="font-semibold text-white">2.1 Antecedentes Patológicos</h2>
                </div>
                <div className="p-4">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <div className="flex items-center space-x-2">
                            <Checkbox></Checkbox>
                            <label className="text-sm">IMA</label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <Checkbox></Checkbox>
                            <label className="text-sm">ACV</label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <Checkbox></Checkbox>
                            <label className="text-sm">ICC</label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <Checkbox></Checkbox>
                            <label className="text-sm">Diabetes</label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <Checkbox></Checkbox>
                            <label className="text-sm">Enf. Renal</label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <Checkbox></Checkbox>
                            <label className="text-sm">Obesidad</label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <Checkbox></Checkbox>
                            <label className="text-sm">Asma</label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <Checkbox></Checkbox>
                            <label className="text-sm">Enf. Psiquiátrica</label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <Checkbox></Checkbox>
                            <label className="text-sm">Enf. Hepática</label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <Checkbox></Checkbox>
                            <label className="text-sm">Úlcera</label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <Checkbox></Checkbox>
                            <label className="text-sm">Enf. Tiroides</label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <Checkbox></Checkbox>
                            <label className="text-sm">A.R.</label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <Checkbox></Checkbox>
                            <label className="text-sm">HTA</label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <Checkbox></Checkbox>
                            <label className="text-sm">Medicación Habitual</label>
                        </div>
                    </div>
                </div>

                <div className="bg-gradient-to-r from-cyan-800 to-cyan-900 px-4 py-3 mt-6">
                    <h2 className="font-semibold text-white">2.2 Problemas de Salud (Signos / Síntomas)</h2>
                </div>
                <div className="p-4">
                    <div className="mb-4">
                        <Label className="font-semibold">SNC</Label>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <div className="flex items-center space-x-2">
                            <Checkbox></Checkbox>
                            <label className="text-sm">Tos</label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <Checkbox></Checkbox>
                            <label className="text-sm">Mareos</label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <Checkbox></Checkbox>
                            <label className="text-sm">Sueño</label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <Checkbox></Checkbox>
                            <label className="text-sm">Desvanecimiento</label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <Checkbox></Checkbox>
                            <label className="text-sm">Visión borrosa</label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <Checkbox></Checkbox>
                            <label className="text-sm">Pérdida de apetito</label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <Checkbox></Checkbox>
                            <label className="text-sm">Dolor de cabeza</label>
                        </div>
                    </div>

                    <div className="mb-4 mt-8">
                        <Label className="font-semibold">APARATO LOCOMOTOR</Label>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <div className="flex items-center space-x-2">
                            <Checkbox></Checkbox>
                            <label className="text-sm">Debilidad muscular</label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <Checkbox></Checkbox>
                            <label className="text-sm">Dolores articulares</label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <Checkbox></Checkbox>
                            <label className="text-sm">Calambres</label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <Checkbox></Checkbox>
                            <label className="text-sm">Dolor/rigídez de cuello</label>
                        </div>
                    </div>

                    <div className="mb-4 mt-8">
                        <Label className="font-semibold">SISTEMA DIGESTIVO</Label>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <div className="flex items-center space-x-2">
                            <Checkbox></Checkbox>
                            <label className="text-sm">Dolor y/o ardor de estómago</label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <Checkbox></Checkbox>
                            <label className="text-sm">Náuseas y/o vómitos</label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <Checkbox></Checkbox>
                            <label className="text-sm">Diarreas</label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <Checkbox></Checkbox>
                            <label className="text-sm">Estreñimiento</label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <Checkbox></Checkbox>
                            <label className="text-sm">Sequedad bucal</label>
                        </div>
                    </div>

                    <div className="mb-4 mt-8">
                        <Label className="font-semibold">METABÓLICAS</Label>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <div className="flex items-center space-x-2">
                            <Checkbox></Checkbox>
                            <label className="text-sm">Hiponatremia</label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <Checkbox></Checkbox>
                            <label className="text-sm">Hipopotasemia</label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <Checkbox></Checkbox>
                            <label className="text-sm">Hiperglicemia</label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <Checkbox></Checkbox>
                            <label className="text-sm">Hipercalcemia</label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <Checkbox></Checkbox>
                            <label className="text-sm">Hipercolesteronemia</label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <Checkbox></Checkbox>
                            <label className="text-sm">Edema</label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <Checkbox></Checkbox>
                            <label className="text-sm">Hiperpotasemia</label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <Checkbox></Checkbox>
                            <label className="text-sm">Hipotiroidismo</label>
                        </div>
                    </div>

                    <div className="mb-4 mt-8">
                        <Label className="font-semibold">SISTEMA CARDIOVASCULAR</Label>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <div className="flex items-center space-x-2">
                            <Checkbox></Checkbox>
                            <label className="text-sm">Palpitaciones</label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <Checkbox></Checkbox>
                            <label className="text-sm">Taquicardia</label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <Checkbox></Checkbox>
                            <label className="text-sm">Hipotensión</label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <Checkbox></Checkbox>
                            <label className="text-sm">Arritmias</label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <Checkbox></Checkbox>
                            <label className="text-sm">Angina</label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <Checkbox></Checkbox>
                            <label className="text-sm">Bradicardia</label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <Checkbox></Checkbox>
                            <label className="text-sm">Hipotensión ortostática</label>
                        </div>
                    </div>

                    <div className="mb-4 mt-8">
                        <Label className="font-semibold">PIEL</Label>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <div className="flex items-center space-x-2">
                            <Checkbox></Checkbox>
                            <label className="text-sm">Erupciones cutáneas</label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <Checkbox></Checkbox>
                            <label className="text-sm">Prurito</label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <Checkbox></Checkbox>
                            <label className="text-sm">Rubefacción</label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <Checkbox></Checkbox>
                            <label className="text-sm">Otros</label>
                        </div>
                    </div>
                </div>

                <div className="bg-gradient-to-r from-cyan-800 to-cyan-900 px-4 py-3 mt-6">
                    <h2 className="font-semibold text-white">2.3 Funciones Vitales</h2>
                </div>
                <div className="p-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                        <div className="space-y-2">
                            <Label>FC <span className="text-red-500">*</span></Label>
                            <Input />
                        </div>
                        <div className="space-y-2">
                            <Label>FR <span className="text-red-500">*</span></Label>
                            <Input />
                        </div>
                        <div className="space-y-2">
                            <Label>SAT O2 <span className="text-red-500">*</span></Label>
                            <Input />
                        </div>
                        <div className="space-y-2">
                            <Label>T° <span className="text-red-500">*</span></Label>
                            <Input />
                        </div>
                        <div className="space-y-2">
                            <Label>PA <span className="text-red-500">*</span></Label>
                            <Input />
                        </div>
                    </div>
                </div>

                <div className="bg-gradient-to-r from-cyan-800 to-cyan-900 px-4 py-3 mt-6">
                    <h2 className="font-semibold text-white">2.4 Pruebas de Laboratorio</h2>
                </div>
                <div className="p-4">
                    <div className="mt-6 border rounded-lg overflow-hidden">
                        <table className="w-full text-sm">
                            <thead className="bg-slate-100">
                                <tr>
                                    <th className="px-3 py-2 text-left">Prueba</th>
                                    <th className="px-3 py-2 text-left">Resultado</th>
                                    <th className="px-3 py-2 text-left">Fecha</th>
                                </tr>
                            </thead>

                            <tbody>
                                <tr>
                                    <td className="px-3 py-2">Leucocitos</td>
                                    <td className="px-3 py-2"></td>
                                    <td className="px-3 py-2"></td>
                                </tr>
                                <tr>
                                    <td className="px-3 py-2">HB</td>
                                    <td className="px-3 py-2"></td>
                                    <td className="px-3 py-2"></td>
                                </tr>
                                <tr>
                                    <td className="px-3 py-2">Plaquetas</td>
                                    <td className="px-3 py-2"></td>
                                    <td className="px-3 py-2"></td>
                                </tr>
                                <tr>
                                    <td className="px-3 py-2">Neutrofilos</td>
                                    <td className="px-3 py-2"></td>
                                    <td className="px-3 py-2"></td>
                                </tr>
                                <tr>
                                    <td className="px-3 py-2">PCR</td>
                                    <td className="px-3 py-2"></td>
                                    <td className="px-3 py-2"></td>
                                </tr>
                                <tr>
                                    <td className="px-3 py-2">Na</td>
                                    <td className="px-3 py-2"></td>
                                    <td className="px-3 py-2"></td>
                                </tr>
                                <tr>
                                    <td className="px-3 py-2">K</td>
                                    <td className="px-3 py-2"></td>
                                    <td className="px-3 py-2"></td>
                                </tr>
                                <tr>
                                    <td className="px-3 py-2">Albúmina</td>
                                    <td className="px-3 py-2"></td>
                                    <td className="px-3 py-2"></td>
                                </tr>
                                <tr>
                                    <td className="px-3 py-2">Prot. Totales</td>
                                    <td className="px-3 py-2"></td>
                                    <td className="px-3 py-2"></td>
                                </tr>
                                <tr>
                                    <td className="px-3 py-2">Probnp</td>
                                    <td className="px-3 py-2"></td>
                                    <td className="px-3 py-2"></td>
                                </tr>
                                <tr>
                                    <td className="px-3 py-2">Urae</td>
                                    <td className="px-3 py-2"></td>
                                    <td className="px-3 py-2"></td>
                                </tr>
                                <tr>
                                    <td className="px-3 py-2">Creat.</td>
                                    <td className="px-3 py-2"></td>
                                    <td className="px-3 py-2"></td>
                                </tr>
                                <tr>
                                    <td className="px-3 py-2">FA</td>
                                    <td className="px-3 py-2"></td>
                                    <td className="px-3 py-2"></td>
                                </tr>
                                <tr>
                                    <td className="px-3 py-2">TGO</td>
                                    <td className="px-3 py-2"></td>
                                    <td className="px-3 py-2"></td>
                                </tr>
                                <tr>
                                    <td className="px-3 py-2">TGP</td>
                                    <td className="px-3 py-2"></td>
                                    <td className="px-3 py-2"></td>
                                </tr>
                                <tr>
                                    <td className="px-3 py-2">BT</td>
                                    <td className="px-3 py-2"></td>
                                    <td className="px-3 py-2"></td>
                                </tr>
                                <tr>
                                    <td className="px-3 py-2">BD</td>
                                    <td className="px-3 py-2"></td>
                                    <td className="px-3 py-2"></td>
                                </tr>
                                <tr>
                                    <td className="px-3 py-2">BI</td>
                                    <td className="px-3 py-2"></td>
                                    <td className="px-3 py-2"></td>
                                </tr>
                                <tr>
                                    <td className="px-3 py-2">GGT</td>
                                    <td className="px-3 py-2"></td>
                                    <td className="px-3 py-2"></td>
                                </tr>
                                <tr>
                                    <td className="px-3 py-2">Amilasa</td>
                                    <td className="px-3 py-2"></td>
                                    <td className="px-3 py-2"></td>
                                </tr>
                                <tr>
                                    <td className="px-3 py-2">Lipasa</td>
                                    <td className="px-3 py-2"></td>
                                    <td className="px-3 py-2"></td>
                                </tr>
                                <tr>
                                    <td className="px-3 py-2">Urocultivo</td>
                                    <td className="px-3 py-2"></td>
                                    <td className="px-3 py-2"></td>
                                </tr>
                                <tr>
                                    <td className="px-3 py-2">Antibiograma</td>
                                    <td className="px-3 py-2"></td>
                                    <td className="px-3 py-2"></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4 mt-6">
                        <div className="space-y-2">
                            <Label>Otros exámenes auxiliares <span className="text-red-500">*</span></Label>
                            <Textarea />
                        </div>
                    </div>
                </div>

                <div className="bg-gradient-to-r from-cyan-800 to-cyan-900 px-4 py-3 mt-6">
                    <h2 className="font-semibold text-white">2.5 Diagnóstico(s)</h2>
                </div>
                <div className="p-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="space-y-2">
                            <Label>Tipo de DX <span className="text-red-500">*</span></Label>
                            <Input />
                        </div>

                        <div className="space-y-2">
                            <Label>Diagnóstico <span className="text-red-500">*</span></Label>
                            <Input />
                        </div>
                    </div>

                    <div className="flex justify-end mt-4">
                        <Button
                            type="button"
                            className="bg-green-600 hover:bg-green-700 text-white flex items-center gap-2"
                        >
                            <PlusCircle className="w-4 h-4" />
                            Agregar
                        </Button>
                    </div>

                    <div className="mt-6 border rounded-lg overflow-hidden">
                        <table className="w-full text-sm">
                            <thead className="bg-slate-100">
                                <tr>
                                    <th className="px-3 py-2 text-left">CIE 10</th>
                                    <th className="px-3 py-2 text-left">Descripción</th>
                                    <th className="px-3 py-2 text-left">Tipo de DX</th>
                                    <th className="px-3 py-2 text-left">Usuario</th>
                                    <th className="px-3 py-2 text-left">Acción</th>
                                </tr>
                            </thead>

                            <tbody>
                                <tr>
                                    <td className="px-3 py-2">Z981</td>
                                    <td className="px-3 py-2">Estado de Artrodesis</td>
                                    <td className="px-3 py-2">P</td>
                                    <td className="px-3 py-2">Nora Liz Baltuano Villafuerte</td>
                                    <td className="px-3 py-2">
                                        <Button
                                            title="Eliminar"
                                            variant="outline"
                                            className="h-8 w-10 p-1.5 border-red-600 text-red-600 hover:bg-red-50"
                                        >
                                            <Trash2 className="w-3 h-3" />
                                        </Button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

            </div>

            {/* EVALUACION DE DATOS DE LA FARMACOTERAPIA */}
            <div className="bg-white border border-slate-200 rounded-lg shadow-sm overflow-hidden">
                <div className="bg-gradient-to-r from-cyan-600 to-cyan-700 px-4 py-3">
                    <h2 className="font-semibold text-white">3. Evaluación de datos de la farmacoterapia</h2>
                </div>

                <div className="p-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="md:col-span-2 space-y-2">
                            <Label>PRM IDENTIFICADO <span className="text-red-500">*</span></Label>
                            <div className="mt-6 border rounded-lg overflow-hidden">
                                <table className="w-full text-sm">
                                    <thead className="bg-slate-100">
                                        <tr>
                                            <th className="px-3 py-2 text-left">N</th>
                                            <th className="px-3 py-2 text-left">E</th>
                                            <th className="px-3 py-2 text-left">S</th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        <tr>
                                            <td className="px-3 py-2">1</td>
                                            <td className="px-3 py-2">3</td>
                                            <td className="px-3 py-2">5</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        <div className="md:col-span-2 space-y-2 mt-6">
                            <Label>EVALUACIÓN DE RIESTOS DE NECESIDAD, EFICACIA Y SEGURIDAD <span className="text-red-500">*</span></Label>
                            <Textarea />
                        </div>

                        <div className="md:col-span-2 space-y-2 mt-6">
                            <Label>REFERENCIA BIBLIOGRÁFICA <span className="text-red-500">*</span></Label>
                            <Textarea />
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
                            Guardar Seguimiento
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
                        El documento de anamnesis farmacológica ha sido registrado con éxito.
                    </p>

                    <DialogFooter className="flex justify-center mt-4">
                        <Button
                            className="bg-blue-600 hover:bg-blue-700 text-white"
                            onClick={() => {
                                setOpenModalExito(false);
                                router.push("/dashboard/farmacia-clinica/anamnesis-farmaco");
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
