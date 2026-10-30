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

interface AnamnesisFarmacoFormProps {
    modo: "crear" | "editar" | "consulta";
}


export default function AnamnesisFarmacoForm({
    modo,
}: AnamnesisFarmacoFormProps) {
    const router = useRouter();
    const soloLectura = modo === "consulta";

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
    const [fechaIngreso, setFechaIngreso] = useState("");

    // LISTA DE PRUEBAS DE LABORATORIO
    const pruebasLaboratorio = [
        { id: "leucocitos", nombre: "Leucocitos" },
        { id: "hb", nombre: "HB" },
        { id: "plaquetas", nombre: "Plaquetas" },
        { id: "neutrofilos", nombre: "Neutrófilos" },
        { id: "pcr", nombre: "PCR" },
        { id: "na", nombre: "Na" },
        { id: "k", nombre: "K" },
        { id: "albumina", nombre: "Albúmina" },
        { id: "prot_totales", nombre: "Prot. Totales" },
        { id: "probnp", nombre: "Probnp" },
        { id: "urea", nombre: "Urea" },
        { id: "creat", nombre: "Creat." },
        { id: "fa", nombre: "FA" },
        { id: "tgo", nombre: "TGO" },
        { id: "tgp", nombre: "TGP" },
        { id: "bt", nombre: "BT" },
        { id: "bd", nombre: "BD" },
        { id: "bi", nombre: "BI" },
        { id: "ggt", nombre: "GGT" },
        { id: "amilasa", nombre: "Amilasa" },
        { id: "lipasa", nombre: "Lipasa" },
        { id: "urocultivo", nombre: "Urocultivo" },
        { id: "antibiograma", nombre: "Antibiograma" },
    ]

    const [resultadosLaboratorio, setResultadosLaboratorio] = useState<
        Record<string, Record<number, string>>
    >({})

    // FUNCIÓN PARA REGISTRAR LOS CAMBIOS
    const actualizarResultadoLaboratorio = (
        pruebaId: string,
        dia: number,
        valor: string
    ) => {
        setResultadosLaboratorio((prev) => ({
            ...prev,
            [pruebaId]: {
                ...prev[pruebaId],
                [dia]: valor,
            },
        }))
    }

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

    // FUNCIÓN GUARDAR ANAMNESIS
    const handleGuardarAnamnesis = () => {
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
                        <h1 className="text-xl font-bold">
                            {modo === "crear" &&
                                "Registrar Anamnesis Farmacológica"}

                            {modo === "editar" &&
                                "Editar Anamnesis Farmacológica"}

                            {modo === "consulta" &&
                                "Consultar Anamnesis Farmacológica"}
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
                    <h2 className="font-semibold text-white">1. Datos personales</h2>
                </div>
                <div className="p-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-7 gap-4">
                        <div className="space-y-2">
                            <Label>N° HC <span className="text-red-500">*</span></Label>
                            <Input
                                disabled={soloLectura}
                                className="border border-slate-900"
                            />
                        </div>
                        <div className="md:col-span-3 space-y-2">
                            <Label>Apellidos y Nombres <span className="text-red-500">*</span></Label>
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
                        <div className="space-y-2">
                            <Label>Peso <span className="text-red-500">*</span></Label>
                            <Input
                                disabled={soloLectura}
                                className="border border-slate-900"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label>Talla <span className="text-red-500">*</span></Label>
                            <Input
                                disabled={soloLectura}
                                className="border border-slate-900"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-7 gap-4 mt-4">
                        <div className="space-y-2">
                            <Label>Fecha <span className="text-red-500">*</span></Label>
                            <Input
                                type="date"
                                disabled={soloLectura}
                                value={fechaIngreso}
                                onChange={(e) => setFechaIngreso(e.target.value)}
                                className="border border-slate-900"
                            />
                        </div>
                        <div className="md:col-span-3 space-y-2">
                            <Label>Procedencia <span className="text-red-500">*</span></Label>
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
                    <h2 className="font-semibold text-white">2. Historia de Salud</h2>
                </div>
                <div className="bg-gradient-to-r from-cyan-800 to-cyan-900 px-4 py-3">
                    <h2 className="font-semibold text-white">2.1 Antecedentes Patológicos</h2>
                </div>
                <div className="p-4">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <div className="flex items-center space-x-2">
                            <Checkbox disabled={soloLectura} id="ima" />
                            <Label htmlFor="ima" className="text-sm font-normal cursor-pointer">IMA</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <Checkbox disabled={soloLectura} id="acv" />
                            <Label htmlFor="acv" className="text-sm font-normal cursor-pointer">ACV</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <Checkbox disabled={soloLectura} id="icc" />
                            <Label htmlFor="icc" className="text-sm font-normal cursor-pointer">ICC</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <Checkbox disabled={soloLectura} id="diabetes" />
                            <Label htmlFor="diabetes" className="text-sm font-normal cursor-pointer">Diabetes</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <Checkbox disabled={soloLectura} id="enf-renal" />
                            <Label htmlFor="enf-renal" className="text-sm font-normal cursor-pointer">Enf. Renal</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <Checkbox disabled={soloLectura} id="obesidad" />
                            <Label htmlFor="obesidad" className="text-sm font-normal cursor-pointer">Obesidad</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <Checkbox disabled={soloLectura} id="asma" />
                            <Label htmlFor="asma" className="text-sm font-normal cursor-pointer">Asma</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <Checkbox disabled={soloLectura} id="enf-psiquiatrica" />
                            <Label htmlFor="enf-psiquiatrica" className="text-sm font-normal cursor-pointer">Enf. Psiquiátrica</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <Checkbox disabled={soloLectura} id="enf-hepatica" />
                            <Label htmlFor="enf-hepatica" className="text-sm font-normal cursor-pointer">Enf. Hepática</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <Checkbox disabled={soloLectura} id="ulcera" />
                            <Label htmlFor="ulcera" className="text-sm font-normal cursor-pointer">Úlcera</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <Checkbox disabled={soloLectura} id="enf-tiroides" />
                            <Label htmlFor="enf-tiroides" className="text-sm font-normal cursor-pointer">Enf. Tiroides</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <Checkbox disabled={soloLectura} id="ar" />
                            <Label htmlFor="ar" className="text-sm font-normal cursor-pointer">A.R.</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <Checkbox disabled={soloLectura} id="hta" />
                            <Label htmlFor="hta" className="text-sm font-normal cursor-pointer">HTA</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <Checkbox disabled={soloLectura} id="medicacion-habitual" />
                            <Label htmlFor="medicacion-habitual" className="text-sm font-normal cursor-pointer">Medicación Habitual</Label>
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
                            <Checkbox disabled={soloLectura} id="tos" />
                            <Label htmlFor="tos" className="text-sm font-normal cursor-pointer">Tos</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <Checkbox disabled={soloLectura} id="mareos" />
                            <Label htmlFor="mareos" className="text-sm font-normal cursor-pointer">Mareos</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <Checkbox disabled={soloLectura} id="sueno" />
                            <Label htmlFor="sueno" className="text-sm font-normal cursor-pointer">Sueño</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <Checkbox disabled={soloLectura} id="desvanecimiento" />
                            <Label htmlFor="desvanecimiento" className="text-sm font-normal cursor-pointer">Desvanecimiento</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <Checkbox disabled={soloLectura} id="vision-borrosa" />
                            <Label htmlFor="vision-borrosa" className="text-sm font-normal cursor-pointer">Visión borrosa</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <Checkbox disabled={soloLectura} id="perdida-apetito" />
                            <Label htmlFor="perdida-apetito" className="text-sm font-normal cursor-pointer">Pérdida de apetito</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <Checkbox disabled={soloLectura} id="dolor-cabeza" />
                            <Label htmlFor="dolor-cabeza" className="text-sm font-normal cursor-pointer">Dolor de cabeza</Label>
                        </div>
                    </div>

                    <div className="mb-4 mt-8">
                        <Label className="font-semibold">APARATO LOCOMOTOR</Label>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <div className="flex items-center space-x-2">
                            <Checkbox disabled={soloLectura} id="debilidad-muscular" />
                            <Label htmlFor="debilidad-muscular" className="text-sm font-normal cursor-pointer">Debilidad muscular</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <Checkbox disabled={soloLectura} id="dolores-articulares" />
                            <Label htmlFor="dolores-articulares" className="text-sm font-normal cursor-pointer">Dolores articulares</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <Checkbox disabled={soloLectura} id="calambres" />
                            <Label htmlFor="calambres" className="text-sm font-normal cursor-pointer">Calambres</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <Checkbox disabled={soloLectura} id="dolor-cuello" />
                            <Label htmlFor="dolor-cuello" className="text-sm font-normal cursor-pointer">Dolor/rigídez de cuello</Label>
                        </div>
                    </div>

                    <div className="mb-4 mt-8">
                        <Label className="font-semibold">SISTEMA DIGESTIVO</Label>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <div className="flex items-center space-x-2">
                            <Checkbox disabled={soloLectura} id="dolor-estomago" />
                            <Label htmlFor="dolor-estomago" className="text-sm font-normal cursor-pointer">Dolor y/o ardor de estómago</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <Checkbox disabled={soloLectura} id="nauseas-vomitos" />
                            <Label htmlFor="nauseas-vomitos" className="text-sm font-normal cursor-pointer">Náuseas y/o vómitos</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <Checkbox disabled={soloLectura} id="diarreas" />
                            <Label htmlFor="diarreas" className="text-sm font-normal cursor-pointer">Diarreas</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <Checkbox disabled={soloLectura} id="estreñimiento" />
                            <Label htmlFor="estreñimiento" className="text-sm font-normal cursor-pointer">Estreñimiento</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <Checkbox disabled={soloLectura} id="sequedad-bucal" />
                            <Label htmlFor="sequedad-bucal" className="text-sm font-normal cursor-pointer">Sequedad bucal</Label>
                        </div>
                    </div>

                    <div className="mb-4 mt-8">
                        <Label className="font-semibold">METABÓLICAS</Label>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <div className="flex items-center space-x-2">
                            <Checkbox disabled={soloLectura} id="hiponatremia" />
                            <Label htmlFor="hiponatremia" className="text-sm font-normal cursor-pointer">Hiponatremia</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <Checkbox disabled={soloLectura} id="hipopotasemia" />
                            <Label htmlFor="hipopotasemia" className="text-sm font-normal cursor-pointer">Hipopotasemia</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <Checkbox disabled={soloLectura} id="hiperglicemia" />
                            <Label htmlFor="hiperglicemia" className="text-sm font-normal cursor-pointer">Hiperglicemia</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <Checkbox disabled={soloLectura} id="hipercalcemia" />
                            <Label htmlFor="hipercalcemia" className="text-sm font-normal cursor-pointer">Hipercalcemia</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <Checkbox disabled={soloLectura} id="hipercolesteronemia" />
                            <Label htmlFor="hipercolesteronemia" className="text-sm font-normal cursor-pointer">Hipercolesteronemia</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <Checkbox disabled={soloLectura} id="edema" />
                            <Label htmlFor="edema" className="text-sm font-normal cursor-pointer">Edema</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <Checkbox disabled={soloLectura} id="hiperpotasemia" />
                            <Label htmlFor="hiperpotasemia" className="text-sm font-normal cursor-pointer">Hiperpotasemia</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <Checkbox disabled={soloLectura} id="hipotiroidismo" />
                            <Label htmlFor="hipotiroidismo" className="text-sm font-normal cursor-pointer">Hipotiroidismo</Label>
                        </div>
                    </div>

                    <div className="mb-4 mt-8">
                        <Label className="font-semibold">SISTEMA CARDIOVASCULAR</Label>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <div className="flex items-center space-x-2">
                            <Checkbox disabled={soloLectura} id="palpitaciones" />
                            <Label htmlFor="palpitaciones" className="text-sm font-normal cursor-pointer">Palpitaciones</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <Checkbox disabled={soloLectura} id="taquicardia" />
                            <Label htmlFor="taquicardia" className="text-sm font-normal cursor-pointer">Taquicardia</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <Checkbox disabled={soloLectura} id="hipotension" />
                            <Label htmlFor="hipotension" className="text-sm font-normal cursor-pointer">Hipotensión</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <Checkbox disabled={soloLectura} id="arritmias" />
                            <Label htmlFor="arritmias" className="text-sm font-normal cursor-pointer">Arritmias</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <Checkbox disabled={soloLectura} id="angina" />
                            <Label htmlFor="angina" className="text-sm font-normal cursor-pointer">Angina</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <Checkbox disabled={soloLectura} id="bradicardia" />
                            <Label htmlFor="bradicardia" className="text-sm font-normal cursor-pointer">Bradicardia</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <Checkbox disabled={soloLectura} id="hipotension-ortostatica" />
                            <Label htmlFor="hipotension-ortostatica" className="text-sm font-normal cursor-pointer">Hipotensión ortostática</Label>
                        </div>
                    </div>

                    <div className="mb-4 mt-8">
                        <Label className="font-semibold">PIEL</Label>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <div className="flex items-center space-x-2">
                            <Checkbox disabled={soloLectura} id="erupciones-cutaneas" />
                            <Label htmlFor="erupciones-cutaneas" className="text-sm font-normal cursor-pointer">Erupciones cutáneas</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <Checkbox disabled={soloLectura} id="prurito" />
                            <Label htmlFor="prurito" className="text-sm font-normal cursor-pointer">Prurito</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <Checkbox disabled={soloLectura} id="rubefaccion" />
                            <Label htmlFor="rubefaccion" className="text-sm font-normal cursor-pointer">Rubefacción</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <Checkbox disabled={soloLectura} id="otros" />
                            <Label htmlFor="otros" className="text-sm font-normal cursor-pointer">Otros</Label>
                        </div>
                    </div>

                    <div className="mb-4 mt-8">
                        <Label className="font-semibold">OTROS</Label>
                    </div>
                    <Textarea disabled={soloLectura} className="border border-slate-900" />
                </div>

                <div className="bg-gradient-to-r from-cyan-800 to-cyan-900 px-4 py-3 mt-6">
                    <h2 className="font-semibold text-white">2.3 Funciones Vitales</h2>
                </div>
                <div className="p-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-8 gap-4">
                        <div className="space-y-2">
                            <Label>FC <span className="text-red-500">*</span></Label>
                            <Input disabled={soloLectura} className="border border-slate-900" />
                        </div>
                        <div className="space-y-2">
                            <Label>FR <span className="text-red-500">*</span></Label>
                            <Input disabled={soloLectura} className="border border-slate-900" />
                        </div>
                        <div className="space-y-2">
                            <Label>SAT O2 <span className="text-red-500">*</span></Label>
                            <Input disabled={soloLectura} className="border border-slate-900" />
                        </div>
                        <div className="space-y-2">
                            <Label>T° <span className="text-red-500">*</span></Label>
                            <Input disabled={soloLectura} className="border border-slate-900" />
                        </div>
                        <div className="space-y-2">
                            <Label>PA <span className="text-red-500">*</span></Label>
                            <Input disabled={soloLectura} className="border border-slate-900" />
                        </div>
                    </div>
                </div>

                <div className="bg-gradient-to-r from-cyan-800 to-cyan-900 px-4 py-3 mt-6">
                    <h2 className="font-semibold text-white">2.4 Pruebas de Laboratorio</h2>
                </div>
                <div className="p-4">
                    <div className="mt-6 border rounded-lg overflow-hidden">
                        <div className="flex">
                            {/* PANEL IZQUIERDO */}
                            <div className="w-[200px] flex-shrink-0 border-r">
                                <table className="w-full text-sm">
                                    <thead className="bg-slate-100">
                                        <tr className="h-10">
                                            <th className="h-10 px-3 py-0 text-center align-middle">
                                                Prueba
                                            </th>
                                        </tr>

                                        <tr className="h-10">
                                            <th className="h-10 px-3 py-0 align-middle"></th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {pruebasLaboratorio.map((prueba) => (
                                            <tr key={prueba.id} className="h-10">
                                                <td className="h-10 px-3 py-1 align-middle">
                                                    {prueba.nombre}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            {/* PANEL DERECHO */}
                            <div className="overflow-x-auto flex-1">
                                <table className="min-w-[1680px] text-xs">
                                    <thead className="bg-slate-100">
                                        <tr className="h-10">
                                            {Array.from({ length: 24 }, (_, i) => (
                                                <th
                                                    key={i}
                                                    className="h-10 w-[70px] min-w-[70px] px-0 py-0 text-center align-middle"
                                                >
                                                    {i + 1}
                                                </th>
                                            ))}
                                        </tr>

                                        <tr className="h-10">
                                            {fechasTratamiento.map((fecha, index) => (
                                                <th
                                                    key={index}
                                                    className="h-10 w-[70px] min-w-[70px] px-0 py-0 text-center align-middle text-[10px]"
                                                >
                                                    {fecha}
                                                </th>
                                            ))}
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {pruebasLaboratorio.map((prueba) => (
                                            <tr key={prueba.id} className="h-10">
                                                {fechasTratamiento.map((fecha, index) => (
                                                    <td
                                                        key={`${prueba.id}-${index}`}
                                                        className="h-10 w-[70px] min-w-[70px] p-1 border-t border-slate-200"
                                                    >
                                                        <Input
                                                            disabled={soloLectura}
                                                            value={
                                                                resultadosLaboratorio[prueba.id]?.[index + 1] ?? ""
                                                            }
                                                            onChange={(e) =>
                                                                actualizarResultadoLaboratorio(
                                                                    prueba.id,
                                                                    index + 1,
                                                                    e.target.value
                                                                )
                                                            }
                                                            className="h-8 w-full px-1 text-center text-xs border border-slate-300"
                                                        />
                                                    </td>
                                                ))}
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>

                    <div className="mt-6 border border-slate-300 rounded-lg overflow-hidden">
                        <table className="w-full table-fixed text-sm">
                            <thead className="bg-slate-100">
                                <tr>
                                    <th className="w-[150px] px-3 py-2 text-left">Prueba</th>
                                    <th className="px-3 py-2 text-left">Resultado</th>
                                    <th className="w-[180px] px-3 py-2 text-left">Fecha</th>
                                </tr>
                            </thead>

                            <tbody>
                                <tr>
                                    <td className="px-3 py-2">Leucocitos</td>
                                    <td className="px-3 py-2">
                                        <Input disabled={soloLectura} className="h-8 border border-slate-900" />
                                    </td>
                                    <td className="px-3 py-2">
                                        <Input disabled={soloLectura} type="date" className="h-8 border border-slate-900" />
                                    </td>
                                </tr>
                                <tr>
                                    <td className="px-3 py-2">HB</td>
                                    <td className="px-3 py-2">
                                        <Input disabled={soloLectura} className="h-8 border border-slate-900" />
                                    </td>
                                    <td className="px-3 py-2">
                                        <Input disabled={soloLectura} type="date" className="h-8 border border-slate-900" />
                                    </td>
                                </tr>
                                <tr>
                                    <td className="px-3 py-2">Plaquetas</td>
                                    <td className="px-3 py-2">
                                        <Input disabled={soloLectura} className="h-8 border border-slate-900" />
                                    </td>
                                    <td className="px-3 py-2">
                                        <Input disabled={soloLectura} type="date" className="h-8 border border-slate-900" />
                                    </td>
                                </tr>
                                <tr>
                                    <td className="px-3 py-2">Neutrofilos</td>
                                    <td className="px-3 py-2">
                                        <Input disabled={soloLectura} className="h-8 border border-slate-900" />
                                    </td>
                                    <td className="px-3 py-2">
                                        <Input disabled={soloLectura} type="date" className="h-8 border border-slate-900" />
                                    </td>
                                </tr>
                                <tr>
                                    <td className="px-3 py-2">PCR</td>
                                    <td className="px-3 py-2">
                                        <Input disabled={soloLectura} className="h-8 border border-slate-900" />
                                    </td>
                                    <td className="px-3 py-2">
                                        <Input disabled={soloLectura} type="date" className="h-8 border border-slate-900" />
                                    </td>
                                </tr>
                                <tr>
                                    <td className="px-3 py-2">Na</td>
                                    <td className="px-3 py-2">
                                        <Input disabled={soloLectura} className="h-8 border border-slate-900" />
                                    </td>
                                    <td className="px-3 py-2">
                                        <Input disabled={soloLectura} type="date" className="h-8 border border-slate-900" />
                                    </td>
                                </tr>
                                <tr>
                                    <td className="px-3 py-2">K</td>
                                    <td className="px-3 py-2">
                                        <Input disabled={soloLectura} className="h-8 border border-slate-900" />
                                    </td>
                                    <td className="px-3 py-2">
                                        <Input disabled={soloLectura} type="date" className="h-8 border border-slate-900" />
                                    </td>
                                </tr>
                                <tr>
                                    <td className="px-3 py-2">Albúmina</td>
                                    <td className="px-3 py-2">
                                        <Input disabled={soloLectura} className="h-8 border border-slate-900" />
                                    </td>
                                    <td className="px-3 py-2">
                                        <Input disabled={soloLectura} type="date" className="h-8 border border-slate-900" />
                                    </td>
                                </tr>
                                <tr>
                                    <td className="px-3 py-2">Prot. Totales</td>
                                    <td className="px-3 py-2">
                                        <Input disabled={soloLectura} className="h-8 border border-slate-900" />
                                    </td>
                                    <td className="px-3 py-2">
                                        <Input disabled={soloLectura} type="date" className="h-8 border border-slate-900" />
                                    </td>
                                </tr>
                                <tr>
                                    <td className="px-3 py-2">Probnp</td>
                                    <td className="px-3 py-2">
                                        <Input disabled={soloLectura} className="h-8 border border-slate-900" />
                                    </td>
                                    <td className="px-3 py-2">
                                        <Input disabled={soloLectura} type="date" className="h-8 border border-slate-900" />
                                    </td>
                                </tr>
                                <tr>
                                    <td className="px-3 py-2">Urea</td>
                                    <td className="px-3 py-2">
                                        <Input disabled={soloLectura} className="h-8 border border-slate-900" />
                                    </td>
                                    <td className="px-3 py-2">
                                        <Input disabled={soloLectura} type="date" className="h-8 border border-slate-900" />
                                    </td>
                                </tr>
                                <tr>
                                    <td className="px-3 py-2">Creat.</td>
                                    <td className="px-3 py-2">
                                        <Input disabled={soloLectura} className="h-8 border border-slate-900" />
                                    </td>
                                    <td className="px-3 py-2">
                                        <Input disabled={soloLectura} type="date" className="h-8 border border-slate-900" />
                                    </td>
                                </tr>
                                <tr>
                                    <td className="px-3 py-2">FA</td>
                                    <td className="px-3 py-2">
                                        <Input disabled={soloLectura} className="h-8 border border-slate-900" />
                                    </td>
                                    <td className="px-3 py-2">
                                        <Input disabled={soloLectura} type="date" className="h-8 border border-slate-900" />
                                    </td>
                                </tr>
                                <tr>
                                    <td className="px-3 py-2">TGO</td>
                                    <td className="px-3 py-2">
                                        <Input disabled={soloLectura} className="h-8 border border-slate-900" />
                                    </td>
                                    <td className="px-3 py-2">
                                        <Input disabled={soloLectura} type="date" className="h-8 border border-slate-900" />
                                    </td>
                                </tr>
                                <tr>
                                    <td className="px-3 py-2">TGP</td>
                                    <td className="px-3 py-2">
                                        <Input disabled={soloLectura} className="h-8 border border-slate-900" />
                                    </td>
                                    <td className="px-3 py-2">
                                        <Input disabled={soloLectura} type="date" className="h-8 border border-slate-900" />
                                    </td>
                                </tr>
                                <tr>
                                    <td className="px-3 py-2">BT</td>
                                    <td className="px-3 py-2">
                                        <Input disabled={soloLectura} className="h-8 border border-slate-900" />
                                    </td>
                                    <td className="px-3 py-2">
                                        <Input disabled={soloLectura} type="date" className="h-8 border border-slate-900" />
                                    </td>
                                </tr>
                                <tr>
                                    <td className="px-3 py-2">BD</td>
                                    <td className="px-3 py-2">
                                        <Input disabled={soloLectura} className="h-8 border border-slate-900" />
                                    </td>
                                    <td className="px-3 py-2">
                                        <Input disabled={soloLectura} type="date" className="h-8 border border-slate-900" />
                                    </td>
                                </tr>
                                <tr>
                                    <td className="px-3 py-2">BI</td>
                                    <td className="px-3 py-2">
                                        <Input disabled={soloLectura} className="h-8 border border-slate-900" />
                                    </td>
                                    <td className="px-3 py-2">
                                        <Input disabled={soloLectura} type="date" className="h-8 border border-slate-900" />
                                    </td>
                                </tr>
                                <tr>
                                    <td className="px-3 py-2">GGT</td>
                                    <td className="px-3 py-2">
                                        <Input disabled={soloLectura} className="h-8 border border-slate-900" />
                                    </td>
                                    <td className="px-3 py-2">
                                        <Input disabled={soloLectura} type="date" className="h-8 border border-slate-900" />
                                    </td>
                                </tr>
                                <tr>
                                    <td className="px-3 py-2">Amilasa</td>
                                    <td className="px-3 py-2">
                                        <Input disabled={soloLectura} className="h-8 border border-slate-900" />
                                    </td>
                                    <td className="px-3 py-2">
                                        <Input disabled={soloLectura} type="date" className="h-8 border border-slate-900" />
                                    </td>
                                </tr>
                                <tr>
                                    <td className="px-3 py-2">Lipasa</td>
                                    <td className="px-3 py-2">
                                        <Input disabled={soloLectura} className="h-8 border border-slate-900" />
                                    </td>
                                    <td className="px-3 py-2">
                                        <Input disabled={soloLectura} type="date" className="h-8 border border-slate-900" />
                                    </td>
                                </tr>
                                <tr>
                                    <td className="px-3 py-2">Urocultivo</td>
                                    <td className="px-3 py-2">
                                        <Input disabled={soloLectura} className="h-8 border border-slate-900" />
                                    </td>
                                    <td className="px-3 py-2">
                                        <Input disabled={soloLectura} type="date" className="h-8 border border-slate-900" />
                                    </td>
                                </tr>
                                <tr>
                                    <td className="px-3 py-2">Antibiograma</td>
                                    <td className="px-3 py-2">
                                        <Input disabled={soloLectura} className="h-8 border border-slate-900" />
                                    </td>
                                    <td className="px-3 py-2">
                                        <Input disabled={soloLectura} type="date" className="h-8 border border-slate-900" />
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4 mt-6">
                        <div className="space-y-2">
                            <Label>Otros exámenes auxiliares <span className="text-red-500">*</span></Label>
                            <Textarea disabled={soloLectura} className="border border-slate-900" />
                        </div>
                    </div>
                </div>

                <div className="bg-gradient-to-r from-cyan-800 to-cyan-900 px-4 py-3 mt-6">
                    <h2 className="font-semibold text-white">2.5 Diagnóstico(s)</h2>
                </div>
                <div className="p-4">
                    <div className="grid grid-cols-1 md:grid-cols-[140px_1fr_140px] gap-4 items-end">
                        <div className="space-y-2">
                            <Label>Tipo de DX <span className="text-red-500">*</span></Label>

                            <Select>
                                <SelectTrigger disabled={soloLectura} className="border border-slate-900">
                                    <SelectValue placeholder="Seleccione" />
                                </SelectTrigger>

                                <SelectContent>
                                    <SelectItem value="P">P</SelectItem>
                                    <SelectItem value="D">D</SelectItem>
                                    <SelectItem value="R">R</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-2">
                            <Label>Diagnóstico <span className="text-red-500">*</span></Label>
                            <Input disabled={soloLectura} className="border border-slate-900" />
                        </div>

                        {!soloLectura && (
                            <Button
                                type="button"
                                className="bg-green-600 hover:bg-green-700 text-white flex items-center gap-2"
                            >
                                <PlusCircle className="w-4 h-4" />
                                Agregar
                            </Button>
                        )}
                    </div>

                    <div className="mt-6 border border-slate-300 rounded-lg overflow-hidden">
                        <table className="w-full text-sm">
                            <thead className="bg-slate-100">
                                <tr>
                                    <th className="px-3 py-2 text-left">CIE 10</th>
                                    <th className="px-3 py-2 text-left">Descripción</th>
                                    <th className="px-3 py-2 text-left">Tipo de DX</th>
                                    <th className="px-3 py-2 text-left">Acción</th>
                                </tr>
                            </thead>

                            <tbody>
                                <tr>
                                    <td className="px-3 py-2">Z981</td>
                                    <td className="px-3 py-2">Estado de Artrodesis</td>
                                    <td className="px-3 py-2">P</td>
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
                            <div className="mt-6 border border-slate-300 rounded-lg overflow-hidden max-w-md">
                                <table className="w-full table-fixed text-sm">
                                    <thead className="bg-slate-100">
                                        <tr>
                                            <th className="px-3 py-2 text-left">Necesidad</th>
                                            <th className="px-3 py-2 text-left">Efectividad</th>
                                            <th className="px-3 py-2 text-left">Seguridad</th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        <tr>
                                            <td className="px-3 py-3">
                                                <Input disabled={soloLectura} className="h-8 border border-slate-900" />
                                            </td>
                                            <td className="px-3 py-3">
                                                <Input disabled={soloLectura} className="h-8 border border-slate-900" />
                                            </td>
                                            <td className="px-3 py-3">
                                                <Input disabled={soloLectura} className="h-8 border border-slate-900" />
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        <div className="md:col-span-2 space-y-2 mt-6">
                            <Label>EVALUACIÓN DE RIESTOS DE NECESIDAD, EFICACIA Y SEGURIDAD <span className="text-red-500">*</span></Label>
                            <Textarea disabled={soloLectura} className="border border-slate-900" />
                        </div>

                        <div className="md:col-span-2 space-y-2 mt-6">
                            <Label>REFERENCIA BIBLIOGRÁFICA <span className="text-red-500">*</span></Label>
                            <Textarea disabled={soloLectura} className="border border-slate-900" />
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
                        onClick={handleGuardarAnamnesis}
                    >
                        {guardando ? (
                            <>
                                <Loader2 className="w-4 h-4 animate-spin" />
                                Guardando...
                            </>
                        ) : (
                            <>
                                <Save className="w-4 h-4" />
                                Guardar Anamnesis
                            </>
                        )}
                    </Button>
                )}
            </div>

            {/* MODAL DE ÉXITO DEL GUARDADO DE LA ANAMNESIS FARMACOLÓGICA */}
            <Dialog open={openModalExito} onOpenChange={setOpenModalExito}>
                <DialogContent className="max-w-sm">
                    <DialogHeader>
                        <DialogTitle className="flex flex-col items-center gap-3">
                            <CheckCircle className="w-16 h-16 text-green-600" />
                            <span>Registro exitoso</span>
                        </DialogTitle>
                    </DialogHeader>

                    <p className="text-center text-gray-700">
                        La anamnesis farmacológica ha sido registrada con éxito.
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
