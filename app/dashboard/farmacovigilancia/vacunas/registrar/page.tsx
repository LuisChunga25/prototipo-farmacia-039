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

type VacunaSospechosa = {
    id: number;
    nombre: string;
    laboratorio: string;
    lote: string;
    dosis: string;
    viaAdministracion: string;
    fechaVacunacion: string;
    horaVacunacion: string;
    loteDiluyente: string;
    fechaVctoDiluyente: string;
};

type MedicamentoUtilizado = {
    id: number;
    nombreComercial: string;
    dosisFrecuencia: string;
    viaAdm: string;
    fechaInicio: string;
    fechaFinal: string;
    motivoPrescripcion: string;
}


export default function RegistrarNotificacionVacunasPage() {
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
    const [nombre, setNombre] = useState("");
    const [laboratorio, setLaboratorio] = useState("");
    const [lote, setLote] = useState("");
    const [dosis, setDosis] = useState("");
    const [viaAdministracion, setViaAdministracion] = useState("");
    const [fechaVacunacion, setFechaVacunacion] = useState("");
    const [horaVacunacion, setHoraVacunacion] = useState("");
    const [loteDiluyente, setLoteDiluyente] = useState("");
    const [fechaVctoDiluyente, setFechaVctoDiluyente] = useState("");
    const [vacunasSospechosas, setVacunasSospechosas] = useState<VacunaSospechosa[]>([]);
    const [nombreComercial, setNombreComercial] = useState("");
    const [dosisFrecuencia, setDosisFrecuencia] = useState("");
    const [viaAdm, setViaAdm] = useState("");
    const [fechaInicio, setFechaInicio] = useState("");
    const [fechaFinal, setFechaFinal] = useState("");
    const [motivoPrescripcion, setMotivoPrescripcion] = useState("");
    const [medicamentosUtilizadosRegistrados, setMedicamentosUtilizadosRegistrados] = useState<MedicamentoUtilizado[]>([]);

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

    // FUNCIÓN GUARDAR NOTIFICACIÓN DE VACUNAS
    const handleGuardarNotifVacunas = () => {
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

    // AGREGAR VACUNA A LA TABLA
    const agregarVacuna = () => {
        const nuevaVacuna: VacunaSospechosa = {
            id: Date.now(),
            nombre,
            laboratorio,
            lote,
            dosis,
            viaAdministracion,
            fechaVacunacion,
            horaVacunacion,
            loteDiluyente,
            fechaVctoDiluyente,
        };

        setVacunasSospechosas(prev => [
            ...prev,
            nuevaVacuna,
        ]);

        // Limpiar formulario
        setNombre("");
        setLaboratorio("");
        setLote("");
        setDosis("");
        setViaAdministracion("");
        setFechaVacunacion("");
        setHoraVacunacion("");
        setLoteDiluyente("");
        setFechaVctoDiluyente("");
    };

    const agregarMedicamentoUtilizado = () => {
        const nuevoMedicamentoUtil: MedicamentoUtilizado = {
            id: Date.now(),
            nombreComercial,
            dosisFrecuencia,
            viaAdm,
            fechaInicio,
            fechaFinal,
            motivoPrescripcion,
        };

        setMedicamentosUtilizadosRegistrados(prev => [
            ...prev,
            nuevoMedicamentoUtil,
        ]);

        // Limpiar formulario
        setNombreComercial("");
        setDosisFrecuencia("");
        setViaAdm("");
        setFechaInicio("");
        setFechaFinal("");
        setMotivoPrescripcion("");
    };


    return (
        <div className="max-w-7xl mx-auto p-6 space-y-6 bg-slate-50/50 min-h-screen">

            {/* Header */}
            <div className="flex justify-between items-center bg-white rounded-lg p-4 shadow-sm border">
                <div className="flex items-center gap-4 w-full">
                    <Button
                        variant="outline"
                        onClick={() => router.push("/dashboard/farmacovigilancia/vacunas")}
                    >
                        <ArrowLeft className="w-4 h-4 mr-1" />
                        Regresar
                    </Button>

                    <div>
                        <h1 className="text-xl font-bold">Registro de Notificación de eventos supuestamente atribuidos a la vacunación e inmunización</h1>
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

            {/* DATOS DEL PACIENTE */}
            <div className="bg-white border border-slate-200 rounded-lg shadow-sm overflow-hidden">
                <div className="bg-gradient-to-r from-cyan-600 to-cyan-700 px-4 py-3">
                    <h2 className="font-semibold text-white">A. DATOS DEL PACIENTE</h2>
                </div>
                <div className="p-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        <div className="space-y-2">
                            <Label>Nombres o iniciales <span className="text-red-500">*</span></Label>
                            <Input className="border border-slate-900" />
                        </div>
                        <div className="space-y-2">
                            <Label>Edad <span className="text-red-500">*</span></Label>
                            <Input className="border border-slate-900" />
                        </div>
                        <div className="space-y-2">
                            <Label>Sexo <span className="text-red-500">*</span></Label>
                            <Input className="border border-slate-900" />
                        </div>
                        <div className="space-y-2">
                            <Label>Peso (Kg) <span className="text-red-500">*</span></Label>
                            <Input className="border border-slate-900" />
                        </div>
                        <div className="space-y-2">
                            <Label>Historia Clínica y/o DNI <span className="text-red-500">*</span></Label>
                            <Input className="border border-slate-900" />
                        </div>
                        <div className="space-y-2">
                            <Label>Semanas de gestación (solo gestantes) <span className="text-red-500">*</span></Label>
                            <Input className="border border-slate-900" />
                        </div>
                        <div className="space-y-2">
                            <Label>Establecimiento donde se vacunó <span className="text-red-500">*</span></Label>
                            <Input className="border border-slate-900" />
                        </div>
                    </div>
                </div>
            </div>

            {/* REACCIONES ADVERSAS SOSPECHADAS */}
            <div className="bg-white border border-slate-200 rounded-lg shadow-sm overflow-hidden">
                <div className="bg-gradient-to-r from-cyan-600 to-cyan-700 px-4 py-3">
                    <h2 className="font-semibold text-white">B. EVENTOS SUPUESTAMENTE ATRIBUIDOS A LA VACUNACIÓN E INMUNIZACIÓN (ESAVI)</h2>
                </div>
                <div className="p-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="md:col-span-2 space-y-2">
                            <Label>Describir el ESAVI <span className="text-red-500">*</span></Label>
                            <Textarea
                                className="border border-slate-900"
                            />
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            <div className="space-y-2">
                                <Label>Fecha de inicio de ESAVI <span className="text-red-500">*</span></Label>
                                <Input type="date" className="border border-slate-900" />
                            </div>
                            <div className="space-y-2">
                                <Label>Fecha final de ESAVI <span className="text-red-500">*</span></Label>
                                <Input type="date" className="border border-slate-900" />
                            </div>
                        </div>

                        <div className="md:col-span-2 space-y-2">
                            <p className="text-sm font-semibold">Gravedad del ESAVI <span className="text-red-500">*</span></p>
                            <div className="flex items-center space-x-2">
                                <Checkbox
                                    id="leve"
                                />
                                <Label htmlFor="leve" className="text-sm font-normal cursor-pointer">Leve</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Checkbox
                                    id="moderada"
                                />
                                <Label htmlFor="moderada" className="text-sm font-normal cursor-pointer">Moderada</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Checkbox
                                    id="grave"
                                />
                                <Label htmlFor="grave" className="text-sm font-normal cursor-pointer">Grave</Label>
                            </div>
                        </div>

                        <div className="md:col-span-2 space-y-2">
                            <p className="text-sm font-semibold">Solo para ESAVI grave <span className="text-red-500">*</span></p>
                            <div className="flex items-center space-x-2">
                                <Checkbox
                                    id="esavi-hospitalizacion"
                                />
                                <Label htmlFor="esavi-hospitalizacion" className="text-sm font-normal cursor-pointer">Hospitalización</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Checkbox
                                    id="esavi-riesgo-muerte"
                                />
                                <Label htmlFor="esavi-riesgo-muerte" className="text-sm font-normal cursor-pointer">Riesgo de muerte</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Checkbox
                                    id="esavi-discapacidad"
                                />
                                <Label htmlFor="esavi-discapacidad" className="text-sm font-normal cursor-pointer">Discapacidad</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Checkbox
                                    id="esavi-anomalia-congenita"
                                />
                                <Label htmlFor="esavi-anomalia-congenita" className="text-sm font-normal cursor-pointer">Anomalía congénita</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Checkbox
                                    id="esavi-fallecimiento"
                                />
                                <Label htmlFor="esavi-fallecimiento" className="text-sm font-normal cursor-pointer">Fallecimiento</Label>
                            </div>
                        </div>

                        <div className="md:col-span-2 space-y-2">
                            <p className="text-sm font-semibold">Desenlace <span className="text-red-500">*</span></p>
                            <div className="flex items-center space-x-2">
                                <Checkbox
                                    id="esavi-remision"
                                />
                                <Label htmlFor="esavi-remision" className="text-sm font-normal cursor-pointer">En remisión</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Checkbox
                                    id="esavi-recuperado"
                                />
                                <Label htmlFor="esavi-recuperado" className="text-sm font-normal cursor-pointer">Recuperado</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Checkbox
                                    id="esavi-recuperado-secuela"
                                />
                                <Label htmlFor="esavi-recuperado-secuela" className="text-sm font-normal cursor-pointer">Recuperado con secuela</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Checkbox
                                    id="esavi-no-recuperado"
                                />
                                <Label htmlFor="esavi-no-recuperado" className="text-sm font-normal cursor-pointer">No recuperado</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Checkbox
                                    id="esavi-mortal"
                                />
                                <Label htmlFor="esavi-mortal" className="text-sm font-normal cursor-pointer">Mortal</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Checkbox
                                    id="esavi-desconocido"
                                />
                                <Label htmlFor="esavi-desconocido" className="text-sm font-normal cursor-pointer">Desconocido</Label>
                            </div>
                        </div>

                        <div className="md:col-span-2 space-y-2">
                            <p className="text-sm font-semibold">Se realizó autopsia (mortal) <span className="text-red-500">*</span></p>
                            <div className="flex items-center space-x-2">
                                <Checkbox
                                    id="esavi-autopsia-si"
                                />
                                <Label htmlFor="esavi-autopsia-si" className="text-sm font-normal cursor-pointer">Sí</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Checkbox
                                    id="esavi-autopsia-no"
                                />
                                <Label htmlFor="esavi-autopsia-no" className="text-sm font-normal cursor-pointer">No</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Checkbox
                                    id="esavi-autopsia-desconocido"
                                />
                                <Label htmlFor="esavi-autopsia-desconocido" className="text-sm font-normal cursor-pointer">Desconocido</Label>
                            </div>
                        </div>

                        <div className="md:col-span-2 space-y-2">
                            <Label>Resultados relevantes de exámenes de laboratorio (incluir fechas) <span className="text-red-500">*</span></Label>
                            <Textarea
                                className="border border-slate-900"
                            />
                        </div>

                        <div className="md:col-span-2 space-y-2">
                            <Label>Otros datos importantes de la historia clínica, incluyendo condiciones médicas preexistentes, patologías concomitantes (Ejm: alergias, embarazo, consumo de alcohol, tabaco, disfunción renal/hepática, etc.) <span className="text-red-500">*</span></Label>
                            <Textarea
                                className="border border-slate-900"
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* VACUNAS SOSPECHOSAS */}
            <div className="bg-white border border-slate-200 rounded-lg shadow-sm overflow-hidden">
                <div className="bg-gradient-to-r from-cyan-600 to-cyan-700 px-4 py-3">
                    <h2 className="font-semibold text-white">C. VACUNA(S) SOSPECHOSA(S)</h2>
                </div>
                <div className="p-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        <div className="space-y-2">
                            <Label>Nombre (*) <span className="text-red-500">*</span></Label>
                            <Input
                                className="border border-slate-900"
                                value={nombre}
                                onChange={(e) => setNombre(e.target.value)}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label>Laboratorio <span className="text-red-500">*</span></Label>
                            <Input
                                className="border border-slate-900"
                                value={laboratorio}
                                onChange={(e) => setLaboratorio(e.target.value)}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label>Lote <span className="text-red-500">*</span></Label>
                            <Input
                                className="border border-slate-900"
                                value={lote}
                                onChange={(e) => setLote(e.target.value)}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label>Dosis 1, 2, 3 <span className="text-red-500">*</span></Label>
                            <Input
                                className="border border-slate-900"
                                value={dosis}
                                onChange={(e) => setDosis(e.target.value)}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label>Vía de Adm. / Sitio de Adm. <span className="text-red-500">*</span></Label>
                            <Input
                                className="border border-slate-900"
                                value={viaAdministracion}
                                onChange={(e) => setViaAdministracion(e.target.value)}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label>Fecha vacunación <span className="text-red-500">*</span></Label>
                            <Input
                                type="date"
                                className="border border-slate-900"
                                value={fechaVacunacion}
                                onChange={(e) => setFechaVacunacion(e.target.value)}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label>Hora de vacunación <span className="text-red-500">*</span></Label>
                            <Input
                                type="time"
                                className="border border-slate-900"
                                value={horaVacunacion}
                                onChange={(e) => setHoraVacunacion(e.target.value)}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label>Lote (diluyente) <span className="text-red-500">*</span></Label>
                            <Input
                                className="border border-slate-900"
                                value={loteDiluyente}
                                onChange={(e) => setLoteDiluyente(e.target.value)}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label>Fecha vencimiento (diluyente) <span className="text-red-500">*</span></Label>
                            <Input
                                type="date"
                                className="border border-slate-900"
                                value={fechaVctoDiluyente}
                                onChange={(e) => setFechaVctoDiluyente(e.target.value)}
                            />
                        </div>
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

                    <div className="flex mt-8">
                        <Button
                            type="button"
                            onClick={agregarVacuna}
                            className="bg-green-600 hover:bg-green-700 text-white flex items-center gap-2"
                        >
                            <PlusCircle className="w-4 h-4" />
                            Agregar
                        </Button>
                    </div>

                    <div className="mt-6 border border-slate-300 rounded-lg overflow-hidden">
                        <table className="w-full text-sm">
                            <thead className="bg-slate-100">
                                <tr>
                                    <th className="px-3 py-2 text-left">Nombre</th>
                                    <th className="px-3 py-2 text-left">Laboratorio</th>
                                    <th className="px-3 py-2 text-left">Lote</th>
                                    <th className="px-3 py-2 text-left">Dosis 1, 2, 3</th>
                                    <th className="px-3 py-2 text-left">Vía de Adm. / Sitio de Adm.</th>
                                    <th className="px-3 py-2 text-left">Fecha vacunación</th>
                                    <th className="px-3 py-2 text-left">Hora de vacunación</th>
                                    <th className="px-3 py-2 text-left">Lote (diluyente)</th>
                                    <th className="px-3 py-2 text-left">Fecha de vencimiento (diluyente)</th>
                                    <th className="px-3 py-2 text-left">Acción</th>
                                </tr>
                            </thead>

                            <tbody>
                                {vacunasSospechosas.length === 0 ? (
                                    <tr>
                                        <td
                                            colSpan={10}
                                            className="px-3 py-4 text-center text-slate-500"
                                        >
                                            No hay registro de vacunas sospechosas
                                        </td>
                                    </tr>
                                ) : (
                                    vacunasSospechosas.map((item) => (
                                        <tr key={item.id} className="border-t">

                                            <td className="px-3 py-2">
                                                {item.nombre}
                                            </td>

                                            <td className="px-3 py-2">
                                                {item.laboratorio}
                                            </td>

                                            <td className="px-3 py-2">
                                                {item.lote}
                                            </td>

                                            <td className="px-3 py-2">
                                                {item.dosis}
                                            </td>

                                            <td className="px-3 py-2">
                                                {item.viaAdministracion}
                                            </td>

                                            <td className="px-3 py-2">
                                                {item.fechaVacunacion}
                                            </td>

                                            <td className="px-3 py-2">
                                                {item.horaVacunacion}
                                            </td>

                                            <td className="px-3 py-2">
                                                {item.loteDiluyente}
                                            </td>

                                            <td className="px-3 py-2">
                                                {item.fechaVctoDiluyente}
                                            </td>

                                            <td className="px-3 py-2 text-center">
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    className="h-8 w-10 p-1.5 border-red-600 text-red-600 hover:bg-red-50"
                                                    onClick={() =>
                                                        setVacunasSospechosas(
                                                            vacunasSospechosas.filter(
                                                                registro => registro.id !== item.id
                                                            )
                                                        )
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

                    <div className="md:col-span-2 space-y-2 mt-6">
                        <p className="text-sm font-semibold">El paciente recibió tratamiento para la reacción adversa <span className="text-red-500">*</span></p>
                        <div className="flex items-center space-x-2">
                            <Checkbox
                                id="si"
                            />
                            <Label htmlFor="si" className="text-sm font-normal cursor-pointer">Sí</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <Checkbox
                                id="no"
                            />
                            <Label htmlFor="no" className="text-sm font-normal cursor-pointer">No</Label>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                        <div className="md:col-span-2 space-y-2">
                            <Label>Especifique <span className="text-red-500">*</span></Label>
                            <Input className="border border-slate-900" />
                        </div>
                    </div>

                    <div className="mt-6 mb-2">
                        <p className="text-sm font-semibold">En caso de sospecha de problemas de calidad indicar</p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        <div className="space-y-2">
                            <Label>N° Registro Sanitario (*) <span className="text-red-500">*</span></Label>
                            <Input
                                className="border border-slate-900"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label>Fecha de vencimiento <span className="text-red-500">*</span></Label>
                            <Input
                                type="date"
                                className="border border-slate-900"
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* MEDICAMENTOS UTILIZADOS AL MOMENTO DE SER VACUNADO */}
            <div className="bg-white border border-slate-200 rounded-lg shadow-sm overflow-hidden">
                <div className="bg-gradient-to-r from-cyan-600 to-cyan-700 px-4 py-3">
                    <h2 className="font-semibold text-white">D. MEDICAMENTOS UTILIZADOS AL MOMENTO DE SER VACUNADO</h2>
                </div>

                <div className="p-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        <div className="space-y-2">
                            <Label>Nombre comercial o genérico (*) <span className="text-red-500">*</span></Label>
                            <Input
                                className="border border-slate-900"
                                value={nombreComercial}
                                onChange={(e) => setNombreComercial(e.target.value)}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label>Dosis / Frecuencia <span className="text-red-500">*</span></Label>
                            <Input
                                className="border border-slate-900"
                                value={dosisFrecuencia}
                                onChange={(e) => setDosisFrecuencia(e.target.value)}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label>Vía de Adm. <span className="text-red-500">*</span></Label>
                            <Input
                                className="border border-slate-900"
                                value={viaAdm}
                                onChange={(e) => setViaAdm(e.target.value)}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label>Fecha inicio <span className="text-red-500">*</span></Label>
                            <Input
                                type="date"
                                className="border border-slate-900"
                                value={fechaInicio}
                                onChange={(e) => setFechaInicio(e.target.value)}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label>Fecha final <span className="text-red-500">*</span></Label>
                            <Input
                                type="date"
                                className="border border-slate-900"
                                value={fechaFinal}
                                onChange={(e) => setFechaFinal(e.target.value)}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label>Motivo de prescripción <span className="text-red-500">*</span></Label>
                            <Input
                                className="border border-slate-900"
                                value={motivoPrescripcion}
                                onChange={(e) => setMotivoPrescripcion(e.target.value)}
                            />
                        </div>
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

                    <div className="flex mt-8">
                        <Button
                            type="button"
                            onClick={agregarMedicamentoUtilizado}
                            className="bg-green-600 hover:bg-green-700 text-white flex items-center gap-2"
                        >
                            <PlusCircle className="w-4 h-4" />
                            Agregar
                        </Button>
                    </div>

                    <div className="mt-6 border border-slate-300 rounded-lg overflow-hidden">
                        <table className="w-full text-sm">
                            <thead className="bg-slate-100">
                                <tr>
                                    <th className="px-3 py-2 text-left">Nombre comercial o genérico</th>
                                    <th className="px-3 py-2 text-left">Dosis/Frecuencia</th>
                                    <th className="px-3 py-2 text-left">Vía de Adm.</th>
                                    <th className="px-3 py-2 text-left">Fecha inicio</th>
                                    <th className="px-3 py-2 text-left">Fecha fin</th>
                                    <th className="px-3 py-2 text-left">Motivo de prescripción</th>
                                    <th className="px-3 py-2 text-left">Acción</th>
                                </tr>
                            </thead>

                            <tbody>
                                {medicamentosUtilizadosRegistrados.length === 0 ? (
                                    <tr>
                                        <td
                                            colSpan={7}
                                            className="px-3 py-4 text-center text-slate-500"
                                        >
                                            No hay registro de medicamentos utilizados al momento de ser vacunado
                                        </td>
                                    </tr>
                                ) : (
                                    medicamentosUtilizadosRegistrados.map((item) => (
                                        <tr key={item.id} className="border-t">

                                            <td className="px-3 py-2">
                                                {item.nombreComercial}
                                            </td>

                                            <td className="px-3 py-2">
                                                {item.dosisFrecuencia}
                                            </td>

                                            <td className="px-3 py-2">
                                                {item.viaAdm}
                                            </td>

                                            <td className="px-3 py-2">
                                                {item.fechaInicio}
                                            </td>

                                            <td className="px-3 py-2">
                                                {item.fechaFinal}
                                            </td>

                                            <td className="px-3 py-2">
                                                {item.motivoPrescripcion}
                                            </td>

                                            <td className="px-3 py-2 text-center">
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    className="h-8 w-10 p-1.5 border-red-600 text-red-600 hover:bg-red-50"
                                                    onClick={() =>
                                                        setMedicamentosUtilizadosRegistrados(
                                                            medicamentosUtilizadosRegistrados.filter(
                                                                registro => registro.id !== item.id
                                                            )
                                                        )
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

            {/* DATOS DEL NOTIFICADOR */}
            <div className="bg-white border border-slate-200 rounded-lg shadow-sm overflow-hidden">
                <div className="bg-gradient-to-r from-cyan-600 to-cyan-700 px-4 py-3">
                    <h2 className="font-semibold text-white">E. DATOS DEL NOTIFICADOR</h2>
                </div>

                <div className="p-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        <div className="space-y-2">
                            <Label>Establecimiento / Institución <span className="text-red-500">*</span></Label>
                            <Input className="border border-slate-900" />
                        </div>
                        <div className="space-y-2">
                            <Label>Nombres y apellidos <span className="text-red-500">*</span></Label>
                            <Input className="border border-slate-900" />
                        </div>
                        <div className="space-y-2">
                            <Label>Teléfono <span className="text-red-500">*</span></Label>
                            <Input className="border border-slate-900" />
                        </div>
                        <div className="space-y-2">
                            <Label>Correo electrónico <span className="text-red-500">*</span></Label>
                            <Input className="border border-slate-900" />
                        </div>
                        <div className="space-y-2">
                            <Label>Profesión <span className="text-red-500">*</span></Label>
                            <Input className="border border-slate-900" />
                        </div>
                        <div className="space-y-2">
                            <Label>Fecha de notificación <span className="text-red-500">*</span></Label>
                            <Input type="date" className="border border-slate-900" />
                        </div>
                        <div className="space-y-2">
                            <Label>N° Notificación <span className="text-red-500">*</span></Label>
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
                    onClick={handleGuardarNotifVacunas}
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

            {/* MODAL DE ÉXITO DEL GUARDADO DE LA NOTIFICACION DE EVENTOS SUPUESTAMENTE ATRIBUIDOS A LA VACUNACIÓN E INMUNIZACIÓN */}
            <Dialog open={openModalExito} onOpenChange={setOpenModalExito}>
                <DialogContent className="max-w-sm">
                    <DialogHeader>
                        <DialogTitle className="flex flex-col items-center gap-3">
                            <CheckCircle className="w-16 h-16 text-green-600" />
                            <span>Registro exitoso</span>
                        </DialogTitle>
                    </DialogHeader>

                    <p className="text-center text-gray-700">
                        La notificación de eventos supuestamente atribuidos a la vacunación e inmunización ha sido registrada con éxito.
                    </p>

                    <DialogFooter className="flex justify-center mt-4">
                        <Button
                            className="bg-blue-600 hover:bg-blue-700 text-white"
                            onClick={() => {
                                setOpenModalExito(false);
                                router.push("/dashboard/farmacovigilancia/vacunas");
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
