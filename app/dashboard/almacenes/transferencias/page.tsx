"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import {
  FilePlus,
  FileEdit,
  Trash2,
  BarChart2,
  Printer,
  FileSpreadsheet,
  ArrowLeft,
  Search,
  RefreshCw,
  Filter,
  ClipboardCheck,
  Eye,
  Pencil,
  Eraser,
  CheckCircle,
  MoveRight,
  Edit,
  XCircle,
  PackageCheck,
  History,
} from "lucide-react"
import { useRouter } from "next/navigation"
import { Plus } from "lucide-react"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DespachoPrerrequerimiento } from "@/components/transferencias/despacho-prerrequerimiento"
import { FormularioNuevaDevolucion } from "@/components/devoluciones/formulario-nueva-devolucion"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog"
import { Textarea } from "@/components/ui/textarea"

// Datos de ejemplo para la tabla de prerrequerimientos
const prerrequerimientosData = [
  {
    id: 1,
    estado: "1",
    prerrequerimientoId: "00000005",
    tipoRequerimiento: "Pre-requerimiento Farmacia",
    fecha: "05/12/2025",
    hora: "12:33:09",
    fecha_entrega: "",
    hora_entrega: "",
    fecha_conformidad: "",
    hora_conformidad: "",
    almacenSolicitante: "DU",
    usuario: "CROJAS",
  },
  {
    id: 2,
    estado: "2",
    prerrequerimientoId: "00000004",
    tipoRequerimiento: "Pre-requerimiento Farmacia",
    fecha: "05/12/2025",
    hora: "12:11:54",
    fecha_entrega: "",
    hora_entrega: "",
    fecha_conformidad: "",
    hora_conformidad: "",
    almacenSolicitante: "DU",
    usuario: "CROJAS",
  },
  {
    id: 3,
    estado: "3",
    prerrequerimientoId: "00000003",
    tipoRequerimiento: "Pre-requerimiento Farmacia",
    fecha: "04/12/2025",
    hora: "10:25:36",
    fecha_entrega: "04/12/2025",
    hora_entrega: "10:31:19",
    fecha_conformidad: "",
    hora_conformidad: "",
    almacenSolicitante: "DU",
    usuario: "CROJAS",
  },
  {
    id: 4,
    estado: "3",
    prerrequerimientoId: "00000002",
    tipoRequerimiento: "Pre-requerimiento Farmacia",
    fecha: "04/12/2025",
    hora: "10:14:29",
    fecha_entrega: "04/12/2025",
    hora_entrega: "10:18:45",
    fecha_conformidad: "",
    hora_conformidad: "",
    almacenSolicitante: "DU",
    usuario: "CROJAS",
  },
  {
    id: 5,
    estado: "4",
    prerrequerimientoId: "00000001",
    tipoRequerimiento: "Pre-requerimiento Farmacia",
    fecha: "03/12/2025",
    hora: "09:01:47",
    fecha_entrega: "03/12/2025",
    hora_entrega: "09:23:38",
    fecha_conformidad: "03/12/2025",
    hora_conformidad: "09:35:12",
    almacenSolicitante: "DU",
    usuario: "CROJAS",
  },
]

// Datos de ejemplo para el detalle de un prerrequerimiento
const detallesPrerreq = [
  {
    id: 1,
    item: "170421",
    nombre: "BENZOATO DE BENCILO 25 g/100 mL (25 %) 120 mL",
    presentacion: "LOC",
    cantidad: 60.0,
    //precio: 4.16,
    precio: null,
    //importe: 16.64,
    importe: null,
    estado: 2,
    deAlmacen: "CE",
    aAlmacen: "A",
    fecha_proceso: "31/03/2025",
    //lote: "2080595",
    lote: "",
    //regSanitario: "AA-0001",
    regSanitario: "",
    //fecha_vcto: "31/03/2025",
    fecha_vcto: "",
  },
  {
    id: 2,
    item: "170437",
    nombre: "YODO POVIDONA 10 g/100 mL 125 mL",
    presentacion: "SOL",
    cantidad: 20.0,
    //precio: 4.99,
    precio: null,
    //importe: 99.84,
    importe: null,
    estado: 2,
    deAlmacen: "CE",
    aAlmacen: "A",
    fecha_proceso: "31/03/2025",
    //lote: "24M17G8910",
    lote: "",
    //regSanitario: "BB-0001",
    regSanitario: "",
    //fecha_vcto: "31/03/2025",
    fecha_vcto: "",
  },
  {
    id: 3,
    item: "172544",
    nombre: "(P.DIAB) MONOFILAMENTO DE NAILON 13 cm x 2.5 cm + 4 cm CALIBRADO",
    presentacion: "UNI",
    cantidad: 8.0,
    //precio: 12.15,
    precio: null,
    //importe: 97.2,
    importe: null,
    estado: 2,
    deAlmacen: "CE",
    aAlmacen: "A",
    fecha_proceso: "31/03/2025",
    //lote: "2501516",
    lote: "",
    //regSanitario: "CC-0001",
    regSanitario: "",
    //fecha_vcto: "31/03/2025",
    fecha_vcto: "",
  },
]

const detallesTransfer = [
  {
    id: 1,
    transferenciaId: "00000003",
    producto: "ACIDO TRANEXAMICO 1 G 10 ML",
    cantidad: 9.0,
    precio: 13.35,
    importe: 120.15,
    estado: "1",
    tipoTransaccion: "Transferencias entre Farmacias",
    origen: "Farmacia Emergencia",
    destino: "Farmacia Hospitalización",
    lote: "1548456",
    regSanitario: "LL-0001",
    fechaVenc: "12/01/2026",
    fechaReg: "15/12/2025",
    horaReg: "16:15:52",
    fechaProc: "",
    horaProc: "",
    usuario: "MCHUYES",
    observacion: "No hay observaciones",
  },
  {
    id: 2,
    transferenciaId: "00000002",
    producto: "OXIGENO MEDICINAL (LT)",
    cantidad: 8.0,
    precio: 15.65,
    importe: 125.20,
    estado: "1",
    tipoTransaccion: "Transferencia de Oxígeno",
    origen: "Almacen General",
    destino: "Farmacia Hospitalización",
    lote: "48545511",
    regSanitario: "MM-0001",
    fechaVenc: "23/02/2026",
    fechaReg: "15/12/2025",
    horaReg: "14:26:32",
    fechaProc: "",
    horaProc: "",
    usuario: "ASALAZAR",
    observacion: "No hay observaciones",
  },
  {
    id: 3,
    transferenciaId: "00000001",
    producto: "OXIGENO MEDICINAL (LT)",
    cantidad: 10.0,
    precio: 15.65,
    importe: 165.50,
    estado: "2",
    tipoTransaccion: "Transferencia de Oxígeno",
    origen: "Almacen General",
    destino: "Farmacia Hospitalización",
    lote: "48545511",
    regSanitario: "MM-0001",
    fechaVenc: "23/02/2026",
    fechaReg: "15/12/2025",
    horaReg: "11:40:19",
    fechaProc: "15/12/2025",
    horaProc: "11:45:48",
    usuario: "ASALAZAR",
    observacion: "No hay observaciones",
  },
]

const devolucionesData = [
  {
    id: 3,
    devolucionId: "00000003",
    estado: "1",
    fechaReg: "17/12/2025",
    horaReg: "16:45:23",
    fechaProc: "",
    horaProc: "",
    almacenOrigen: "DU",
    usuario: "PSILVA",
  },
  {
    id: 2,
    devolucionId: "00000002",
    estado: "2",
    fechaReg: "16/12/2025",
    horaReg: "12:11:45",
    fechaProc: "16/12/2025",
    horaProc: "12:35:11",
    almacenOrigen: "DU",
    usuario: "CROJAS",
  },
  {
    id: 1,
    devolucionId: "00000003",
    estado: "2",
    fechaReg: "16/12/2025",
    horaReg: "11:33:25",
    fechaProc: "16/12/2025",
    horaProc: "11:38:21",
    almacenOrigen: "DU",
    usuario: "CROJAS",
  }
]

const farmaciasSolicitantes = [
  { id: 1, codigo: "T", nombre: "Todas las Áreas" },
  { id: 2, codigo: "CE", nombre: "Farmacia Consultorios Externos" },
  { id: 3, codigo: "DU", nombre: "Farmacia Dosis Unitaria" },
  { id: 4, codigo: "F", nombre: "Farmacia Emergencia" },
  { id: 6, codigo: "FL", nombre: "Farmacia Laboratorio" },
]

const detallePrerrequerimientoMock = {
  observacion: "Reposición de medicamentos para turno noche",
  productos: [
    { codigo: "00070", nombre: "ACETILCISTEINA 100 MG", cantidad: 50 },
    { codigo: "00132", nombre: "ACICLOVIR 250 MG INY", cantidad: 20 },
    { codigo: "00456", nombre: "PARACETAMOL 500 MG", cantidad: 100 },
  ],
};

const historialCambiosMock = [
  {
    id: 1,
    fechaHora: "04/02/2026 09:15",
    usuario: "Axel Huamán",
    accion: "AGREGAR PRODUCTO",
    producto: "184844 - Tramadol 200mg",
    motivo: "Producto faltante en el prerrequerimiento original",
  },
  {
    id: 2,
    fechaHora: "04/02/2026 09:32",
    usuario: "Axel Huamán",
    accion: "EDITAR CANTIDAD",
    producto: "104589 - Paracetamol 500mg",
    cantidad: 20,
  },
  {
    id: 3,
    fechaHora: "04/02/2026 10:05",
    usuario: "Axel Huamán",
    accion: "ELIMINAR PRODUCTO",
    producto: "178514 - Ibuprofeno 400mg",
    motivo: "Producto no disponible en stock",
  },
];


