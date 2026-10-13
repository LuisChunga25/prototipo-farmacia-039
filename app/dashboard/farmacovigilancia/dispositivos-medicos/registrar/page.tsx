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

type MedicamentoInvolucrado = {
    id: number;
    nombreComercial: string;
    laboratorio: string;
    lote: string;
    dosisFrecuencia: string;
    viaAdministracion: string;
    fechaInicio: string;
    fechaFinal: string;
    motivoPrescripcion: string;
};

type MedicamentoConcomitante = {
    id: number;
    nombreComercialCon: string;
    dosisFrecuenciaCon: string;
    viaAdministracionCon: string;
    fechaInicioCon: string;
    fechaFinalCon: string;
    motivoPrescripcionCon: string;
}


export default function RegistrarNotificacionDispMedicosPage() {
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
    const [nombreComercial, setNombreComercial] = useState("");
    const [laboratorio, setLaboratorio] = useState("");
    const [lote, setLote] = useState("");
    const [dosisFrecuencia, setDosisFrecuencia] = useState("");
    const [viaAdministracion, setViaAdministracion] = useState("");
    const [fechaInicio, setFechaInicio] = useState("");
    const [fechaFinal, setFechaFinal] = useState("");
    const [motivoPrescripcion, setMotivoPrescripcion] = useState("");
    const [medicamentosRegistrados, setMedicamentosRegistrados] = useState<MedicamentoInvolucrado[]>([]);
    const [nombreComercialCon, setNombreComercialCon] = useState("");
    const [dosisFrecuenciaCon, setDosisFrecuenciaCon] = useState("");
    const [viaAdministracionCon, setViaAdministracionCon] = useState("");
    const [fechaInicioCon, setFechaInicioCon] = useState("");
    const [fechaFinalCon, setFechaFinalCon] = useState("");
    const [motivoPrescripcionCon, setMotivoPrescripcionCon] = useState("");
    const [MedicamentosConcRegistrados, setMedicamentosConcRegistrados] = useState<MedicamentoConcomitante[]>([]);

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

    // FUNCIÓN GUARDAR NOTIFICACIÓN DE DISPOSITIVOS MÉDICOS
    const handleGuardarNotifDispMedicos = () => {
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

    // AGREGAR MEDICAMENTO A LA TABLA
    const agregarMedicamento = () => {
        const nuevoMedicamento: MedicamentoInvolucrado = {
            id: Date.now(),
            nombreComercial,
            laboratorio,
            lote,
            dosisFrecuencia,
            viaAdministracion,
            fechaInicio,
            fechaFinal,
            motivoPrescripcion,
        };

        setMedicamentosRegistrados(prev => [
            ...prev,
            nuevoMedicamento,
        ]);

        // Limpiar formulario
        setNombreComercial("");
        setLaboratorio("");
        setLote("");
        setDosisFrecuencia("");
        setViaAdministracion("");
        setFechaInicio("");
        setFechaFinal("");
        setMotivoPrescripcion("");
    };

    const agregarMedicamentoConcomitante = () => {
        const nuevoMedicamentoCon: MedicamentoConcomitante = {
            id: Date.now(),
            nombreComercialCon,
            dosisFrecuenciaCon,
            viaAdministracionCon,
            fechaInicioCon,
            fechaFinalCon,
            motivoPrescripcionCon,
        };

        setMedicamentosConcRegistrados(prev => [
            ...prev,
            nuevoMedicamentoCon,
        ]);

        // Limpiar formulario
        setNombreComercialCon("");
        setDosisFrecuenciaCon("");
        setViaAdministracionCon("");
        setFechaInicioCon("");
        setFechaFinalCon("");
        setMotivoPrescripcionCon("");
    };


    return (
        <div className="max-w-7xl mx-auto p-6 space-y-6 bg-slate-50/50 min-h-screen">

            {/* Header */}
            <div className="flex justify-between items-center bg-white rounded-lg p-4 shadow-sm border">
                <div className="flex items-center gap-4 w-full">
                    <Button
                        variant="outline"
                        onClick={() => router.push("/dashboard/farmacovigilancia/dispositivos-medicos")}
                    >
                        <ArrowLeft className="w-4 h-4 mr-1" />
                        Regresar
                    </Button>

                    <div>
                        <h1 className="text-xl font-bold">Registro de notificación de sospechas de incidentes adversos a dispositivos médicos por los profesionales de la salud</h1>
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
                <div className="p-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4">
                        <div className="space-y-2">
                            <Label>N° Notificación <span className="text-red-500">*</span></Label>
                            <Input className="border border-slate-900" />
                        </div>
                        <div className="space-y-2">
                            <Label>Fecha <span className="text-red-500">*</span></Label>
                            <Input type="date" className="border border-slate-900" />
                        </div>
                    </div>
                </div>
            </div>

            {/* IDENTIFICACIÓN DEL PACIENTE */}
            <div className="bg-white border border-slate-200 rounded-lg shadow-sm overflow-hidden">
                <div className="bg-gradient-to-r from-cyan-600 to-cyan-700 px-4 py-3">
                    <h2 className="font-semibold text-white">I. IDENTIFICACIÓN DEL PACIENTE</h2>
                </div>
                <div className="p-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        <div className="space-y-2">
                            <Label>Iniciales del paciente <span className="text-red-500">*</span></Label>
                            <Input className="border border-slate-900" />
                        </div>
                        <div className="space-y-2">
                            <Label>Edad <span className="text-red-500">*</span></Label>
                            <Input className="border border-slate-900" />
                        </div>
                        <div className="space-y-2">
                            <Label>Historia Clínica y/o DNI <span className="text-red-500">*</span></Label>
                            <Input className="border border-slate-900" />
                        </div>
                        <div className="space-y-2">
                            <Label>Sexo <span className="text-red-500">*</span></Label>
                            <Input className="border border-slate-900" />
                        </div>
                        <div className="space-y-2">
                            <Label>Diagnóstico principal o CIE10 <span className="text-red-500">*</span></Label>
                            <Input className="border border-slate-900" />
                        </div>
                    </div>
                </div>
            </div>

            {/* DATOS DEL DISPOSITIVO MÉDICO (DM) */}
            <div className="bg-white border border-slate-200 rounded-lg shadow-sm overflow-hidden">
                <div className="bg-gradient-to-r from-cyan-600 to-cyan-700 px-4 py-3">
                    <h2 className="font-semibold text-white">II. DATOS DEL DISPOSITIVO MÉDICO (DM)</h2>
                </div>
                <div className="p-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        <div className="md:col-span-3 space-y-2">
                            <Label>Nombre común <span className="text-red-500">*</span></Label>
                            <Input className="border border-slate-900" />
                        </div>
                        <div className="md:col-span-3 space-y-2">
                            <Label>Nombre comercial y/o marca <span className="text-red-500">*</span></Label>
                            <Input className="border border-slate-900" />
                        </div>
                        <div className="space-y-2">
                            <Label>Registro sanitario <span className="text-red-500">*</span></Label>
                            <Input className="border border-slate-900" />
                        </div>
                        <div className="space-y-2">
                            <Label>Lote <span className="text-red-500">*</span></Label>
                            <Input className="border border-slate-900" />
                        </div>
                        <div className="space-y-2">
                            <Label>Modelo <span className="text-red-500">*</span></Label>
                            <Input className="border border-slate-900" />
                        </div>
                        <div className="space-y-2">
                            <Label>Serie <span className="text-red-500">*</span></Label>
                            <Input className="border border-slate-900" />
                        </div>
                        <div className="space-y-2">
                            <Label>Fecha de fabricación <span className="text-red-500">*</span></Label>
                            <Input type="date" className="border border-slate-900" />
                        </div>
                        <div className="space-y-2">
                            <Label>Fecha de expiración <span className="text-red-500">*</span></Label>
                            <Input type="date" className="border border-slate-900" />
                        </div>
                        <div className="md:col-span-2 space-y-2">
                            <Label>Nombre del sitio de fabricación <span className="text-red-500">*</span></Label>
                            <Input className="border border-slate-900" />
                        </div>
                        <div className="space-y-2">
                            <Label>País <span className="text-red-500">*</span></Label>
                            <Input className="border border-slate-900" />
                        </div>
                        <div className="md:col-span-2 space-y-2">
                            <Label>Nombre del fabricante <span className="text-red-500">*</span></Label>
                            <Input className="border border-slate-900" />
                        </div>
                        <div className="space-y-2">
                            <Label>País <span className="text-red-500">*</span></Label>
                            <Input className="border border-slate-900" />
                        </div>
                        <div className="md:col-span-3 space-y-2">
                            <Label>Nombre del importador y/o distribuidor <span className="text-red-500">*</span></Label>
                            <Input className="border border-slate-900" />
                        </div>
                        <div className="space-y-2">
                            <Label>Indique si el dispositivo médico de un solo uso ha sido utilizado más de una vez <span className="text-red-500">*</span></Label>
                            <div className="flex items-center space-x-2">
                                <Checkbox
                                    id="mas-de-una-vez"
                                />
                                <Label htmlFor="mas-de-una-vez" className="text-sm font-normal cursor-pointer">Sí</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Checkbox
                                    id="uso-unico"
                                />
                                <Label htmlFor="uso-unico" className="text-sm font-normal cursor-pointer">No</Label>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* DATOS DE LA SOSPECHA DE INCIDENTE ADVERSO */}
            <div className="bg-white border border-slate-200 rounded-lg shadow-sm overflow-hidden">
                <div className="bg-gradient-to-r from-cyan-600 to-cyan-700 px-4 py-3">
                    <h2 className="font-semibold text-white">III. DATOS DE LA SOSPECHA DE INCIDENTE ADVERSO</h2>
                </div>
                <div className="p-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="md:col-span-2 space-y-2">
                            <p className="text-sm font-semibold">1. Detección de la temporalidad del incidente adverso <span className="text-red-500">*</span></p>
                            <div className="flex items-center space-x-2">
                                <Checkbox
                                    id="antes-dm"
                                />
                                <Label htmlFor="antes-dm" className="text-sm font-normal cursor-pointer">Antes del uso del DM</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Checkbox
                                    id="durante-dm"
                                />
                                <Label htmlFor="durante-dm" className="text-sm font-normal cursor-pointer">Durante el uso del DM</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Checkbox
                                    id="despues-dm"
                                />
                                <Label htmlFor="despues-dm" className="text-sm font-normal cursor-pointer">Después del uso del DM</Label>
                            </div>
                        </div>

                        <div className="md:col-span-2 space-y-2">
                            <Label>Área y/o servicio donde se produjo el incidente adverso <span className="text-red-500">*</span></Label>
                            <Input
                                className="border border-slate-900"
                            />
                        </div>

                        <div className="md:col-span-2 space-y-2 mt-6">
                            <p className="text-sm font-semibold">2. Tipo de afectado <span className="text-red-500">*</span></p>
                            <div className="flex items-center space-x-2">
                                <Checkbox
                                    id="paciente"
                                />
                                <Label htmlFor="paciente" className="text-sm font-normal cursor-pointer">Paciente</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Checkbox
                                    id="operario"
                                />
                                <Label htmlFor="operario" className="text-sm font-normal cursor-pointer">Operario</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Checkbox
                                    id="otros"
                                />
                                <Label htmlFor="otros" className="text-sm font-normal cursor-pointer">Otros (especificar)</Label>
                            </div>
                        </div>

                        <div className="md:col-span-2 space-y-2 mt-6">
                            <p className="text-sm font-semibold">3. Descripción de la sospecha del incidente adverso <span className="text-red-500">*</span></p>
                            <Textarea
                                className="border border-slate-900"
                            />
                        </div>

                        <div className="md:col-span-2 space-y-2 mt-6">
                            <p className="text-sm font-semibold">4. Clasificación de la sospecha del incidente adverso <span className="text-red-500">*</span></p>
                            <div className="flex items-center space-x-2">
                                <Checkbox
                                    id="leve"
                                />
                                <Label htmlFor="leve" className="text-sm font-normal cursor-pointer">Leve</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Checkbox
                                    id="moderado"
                                />
                                <Label htmlFor="moderado" className="text-sm font-normal cursor-pointer">Moderado</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Checkbox
                                    id="grave"
                                />
                                <Label htmlFor="grave" className="text-sm font-normal cursor-pointer">Grave</Label>
                            </div>
                        </div>

                        <div className="md:col-span-2 space-y-2 mt-6">
                            <p className="text-sm font-semibold">5. Consecuencia <span className="text-red-500">*</span></p>
                            <div className="flex items-center space-x-2">
                                <Checkbox
                                    id="muerte"
                                />
                                <Label htmlFor="muerte" className="text-sm font-normal cursor-pointer">Muerte</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Checkbox
                                    id="lesion-permanente"
                                />
                                <Label htmlFor="lesion-permanente" className="text-sm font-normal cursor-pointer">Lesión permanente</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Checkbox
                                    id="lesion-temporal"
                                />
                                <Label htmlFor="lesion-temporal" className="text-sm font-normal cursor-pointer">Lesión temporal</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Checkbox
                                    id="requiere-intervencion-quirurgica"
                                />
                                <Label htmlFor="requiere-intervencion-quirurgica" className="text-sm font-normal cursor-pointer">Requiere intervención quirúrgica</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Checkbox
                                    id="produjo-prolongo-hospitalizacion"
                                />
                                <Label htmlFor="produjo-prolongo-hospitalizacion" className="text-sm font-normal cursor-pointer">Produjo o prolongó su hospitalización</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Checkbox
                                    id="no-tuvo-consecuencias"
                                />
                                <Label htmlFor="no-tuvo-consecuencias" className="text-sm font-normal cursor-pointer">No tuvo consecuencias</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Checkbox
                                    id="otros-especificar"
                                />
                                <Label htmlFor="otros-especificar" className="text-sm font-normal cursor-pointer">Otros (especificar)</Label>
                            </div>
                        </div>

                        <div className="md:col-span-2 space-y-2 mt-6">
                            <p className="text-sm font-semibold">6. Causa probable <span className="text-red-500">*</span></p>
                            <div className="flex items-center space-x-2">
                                <Checkbox
                                    id="mala-calidad"
                                />
                                <Label htmlFor="mala-calidad" className="text-sm font-normal cursor-pointer">Mala calidad</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Checkbox
                                    id="error-de-uso"
                                />
                                <Label htmlFor="error-de-uso" className="text-sm font-normal cursor-pointer">Error de uso</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Checkbox
                                    id="condiciones-de-almacenamiento"
                                />
                                <Label htmlFor="condiciones-de-almacenamiento" className="text-sm font-normal cursor-pointer">Condiciones de almacenamiento</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Checkbox
                                    id="mantenimiento"
                                />
                                <Label htmlFor="mantenimiento" className="text-sm font-normal cursor-pointer">Mantenimiento</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Checkbox
                                    id="ambiente-inapropiado"
                                />
                                <Label htmlFor="ambiente-inapropiado" className="text-sm font-normal cursor-pointer">Ambiente inapropiado</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Checkbox
                                    id="condicion-del-paciente"
                                />
                                <Label htmlFor="condicion-del-paciente" className="text-sm font-normal cursor-pointer">Condición del paciente</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Checkbox
                                    id="otros-esp"
                                />
                                <Label htmlFor="otros-esp" className="text-sm font-normal cursor-pointer">Otros (especificar)</Label>
                            </div>
                        </div>

                        <div className="md:col-span-2 space-y-2 mt-6">
                            <p className="text-sm font-semibold">7. Acciones correctivas y preventivas iniciadas <span className="text-red-500">*</span></p>
                            <Textarea
                                className="border border-slate-900"
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* DATOS DEL NOTIFICADOR */}
            <div className="bg-white border border-slate-200 rounded-lg shadow-sm overflow-hidden">
                <div className="bg-gradient-to-r from-cyan-600 to-cyan-700 px-4 py-3">
                    <h2 className="font-semibold text-white">IV. DATOS DEL NOTIFICADOR</h2>
                </div>
                <div className="p-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        <div className="md:col-span-3 space-y-2">
                            <Label>Nombres y apellidos <span className="text-red-500">*</span></Label>
                            <Input className="border border-slate-900" />
                        </div>
                        <div className="space-y-2">
                            <Label>Profesión / ocupación <span className="text-red-500">*</span></Label>
                            <Input className="border border-slate-900" />
                        </div>
                        <div className="space-y-2">
                            <Label>Teléfono <span className="text-red-500">*</span></Label>
                            <Input className="border border-slate-900" />
                        </div>
                        <div className="space-y-2">
                            <Label>E-mail <span className="text-red-500">*</span></Label>
                            <Input className="border border-slate-900" />
                        </div>
                    </div>
                </div>
            </div>

            {/* LUGAR DONDE SE PRESENTÓ EL INCIDENTE ADVERSO */}
            <div className="bg-white border border-slate-200 rounded-lg shadow-sm overflow-hidden">
                <div className="bg-gradient-to-r from-cyan-600 to-cyan-700 px-4 py-3">
                    <h2 className="font-semibold text-white">V. LUGAR DONDE SE PRESENTÓ EL INCIDENTE ADVERSO</h2>
                </div>
                <div className="p-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        <div className="md:col-span-3 space-y-2">
                            <Label>Nombres de la institución / organismo / centro de trabajo <span className="text-red-500">*</span></Label>
                            <Input className="border border-slate-900" />
                        </div>
                        <div className="space-y-2">
                            <Label>Dirección <span className="text-red-500">*</span></Label>
                            <Input className="border border-slate-900" />
                        </div>
                        <div className="space-y-2">
                            <Label>Ciudad <span className="text-red-500">*</span></Label>
                            <Input className="border border-slate-900" />
                        </div>
                        <div className="space-y-2">
                            <Label>Región <span className="text-red-500">*</span></Label>
                            <Input className="border border-slate-900" />
                        </div>
                        <div className="space-y-2">
                            <Label>E-mail <span className="text-red-500">*</span></Label>
                            <Input className="border border-slate-900" />
                        </div>
                        <div className="space-y-2">
                            <Label>Teléfono <span className="text-red-500">*</span></Label>
                            <Input className="border border-slate-900" />
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
                    onClick={handleGuardarNotifDispMedicos}
                >
                    {guardando ? (
                        <>
                            <Loader2 className="w-4 h-4 animate-spin" />
                            Guardando...
                        </>
                    ) : (
                        <>
                            <Save className="w-4 h-4" />
                            Guardar Notificación
                        </>
                    )}
                </Button>
            </div>

            {/* MODAL DE ÉXITO DEL GUARDADO DE LA NOTIFICACION DE SOSPECHAS DE INCIDENTES ADVERSOS A DISPOSITIVOS MÉDICOS */}
            <Dialog open={openModalExito} onOpenChange={setOpenModalExito}>
                <DialogContent className="max-w-sm">
                    <DialogHeader>
                        <DialogTitle className="flex flex-col items-center gap-3">
                            <CheckCircle className="w-16 h-16 text-green-600" />
                            <span>Registro exitoso</span>
                        </DialogTitle>
                    </DialogHeader>

                    <p className="text-center text-gray-700">
                        La notificación de sospechas de incidentes adversos a dispositivos médicos ha sido registrada con éxito.
                    </p>

                    <DialogFooter className="flex justify-center mt-4">
                        <Button
                            className="bg-blue-600 hover:bg-blue-700 text-white"
                            onClick={() => {
                                setOpenModalExito(false);
                                router.push("/dashboard/farmacovigilancia/dispositivos-medicos");
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
