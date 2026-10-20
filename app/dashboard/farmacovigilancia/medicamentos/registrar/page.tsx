"use client"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
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


export default function RegistrarNotificacionMedicamentosPage() {
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
    const [sexo, setSexo] = useState("");
    const [tipoNotificacion, setTipoNotificacion] = useState("");
    const [otroTipoNotificacion, setOtroTipoNotificacion] = useState("");
    const [gravedadRam, setGravedadRam] = useState("");
    const [ramGraveTipo, setRamGraveTipo] = useState("");
    const [fechaMuerte, setFechaMuerte] = useState("");
    const [desenlace, setDesenlace] = useState("");
    const [tratamientoRam, setTratamientoRam] = useState("");
    const [suspensionMedicamento, setSuspensionMedicamento] = useState("");
    const [suspensionDosis, setSuspensionDosis] = useState("");
    const [reexposicionMedicamento, setReexposicionMedicamento] = useState("");
    const [reaccionAnterior, setReaccionAnterior] = useState("");


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

    // FUNCIÓN GUARDAR NOTIFICACIÓN DE MEDICAMENTOS
    const handleGuardarNotifMedicamentos = () => {
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

    const renderOpcionRespuesta = (
        valorActual: string,
        setValor: (valor: string) => void,
        opcion: string,
        texto: string
    ) => (
        <Button
            type="button"
            variant={
                valorActual === opcion
                    ? "default"
                    : "outline"
            }
            size="sm"
            onClick={() => setValor(opcion)}
            className={`
            min-w-[70px]
            h-8
            ${valorActual === opcion
                    ? opcion === "si"
                        ? "bg-green-600 hover:bg-green-700 text-white"
                        : opcion === "no"
                            ? "bg-red-600 hover:bg-red-700 text-white"
                            : "bg-slate-600 hover:bg-slate-700 text-white"
                    : ""
                }
        `}
        >
            {texto}
        </Button>
    );


    return (
        <div className="max-w-7xl mx-auto p-6 space-y-6 bg-slate-50/50 min-h-screen">

            {/* Header */}
            <div className="flex justify-between items-center bg-white rounded-lg p-4 shadow-sm border">
                <div className="flex items-center gap-4 w-full">
                    <Button
                        variant="outline"
                        onClick={() => router.push("/dashboard/farmacovigilancia/medicamentos")}
                    >
                        <ArrowLeft className="w-4 h-4 mr-1" />
                        Regresar
                    </Button>

                    <div>
                        <h1 className="text-xl font-bold">Registro de Notificación de sospechas de reacciones adversas a medicamentos u otros productos farmacéuticos</h1>
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
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-7 gap-4">
                        <div className="md:col-span-2 space-y-2">
                            <Label>Nombres o iniciales <span className="text-red-500">*</span></Label>
                            <Input className="border border-slate-900" />
                        </div>
                        <div className="space-y-2">
                            <Label>Edad <span className="text-red-500">*</span></Label>
                            <Input className="border border-slate-900" />
                        </div>
                        <div className="space-y-2">
                            <Label>Sexo <span className="text-red-500">*</span></Label>
                            <RadioGroup
                                value={sexo}
                                onValueChange={setSexo}
                                className="flex items-center gap-6 h-10 border border-slate-900 rounded-md px-3"
                            >
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem
                                        value="F"
                                        id="sexo-f"
                                    />
                                    <Label
                                        htmlFor="sexo-f"
                                        className="cursor-pointer"
                                    >
                                        F
                                    </Label>
                                </div>

                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem
                                        value="M"
                                        id="sexo-m"
                                    />
                                    <Label
                                        htmlFor="sexo-m"
                                        className="cursor-pointer"
                                    >
                                        M
                                    </Label>
                                </div>
                            </RadioGroup>
                        </div>
                        <div className="space-y-2">
                            <Label>Peso (Kg) <span className="text-red-500">*</span></Label>
                            <Input className="border border-slate-900" />
                        </div>
                        <div className="space-y-2">
                            <Label>HC y/o DNI <span className="text-red-500">*</span></Label>
                            <Input className="border border-slate-900" />
                        </div>
                        <div className="md:col-span-3 space-y-2">
                            <Label>Establecimiento <span className="text-red-500">*</span></Label>
                            <Input className="border border-slate-900" />
                        </div>
                        <div className="md:col-span-3 space-y-2">
                            <Label>Diagnóstico Principal o CIE 10 <span className="text-red-500">*</span></Label>
                            <Input className="border border-slate-900" />
                        </div>
                    </div>
                </div>
            </div>

            {/* REACCIONES ADVERSAS SOSPECHADAS */}
            <div className="bg-white border border-slate-200 rounded-lg shadow-sm overflow-hidden">
                <div className="bg-gradient-to-r from-cyan-600 to-cyan-700 px-4 py-3">
                    <h2 className="font-semibold text-white">B. REACCIONES ADVERSAS SOSPECHADAS</h2>
                </div>
                <div className="p-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="md:col-span-2 space-y-3">

                            <p className="text-sm font-semibold">
                                Marcar si la notificación corresponde a
                                <span className="text-red-500">*</span>
                            </p>

                            <RadioGroup
                                value={tipoNotificacion}
                                onValueChange={setTipoNotificacion}
                                className="space-y-2"
                            >

                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem
                                        value="reaccion-adversa"
                                        id="reaccion-adversa"
                                    />
                                    <Label
                                        htmlFor="reaccion-adversa"
                                        className="cursor-pointer font-normal"
                                    >
                                        Reacción adversa
                                    </Label>
                                </div>

                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem
                                        value="error-medicacion"
                                        id="error-medicacion"
                                    />
                                    <Label
                                        htmlFor="error-medicacion"
                                        className="cursor-pointer font-normal"
                                    >
                                        Error de medicación
                                    </Label>
                                </div>

                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem
                                        value="problema-calidad"
                                        id="problema-calidad"
                                    />
                                    <Label
                                        htmlFor="problema-calidad"
                                        className="cursor-pointer font-normal"
                                    >
                                        Problema de calidad
                                    </Label>
                                </div>

                                <div className="flex items-center space-x-2">

                                    <RadioGroupItem
                                        value="otro"
                                        id="otro"
                                    />

                                    <Label
                                        htmlFor="otro"
                                        className="cursor-pointer font-normal"
                                    >
                                        Otro (Especifique)
                                    </Label>

                                    {tipoNotificacion === "otro" && (
                                        <Input
                                            value={otroTipoNotificacion}
                                            onChange={(e) =>
                                                setOtroTipoNotificacion(
                                                    e.target.value
                                                )
                                            }
                                            className="w-80 h-9 border border-slate-900"
                                        />
                                    )}

                                </div>

                            </RadioGroup>

                        </div>

                        <div className="md:col-span-2 space-y-2">
                            <Label>Describir la reacción adversa <span className="text-red-500">*</span></Label>
                            <Textarea
                                className="border border-slate-900"
                            />
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            <div className="space-y-2">
                                <Label>Fecha de inicio de RAM <span className="text-red-500">*</span></Label>
                                <Input type="date" className="border border-slate-900" />
                            </div>
                            <div className="space-y-2">
                                <Label>Fecha final de RAM <span className="text-red-500">*</span></Label>
                                <Input type="date" className="border border-slate-900" />
                            </div>
                        </div>

                        <div className="md:col-span-2 space-y-2">
                            <p className="text-sm font-semibold">Gravedad de la RAM <span className="text-red-500">*</span></p>

                            <RadioGroup
                                value={gravedadRam}
                                onValueChange={setGravedadRam}
                                className="space-y-2"
                            >

                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem
                                        value="leve"
                                        id="gravedad-leve"
                                    />
                                    <Label
                                        htmlFor="gravedad-leve"
                                        className="cursor-pointer font-normal"
                                    >
                                        Leve
                                    </Label>
                                </div>

                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem
                                        value="moderada"
                                        id="gravedad-moderada"
                                    />
                                    <Label
                                        htmlFor="gravedad-moderada"
                                        className="cursor-pointer font-normal"
                                    >
                                        Moderada
                                    </Label>
                                </div>

                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem
                                        value="grave"
                                        id="gravedad-grave"
                                    />
                                    <Label
                                        htmlFor="gravedad-grave"
                                        className="cursor-pointer font-normal"
                                    >
                                        Grave
                                    </Label>
                                </div>

                            </RadioGroup>
                        </div>

                        <div className="md:col-span-2 space-y-2">
                            <p className="text-sm font-semibold">Solo para RAM grave <span className="text-red-500">*</span></p>

                            <RadioGroup
                                value={ramGraveTipo}
                                onValueChange={setRamGraveTipo}
                                className="space-y-2"
                            >

                                <div className="flex items-center space-x-2">

                                    <RadioGroupItem
                                        value="muerte"
                                        id="ram-muerte"
                                    />

                                    <Label
                                        htmlFor="ram-muerte"
                                        className="cursor-pointer font-normal"
                                    >
                                        Muerte
                                    </Label>

                                    {ramGraveTipo === "muerte" && (
                                        <>
                                            <Label
                                                htmlFor="fecha-muerte"
                                                className="ml-4 whitespace-nowrap"
                                            >
                                                Fecha:
                                            </Label>

                                            <Input
                                                id="fecha-muerte"
                                                type="date"
                                                value={fechaMuerte}
                                                onChange={(e) =>
                                                    setFechaMuerte(
                                                        e.target.value
                                                    )
                                                }
                                                className="w-[180px] border border-slate-900"
                                            />
                                        </>
                                    )}

                                </div>

                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem
                                        value="riesgo"
                                        id="ram-riesgo"
                                    />
                                    <Label
                                        htmlFor="ram-riesgo"
                                        className="cursor-pointer font-normal"
                                    >
                                        Puso en grave riesgo la vida del paciente
                                    </Label>
                                </div>

                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem
                                        value="hospitalizacion"
                                        id="ram-hospitalizacion"
                                    />
                                    <Label
                                        htmlFor="ram-hospitalizacion"
                                        className="cursor-pointer font-normal"
                                    >
                                        Produjo o prolongó su hospitalización
                                    </Label>
                                </div>

                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem
                                        value="discapacidad"
                                        id="ram-discapacidad"
                                    />
                                    <Label
                                        htmlFor="ram-discapacidad"
                                        className="cursor-pointer font-normal"
                                    >
                                        Produjo discapacidad / incapacidad
                                    </Label>
                                </div>

                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem
                                        value="anomalia"
                                        id="ram-anomalia"
                                    />
                                    <Label
                                        htmlFor="ram-anomalia"
                                        className="cursor-pointer font-normal"
                                    >
                                        Produjo anomalía congénita
                                    </Label>
                                </div>

                            </RadioGroup>
                        </div>

                        <div className="md:col-span-2 space-y-2">
                            <p className="text-sm font-semibold">Desenlace <span className="text-red-500">*</span></p>

                            <RadioGroup
                                value={desenlace}
                                onValueChange={setDesenlace}
                                className="space-y-2"
                            >
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="recuperado" id="desenlace-recuperado" />
                                    <Label
                                        htmlFor="desenlace-recuperado"
                                        className="cursor-pointer font-normal"
                                    >
                                        Recuperado
                                    </Label>
                                </div>

                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="recuperado-secuela" id="desenlace-recuperado-secuela" />
                                    <Label
                                        htmlFor="desenlace-recuperado-secuela"
                                        className="cursor-pointer font-normal"
                                    >
                                        Recuperado con secuela
                                    </Label>
                                </div>

                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="no-recuperado" id="desenlace-no-recuperado" />
                                    <Label
                                        htmlFor="desenlace-no-recuperado"
                                        className="cursor-pointer font-normal"
                                    >
                                        No Recuperado
                                    </Label>
                                </div>

                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="mortal" id="desenlace-mortal" />
                                    <Label
                                        htmlFor="desenlace-mortal"
                                        className="cursor-pointer font-normal"
                                    >
                                        Mortal
                                    </Label>
                                </div>

                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="desconocido" id="desenlace-desconocido" />
                                    <Label
                                        htmlFor="desenlace-desconocido"
                                        className="cursor-pointer font-normal"
                                    >
                                        Desconocido
                                    </Label>
                                </div>
                            </RadioGroup>
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

            {/* MEDICAMENTOS U OTROS PRODUCTOS FARMACÉUTICOS */}
            <div className="bg-white border border-slate-200 rounded-lg shadow-sm overflow-hidden">
                <div className="bg-gradient-to-r from-cyan-600 to-cyan-700 px-4 py-3">
                    <h2 className="font-semibold text-white">C. MEDICAMENTO(S) U OTRO(S) PRODUCTO(S) FARMACÉUTICO(S)</h2>
                </div>
                <div className="p-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        <div className="space-y-2">
                            <Label>Nombre comercial y genérico (*) <span className="text-red-500">*</span></Label>
                            <Input
                                className="border border-slate-900"
                                value={nombreComercial}
                                onChange={(e) => setNombreComercial(e.target.value)}
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
                                value={viaAdministracion}
                                onChange={(e) => setViaAdministracion(e.target.value)}
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
                            <Label>Motivo de prescripción o CIE 10 <span className="text-red-500">*</span></Label>
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
                            onClick={agregarMedicamento}
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
                                    <th className="px-3 py-2 text-left">Nombre comercial y genérico</th>
                                    <th className="px-3 py-2 text-left">Laboratorio</th>
                                    <th className="px-3 py-2 text-left">Lote</th>
                                    <th className="px-3 py-2 text-left">Dosis/Frecuencia</th>
                                    <th className="px-3 py-2 text-left">Vía de Adm.</th>
                                    <th className="px-3 py-2 text-left">Fecha inicio</th>
                                    <th className="px-3 py-2 text-left">Fecha fin</th>
                                    <th className="px-3 py-2 text-left">Motivo de prescripción o CIE 10</th>
                                    <th className="px-3 py-2 text-left">Acción</th>
                                </tr>
                            </thead>

                            <tbody>
                                {medicamentosRegistrados.length === 0 ? (
                                    <tr>
                                        <td
                                            colSpan={9}
                                            className="px-3 py-4 text-center text-slate-500"
                                        >
                                            No hay registro de medicamentos o productos farmacéuticos
                                        </td>
                                    </tr>
                                ) : (
                                    medicamentosRegistrados.map((item) => (
                                        <tr key={item.id} className="border-t">

                                            <td className="px-3 py-2">
                                                {item.nombreComercial}
                                            </td>

                                            <td className="px-3 py-2">
                                                {item.laboratorio}
                                            </td>

                                            <td className="px-3 py-2">
                                                {item.lote}
                                            </td>

                                            <td className="px-3 py-2">
                                                {item.dosisFrecuencia}
                                            </td>

                                            <td className="px-3 py-2">
                                                {item.viaAdministracion}
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
                                                        setMedicamentosRegistrados(
                                                            medicamentosRegistrados.filter(
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

                    <div className="mt-6 border border-slate-300 rounded-lg overflow-hidden">
                        <table className="w-full text-sm">
                            <thead className="bg-slate-100">
                                <tr>
                                    <th className="px-3 py-2 text-left">Suspensión</th>
                                    <th className="px-3 py-2 text-left"></th>
                                    <th className="px-3 py-2 text-left"></th>
                                    <th className="px-3 py-2 text-left"></th>
                                </tr>
                            </thead>

                            <tbody>
                                <tr>
                                    <td className="px-3 py-2">¿Desapareció la reacción adversa al suspender el medicamento u otro producto farmacéutico?</td>
                                    <td className="px-3 py-2 text-center">
                                        {renderOpcionRespuesta(
                                            suspensionMedicamento,
                                            setSuspensionMedicamento,
                                            "si",
                                            "Sí"
                                        )}
                                    </td>

                                    <td className="px-3 py-2 text-center">
                                        {renderOpcionRespuesta(
                                            suspensionMedicamento,
                                            setSuspensionMedicamento,
                                            "no",
                                            "No"
                                        )}
                                    </td>

                                    <td className="px-3 py-2 text-center">
                                        {renderOpcionRespuesta(
                                            suspensionMedicamento,
                                            setSuspensionMedicamento,
                                            "na",
                                            "No aplica"
                                        )}
                                    </td>
                                </tr>
                                <tr>
                                    <td className="px-3 py-2">¿Desapareció la reacción adversa al disminuir la dosis?</td>
                                    <td className="px-3 py-2 text-center">
                                        {renderOpcionRespuesta(
                                            suspensionDosis,
                                            setSuspensionDosis,
                                            "si",
                                            "Sí"
                                        )}
                                    </td>

                                    <td className="px-3 py-2 text-center">
                                        {renderOpcionRespuesta(
                                            suspensionDosis,
                                            setSuspensionDosis,
                                            "no",
                                            "No"
                                        )}
                                    </td>

                                    <td className="px-3 py-2 text-center">
                                        {renderOpcionRespuesta(
                                            suspensionDosis,
                                            setSuspensionDosis,
                                            "na",
                                            "No aplica"
                                        )}
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <div className="mt-6 border border-slate-300 rounded-lg overflow-hidden">
                        <table className="w-full text-sm">
                            <thead className="bg-slate-100">
                                <tr>
                                    <th className="px-3 py-2 text-left">Reexposición</th>
                                    <th className="px-3 py-2 text-left"></th>
                                    <th className="px-3 py-2 text-left"></th>
                                    <th className="px-3 py-2 text-left"></th>
                                </tr>
                            </thead>

                            <tbody>
                                <tr>
                                    <td className="px-3 py-2">Reapareció la reacción adversa al administrar nuevamente el medicamento u otro producto farmacéutico?</td>
                                    <td className="px-3 py-2 text-center">
                                        {renderOpcionRespuesta(
                                            reexposicionMedicamento,
                                            setReexposicionMedicamento,
                                            "si",
                                            "Sí"
                                        )}
                                    </td>

                                    <td className="px-3 py-2 text-center">
                                        {renderOpcionRespuesta(
                                            reexposicionMedicamento,
                                            setReexposicionMedicamento,
                                            "no",
                                            "No"
                                        )}
                                    </td>

                                    <td className="px-3 py-2 text-center">
                                        {renderOpcionRespuesta(
                                            reexposicionMedicamento,
                                            setReexposicionMedicamento,
                                            "na",
                                            "No aplica"
                                        )}
                                    </td>
                                </tr>
                                <tr>
                                    <td className="px-3 py-2">El paciente ha presentado anteriormente la reacción adversa al medicamento u otro producto farmacéutico?</td>
                                    <td className="px-3 py-2 text-center">
                                        {renderOpcionRespuesta(
                                            reaccionAnterior,
                                            setReaccionAnterior,
                                            "si",
                                            "Sí"
                                        )}
                                    </td>

                                    <td className="px-3 py-2 text-center">
                                        {renderOpcionRespuesta(
                                            reaccionAnterior,
                                            setReaccionAnterior,
                                            "no",
                                            "No"
                                        )}
                                    </td>

                                    <td className="px-3 py-2 text-center">
                                        {renderOpcionRespuesta(
                                            reaccionAnterior,
                                            setReaccionAnterior,
                                            "na",
                                            "No aplica"
                                        )}
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <div className="md:col-span-2 space-y-2 mt-6">
                        <p className="text-sm font-semibold">El paciente recibió tratamiento para la reacción adversa <span className="text-red-500">*</span></p>
                        <RadioGroup
                            value={tratamientoRam}
                            onValueChange={setTratamientoRam}
                            className="space-y-2"
                        >
                            <div className="flex items-center space-x-2">

                                <RadioGroupItem
                                    value="si"
                                    id="tratamiento-si"
                                />

                                <Label
                                    htmlFor="tratamiento-si"
                                    className="text-sm font-normal cursor-pointer"
                                >
                                    Sí
                                </Label>

                            </div>

                            <div className="flex items-center space-x-2">

                                <RadioGroupItem
                                    value="no"
                                    id="tratamiento-no"
                                />

                                <Label
                                    htmlFor="tratamiento-no"
                                    className="text-sm font-normal cursor-pointer"
                                >
                                    No
                                </Label>

                            </div>
                        </RadioGroup>
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

            {/* MEDICAMENTOS U OTROS PRODUCTOS FARMACEUTICOS CONCOMITANTES */}
            <div className="bg-white border border-slate-200 rounded-lg shadow-sm overflow-hidden">
                <div className="bg-gradient-to-r from-cyan-600 to-cyan-700 px-4 py-3">
                    <h2 className="font-semibold text-white">D. MEDICAMENTO(S) U OTRO(S) PRODUCTO(S) FARMACÉUTICO(S) CONCOMITANTE(S) UTILIZADO(S) EN LOS 3 ÚLTIMOS MESES</h2>
                </div>

                <div className="p-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        <div className="space-y-2">
                            <Label>Nombre comercial y genérico (*) <span className="text-red-500">*</span></Label>
                            <Input
                                className="border border-slate-900"
                                value={nombreComercialCon}
                                onChange={(e) => setNombreComercialCon(e.target.value)}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label>Dosis / Frecuencia <span className="text-red-500">*</span></Label>
                            <Input
                                className="border border-slate-900"
                                value={dosisFrecuenciaCon}
                                onChange={(e) => setDosisFrecuenciaCon(e.target.value)}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label>Vía de Adm. <span className="text-red-500">*</span></Label>
                            <Input
                                className="border border-slate-900"
                                value={viaAdministracionCon}
                                onChange={(e) => setViaAdministracionCon(e.target.value)}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label>Fecha inicio <span className="text-red-500">*</span></Label>
                            <Input
                                type="date"
                                className="border border-slate-900"
                                value={fechaInicioCon}
                                onChange={(e) => setFechaInicioCon(e.target.value)}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label>Fecha final <span className="text-red-500">*</span></Label>
                            <Input
                                type="date"
                                className="border border-slate-900"
                                value={fechaFinalCon}
                                onChange={(e) => setFechaFinalCon(e.target.value)}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label>Motivo de prescripción <span className="text-red-500">*</span></Label>
                            <Input
                                className="border border-slate-900"
                                value={motivoPrescripcionCon}
                                onChange={(e) => setMotivoPrescripcionCon(e.target.value)}
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
                            onClick={agregarMedicamentoConcomitante}
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
                                    <th className="px-3 py-2 text-left">Nombre comercial y genérico</th>
                                    <th className="px-3 py-2 text-left">Dosis/Frecuencia</th>
                                    <th className="px-3 py-2 text-left">Vía de Adm.</th>
                                    <th className="px-3 py-2 text-left">Fecha inicio</th>
                                    <th className="px-3 py-2 text-left">Fecha fin</th>
                                    <th className="px-3 py-2 text-left">Motivo de prescripción</th>
                                    <th className="px-3 py-2 text-left">Acción</th>
                                </tr>
                            </thead>

                            <tbody>
                                {MedicamentosConcRegistrados.length === 0 ? (
                                    <tr>
                                        <td
                                            colSpan={7}
                                            className="px-3 py-4 text-center text-slate-500"
                                        >
                                            No hay registro de medicamentos o productos farmacéuticos concomitantes
                                        </td>
                                    </tr>
                                ) : (
                                    MedicamentosConcRegistrados.map((item) => (
                                        <tr key={item.id} className="border-t">

                                            <td className="px-3 py-2">
                                                {item.nombreComercialCon}
                                            </td>

                                            <td className="px-3 py-2">
                                                {item.dosisFrecuenciaCon}
                                            </td>

                                            <td className="px-3 py-2">
                                                {item.viaAdministracionCon}
                                            </td>

                                            <td className="px-3 py-2">
                                                {item.fechaInicioCon}
                                            </td>

                                            <td className="px-3 py-2">
                                                {item.fechaFinalCon}
                                            </td>

                                            <td className="px-3 py-2">
                                                {item.motivoPrescripcionCon}
                                            </td>

                                            <td className="px-3 py-2 text-center">
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    className="h-8 w-10 p-1.5 border-red-600 text-red-600 hover:bg-red-50"
                                                    onClick={() =>
                                                        setMedicamentosConcRegistrados(
                                                            MedicamentosConcRegistrados.filter(
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
                            <Label>Nombres y apellidos <span className="text-red-500">*</span></Label>
                            <Input className="border border-slate-900" />
                        </div>
                        <div className="space-y-2">
                            <Label>Teléfono o Correo electrónico <span className="text-red-500">*</span></Label>
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
                    onClick={handleGuardarNotifMedicamentos}
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

            {/* MODAL DE ÉXITO DEL GUARDADO DE LA NOTIFICACION DE SOSPECHAS DE REACCIONES ADVERSAS A MEDICAMENTOS */}
            <Dialog open={openModalExito} onOpenChange={setOpenModalExito}>
                <DialogContent className="max-w-sm">
                    <DialogHeader>
                        <DialogTitle className="flex flex-col items-center gap-3">
                            <CheckCircle className="w-16 h-16 text-green-600" />
                            <span>Registro exitoso</span>
                        </DialogTitle>
                    </DialogHeader>

                    <p className="text-center text-gray-700">
                        La notificación de sospechas de reacciones adversas a medicamentos ha sido registrada con éxito.
                    </p>

                    <DialogFooter className="flex justify-center mt-4">
                        <Button
                            className="bg-blue-600 hover:bg-blue-700 text-white"
                            onClick={() => {
                                setOpenModalExito(false);
                                router.push("/dashboard/farmacovigilancia/medicamentos");
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