export default function TransferenciasPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchDistrib, setSearchDistrib] = useState("");
  const [searchTransfer, setSearchTransfer] = useState("");
  const [searchDevol, setSearchDevol] = useState("");
  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const router = useRouter();
  const [fechaInicio, setFechaInicio] = useState("");
  const [fechaInicioDistrib, setFechaInicioDistrib] = useState("");
  const [fechaInicioTransfer, setFechaInicioTransfer] = useState("");
  const [fechaInicioDevol, setFechaInicioDevol] = useState("");
  const [fechaFin, setFechaFin] = useState("");
  const [fechaFinDistrib, setFechaFinDistrib] = useState("");
  const [fechaFinTransfer, setFechaFinTransfer] = useState("");
  const [fechaFinDevol, setFechaFinDevol] = useState("");
  const [openModalSolicitud, setOpenModalSolicitud] = useState(false);
  const [openModalExitoRegSol, setOpenModalExitoRegSol] = useState(false);
  const [openModalConformidad, setOpenModalConformidad] = useState(false);
  const [openModalExito, setOpenModalExito] = useState(false);
  const [openModalEliminar, setOpenModalEliminar] = useState(false);
  const [openModalExitoEliminar, setOpenModalExitoEliminar] = useState(false);
  const [openModalDetalle, setOpenModalDetalle] = useState(false);
  const [openModalDetalleDist, setOpenModalDetalleDist] = useState(false);
  const [openModalDespachar, setOpenModalDespachar] = useState(false);
  const [openModalConfDespacho, setOpenModalConfDespacho] = useState(false);
  const [openModalExitoDespacho, setOpenModalExitoDespacho] = useState(false);
  const [openModalTransferencia, setOpenModalTransferencia] = useState(false);
  const [openModalExitoRegTransfer, setOpenModalExitoRegTransfer] = useState(false);
  const [openModalProcesarTransfer, setOpenModalProcesarTransfer] = useState(false);
  const [openModalExitoProcTransfer, setOpenModalExitoProcTransfer] = useState(false);
  const [openModalNuevaDevolucion, setOpenModalNuevaDevolucion] = useState(false);
  const [openModalExitoDevolucion, setOpenModalExitoDevolucion] = useState(false);
  const [openModalProcesarDevol, setOpenModalProcesarDevol] = useState(false);
  const [openModalExitoProcDevol, setOpenModalExitoProcDevol] = useState(false);
  const [openModalPreparar, setOpenModalPreparar] = useState(false);
  const [openModalExitoPreparar, setOpenModalExitoPreparar] = useState(false);
  const [solicitudSeleccionada, setSolicitudSeleccionada] = useState<any>(null);
  const [transferenciaSelec, setTransferenciaSelec] = useState<any>(null);
  const [devolucionSelec, setDevolucionSelec] = useState<any>(null);
  const [almacenSeleccionado, setAlmacenSeleccionado] = useState(farmaciasSolicitantes[0].codigo);
  const [vistaDistribucion, setVistaDistribucion] = useState<"lista" | "despacho">("lista");
  const [vistaDevolucion, setVistaDevolucion] = useState<"lista" | "nueva">("lista");
  const [mostrarHistorial, setMostrarHistorial] = useState(false);
  const enDespacho = vistaDistribucion === "despacho";
  const now = new Date();

  // Tipos de prerrequerimientos
  const tiposPrerreq = [
    { id: "PRF", codigo: "PRF", nombre: "Pre-requerimiento Farmacia" },
    { id: "PRL", codigo: "PRL", nombre: "Pre-requerimiento Laboratorio" },
    { id: "PRO", codigo: "PRO", nombre: "Pre-requerimiento Oxígeno" },
  ]

  // Áreas solicitantes
  const areasSolicitantes = [
    { id: "FE", codigo: "FE", nombre: "Farmacia Emergencia" },
    { id: "FH", codigo: "FH", nombre: "Farmacia Hospitalización" },
    { id: "FCE", codigo: "FCE", nombre: "Farmacia Consultorios Externos" },
    { id: "FL", codigo: "FL", nombre: "Farmacia Laboratorio" },
  ]

  // Almacén suministrador
  const almacenSum = [
    { id: "AG", codigo: "AG", nombre: "Almacén General" },
    { id: "AS", codigo: "AS", nombre: "Almacén Insumos" },
  ]

  // Tipos de transacciones
  const tiposTransacc = [
    { id: "D", codigo: "D", nombre: "Distribución" },
    { id: "TEF", codigo: "TEF", nombre: "Transferencias entre Farmacias" },
    { id: "TDO", codigo: "TDO", nombre: "Transferencia de Oxígeno" },
  ]

  // Almacén Origen (TRANSFERENCIAS INTERNAS)
  const almOrigen = [
    { id: "AG", codigo: "AG", nombre: "Almacén General" },
    { id: "AS", codigo: "AS", nombre: "Almacén Insumos" },
  ]

  // Área Destino (TRANSFERENCIAS INTERNAS)
  const areaDestino = [
    { id: "FE", codigo: "FE", nombre: "Farmacia Emergencia" },
    { id: "FH", codigo: "FH", nombre: "Farmacia Hospitalización" },
    { id: "FCE", codigo: "FCE", nombre: "Farmacia Consultorios Externos" },
    { id: "FL", codigo: "FL", nombre: "Farmacia Laboratorio" },
  ]

  // Farmacia Origen (TRANSFERENCIAS INTERNAS)
  const farmOrigen = [
    { id: "FE", codigo: "FE", nombre: "Farmacia Emergencia" },
    { id: "FH", codigo: "FH", nombre: "Farmacia Hospitalización" },
    { id: "FCE", codigo: "FCE", nombre: "Farmacia Consultorios Externos" },
  ]

  // Farmacia Destino (TRANSFERENCIAS INTERNAS)
  const farmDestino = [
    { id: "FE", codigo: "FE", nombre: "Farmacia Emergencia" },
    { id: "FH", codigo: "FH", nombre: "Farmacia Hospitalización" },
    { id: "FCE", codigo: "FCE", nombre: "Farmacia Consultorios Externos" },
  ]

  const [areaSeleccionada, setAreaSeleccionada] = useState(areasSolicitantes[3].codigo);
  const [almGenSeleccionado, setAlmGenSeleccionado] = useState(almacenSum[0].nombre);
  const [almServSeleccionado, setAlmServSeleccionado] = useState(almacenSum[1].nombre);
  const [transaccDistrib, setTransaccDistrib] = useState(tiposTransacc[0].nombre);

  // Estado para controlar el tipo de prerrequerimiento seleccionado
  const [tipoPrerrequerimiento, setTipoPrerrequerimiento] = useState<string>("");

  // Estado para controlar el tipo de transaccion realizada
  const [tipoTransaccion, setTipoTransaccion] = useState<string>("");

  // Si quieres que algunos campos siempre estén visibles, muévelos fuera del bloque condicional.
  // Aquí los ocultamos hasta que el usuario elija el tipo de documento.
  const showCamposGenerales = tipoPrerrequerimiento !== "";
  const showCamposGeneralesTransacc = tipoTransaccion !== "";

  // Mostrar campos específicos por tipo de prerrequerimiento
  const isReqFarmacias = tipoPrerrequerimiento === "PRF";
  const isReqLaboratorio = tipoPrerrequerimiento === "PRL";
  const isReqOxigeno = tipoPrerrequerimiento === "PRO";

  // Para la tabla dinámica de productos dentro del modal
  const [producto, setProducto] = useState("");
  const [cantidad, setCantidad] = useState("");
  const [observacionNPR, setobservacionNPR] = useState("");
  const [stock, setStock] = useState("");

  // Para la tabla dinámica dentro del modal de transferencia interna
  const [prodTransfer, setProdTransfer] = useState("");
  const [cantTransfer, setCantTransfer] = useState("");
  const [obsTransfer, setObsTransfer] = useState("");

  // Colocar un color por cada estado
  const getEstadoBadge = (estado: string) => {
    const variants = {
      "1": "bg-red-100 text-red-800 border-red-300",
      "2": "bg-purple-100 text-purple-800 border-purple-300",
      "3": "bg-yellow-100 text-yellow-800 border-yellow-300",
      "4": "bg-green-100 text-green-800 border-green-300",
    }

    const nombreEstado = {
      "1": "REGISTRADO",
      "2": "EN PREPARACIÓN",
      "3": "DESPACHADO",
      "4": "CONFORME",
    }

    return <Badge className={`${variants[estado as keyof typeof variants]} w-32 justify-center text-sm font-semibold py-1`}>
      {nombreEstado[estado as keyof typeof nombreEstado]}
    </Badge>
  }

  const getEstadoBadgeTransfer = (estado: string) => {
    const variants = {
      "1": "bg-yellow-100 text-yellow-800 border-yellow-300",
      "2": "bg-green-100 text-green-800 border-green-300",
    }

    const nombreEstado = {
      "1": "REGISTRADO",
      "2": "PROCESADO",
    }

    return <Badge className={`${variants[estado as keyof typeof variants]} w-32 justify-center text-sm font-semibold py-1`}>
      {nombreEstado[estado as keyof typeof nombreEstado]}
    </Badge>
  }

  // Formatear fecha: DD/MM/YYYY
  const fechaActual = now.toLocaleDateString("es-PE", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

  const fechaActualTransfer = now.toLocaleDateString("es-PE", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

  const fechaActualDevol = now.toLocaleDateString("es-PE", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

  // Formatear hora: HH:MM:SS
  const horaActual = now.toLocaleTimeString("es-PE", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  });

  const horaActualTransfer = now.toLocaleTimeString("es-PE", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  });

  const horaActualDevol = now.toLocaleTimeString("es-PE", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  });

  // Filtro automático: filtra por ingreso_id o documento
  const filteredPrerreq = prerrequerimientosData.filter((solicitud) => {
    const matchesSearch =
      solicitud.prerrequerimientoId.toString().includes(searchTerm.toLowerCase())

    const fecha = new Date(solicitud.fecha);

    const matchesFechaInicio = fechaInicio
      ? fecha >= new Date(fechaInicio)
      : true;

    const matchesFechaFin = fechaFin
      ? fecha <= new Date(fechaFin)
      : true;

    return matchesSearch && matchesFechaInicio && matchesFechaFin;
  });

  const filteredDistrib = prerrequerimientosData.filter((solicitud) => {
    const matchesSearch =
      solicitud.prerrequerimientoId.toString().includes(searchDistrib.toLowerCase())

    const fecha = new Date(solicitud.fecha);

    const matchesFechaInicioDistrib = fechaInicioDistrib
      ? fecha >= new Date(fechaInicioDistrib)
      : true;

    const matchesFechaFinDistrib = fechaFinDistrib
      ? fecha <= new Date(fechaFinDistrib)
      : true;

    return matchesSearch && matchesFechaInicioDistrib && matchesFechaFinDistrib;
  });

  const filteredTransfer = detallesTransfer.filter((solicitud) => {
    const matchesSearch =
      solicitud.transferenciaId.toString().includes(searchTransfer.toLowerCase())

    const fecha = new Date(solicitud.fechaReg);

    const matchesFechaInicioTransfer = fechaInicioTransfer
      ? fecha >= new Date(fechaInicioTransfer)
      : true;

    const matchesFechaFinTransfer = fechaFinTransfer
      ? fecha <= new Date(fechaFinTransfer)
      : true;

    return matchesSearch && matchesFechaInicioTransfer && matchesFechaFinTransfer;
  });

  const filteredDevol = devolucionesData.filter((devolucion) => {
    const matchesSearch =
      devolucion.devolucionId.toString().includes(searchDevol.toLowerCase())

    const fecha = new Date(devolucion.fechaReg);

    const matchesFechaInicioDevol = fechaInicioDevol
      ? fecha >= new Date(fechaInicioDevol)
      : true;

    const matchesFechaFinDevol = fechaFinDevol
      ? fecha <= new Date(fechaFinDevol)
      : true;

    return matchesSearch && matchesFechaInicioDevol && matchesFechaFinDevol;
  });

  // Limpiar filtros de busqueda
  const limpiarFiltros = () => {
    setSearchTerm("");
    setFechaInicio("");
    setFechaFin("");
  }

  const limpiarFiltrosDistrib = () => {
    setSearchDistrib("");
    setFechaInicioDistrib("");
    setFechaFinDistrib("");
  }

  const limpiarFiltrosTransfer = () => {
    setSearchTransfer("");
    setFechaInicioTransfer("");
    setFechaFinTransfer("");
  }

  const limpiarFiltrosDevol = () => {
    setSearchDevol("");
    setFechaInicioDevol("");
    setFechaFinDevol("");
  }

  // Resetear Modal de Registro de Prerrequerimiento
  const resetModalRegPrerreq = () => {
    setTipoPrerrequerimiento("");
    setProducto("");
    setCantidad("");
    setobservacionNPR("");
  };

  // Resetear Modal de Registro de Transferencia Interna
  const resetModalTransfInt = () => {
    setTipoTransaccion("");
    setProdTransfer("");
    setCantTransfer("");
    setObsTransfer("");
  }

  return (
    <div className="max-w-[1600px] w-full mx-auto px-6">
      <div className="flex items-center gap-4">
        <Button
          variant="outline"
          className="border border-gray-300 h-9 shadow-sm cursor-pointer hover:shadow-md hover:bg-gray-100 transition"
          onClick={() => router.push("/dashboard/almacenes")}
        >
          <Link href="/dashboard/almacenes">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          Regresar
        </Button>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Módulo de Transferencias Internas</h1>
          <p className="text-muted-foreground">Gestión de almacenes, inventarios y movimientos de productos</p>
        </div>
      </div>

      <Tabs defaultValue="prerrequerimientos" className="w-full mt-6">
        <div className="flex gap-6 items-start w-full">
          {/* --- LADO IZQUIERDO: TABS VERTICALES --- */}
          <TabsList className="flex flex-col w-48 h-fit border rounded-lg p-2">
            <TabsTrigger
              value="prerrequerimientos"
              className="justify-start
                py-2 px-3
                rounded-md
                hover:bg-gray-100 hover:text-black
                data-[state=active]:bg-blue-600 
                data-[state=active]:text-white
                data-[state=active]:shadow
                transition-all"
            >
              Prerrequerimientos
            </TabsTrigger>
            <TabsTrigger
              value="transferenciasInternas"
              className="justify-start
                mt-2
                py-2 px-3
                rounded-md
                hover:bg-gray-100 hover:text-black
                data-[state=active]:bg-blue-600 
                data-[state=active]:text-white
                data-[state=active]:shadow
                transition-all"
            >
              Transferencias Internas
            </TabsTrigger>
          </TabsList>

          {/* --- LADO DERECHO: CONTENIDO --- */}
          <div className="flex-1 w-full">
            <TabsContent value="prerrequerimientos" className="w-full">
              <Card className="w-full">
                <div className="flex items-center justify-between w-full mb-4">
                  <div>
                    <CardHeader>
                      <CardTitle>Gestión de Prerrequerimientos</CardTitle>
                      <CardDescription>Solicite su prerrequerimiento a Almacén</CardDescription>
                    </CardHeader>
                  </div>

                  <div className="w-80 mr-6 space-y-2 bg-blue-50 border border-blue-200 p-4 rounded mt-4">
                    <Label className="text-base font-semibold">Seleccionar Área Solicitante:</Label>
                    <Select value={almacenSeleccionado} onValueChange={setAlmacenSeleccionado}>
                      <SelectTrigger className="rounded-md">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {farmaciasSolicitantes.map((alm) => (
                          <SelectItem key={alm.id} value={alm.codigo}>
                            {alm.nombre}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <CardContent>
                  {/* Búsqueda y filtros a la izquierda. Botón de registro a la derecha */}
                  <div className="bg-white border border-[#9CD2D3]/40 rounded-xl px-6 py-4 flex items-end justify-between gap-6 shadow-sm mb-4">
                    <div className="flex items-end gap-4">
                      <div className="flex flex-col w-64">
                        <Label htmlFor="buscar" className="mb-1">Buscar por:</Label>

                        <div className="relative w-64">
                          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                          <Input
                            placeholder="ID Prerrequerimiento..."
                            className="pl-8 h-10"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                          />
                        </div>
                      </div>

                      <div className="flex flex-col">
                        <Label htmlFor="fechaInicio" className="mb-1">Desde</Label>
                        <Input
                          id="fechaInicio"
                          type="date"
                          className="h-10 w-40"
                          value={fechaInicio}
                          onChange={(e) => setFechaInicio(e.target.value)}
                        />
                      </div>

                      <div className="flex flex-col">
                        <Label htmlFor="fechaFin" className="mb-1">Hasta</Label>
                        <Input
                          id="fechaFin"
                          type="date"
                          className="h-10 w-40"
                          value={fechaFin}
                          onChange={(e) => setFechaFin(e.target.value)}
                        />
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button variant="outline" className="gap-1 border-gray-700" onClick={limpiarFiltros}>
                        <Eraser className="h-4 w-4" strokeWidth={3} />
                        Limpiar Filtros
                      </Button>
                      <Button
                        className="bg-green-600 hover:bg-green-700 text-white gap-2 font-semibold"
                        onClick={() => setOpenModalSolicitud(true)}
                      >
                        <Plus className="h-4 w-4" strokeWidth={3} />
                        Nueva Solicitud
                      </Button>
                    </div>
                  </div>

                  <div className="overflow-x-auto border border-gray-200 rounded-lg bg-white">
                    <Table>
                      <TableHeader>
                        <TableRow className="bg-gray-50 border-b border-gray-200">
                          <TableHead>Estado</TableHead>
                          <TableHead>ID Prerrequerimiento</TableHead>
                          <TableHead>Fecha y Hora Registro</TableHead>
                          <TableHead>Fecha y Hora Entrega</TableHead>
                          <TableHead>Fecha y Hora Conformidad</TableHead>
                          <TableHead>Usuario</TableHead>
                          <TableHead>Acciones</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredPrerreq.map((solicitud) => (
                          <TableRow key={solicitud.id} className={selectedItems.includes(solicitud.id) ? "bg-primary/10" : ""}>
                            <TableCell>{getEstadoBadge(solicitud.estado)}</TableCell>
                            <TableCell className="font-medium">{solicitud.prerrequerimientoId}</TableCell>
                            <TableCell>
                              <div className="font-medium">{solicitud.fecha}</div>
                              <div className="text-sm text-gray-500">{solicitud.hora}</div>
                            </TableCell>
                            <TableCell>
                              <div className="font-medium">{solicitud.fecha_entrega}</div>
                              <div className="text-sm text-gray-500">{solicitud.hora_entrega}</div>
                            </TableCell>
                            <TableCell>
                              <div className="font-medium">{solicitud.fecha_conformidad}</div>
                              <div className="text-sm text-gray-500">{solicitud.hora_conformidad}</div>
                            </TableCell>
                            <TableCell>{solicitud.usuario}</TableCell>
                            <TableCell>
                              <div className="flex gap-2">
                                <Button
                                  variant="outline"
                                  className={`h-8 w-10 p-1.5 border-green-600 text-green-600 hover:bg-green-50
                                    ${solicitud.estado !== "3" ? "opacity-40 cursor-not-allowed" : ""}`}
                                  disabled={solicitud.estado !== "3"}
                                  title="Brindar Conformidad"
                                  onClick={() => {
                                    if (solicitud.estado === "3") {
                                      setSolicitudSeleccionada(solicitud);
                                      setOpenModalConformidad(true);
                                    }
                                  }}
                                >
                                  <ClipboardCheck className="h-4 w-4" />
                                </Button>
                                <Button
                                  variant="outline"
                                  className="h-8 w-10 p-1.5 border-blue-600 text-blue-600 hover:bg-blue-50"
                                  title="Ver detalle"
                                  onClick={() => {
                                    setSolicitudSeleccionada(solicitud);
                                    setOpenModalDetalle(true);
                                  }}
                                >
                                  <Eye className="h-4 w-4" />
                                </Button>
                                <Button
                                  variant="outline"
                                  className={`h-8 w-10 p-1.5 border-yellow-600 text-yellow-600 hover:bg-yellow-50
                                    ${solicitud.estado !== "1" ? "opacity-40 cursor-not-allowed" : ""}`}
                                  disabled={solicitud.estado !== "1"}
                                  title="Editar"
                                >
                                  <Pencil className="h-4 w-4" />
                                </Button>
                                <Button
                                  variant="outline"
                                  className="h-8 w-10 p-1.5 border-purple-600 text-purple-600 hover:bg-purple-50"
                                  title="Imprimir"
                                >
                                  <Printer className="h-4 w-4" />
                                </Button>
                                <Button
                                  variant="outline"
                                  className={`h-8 w-10 p-1.5 border-red-600 text-red-600 hover:bg-red-50
                                    ${solicitud.estado !== "1" ? "opacity-40 cursor-not-allowed" : ""}`}
                                  disabled={solicitud.estado !== "1"}
                                  title="Eliminar"
                                  onClick={() => {
                                    if (solicitud.estado === "1") {
                                      setSolicitudSeleccionada(solicitud);
                                      setOpenModalEliminar(true);
                                    }
                                  }}
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>

                  {/* MODAL REGISTRO DE PRERREQUERIMIENTO */}
                  <Dialog open={openModalSolicitud}
                    onOpenChange={(open) => {
                      if (!open) {
                        resetModalRegPrerreq();
                      }
                      setOpenModalSolicitud(open);
                    }}
                  >
                    <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto" onInteractOutside={(e) => e.preventDefault()}>
                      <DialogHeader>
                        <DialogTitle>Nuevo Prerrequerimiento</DialogTitle>
                        <div className="flex justify-between items-center border border-gray-300 rounded-md p-4">
                          <div className="grid grid-cols-3 gap-4">
                            <div className="flex items-center gap-2">
                              <Label htmlFor="id" className="whitespace-nowrap text-sm">ID:</Label>
                              <Input id="id" value="00000006" disabled className="h-8 w-24" />
                            </div>
                            <div className="flex items-center gap-2">
                              <Label htmlFor="fecha" className="whitespace-nowrap text-sm">Fecha:</Label>
                              <Input id="fecha" value={fechaActual} disabled className="h-9 w-28" />
                            </div>
                            <div className="flex items-center gap-2">
                              <Label htmlFor="hora" className="whitespace-nowrap text-sm">Hora:</Label>
                              <Input id="hora" value={horaActual} disabled className="h-8 w-28" />
                            </div>
                          </div>
                        </div>
                      </DialogHeader>

                      {/* SOLO mostrar inicialmente Tipo de Prerrequerimiento */}
                      <div className="border border-gray-300 rounded-md p-4">
                        <h1 className="font-bold text-lg mb-4">Seleccione el tipo de Requerimiento</h1>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                          <div className="space-y-2">
                            <Select value={tipoPrerrequerimiento} onValueChange={(v) => setTipoPrerrequerimiento(v)}>
                              <SelectTrigger className="w-72">
                                <SelectValue placeholder="Seleccionar tipo de documento" />
                              </SelectTrigger>
                              <SelectContent>
                                {tiposPrerreq.map((t) => (
                                  // Aquí agrego clases para hover/focus para que las opciones se iluminen
                                  <SelectItem key={t.id} value={t.codigo} className="hover:bg-gray-100 focus:bg-gray-100">
                                    {t.nombre}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>

                          {/* Si quieres que algunos campos sean siempre visibles, muévelos aquí fuera de la condición */}
                        </div>
                      </div>

                      {/* Mostrar los demás campos solo después de seleccionar un tipo */}
                      {showCamposGenerales && (
                        <>
                          <div className="border border-gray-300 rounded-md p-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                              {isReqFarmacias && (
                                <div className="space-y-2">
                                  <Label>Área Solicitante:</Label>
                                  <Select>
                                    <SelectTrigger>
                                      <SelectValue placeholder="Seleccionar" />
                                    </SelectTrigger>
                                    <SelectContent>
                                      {areasSolicitantes.filter((c) => c.codigo !== "FL").map((c) => (
                                        <SelectItem key={c.id} value={c.codigo} className="hover:bg-gray-100 focus:bg-gray-100">
                                          {c.nombre}
                                        </SelectItem>
                                      ))}
                                    </SelectContent>
                                  </Select>
                                </div>
                              )}

                              {isReqLaboratorio && (
                                <div className="space-y-2">
                                  <Label>Área Solicitante:</Label>
                                  <Select value={areaSeleccionada} onValueChange={setAreaSeleccionada}>
                                    <SelectTrigger disabled>
                                      <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                      {areasSolicitantes.map((c) => (
                                        <SelectItem key={c.id} value={c.codigo} className="hover:bg-gray-100 focus:bg-gray-100">
                                          {c.nombre}
                                        </SelectItem>
                                      ))}
                                    </SelectContent>
                                  </Select>
                                </div>
                              )}

                              {isReqOxigeno && (
                                <div className="space-y-2">
                                  <Label>Área Solicitante:</Label>
                                  <Select>
                                    <SelectTrigger>
                                      <SelectValue placeholder="Seleccionar" />
                                    </SelectTrigger>
                                    <SelectContent>
                                      {areasSolicitantes.filter((c) => c.codigo !== "FL").map((c) => (
                                        <SelectItem key={c.id} value={c.codigo} className="hover:bg-gray-100 focus:bg-gray-100">
                                          {c.nombre}
                                        </SelectItem>
                                      ))}
                                    </SelectContent>
                                  </Select>
                                </div>
                              )}

                              {isReqFarmacias && (
                                <div className="space-y-2">
                                  <Label>Almacén Suministrador:</Label>
                                  <Input value={almGenSeleccionado} disabled />
                                </div>
                              )}

                              {isReqLaboratorio && (
                                <div className="space-y-2">
                                  <Label>Almacén Suministrador:</Label>
                                  <Input value={almServSeleccionado} disabled />
                                </div>
                              )}

                              {isReqOxigeno && (
                                <div className="space-y-2">
                                  <Label>Almacén Suministrador:</Label>
                                  <Input value={almGenSeleccionado} disabled />
                                </div>
                              )}

                              {isReqFarmacias && (
                                <div className="space-y-2">
                                  <Label>Producto:</Label>
                                  <Input
                                    value={producto}
                                    onChange={(e) => setProducto(e.target.value)}
                                  />
                                </div>
                              )}

                              {isReqLaboratorio && (
                                <div className="space-y-2">
                                  <Label>Producto:</Label>
                                  <Input
                                    value={producto}
                                    onChange={(e) => setProducto(e.target.value)}
                                  />
                                </div>
                              )}

                              {isReqOxigeno && (
                                <div className="space-y-2">
                                  <Label>Producto:</Label>
                                  <Input
                                    value="Oxígeno Medicinal (LT)"
                                    disabled
                                  />
                                </div>
                              )}

                              <div className="space-y-2">
                                <Label>Cantidad:</Label>
                                <Input
                                  type="number"
                                  value={cantidad}
                                  min="1"
                                  onChange={(e) => setCantidad(e.target.value)}
                                />
                              </div>
                            </div>

                            {/* BOTÓN AGREGAR */}
                            <div className="mt-4">
                              <Button
                                className="bg-green-600 hover:bg-green-700 text-white"
                              >
                                Agregar Producto
                              </Button>
                            </div>

                            {/* TABLA DE PRODUCTOS */}
                            <div className="mt-4 border rounded-md overflow-x-auto">
                              <Table>
                                <TableHeader>
                                  <TableRow>
                                    <TableHead>Producto</TableHead>
                                    <TableHead>Cantidad</TableHead>
                                    <TableHead>Acciones</TableHead>
                                  </TableRow>
                                </TableHeader>
                                <TableBody>
                                  <TableRow>
                                    <TableCell>Metamizol Sodico 1 G 2 ML</TableCell>
                                    <TableCell>2</TableCell>
                                    <TableCell>
                                      <Button
                                      >
                                        Eliminar
                                      </Button>
                                    </TableCell>
                                  </TableRow>
                                </TableBody>
                              </Table>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-1 gap-4 mt-6">
                              <div className="space-y-2">
                                <Label>Observación / Comentario:</Label>
                                <Input id="observacion" value={observacionNPR} onChange={(e) => setobservacionNPR(e.target.value)} />
                              </div>
                            </div>

                            {/* FOOTER */}
                            <DialogFooter className="mt-6">
                              <Button variant="outline" onClick={() => {
                                resetModalRegPrerreq();
                                setOpenModalSolicitud(false);
                              }}>
                                Cancelar
                              </Button>

                              <Button
                                onClick={() => {
                                  // Aquí guardarás la solicitud después
                                  setOpenModalSolicitud(false);
                                  setOpenModalExitoRegSol(true);
                                }}
                              >
                                Guardar Solicitud
                              </Button>
                            </DialogFooter>
                          </div>
                        </>
                      )}
                    </DialogContent>
                  </Dialog>

                  {/* MODAL DE EXITO DE REGISTRO DE PRERREQUERIMIENTO */}
                  <Dialog open={openModalExitoRegSol} onOpenChange={setOpenModalExitoRegSol}>
                    <DialogContent className="max-w-sm" onInteractOutside={(e) => e.preventDefault()}>
                      <DialogHeader>
                        {/*<DialogTitle>Conformidad realizada</DialogTitle>*/}
                        <DialogTitle className="flex flex-col items-center gap-3">
                          <CheckCircle className="h-16 w-16 text-green-600" />
                          <span>Prerrequerimiento registrado</span>
                        </DialogTitle>
                      </DialogHeader>

                      <p className="text-gray-700">
                        El prerrequerimiento ha sido registrado con éxito
                      </p>

                      <DialogFooter className="mt-4">
                        <Button
                          className="bg-blue-600 hover:bg-blue-700 text-white"
                          onClick={() => {
                            resetModalRegPrerreq();
                            setOpenModalExitoRegSol(false);
                          }}
                        >
                          Finalizar
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>

                  {/* MODAL BRINDAR CONFORMIDAD */}
                  <Dialog open={openModalConformidad} onOpenChange={setOpenModalConformidad}>
                    <DialogContent className="max-w-sm" onInteractOutside={(e) => e.preventDefault()}>
                      <DialogHeader>
                        <DialogTitle>Confirmar acción - ID {solicitudSeleccionada?.prerrequerimientoId}</DialogTitle>
                      </DialogHeader>

                      <p className="text-gray-700">
                        ¿Está seguro de que desea brindar conformidad a esta solicitud que le despacharon? <br />
                        <span className="font-semibold text-red-600">Esta acción no se puede deshacer.</span>
                      </p>

                      <DialogFooter className="mt-4">
                        <Button variant="outline" onClick={() => setOpenModalConformidad(false)}>
                          Cancelar
                        </Button>

                        <Button
                          className="bg-green-600 hover:bg-green-700 text-white"
                          onClick={() => {
                            // Aquí procesas la conformidad luego
                            console.log("Conformidad a ID:", solicitudSeleccionada);
                            setOpenModalConformidad(false);
                            setOpenModalExito(true);
                          }}
                        >
                          Confirmar
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>

                  {/* MODAL DE EXITO DE CONFORMIDAD */}
                  <Dialog open={openModalExito} onOpenChange={setOpenModalExito}>
                    <DialogContent className="max-w-sm" onInteractOutside={(e) => e.preventDefault()}>
                      <DialogHeader>
                        {/*<DialogTitle>Conformidad realizada</DialogTitle>*/}
                        <DialogTitle className="flex flex-col items-center gap-3">
                          <CheckCircle className="h-16 w-16 text-green-600" />
                          <span>Conformidad realizada</span>
                        </DialogTitle>
                      </DialogHeader>

                      <p className="text-gray-700">
                        La conformidad del prerrequerimiento
                        <span className="font-semibold">
                          {" "}{solicitudSeleccionada?.prerrequerimientoId}
                        </span>
                        {" "}se realizó con éxito.
                      </p>

                      <DialogFooter className="mt-4">
                        <Button
                          className="bg-blue-600 hover:bg-blue-700 text-white"
                          onClick={() => {
                            setOpenModalExito(false);
                          }}
                        >
                          Finalizar
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>

                  {/* MODAL ELIMINAR PRERREQUERIMIENTO */}
                  <Dialog open={openModalEliminar} onOpenChange={setOpenModalEliminar}>
                    <DialogContent className="max-w-sm" onInteractOutside={(e) => e.preventDefault()}>
                      <DialogHeader>
                        <DialogTitle>Eliminar Prerrequerimiento - ID {solicitudSeleccionada?.prerrequerimientoId}</DialogTitle>
                      </DialogHeader>

                      <p className="text-gray-700">
                        ¿Está seguro de que desea eliminar el prerrequerimiento que ha registrado? <br />
                        <span className="font-semibold text-red-600">Esta acción no se puede deshacer.</span>
                      </p>

                      <DialogFooter className="mt-4">
                        <Button variant="outline" onClick={() => setOpenModalEliminar(false)}>
                          Cancelar
                        </Button>

                        <Button
                          className="bg-green-600 hover:bg-green-700 text-white"
                          onClick={() => {
                            // Aquí eliminas el prerrequerimiento
                            console.log("Conformidad a ID:", solicitudSeleccionada);
                            setOpenModalEliminar(false);
                            setOpenModalExitoEliminar(true);
                          }}
                        >
                          Confirmar
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>

                  {/* MODAL DE EXITO DE ELIMINACION DE PRERREQUERIMIENTO */}
                  <Dialog open={openModalExitoEliminar} onOpenChange={setOpenModalExitoEliminar}>
                    <DialogContent className="max-w-sm" onInteractOutside={(e) => e.preventDefault()}>
                      <DialogHeader>
                        {/*<DialogTitle>Conformidad realizada</DialogTitle>*/}
                        <DialogTitle className="flex flex-col items-center gap-3">
                          <CheckCircle className="h-16 w-16 text-green-600" />
                          <span>Prerrequerimiento eliminado</span>
                        </DialogTitle>
                      </DialogHeader>

                      <p className="text-gray-700">
                        El prerrequerimiento
                        <span className="font-semibold">
                          {" "}{solicitudSeleccionada?.prerrequerimientoId}
                        </span>
                        {" "} ha sido eliminado con éxito.
                      </p>

                      <DialogFooter className="mt-4">
                        <Button
                          className="bg-blue-600 hover:bg-blue-700 text-white"
                          onClick={() => {
                            setOpenModalExitoEliminar(false);
                          }}
                        >
                          Finalizar
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>

                  {/* MODAL DE DETALLE DEL PRERREQUERIMIENTO */}
                  <Dialog open={openModalDetalle} onOpenChange={setOpenModalDetalle}>
                    <DialogContent
                      className="max-w-6xl max-h-[85vh] overflow-y-auto"
                      onInteractOutside={(e) => e.preventDefault()} // evita cerrar haciendo clic fuera
                    >
                      <DialogHeader>
                        <DialogTitle>
                          Detalle del Prerrequerimiento - {solicitudSeleccionada?.prerrequerimientoId}
                        </DialogTitle>
                        <DialogDescription>
                          Información completa del prerrequerimiento registrado por Farmacia (datos de prueba)
                        </DialogDescription>
                      </DialogHeader>

                      {solicitudSeleccionada && (
                        <div className="space-y-6 text-sm">

                          {/* === DATOS GENERALES === */}
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <Label>Estado: </Label>
                              {getEstadoBadge(solicitudSeleccionada.estado)}
                            </div>

                            <div>
                              <Label>Tipo de Requerimiento:</Label>
                              <Input disabled value={solicitudSeleccionada.tipoRequerimiento} />
                            </div>

                            <div>
                              <Label>Fecha Registro:</Label>
                              <Input
                                disabled
                                value={`${solicitudSeleccionada.fecha} ${solicitudSeleccionada.hora}`}
                              />
                            </div>

                            <div>
                              <Label>Usuario:</Label>
                              <Input disabled value={solicitudSeleccionada.usuario} />
                            </div>

                            <div>
                              <Label>Almacén Solicitante:</Label>
                              <Input disabled value={solicitudSeleccionada.almacenSolicitante} />
                            </div>
                          </div>

                          {/* === OBSERVACIÓN === */}
                          <div>
                            <Label>Observación:</Label>
                            <Textarea
                              disabled
                              value={detallePrerrequerimientoMock.observacion}
                            />
                          </div>

                          {/* === PRODUCTOS === */}
                          <div>
                            <Label className="mb-2 block">Detalle de productos</Label>

                            <Table>
                              <TableHeader>
                                <TableRow>
                                  <TableHead>Código</TableHead>
                                  <TableHead>Producto</TableHead>
                                  <TableHead>Cantidad</TableHead>
                                </TableRow>
                              </TableHeader>
                              <TableBody>
                                {detallePrerrequerimientoMock.productos.map((prod, index) => (
                                  <TableRow key={index}>
                                    <TableCell>{prod.codigo}</TableCell>
                                    <TableCell>{prod.nombre}</TableCell>
                                    <TableCell>{prod.cantidad}</TableCell>
                                  </TableRow>
                                ))}
                              </TableBody>
                            </Table>

                            <Button
                              variant="outline"
                              className="mt-4 border-blue-500 text-blue-600 hover:bg-blue-50 hover:text-blue-700"
                              onClick={() => setMostrarHistorial((prev) => !prev)}
                            >
                              <History size={16} />
                              {mostrarHistorial ? "Ocultar historial de cambios" : "Ver historial de cambios"}
                            </Button>

                            {mostrarHistorial && (
                              <div className="mt-6">
                                <h3 className="text-sm font-semibold mb-3">
                                  Historial de cambios
                                </h3>

                                <div className="space-y-2 max-h-64 overflow-y-auto">
                                  {historialCambiosMock.map((h) => (
                                    <div
                                      key={h.id}
                                      className={`p-3 rounded border text-sm ${h.accion === "AGREGAR PRODUCTO"
                                        ? "bg-green-50 border-green-300"
                                        : h.accion === "EDITAR CANTIDAD"
                                          ? "bg-blue-50 border-blue-300"
                                          : "bg-red-50 border-red-300"
                                        }`}
                                    >
                                      {h.accion === "AGREGAR PRODUCTO" && (
                                        <p>
                                          El día <strong>{h.fechaHora}</strong>, el usuario{" "}
                                          <strong>{h.usuario}</strong> agregó el producto{" "}
                                          <strong>{h.producto}</strong> por el siguiente motivo:{" "}
                                          <em>{h.motivo}</em>.
                                        </p>
                                      )}

                                      {h.accion === "EDITAR CANTIDAD" && (
                                        <p>
                                          El día <strong>{h.fechaHora}</strong>, el usuario{" "}
                                          <strong>{h.usuario}</strong> editó la cantidad del producto{" "}
                                          <strong>{h.producto}</strong> a{" "}
                                          <strong>{h.cantidad}</strong>.
                                        </p>
                                      )}

                                      {h.accion === "ELIMINAR PRODUCTO" && (
                                        <p>
                                          El día <strong>{h.fechaHora}</strong>, el usuario{" "}
                                          <strong>{h.usuario}</strong> eliminó el producto{" "}
                                          <strong>{h.producto}</strong> por el siguiente motivo:{" "}
                                          <em>{h.motivo}</em>.
                                        </p>
                                      )}
                                    </div>
                                  ))}

                                </div>
                              </div>
                            )}
                          </div>

                          <div className="flex justify-end">
                            <Button onClick={() => setOpenModalDetalle(false)}>
                              Cerrar
                            </Button>
                          </div>
                        </div>
                      )}
                    </DialogContent>
                  </Dialog>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="transferenciasInternas" className="w-full">
              <Card className="w-full">
                <CardContent>
                  {/* SUB-TABS DENTRO DEL TABS CONTENT */}
                  <Tabs defaultValue="distribucion" className="w-full mb-6 mt-6">
                    <TabsList className="bg-muted p-1 rounded-lg">
                      <TabsTrigger value="distribucion" className="px-4 py-2 rounded-md
                        data-[state=active]:bg-purple-600
                        data-[state=active]:text-white
                        data-[state=active]:shadow
                        transition-all"
                      >
                        Distribución
                      </TabsTrigger>
                      <TabsTrigger value="entreFarmacias" className="px-4 py-2 rounded-md
                        data-[state=active]:bg-purple-600
                        data-[state=active]:text-white
                        data-[state=active]:shadow
                        transition-all"
                        disabled={enDespacho}
                      >
                        Transferencias entre Farmacias
                      </TabsTrigger>
                      <TabsTrigger value="devoluciones" className="px-4 py-2 rounded-md
                        data-[state=active]:bg-purple-600
                        data-[state=active]:text-white
                        data-[state=active]:shadow
                        transition-all"
                        disabled={enDespacho}
                      >
                        Devoluciones
                      </TabsTrigger>
                    </TabsList>

                    {/* AVISO DE BLOQUEO */}
                    {enDespacho && (
                      <div className="mt-4 mb-4 rounded border border-yellow-300 bg-yellow-50 p-3 text-sm text-yellow-800">
                        Está atendiendo un prerrequerimiento.
                        <strong className="ml-1">
                          Finalice o cancele para continuar.
                        </strong>
                      </div>
                    )}

                    <TabsContent value="distribucion" className="w-full">
                      {vistaDistribucion === "lista" && (
                        <>
                          <CardHeader>
                            <CardTitle>Distribución</CardTitle>
                            <CardDescription>Atención de los prerrequerimientos de las farmacias </CardDescription>
                          </CardHeader>
                          <CardContent>
                            {/* Búsqueda y filtros a la izquierda. Botón de registro a la derecha */}
                            <div className="bg-white border border-[#9CD2D3]/40 rounded-xl px-6 py-4 flex items-end justify-between gap-6 shadow-sm mb-4">
                              <div className="flex items-end gap-4">
                                <div className="flex flex-col w-64">
                                  <Label htmlFor="buscar" className="mb-1">Buscar por:</Label>

                                  <div className="relative w-64">
                                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                                    <Input
                                      placeholder="ID Prerrequerimiento..."
                                      className="pl-8 h-10"
                                      value={searchDistrib}
                                      onChange={(e) => setSearchDistrib(e.target.value)}
                                    />
                                  </div>
                                </div>

                                <div className="flex flex-col">
                                  <Label htmlFor="fechaInicio" className="mb-1">Desde</Label>
                                  <Input
                                    id="fechaInicio"
                                    type="date"
                                    className="h-10 w-40"
                                    value={fechaInicioDistrib}
                                    onChange={(e) => setFechaInicioDistrib(e.target.value)}
                                  />
                                </div>

                                <div className="flex flex-col">
                                  <Label htmlFor="fechaFin" className="mb-1">Hasta</Label>
                                  <Input
                                    id="fechaFin"
                                    type="date"
                                    className="h-10 w-40"
                                    value={fechaFinDistrib}
                                    onChange={(e) => setFechaFinDistrib(e.target.value)}
                                  />
                                </div>
                              </div>

                              <div className="flex gap-2">
                                <Button variant="outline" className="gap-1 border-gray-700" onClick={limpiarFiltrosDistrib}>
                                  <Eraser className="h-4 w-4" strokeWidth={3} />
                                  Limpiar Filtros
                                </Button>
                              </div>
                            </div>

                            <div className="overflow-x-auto border border-gray-200 rounded-lg bg-white">
                              <Table>
                                <TableHeader>
                                  <TableRow className="bg-gray-50 border-b border-gray-200">
                                    <TableHead>Estado</TableHead>
                                    <TableHead>ID Prerrequerimiento</TableHead>
                                    <TableHead>Fecha y Hora de Registro</TableHead>
                                    <TableHead>Fecha y Hora de Entrega</TableHead>
                                    <TableHead>Fecha y Hora de Conformidad</TableHead>
                                    <TableHead>Usuario</TableHead>
                                    <TableHead>Acciones</TableHead>
                                  </TableRow>
                                </TableHeader>
                                <TableBody>
                                  {filteredDistrib.map((solicitud) => (
                                    <TableRow key={solicitud.id} className={selectedItems.includes(solicitud.id) ? "bg-primary/10" : ""}>
                                      <TableCell>{getEstadoBadge(solicitud.estado)}</TableCell>
                                      <TableCell className="font-medium">{solicitud.prerrequerimientoId}</TableCell>
                                      <TableCell>
                                        <div className="font-medium">{solicitud.fecha}</div>
                                        <div className="text-sm text-gray-500">{solicitud.hora}</div>
                                      </TableCell>
                                      <TableCell>
                                        <div className="font-medium">{solicitud.fecha_entrega}</div>
                                        <div className="text-sm text-gray-500">{solicitud.hora_entrega}</div>
                                      </TableCell>
                                      <TableCell>
                                        <div className="font-medium">{solicitud.fecha_conformidad}</div>
                                        <div className="text-sm text-gray-500">{solicitud.hora_conformidad}</div>
                                      </TableCell>
                                      <TableCell>{solicitud.usuario}</TableCell>
                                      <TableCell>
                                        <div className="flex gap-2">
                                          {/* PREPARAR PEDIDO – solo estado REGISTRADO */}
                                          {solicitud.estado === "1" && (
                                            <Button
                                              variant="outline"
                                              className="h-8 w-10 p-1.5 border-orange-600 text-orange-600 hover:bg-orange-50"
                                              title="Preparar pedido"
                                              onClick={() => {
                                                setSolicitudSeleccionada(solicitud);
                                                setOpenModalPreparar(true);
                                              }}
                                            >
                                              <PackageCheck className="h-4 w-4" />
                                            </Button>
                                          )}

                                          {/* DESPACHAR – solo estado EN PREPARACIÓN */}
                                          {solicitud.estado === "2" && (
                                            <Button
                                              variant="outline"
                                              className="h-8 w-10 p-1.5 border-green-600 text-green-600 hover:bg-green-50"
                                              title="Despachar"
                                              onClick={() => {
                                                setSolicitudSeleccionada(solicitud);
                                                setVistaDistribucion("despacho");
                                              }}
                                            >
                                              <MoveRight className="h-4 w-4" />
                                            </Button>
                                          )}
                                          <Button
                                            variant="outline"
                                            className="h-8 w-10 p-1.5 border-blue-600 text-blue-600 hover:bg-blue-50"
                                            title="Ver detalle"
                                            onClick={() => {
                                              setSolicitudSeleccionada(solicitud);
                                              setOpenModalDetalleDist(true);
                                            }}
                                          >
                                            <Eye className="h-4 w-4" />
                                          </Button>
                                          <Button
                                            variant="outline"
                                            className="h-8 w-10 p-1.5 border-purple-600 text-purple-600 hover:bg-purple-50"
                                            title="Imprimir"
                                          >
                                            <Printer className="h-4 w-4" />
                                          </Button>
                                        </div>
                                      </TableCell>
                                    </TableRow>
                                  ))}
                                </TableBody>
                              </Table>
                            </div>
                          </CardContent>
                        </>
                      )}

                      {vistaDistribucion === "despacho" && solicitudSeleccionada && (
                        <DespachoPrerrequerimiento
                          solicitud={solicitudSeleccionada}
                          detallesPrerreq={detallesPrerreq}
                          transaccDistrib={transaccDistrib}
                          onCancel={() => {
                            setVistaDistribucion("lista");
                            setSolicitudSeleccionada(null);
                          }}
                          onConfirm={() => {
                            setOpenModalConfDespacho(true);
                          }}
                        />
                      )}
                    </TabsContent>

                    <TabsContent value="entreFarmacias" className="w-full">
                      <CardHeader>
                        <CardTitle>Transferencias entre Farmacias</CardTitle>
                        <CardDescription>Realizar movimiento de items entre las farmacias</CardDescription>
                      </CardHeader>
                      <CardContent>
                        {/* Búsqueda y filtros a la izquierda. Botón de registro a la derecha */}
                        <div className="bg-white border border-[#9CD2D3]/40 rounded-xl px-6 py-4 flex items-end justify-between gap-6 shadow-sm mb-4">
                          <div className="flex items-end gap-4">
                            <div className="flex flex-col w-64">
                              <Label htmlFor="buscar" className="mb-1">Buscar por:</Label>

                              <div className="relative w-64">
                                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                                <Input
                                  placeholder="ID Transferencia..."
                                  className="pl-8 h-10"
                                  value={searchTransfer}
                                  onChange={(e) => setSearchTransfer(e.target.value)}
                                />
                              </div>
                            </div>

                            <div className="flex flex-col">
                              <Label htmlFor="fechaInicio" className="mb-1">Desde</Label>
                              <Input
                                id="fechaInicio"
                                type="date"
                                className="h-10 w-40"
                                value={fechaInicioTransfer}
                                onChange={(e) => setFechaInicioTransfer(e.target.value)}
                              />
                            </div>

                            <div className="flex flex-col">
                              <Label htmlFor="fechaFin" className="mb-1">Hasta</Label>
                              <Input
                                id="fechaFin"
                                type="date"
                                className="h-10 w-40"
                                value={fechaFinTransfer}
                                onChange={(e) => setFechaFinTransfer(e.target.value)}
                              />
                            </div>
                          </div>

                          <div className="flex gap-2">
                            <Button variant="outline" className="gap-1 border-gray-700" onClick={limpiarFiltrosTransfer}>
                              <Eraser className="h-4 w-4" strokeWidth={3} />
                              Limpiar Filtros
                            </Button>
                            <Button
                              className="bg-green-600 hover:bg-green-700 text-white gap-2 font-semibold"
                              onClick={() => setOpenModalTransferencia(true)}
                            >
                              <Plus className="h-4 w-4" strokeWidth={3} />
                              Nueva Transferencia
                            </Button>
                          </div>
                        </div>

                        <div className="overflow-x-auto border border-gray-200 rounded-lg bg-white">
                          <Table>
                            <TableHeader>
                              <TableRow className="bg-gray-50 border-b border-gray-200">
                                <TableHead>Estado</TableHead>
                                <TableHead>ID Transferencia</TableHead>
                                <TableHead>Fecha y Hora de Registro</TableHead>
                                <TableHead>Fecha y Hora de Procesamiento</TableHead>
                                <TableHead>Usuario</TableHead>
                                <TableHead>Acciones</TableHead>
                              </TableRow>
                            </TableHeader>
                            <TableBody>
                              {filteredTransfer.map((transferencia) => (
                                <TableRow key={transferencia.id} className={selectedItems.includes(transferencia.id) ? "bg-primary/10" : ""}>
                                  <TableCell>{getEstadoBadgeTransfer(transferencia.estado)}</TableCell>
                                  <TableCell className="font-medium">{transferencia.transferenciaId}</TableCell>
                                  <TableCell>
                                    <div className="font-medium">{transferencia.fechaReg}</div>
                                    <div className="text-sm text-gray-500">{transferencia.horaReg}</div>
                                  </TableCell>
                                  <TableCell>
                                    <div className="font-medium">{transferencia.fechaProc}</div>
                                    <div className="text-sm text-gray-500">{transferencia.horaProc}</div>
                                  </TableCell>
                                  <TableCell>{transferencia.usuario}</TableCell>
                                  <TableCell>
                                    <div className="flex space-x-2">
                                      <Button
                                        title="Procesar Transferencia"
                                        variant="outline"
                                        className={`h-8 w-10 p-1.5 border-green-600 text-green-600 hover:bg-green-50
                                          ${transferencia.estado !== "1" ? "opacity-40 cursor-not-allowed" : ""}`}
                                        disabled={transferencia.estado !== "1"}
                                        onClick={() => {
                                          if (transferencia.estado === "1") {
                                            setTransferenciaSelec(transferencia);
                                            setOpenModalProcesarTransfer(true);
                                          }
                                        }}
                                      >
                                        <CheckCircle className="w-3 h-3" />
                                      </Button>
                                      <Button
                                        title="Ver detalle"
                                        variant="outline"
                                        className="h-8 w-10 p-1.5 border-blue-600 text-blue-600 hover:bg-blue-50"
                                      >
                                        <Eye className="w-3 h-3" />
                                      </Button>
                                      <Button
                                        title="Editar"
                                        variant="outline"
                                        className={`h-8 w-10 p-1.5 border-yellow-600 text-yellow-600 hover:bg-yellow-50
                                          ${transferencia.estado !== "1" ? "opacity-40 cursor-not-allowed" : ""}`}
                                        disabled={transferencia.estado !== "1"}
                                      >
                                        <Edit className="w-3 h-3" />
                                      </Button>
                                      <Button
                                        title="Imprimir"
                                        variant="outline"
                                        className="h-8 w-10 p-1.5 border-purple-600 text-purple-600 hover:bg-purple-50"
                                      >
                                        <Printer className="w-3 h-3" />
                                      </Button>
                                      <Button
                                        title="Eliminar"
                                        variant="outline"
                                        className={`h-8 w-10 p-1.5 border-red-600 text-red-600 hover:bg-red-50
                                          ${transferencia.estado !== "1" ? "opacity-40 cursor-not-allowed" : ""}`}
                                        disabled={transferencia.estado !== "1"}
                                      >
                                        <Trash2 className="w-3 h-3" />
                                      </Button>
                                    </div>
                                  </TableCell>
                                </TableRow>
                              ))}
                            </TableBody>
                          </Table>
                        </div>
                      </CardContent>
                    </TabsContent>

                    <TabsContent value="devoluciones" className="w-full">
                      {vistaDevolucion === "lista" && (
                        <>
                          <CardHeader>
                            <CardTitle>Devoluciones</CardTitle>
                            <CardDescription>Retornar items a los almacenes</CardDescription>
                          </CardHeader>
                          <CardContent>
                            <div className="bg-white border border-[#9CD2D3]/40 rounded-xl px-6 py-4 flex items-end justify-between gap-6 shadow-sm mb-4">
                              <div className="flex items-end gap-4">
                                <div className="flex flex-col w-64">
                                  <Label htmlFor="buscar" className="mb-1">Buscar por:</Label>

                                  <div className="relative w-64">
                                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                                    <Input
                                      placeholder="ID Devolución..."
                                      className="pl-8 h-10"
                                      value={searchDevol}
                                      onChange={(e) => setSearchDevol(e.target.value)}
                                    />
                                  </div>
                                </div>

                                <div className="flex flex-col">
                                  <Label htmlFor="fechaInicio" className="mb-1">Desde</Label>
                                  <Input
                                    id="fechaInicio"
                                    type="date"
                                    className="h-10 w-40"
                                    value={fechaInicioDevol}
                                    onChange={(e) => setFechaInicioDevol(e.target.value)}
                                  />
                                </div>

                                <div className="flex flex-col">
                                  <Label htmlFor="fechaFin" className="mb-1">Hasta</Label>
                                  <Input
                                    id="fechaFin"
                                    type="date"
                                    className="h-10 w-40"
                                    value={fechaFinDevol}
                                    onChange={(e) => setFechaFinDevol(e.target.value)}
                                  />
                                </div>
                              </div>

                              <div className="flex gap-2">
                                <Button variant="outline" className="gap-1 border-gray-700" onClick={limpiarFiltrosDevol}>
                                  <Eraser className="h-4 w-4" strokeWidth={3} />
                                  Limpiar Filtros
                                </Button>
                                <Button
                                  className="bg-green-600 hover:bg-green-700 text-white gap-2 font-semibold"
                                  onClick={() => setVistaDevolucion("nueva")}
                                >
                                  <Plus className="h-4 w-4" strokeWidth={3} />
                                  Nueva Devolución
                                </Button>
                              </div>
                            </div>

                            <div className="overflow-x-auto border border-gray-200 rounded-lg bg-white">
                              <Table>
                                <TableHeader>
                                  <TableRow className="bg-gray-50 border-b border-gray-200">
                                    <TableHead>Estado</TableHead>
                                    <TableHead>ID Devolución</TableHead>
                                    <TableHead>Fecha y Hora de Registro</TableHead>
                                    <TableHead>Fecha y Hora de Procesamiento</TableHead>
                                    <TableHead>Usuario</TableHead>
                                    <TableHead>Acciones</TableHead>
                                  </TableRow>
                                </TableHeader>
                                <TableBody>
                                  {filteredDevol.map((devolucion) => (
                                    <TableRow key={devolucion.id} className={selectedItems.includes(devolucion.id) ? "bg-primary/10" : ""}>
                                      <TableCell>{getEstadoBadgeTransfer(devolucion.estado)}</TableCell>
                                      <TableCell className="font-medium">{devolucion.devolucionId}</TableCell>
                                      <TableCell>
                                        <div className="font-medium">{devolucion.fechaReg}</div>
                                        <div className="text-sm text-gray-500">{devolucion.horaReg}</div>
                                      </TableCell>
                                      <TableCell>
                                        <div className="font-medium">{devolucion.fechaProc}</div>
                                        <div className="text-sm text-gray-500">{devolucion.horaProc}</div>
                                      </TableCell>
                                      <TableCell>{devolucion.usuario}</TableCell>
                                      <TableCell>
                                        <div className="flex space-x-2">
                                          <Button
                                            title="Procesar Devolución"
                                            variant="outline"
                                            className={`h-8 w-10 p-1.5 border-green-600 text-green-600 hover:bg-green-50
                                          ${devolucion.estado !== "1" ? "opacity-40 cursor-not-allowed" : ""}`}
                                            disabled={devolucion.estado !== "1"}
                                            onClick={() => {
                                              if (devolucion.estado === "1") {
                                                setDevolucionSelec(devolucion);
                                                setOpenModalProcesarDevol(true);
                                              }
                                            }}
                                          >
                                            <CheckCircle className="w-3 h-3" />
                                          </Button>
                                          <Button
                                            title="Ver detalle"
                                            variant="outline"
                                            className="h-8 w-10 p-1.5 border-blue-600 text-blue-600 hover:bg-blue-50"
                                          >
                                            <Eye className="w-3 h-3" />
                                          </Button>
                                          <Button
                                            title="Editar"
                                            variant="outline"
                                            className={`h-8 w-10 p-1.5 border-yellow-600 text-yellow-600 hover:bg-yellow-50
                                          ${devolucion.estado !== "1" ? "opacity-40 cursor-not-allowed" : ""}`}
                                            disabled={devolucion.estado !== "1"}
                                          >
                                            <Edit className="w-3 h-3" />
                                          </Button>
                                          <Button
                                            title="Imprimir"
                                            variant="outline"
                                            className="h-8 w-10 p-1.5 border-purple-600 text-purple-600 hover:bg-purple-50"
                                          >
                                            <Printer className="w-3 h-3" />
                                          </Button>
                                          <Button
                                            title="Eliminar"
                                            variant="outline"
                                            className={`h-8 w-10 p-1.5 border-red-600 text-red-600 hover:bg-red-50
                                          ${devolucion.estado !== "1" ? "opacity-40 cursor-not-allowed" : ""}`}
                                            disabled={devolucion.estado !== "1"}
                                          >
                                            <Trash2 className="w-3 h-3" />
                                          </Button>
                                        </div>
                                      </TableCell>
                                    </TableRow>
                                  ))}
                                </TableBody>
                              </Table>
                            </div>
                          </CardContent>
                        </>
                      )}

                      {vistaDevolucion === "nueva" && (
                        <FormularioNuevaDevolucion
                          onCancel={() => setVistaDevolucion("lista")}
                          onSave={() => {
                            // guardar devolución
                            setVistaDevolucion("lista");
                          }}
                        />
                      )}

                    </TabsContent>
                  </Tabs>

                  {/* MODAL DESPACHAR PRERREQUERIMIENTO*/}
                  <Dialog open={openModalDespachar} onOpenChange={setOpenModalDespachar}>
                    <DialogContent className="max-w-6xl" onInteractOutside={(e) => e.preventDefault()}>
                      <DialogHeader>
                        <DialogTitle>Atención del prerrequerimiento</DialogTitle>
                      </DialogHeader>

                      <div className="grid grid-cols-3 gap-4 mt-4">
                        <div className="space-y-2">
                          <Label>ID Prerrequerimiento:</Label>
                          <Input value={solicitudSeleccionada?.prerrequerimientoId || ""} disabled />
                        </div>

                        <div className="space-y-2">
                          <Label>Tipo de Transacción:</Label>
                          <Input value={transaccDistrib} disabled />
                        </div>

                        <div className="space-y-2">
                          <Label>Tipo de prerrequerimiento:</Label>
                          <Input value={solicitudSeleccionada?.tipoRequerimiento || ""} disabled />
                        </div>
                      </div>

                      {/* TABLA DE PRODUCTOS */}
                      <div className="mt-4 border rounded-md overflow-x-auto">
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>Producto</TableHead>
                              <TableHead>Almacén Origen</TableHead>
                              <TableHead>Área Destino</TableHead>
                              <TableHead>Cantidad</TableHead>
                              <TableHead>Precio de Operación</TableHead>
                              <TableHead>Importe Total</TableHead>
                              <TableHead>Lote</TableHead>
                              <TableHead>Registro Sanitario</TableHead>
                              <TableHead>Fecha de vencimiento</TableHead>
                              <TableHead>Acciones</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {detallesPrerreq.map((detalle) => (
                              <TableRow key={detalle.id}>
                                <TableCell>{detalle.nombre}</TableCell>
                                <TableCell>{detalle.aAlmacen}</TableCell>
                                <TableCell>{detalle.deAlmacen}</TableCell>
                                <TableCell>{detalle.cantidad}</TableCell>
                                <TableCell>{detalle.precio}</TableCell>
                                <TableCell>{detalle.importe}</TableCell>
                                <TableCell>{detalle.lote}</TableCell>
                                <TableCell>{detalle.regSanitario}</TableCell>
                                <TableCell>{detalle.fecha_vcto}</TableCell>
                                <TableCell>
                                  <Button
                                    title="Eliminar"
                                    variant="outline"
                                  >
                                    <Trash2 className="w-3 h-3" />
                                  </Button>
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-1 gap-4 mt-4">
                        <div className="space-y-2">
                          <Label>Observación / Comentario:</Label>
                          <Input id="observacion" className="border border-gray-700" />
                        </div>
                      </div>

                      <DialogFooter className="mt-4">
                        <Button variant="outline" onClick={() => setOpenModalDespachar(false)}>
                          Cancelar
                        </Button>

                        <Button
                          onClick={() => {
                            // Aquí guardarás la solicitud después
                            setOpenModalConfDespacho(true);
                          }}
                        >
                          Despachar
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>

                  {/* MODAL DE DETALLE DEL PRERREQUERIMIENTO */}
                  <Dialog open={openModalDetalleDist} onOpenChange={setOpenModalDetalleDist}>
                    <DialogContent
                      className="max-w-6xl max-h-[85vh] overflow-y-auto"
                      onInteractOutside={(e) => e.preventDefault()} // evita cerrar haciendo clic fuera
                    >
                      <DialogHeader>
                        <DialogTitle>
                          Detalle del Prerrequerimiento - {solicitudSeleccionada?.prerrequerimientoId}
                        </DialogTitle>
                        <DialogDescription>
                          Información completa del prerrequerimiento registrado por Farmacia (datos de prueba)
                        </DialogDescription>
                      </DialogHeader>

                      {solicitudSeleccionada && (
                        <div className="space-y-6 text-sm">

                          {/* === DATOS GENERALES === */}
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <Label>Estado: </Label>
                              {getEstadoBadge(solicitudSeleccionada.estado)}
                            </div>

                            <div>
                              <Label>Tipo de Requerimiento:</Label>
                              <Input disabled value={solicitudSeleccionada.tipoRequerimiento} />
                            </div>

                            <div>
                              <Label>Fecha Registro:</Label>
                              <Input
                                disabled
                                value={`${solicitudSeleccionada.fecha} ${solicitudSeleccionada.hora}`}
                              />
                            </div>

                            <div>
                              <Label>Usuario:</Label>
                              <Input disabled value={solicitudSeleccionada.usuario} />
                            </div>

                            <div>
                              <Label>Almacén Solicitante:</Label>
                              <Input disabled value={solicitudSeleccionada.almacenSolicitante} />
                            </div>
                          </div>

                          {/* === OBSERVACIÓN === */}
                          <div>
                            <Label>Observación:</Label>
                            <Textarea
                              disabled
                              value={detallePrerrequerimientoMock.observacion}
                            />
                          </div>

                          {/* === PRODUCTOS === */}
                          <div>
                            <Label className="mb-2 block">Detalle de productos</Label>

                            <Table>
                              <TableHeader>
                                <TableRow>
                                  <TableHead>Código</TableHead>
                                  <TableHead>Producto</TableHead>
                                  <TableHead>Cantidad</TableHead>
                                </TableRow>
                              </TableHeader>
                              <TableBody>
                                {detallePrerrequerimientoMock.productos.map((prod, index) => (
                                  <TableRow key={index}>
                                    <TableCell>{prod.codigo}</TableCell>
                                    <TableCell>{prod.nombre}</TableCell>
                                    <TableCell>{prod.cantidad}</TableCell>
                                  </TableRow>
                                ))}
                              </TableBody>
                            </Table>
                          </div>

                          <div className="flex justify-end">
                            <Button onClick={() => setOpenModalDetalleDist(false)}>
                              Cerrar
                            </Button>
                          </div>
                        </div>
                      )}
                    </DialogContent>
                  </Dialog>

                  {/* MODAL CONSULTAR CONFIRMACION DE DESPACHO */}
                  <Dialog open={openModalConfDespacho} onOpenChange={setOpenModalConfDespacho}>
                    <DialogContent className="max-w-sm" onInteractOutside={(e) => e.preventDefault()}>
                      <DialogHeader>
                        <DialogTitle>Confirmar despacho</DialogTitle>
                      </DialogHeader>

                      <p className="text-gray-700">
                        ¿Está seguro de que desea confirmar el despacho del prerrequerimiento {solicitudSeleccionada?.prerrequerimientoId} ?<br />
                        <span className="font-semibold text-red-600">Esta acción no se puede deshacer.</span>
                      </p>

                      <DialogFooter className="mt-4">
                        <Button variant="outline" onClick={() => setOpenModalConfDespacho(false)}>
                          Cancelar
                        </Button>

                        <Button
                          className="bg-green-600 hover:bg-green-700 text-white"
                          onClick={() => {
                            // Aquí procesas la conformidad luego
                            console.log("Conformidad a ID:", solicitudSeleccionada);
                            setOpenModalConfDespacho(false);
                            setOpenModalDespachar(false);
                            setOpenModalExitoDespacho(true);
                          }}
                        >
                          Confirmar
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>

                  {/* MODAL DE EXITO DEL DESPACHO DEL PRERREQUERIMIENTO */}
                  <Dialog open={openModalExitoDespacho} onOpenChange={setOpenModalExitoDespacho}>
                    <DialogContent className="max-w-sm" onInteractOutside={(e) => e.preventDefault()}>
                      <DialogHeader>
                        {/*<DialogTitle>Conformidad realizada</DialogTitle>*/}
                        <DialogTitle className="flex flex-col items-center gap-3">
                          <CheckCircle className="h-16 w-16 text-green-600" />
                          <span>Despacho realizado</span>
                        </DialogTitle>
                      </DialogHeader>

                      <p className="text-gray-700">
                        Se ha realizado el despacho del prerrequerimiento
                        <span className="font-semibold">
                          {" "}{solicitudSeleccionada?.prerrequerimientoId}
                        </span>
                        {" "}con éxito.
                      </p>

                      <DialogFooter className="mt-4">
                        <Button
                          className="bg-blue-600 hover:bg-blue-700 text-white"
                          onClick={() => {
                            setOpenModalExitoDespacho(false);
                            setVistaDistribucion("lista");
                            setSolicitudSeleccionada(null);
                          }}
                        >
                          Finalizar
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>

                  {/* MODAL DE REGISTRO DE TRANSFERENCIA */}
                  <Dialog open={openModalTransferencia}
                    onOpenChange={(open) => {
                      if (!open) {
                        resetModalTransfInt();
                      }
                      setOpenModalTransferencia(open);
                    }}
                  >
                    <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto" onInteractOutside={(e) => e.preventDefault()}>
                      <DialogHeader>
                        <DialogTitle>Nueva Transferencia Interna</DialogTitle>
                        <div className="flex justify-between items-center border border-gray-300 rounded-md p-4">
                          <div className="grid grid-cols-3 gap-4">
                            <div className="flex items-center gap-2">
                              <Label htmlFor="id" className="whitespace-nowrap text-sm">ID:</Label>
                              <Input id="id" value="00000004" disabled className="h-8 w-24" />
                            </div>
                            <div className="flex items-center gap-2">
                              <Label htmlFor="fecha" className="whitespace-nowrap text-sm">Fecha:</Label>
                              <Input id="fecha" value={fechaActualTransfer} disabled className="h-9 w-28" />
                            </div>
                            <div className="flex items-center gap-2">
                              <Label htmlFor="hora" className="whitespace-nowrap text-sm">Hora:</Label>
                              <Input id="hora" value={horaActualTransfer} disabled className="h-8 w-28" />
                            </div>
                          </div>
                        </div>
                      </DialogHeader>

                      {/* SOLO mostrar inicialmente Tipo de Transferencia */}
                      <div className="border border-gray-300 rounded-md p-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                          <div className="space-y-2">
                            <Label>Farmacia Origen:</Label>
                            <Select>
                              <SelectTrigger>
                                <SelectValue placeholder="Seleccionar" />
                              </SelectTrigger>
                              <SelectContent>
                                {farmOrigen.map((c) => (
                                  <SelectItem key={c.id} value={c.codigo} className="hover:bg-gray-100 focus:bg-gray-100">
                                    {c.nombre}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>

                          <div className="space-y-2">
                            <Label>Farmacia Destino:</Label>
                            <Select>
                              <SelectTrigger>
                                <SelectValue placeholder="Seleccionar" />
                              </SelectTrigger>
                              <SelectContent>
                                {farmDestino.map((c) => (
                                  <SelectItem key={c.id} value={c.codigo} className="hover:bg-gray-100 focus:bg-gray-100">
                                    {c.nombre}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-1 gap-4 mt-2">
                          <div className="space-y-2">
                            <Label>Producto:</Label>
                            <Input />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-2">
                          <div className="space-y-2">
                            <Label>Cantidad:</Label>
                            <Input
                              type="number"
                              value={cantidad}
                              min="1"
                              onChange={(e) => setCantidad(e.target.value)}
                            />
                          </div>

                          <div className="space-y-2">
                            <Label>Precio de Operación:</Label>
                            <Input value="2.7" disabled />
                          </div>

                          <div className="space-y-2">
                            <Label>Importe Total:</Label>
                            <Input value="40.5" disabled />
                          </div>

                          <div className="space-y-2">
                            <Label>Lote:</Label>
                            <Input value="PT14202" disabled />
                          </div>

                          <div className="space-y-2">
                            <Label>Registro sanitario:</Label>
                            <Input value="EE-11024" disabled />
                          </div>

                          <div className="space-y-2">
                            <Label>Fecha de vencimiento:</Label>
                            <Input value="01/08/2027" disabled />
                          </div>
                        </div>

                        {/* BOTÓN AGREGAR */}
                        <div className="mt-4">
                          <Button
                            className="bg-green-600 hover:bg-green-700 text-white"
                          >
                            Agregar Producto
                          </Button>
                        </div>

                        {/* TABLA DE PRODUCTOS */}
                        <div className="mt-4 border rounded-md overflow-x-auto">
                          <Table>
                            <TableHeader>
                              <TableRow>
                                <TableHead>Producto</TableHead>
                                <TableHead>Cantidad</TableHead>
                                <TableHead>Acciones</TableHead>
                              </TableRow>
                            </TableHeader>
                            <TableBody>
                              <TableRow>
                                <TableCell>Metamizol Sodico 1 G 2 ML</TableCell>
                                <TableCell>2</TableCell>
                                <TableCell>
                                  <Button
                                  >
                                    Eliminar
                                  </Button>
                                </TableCell>
                              </TableRow>
                            </TableBody>
                          </Table>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-1 gap-4 mt-6">
                          <div className="space-y-2">
                            <Label>Observación / Comentario:</Label>
                            <Input id="observacion" />
                          </div>
                        </div>

                        {/* FOOTER */}
                        <DialogFooter className="mt-6">
                          <Button variant="outline" onClick={() => {
                            resetModalTransfInt();
                            setOpenModalTransferencia(false);
                          }}>
                            Cancelar
                          </Button>

                          <Button
                            onClick={() => {
                              // Aquí guardarás la solicitud después
                              setOpenModalTransferencia(false);
                              setOpenModalExitoRegTransfer(true);
                            }}
                          >
                            Guardar Transferencia
                          </Button>
                        </DialogFooter>
                      </div>
                    </DialogContent>
                  </Dialog>

                  {/* MODAL DE EXITO DE REGISTRO DE PRERREQUERIMIENTO */}
                  <Dialog open={openModalExitoRegTransfer} onOpenChange={setOpenModalExitoRegTransfer}>
                    <DialogContent className="max-w-sm" onInteractOutside={(e) => e.preventDefault()}>
                      <DialogHeader>
                        {/*<DialogTitle>Conformidad realizada</DialogTitle>*/}
                        <DialogTitle className="flex flex-col items-center gap-3">
                          <CheckCircle className="h-16 w-16 text-green-600" />
                          <span>Transferencia registrada</span>
                        </DialogTitle>
                      </DialogHeader>

                      <p className="text-gray-700">
                        La transferencia ha sido registrada con éxito
                      </p>

                      <DialogFooter className="mt-4">
                        <Button
                          className="bg-blue-600 hover:bg-blue-700 text-white"
                          onClick={() => {
                            setOpenModalExitoRegTransfer(false);
                            resetModalTransfInt();
                          }}
                        >
                          Finalizar
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>

                  {/* MODAL PROCESAR TRANSFERENCIA INTERNA */}
                  <Dialog open={openModalProcesarTransfer} onOpenChange={setOpenModalProcesarTransfer}>
                    <DialogContent className="max-w-sm" onInteractOutside={(e) => e.preventDefault()}>
                      <DialogHeader>
                        <DialogTitle>Confirmar acción - ID {transferenciaSelec?.transferenciaId}</DialogTitle>
                      </DialogHeader>

                      <p className="text-gray-700">
                        ¿Está seguro de que desea procesar la transferencia que ha registrado? <br />
                        <span className="font-semibold text-red-600">Esta acción no se puede deshacer.</span>
                      </p>

                      <DialogFooter className="mt-4">
                        <Button variant="outline" onClick={() => setOpenModalProcesarTransfer(false)}>
                          Cancelar
                        </Button>

                        <Button
                          className="bg-green-600 hover:bg-green-700 text-white"
                          onClick={() => {
                            // Aquí procesas la conformidad luego
                            console.log("Conformidad a ID:", transferenciaSelec);
                            setOpenModalProcesarTransfer(false);
                            setOpenModalExitoProcTransfer(true);
                          }}
                        >
                          Confirmar
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>

                  {/* MODAL DE EXITO DE PROCESAR TRANSFERENCIA INTERNA */}
                  <Dialog open={openModalExitoProcTransfer} onOpenChange={setOpenModalExitoProcTransfer}>
                    <DialogContent className="max-w-sm" onInteractOutside={(e) => e.preventDefault()}>
                      <DialogHeader>
                        {/*<DialogTitle>Conformidad realizada</DialogTitle>*/}
                        <DialogTitle className="flex flex-col items-center gap-3">
                          <CheckCircle className="h-16 w-16 text-green-600" />
                          <span>Transferencia procesada</span>
                        </DialogTitle>
                      </DialogHeader>

                      <p className="text-gray-700">
                        La transferencia
                        <span className="font-semibold">
                          {" "}{transferenciaSelec?.transferenciaId}
                        </span>
                        {" "}se procesó con éxito.
                      </p>

                      <DialogFooter className="mt-4">
                        <Button
                          className="bg-blue-600 hover:bg-blue-700 text-white"
                          onClick={() => {
                            setOpenModalExitoProcTransfer(false);
                          }}
                        >
                          Finalizar
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>

                  {/* MODAL REGISTRAR NUEVA DEVOLUCIÓN */}
                  <Dialog
                    open={openModalNuevaDevolucion}
                    onOpenChange={setOpenModalNuevaDevolucion}
                  >
                    <DialogContent className="max-w-7xl max-h-[90vh] overflow-y-auto" onInteractOutside={(e) => e.preventDefault()}>
                      <DialogHeader>
                        <DialogTitle>Registrar Devolución</DialogTitle>
                        <div className="flex justify-between items-center border border-gray-300 rounded-md p-4">
                          <div className="grid grid-cols-3 gap-4">
                            <div className="flex items-center gap-2">
                              <Label htmlFor="id" className="whitespace-nowrap text-sm">ID:</Label>
                              <Input id="id" value="00000004" disabled className="h-8 w-24" />
                            </div>
                            <div className="flex items-center gap-2">
                              <Label htmlFor="fecha" className="whitespace-nowrap text-sm">Fecha:</Label>
                              <Input id="fecha" value={fechaActualTransfer} disabled className="h-9 w-28" />
                            </div>
                            <div className="flex items-center gap-2">
                              <Label htmlFor="hora" className="whitespace-nowrap text-sm">Hora:</Label>
                              <Input id="hora" value={horaActualTransfer} disabled className="h-8 w-28" />
                            </div>
                          </div>
                        </div>
                      </DialogHeader>

                      <div className="border border-gray-300 rounded-md p-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                          <div className="space-y-2">
                            <Label>Farmacia Origen:</Label>
                            <Select>
                              <SelectTrigger>
                                <SelectValue placeholder="Seleccionar" />
                              </SelectTrigger>
                              <SelectContent>
                                {farmOrigen.map((c) => (
                                  <SelectItem key={c.id} value={c.codigo} className="hover:bg-gray-100 focus:bg-gray-100">
                                    {c.nombre}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>

                          <div className="space-y-2">
                            <Label>Almacén Destino:</Label>
                            <Input value="Almacén General" disabled />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-1 gap-4 mt-2">
                          <div className="space-y-2">
                            <Label>Producto:</Label>
                            <Input />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-2">
                          <div className="space-y-2">
                            <Label>Cantidad:</Label>
                            <Input
                              type="number"
                              value={cantidad}
                              min="1"
                              onChange={(e) => setCantidad(e.target.value)}
                            />
                          </div>

                          <div className="space-y-2">
                            <Label>Precio de Operación:</Label>
                            <Input value="2.7" disabled />
                          </div>

                          <div className="space-y-2">
                            <Label>Importe Total:</Label>
                            <Input value="40.5" disabled />
                          </div>

                          <div className="space-y-2">
                            <Label>Lote:</Label>
                            <Input value="PT14202" disabled />
                          </div>

                          <div className="space-y-2">
                            <Label>Registro sanitario:</Label>
                            <Input value="EE-11024" disabled />
                          </div>

                          <div className="space-y-2">
                            <Label>Fecha de vencimiento:</Label>
                            <Input value="01/08/2027" disabled />
                          </div>
                        </div>

                        {/* BOTÓN AGREGAR */}
                        <div className="mt-4">
                          <Button
                            className="bg-green-600 hover:bg-green-700 text-white"
                          >
                            Agregar Producto
                          </Button>
                        </div>

                        {/* TABLA DE PRODUCTOS */}
                        <div className="mt-4 border rounded-md overflow-x-auto">
                          <Table>
                            <TableHeader>
                              <TableRow>
                                <TableHead>Producto</TableHead>
                                <TableHead>Cantidad</TableHead>
                                <TableHead>Precio de Operación</TableHead>
                                <TableHead>Importe Total</TableHead>
                                <TableHead>Lote</TableHead>
                                <TableHead>Registro Sanitario</TableHead>
                                <TableHead>Fecha de vencimiento</TableHead>
                                <TableHead>Acciones</TableHead>
                              </TableRow>
                            </TableHeader>
                            <TableBody>
                              <TableRow>
                                <TableCell>Metamizol Sodico 1 G 2 ML</TableCell>
                                <TableCell>2</TableCell>
                                <TableCell></TableCell>
                                <TableCell></TableCell>
                                <TableCell></TableCell>
                                <TableCell></TableCell>
                                <TableCell></TableCell>
                                <TableCell>
                                  <Button
                                  >
                                    Eliminar
                                  </Button>
                                </TableCell>
                              </TableRow>
                            </TableBody>
                          </Table>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-1 gap-4 mt-6">
                          <div className="space-y-2">
                            <Label>Observación / Comentario:</Label>
                            <Input id="observacion" />
                          </div>
                        </div>
                      </div>

                      <DialogFooter className="mt-4">
                        <Button
                          variant="outline"
                          onClick={() => setOpenModalNuevaDevolucion(false)}
                        >
                          Cancelar
                        </Button>

                        <Button
                          onClick={() => {
                            // Aquí luego conectas backend
                            console.log("Registrar devolución");

                            setOpenModalNuevaDevolucion(false);
                            setOpenModalExitoDevolucion(true);
                          }}
                        >
                          Guardar Devolución
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>


                  {/* MODAL ÉXITO DEVOLUCIÓN */}
                  <Dialog
                    open={openModalExitoDevolucion}
                    onOpenChange={setOpenModalExitoDevolucion}
                  >
                    <DialogContent className="max-w-sm">
                      <DialogHeader>
                        <DialogTitle className="flex flex-col items-center gap-3 text-green-600">
                          <CheckCircle className="w-14 h-14" />
                          Devolución registrada
                        </DialogTitle>
                      </DialogHeader>

                      <p className="text-center text-gray-700">
                        La devolución se registró correctamente.
                      </p>

                      <DialogFooter className="mt-4">
                        <Button
                          className="bg-green-600 hover:bg-green-700 text-white"
                          onClick={() => setOpenModalExitoDevolucion(false)}
                        >
                          Finalizar
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>

                  {/* MODAL PROCESAR DEVOLUCION */}
                  <Dialog open={openModalProcesarDevol} onOpenChange={setOpenModalProcesarDevol}>
                    <DialogContent className="max-w-sm" onInteractOutside={(e) => e.preventDefault()}>
                      <DialogHeader>
                        <DialogTitle>Confirmar acción - ID {devolucionSelec?.devolucionId}</DialogTitle>
                      </DialogHeader>

                      <p className="text-gray-700">
                        ¿Está seguro de que desea procesar la devolución que ha registrado? <br />
                        <span className="font-semibold text-red-600">Esta acción no se puede deshacer.</span>
                      </p>

                      <DialogFooter className="mt-4">
                        <Button variant="outline" onClick={() => setOpenModalProcesarDevol(false)}>
                          Cancelar
                        </Button>

                        <Button
                          className="bg-green-600 hover:bg-green-700 text-white"
                          onClick={() => {
                            // Aquí procesas la conformidad luego
                            console.log("Conformidad a ID:", devolucionSelec);
                            setOpenModalProcesarDevol(false);
                            setOpenModalExitoProcDevol(true);
                          }}
                        >
                          Confirmar
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>

                  {/* MODAL DE EXITO DE PROCESAR DEVOLUCION */}
                  <Dialog open={openModalExitoProcDevol} onOpenChange={setOpenModalExitoProcDevol}>
                    <DialogContent className="max-w-sm" onInteractOutside={(e) => e.preventDefault()}>
                      <DialogHeader>
                        <DialogTitle className="flex flex-col items-center gap-3">
                          <CheckCircle className="h-16 w-16 text-green-600" />
                          <span>Devolución procesada</span>
                        </DialogTitle>
                      </DialogHeader>

                      <p className="text-gray-700">
                        La devolución
                        <span className="font-semibold">
                          {" "}{transferenciaSelec?.transferenciaId}
                        </span>
                        {" "}se procesó con éxito.
                      </p>

                      <DialogFooter className="mt-4">
                        <Button
                          className="bg-blue-600 hover:bg-blue-700 text-white"
                          onClick={() => {
                            setOpenModalExitoProcDevol(false);
                          }}
                        >
                          Finalizar
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>

                  {/* MODAL DE CONFIRMACIÓN DE PREPARACIÓN DE PEDIDO */}
                  <Dialog open={openModalPreparar} onOpenChange={setOpenModalPreparar}>
                    <DialogContent className="max-w-sm" onInteractOutside={(e) => e.preventDefault()}>
                      <DialogHeader>
                        <DialogTitle>Confirmar preparación</DialogTitle>
                      </DialogHeader>

                      <p className="text-gray-700">
                        Al realizar esta acción, se asignarán automáticamente los lotes a cada producto dentro del prerrequerimiento <br />
                        <br />
                        ¿Está seguro de que desea preparar el prerrequerimiento
                        <strong> {solicitudSeleccionada?.prerrequerimientoId}</strong>? <br />
                        <span className="font-semibold text-red-600">Esta acción no se puede deshacer.</span>
                      </p>

                      <DialogFooter className="mt-4">
                        <Button variant="outline" onClick={() => setOpenModalPreparar(false)}>
                          Cancelar
                        </Button>

                        <Button
                          className="bg-green-600 hover:bg-green-700 text-white"
                          onClick={() => {
                            setOpenModalPreparar(false);
                            setOpenModalExitoPreparar(true);

                            // 👉 Aquí luego podrás cambiar el estado a "2"
                            // cuando conectes backend
                          }}
                        >
                          Confirmar
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>

                  {/* MODAL DE ÉXITO DE PREPARACIÓN REALIZADA */}
                  <Dialog open={openModalExitoPreparar} onOpenChange={setOpenModalExitoPreparar}>
                    <DialogContent className="max-w-sm" onInteractOutside={(e) => e.preventDefault()}>
                      <DialogHeader>
                        <DialogTitle className="flex flex-col items-center gap-3">
                          <CheckCircle className="h-16 w-16 text-green-600" />
                          <span>Preparación realizada</span>
                        </DialogTitle>
                      </DialogHeader>

                      <p className="text-gray-700">
                        La preparación del prerrequerimiento se realizó con éxito. <br />
                        <br />
                        Los lotes han sido asignados a cada producto de forma satisfactoria.
                      </p>

                      <DialogFooter className="mt-4">
                        <Button
                          className="bg-blue-600 hover:bg-blue-700 text-white"
                          onClick={() => {
                            setOpenModalExitoPreparar(false);
                          }}
                        >
                          Finalizar
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>


                </CardContent>
              </Card>
            </TabsContent>
          </div>
        </div>
      </Tabs>
    </div>
  )
}

