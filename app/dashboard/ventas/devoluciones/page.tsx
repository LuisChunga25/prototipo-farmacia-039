"use client"

import Link from "next/link"
import React, { use, useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent } from "@/components/ui/card"
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
  Eraser,
  Plus,
  Edit,
  Eye,
  CheckCircle,
  X,
  History,
  FileText,
  RefreshCcw,
  CirclePlus,
  User,
  Stethoscope,
  HelpCircle,
  BadgeCheck,
  ClipboardCheck,
  AlertTriangle,
  CheckCircleIcon,
  ClipboardList,
  FileSearch,

} from "lucide-react"
import { useRouter } from "next/navigation"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"

// Define la interfaz
interface KardexItem {
  codItem: string;
  nombre: string;
  cantidad: number;
  precio: string;
  importe: string;
}

interface ProformaKardex {
  proforma: string;
  fecha: string;
  usuario: string;
  items: KardexItem[];
}

// DATOS DE EJEMPLO PARA LA TABLA
const devolucionesData = [
  {
    id: 1,
    estado: "1",
    ingresoId: "26013272",
    documentoProforma: "1726149898",
    nombrePaciente: "MANRIQUE RODRIGUEZ DIJEIM SOLUN",
    numPaciente: "2008112233",
    historiaClinica: "72000870",
    tipoTransaccion: "IDE",
    nombreTransaccion: "Ingreso por Devolución",
    fecha: "01/09/2026",
    hora: "11:26:15",
    fecha_proceso: "01/09/2026",
    hora_proceso: "11:27:28",
    nombreAlmacen: "CONSULTORIOS EXTERNOS",
    usuario: "10170704",
    nombreUsuario: "LAURA HUAMAN MIRTA",
    motivo: "OTROS",
    observacion: "POR ERROR DE DIGITACION SE HACE DEVOLUCION",
    productos: [
      {
        item: 170790,
        nombreProd: "GUANTE QUIRURG. N° 7 1/2",
        presentacion: "PAR",
        cantidad: 2,
        precio: "1.87",
        lote: "LTGUAN1111",
        fechaVenc: "31/10/2026",
      },
      {
        item: 172556,
        nombreProd: "AGUA DESTILADA PARA INYECCION 1 L (S)",
        presentacion: "INY",
        cantidad: 3,
        precio: "7.86",
        lote: "LTAGUAD1111",
        fechaVenc: "31/12/2026",
      },
    ],
  },
  {
    id: 2,
    estado: "1",
    ingresoId: "26013271",
    documentoProforma: "1726149868",
    nombrePaciente: "URIBE CARLIN CARLOS ANTONIO",
    numPaciente: "2008445566",
    historiaClinica: "48088772",
    tipoTransaccion: "IDE",
    nombreTransaccion: "Ingreso por Devolución",
    fecha: "01/09/2026",
    hora: "11:12:07",
    fecha_proceso: "01/09/2026",
    hora_proceso: "11:13:15",
    nombreAlmacen: "CONSULTORIOS EXTERNOS",
    usuario: "10170704",
    nombreUsuario: "LAURA HUAMAN MIRTA",
    motivo: "OTROS",
    observacion: "POR ERROR DE DIGITACION SE HACE DEVOLUCION",
    productos: [
      {
        item: 170790,
        nombreProd: "GUANTE QUIRURG. N° 7 1/2",
        presentacion: "PAR",
        cantidad: 1,
        precio: "1.87",
        lote: "LTGUAN1111",
        fechaVenc: "31/10/2026",
      },
      {
        item: 172556,
        nombreProd: "AGUA DESTILADA PARA INYECCION 1 L (S)",
        presentacion: "INY",
        cantidad: 1,
        precio: "7.86",
        lote: "LTAGUAD1111",
        fechaVenc: "31/12/2026",
      },
    ],
  },
  {
    id: 3,
    estado: "1",
    ingresoId: "26013270",
    documentoProforma: "1726149858",
    nombrePaciente: "CHUNGA HUAYLINOS LUIS DIEGO",
    numPaciente: "2008352165",
    historiaClinica: "76516872",
    tipoTransaccion: "IDE",
    nombreTransaccion: "Ingreso por Devolución",
    fecha: "01/09/2026",
    hora: "11:12:07",
    fecha_proceso: "01/09/2026",
    hora_proceso: "11:13:15",
    nombreAlmacen: "FARMACIA EMERGENCIA",
    usuario: "10170704",
    nombreUsuario: "LAURA HUAMAN MIRTA",
    motivo: "OTROS",
    observacion: "POR ERROR DE DIGITACION SE HACE DEVOLUCION",
    productos: [
      {
        item: 170790,
        nombreProd: "GUANTE QUIRURG. N° 7 1/2",
        presentacion: "PAR",
        cantidad: 1,
        precio: "1.87",
        lote: "LTGUAN1111",
        fechaVenc: "31/10/2026",
      },
      {
        item: 172556,
        nombreProd: "AGUA DESTILADA PARA INYECCION 1 L (S)",
        presentacion: "INY",
        cantidad: 1,
        precio: "7.86",
        lote: "LTAGUAD1111",
        fechaVenc: "31/12/2026",
      },
    ],
  },
  {
    id: 4,
    estado: "1",
    ingresoId: "26013269",
    documentoProforma: "1726149869",
    nombrePaciente: "HILARIO GARCIA MIGUEL ANGEL",
    numPaciente: "2008126535",
    historiaClinica: "41877141",
    tipoTransaccion: "IDE",
    nombreTransaccion: "Ingreso por Devolución",
    fecha: "01/09/2026",
    hora: "11:10:25",
    fecha_proceso: "01/09/2026",
    hora_proceso: "11:11:45",
    nombreAlmacen: "FARMACIA EMERGENCIA",
    usuario: "10170704",
    nombreUsuario: "LAURA HUAMAN MIRTA",
    motivo: "OTROS",
    observacion: "POR ERROR DE DIGITACION SE HACE DEVOLUCION",
    productos: [
      {
        item: 170790,
        nombreProd: "GUANTE QUIRURG. N° 7 1/2",
        presentacion: "PAR",
        cantidad: 1,
        precio: "1.87",
        lote: "LTGUAN1111",
        fechaVenc: "31/10/2026",
      },
      {
        item: 172556,
        nombreProd: "AGUA DESTILADA PARA INYECCION 1 L (S)",
        presentacion: "INY",
        cantidad: 1,
        precio: "7.86",
        lote: "LTAGUAD1111",
        fechaVenc: "31/12/2026",
      },
    ],
  },
  {
    id: 5,
    estado: "2",
    ingresoId: "26013268",
    documentoProforma: "1726149763",
    nombrePaciente: "HOLGUIN CUCALON JORGE ALBERTO",
    numPaciente: "2008136454",
    historiaClinica: "73101361",
    tipoTransaccion: "IDE",
    nombreTransaccion: "Ingreso por Devolución",
    fecha: "01/09/2026",
    hora: "11:09:11",
    fecha_proceso: "01/09/2026",
    hora_proceso: "11:10:24",
    nombreAlmacen: "FARMACIA EMERGENCIA",
    usuario: "10170704",
    nombreUsuario: "LAURA HUAMAN MIRTA",
    motivo: "OTROS",
    observacion: "POR ERROR DE DIGITACION SE HACE DEVOLUCION",
    productos: [
      {
        item: 170790,
        nombreProd: "GUANTE QUIRURG. N° 7 1/2",
        presentacion: "PAR",
        cantidad: 1,
        precio: "1.87",
        lote: "LTGUAN1111",
        fechaVenc: "31/10/2026",
      },
      {
        item: 172556,
        nombreProd: "AGUA DESTILADA PARA INYECCION 1 L (S)",
        presentacion: "INY",
        cantidad: 1,
        precio: "7.86",
        lote: "LTAGUAD1111",
        fechaVenc: "31/12/2026",
      },
    ],
  },
  {
    id: 6,
    estado: "1",
    ingresoId: "26013267",
    documentoProforma: "1726149784",
    nombrePaciente: "HUILLCAHUARI DURAND DANIEL",
    numPaciente: "2008468421",
    historiaClinica: "70919488",
    tipoTransaccion: "IDE",
    nombreTransaccion: "Ingreso por Devolución",
    fecha: "01/09/2026",
    hora: "11:05:28",
    fecha_proceso: "01/09/2026",
    hora_proceso: "11:08:52",
    nombreAlmacen: "FARMACIA HOSPITALIZACION",
    usuario: "10170704",
    nombreUsuario: "LAURA HUAMAN MIRTA",
    motivo: "OTROS",
    observacion: "POR ERROR DE DIGITACION SE HACE DEVOLUCION",
    productos: [
      {
        item: 170790,
        nombreProd: "GUANTE QUIRURG. N° 7 1/2",
        presentacion: "PAR",
        cantidad: 1,
        precio: "1.87",
        lote: "LTGUAN1111",
        fechaVenc: "31/10/2026",
      },
      {
        item: 172556,
        nombreProd: "AGUA DESTILADA PARA INYECCION 1 L (S)",
        presentacion: "INY",
        cantidad: 1,
        precio: "7.86",
        lote: "LTAGUAD1111",
        fechaVenc: "31/12/2026",
      },
    ],
  },
  {
    id: 7,
    estado: "2",
    ingresoId: "26013266",
    documentoProforma: "1726149635",
    nombrePaciente: "QUISPE JAVIER TERRY ANFONI",
    numPaciente: "2008561231",
    historiaClinica: "46428041",
    tipoTransaccion: "IDE",
    nombreTransaccion: "Ingreso por Devolución",
    fecha: "01/09/2026",
    hora: "11:02:01",
    fecha_proceso: "01/09/2026",
    hora_proceso: "11:02:35",
    nombreAlmacen: "FARMACIA HOSPITALIZACION",
    usuario: "10170704",
    nombreUsuario: "LAURA HUAMAN MIRTA",
    motivo: "OTROS",
    observacion: "POR ERROR DE DIGITACION SE HACE DEVOLUCION",
    productos: [
      {
        item: 170790,
        nombreProd: "GUANTE QUIRURG. N° 7 1/2",
        presentacion: "PAR",
        cantidad: 1,
        precio: "1.87",
        lote: "LTGUAN1111",
        fechaVenc: "31/10/2026",
      },
      {
        item: 172556,
        nombreProd: "AGUA DESTILADA PARA INYECCION 1 L (S)",
        presentacion: "INY",
        cantidad: 1,
        precio: "7.86",
        lote: "LTAGUAD1111",
        fechaVenc: "31/12/2026",
      },
    ],
  },
  {
    id: 8,
    estado: "2",
    ingresoId: "26013265",
    documentoProforma: "1726149932",
    nombrePaciente: "PRADO DAVILA CARLOS ENRIQUE ALBERTO",
    numPaciente: "2008784213",
    historiaClinica: "76478385",
    tipoTransaccion: "IDE",
    nombreTransaccion: "Ingreso por Devolución",
    fecha: "01/09/2026",
    hora: "11:00:15",
    fecha_proceso: "01/09/2026",
    hora_proceso: "11:02:19",
    nombreAlmacen: "FARMACIA HOSPITALIZACION",
    usuario: "10170704",
    nombreUsuario: "LAURA HUAMAN MIRTA",
    motivo: "OTROS",
    observacion: "POR ERROR DE DIGITACION SE HACE DEVOLUCION",
    productos: [
      {
        item: 170790,
        nombreProd: "GUANTE QUIRURG. N° 7 1/2",
        presentacion: "PAR",
        cantidad: 1,
        precio: "1.87",
        lote: "LTGUAN1111",
        fechaVenc: "31/10/2026",
      },
      {
        item: 172556,
        nombreProd: "AGUA DESTILADA PARA INYECCION 1 L (S)",
        presentacion: "INY",
        cantidad: 1,
        precio: "7.86",
        lote: "LTAGUAD1111",
        fechaVenc: "31/12/2026",
      },
    ],
  },
]

const pacientesPrueba: Record<string, any> = {
  "76516872": {
    dni: "76516872",
    nombre: "CHUNGA HUAYLINOS LUIS DIEGO",
    historia: "76516872",
    sexo: "M",
    fechaNac: "08/03/1996",
    seguro: "SIS",
    tipoAtencion: "CONSULTA EXTERNA",
    especialidad: "MEDICINA INTERNA",
    medico: "DIONICIO IBAÑEZ LUIS FELIPE",
    transaccion: "VRS - SIS",
    receta: "270065000",
    cuenta: "3013144",
  },
  "41877141": {
    dni: "41877141",
    nombre: "HILARIO GARCIA MIGUEL ANGEL",
    historia: "41877141",
    sexo: "M",
    fechaNac: "16/02/1983",
    seguro: "PAGANTE",
    tipoAtencion: "EMERGENCIA",
    especialidad: "CIRUGÍA GENERAL",
    medico: "BASOMBRIO VELASQUEZ JORGE",
    transaccion: "VC - CONTADO",
    receta: "270065100",
    cuenta: "3013145",
  },
  "76478385": {
    dni: "76478385",
    nombre: "PRADO DAVILA CARLOS ENRIQUE ALBERTO",
    historia: "76478385",
    sexo: "M",
    fechaNac: "12/04/1997",
    seguro: "SIS",
    tipoAtencion: "HOSPITALIZACION",
    especialidad: "ANESTESIOLOGIA",
    medico: "TOMANGUILLO VASQUEZ MIGUEL ALEJANDRO",
    transaccion: "VRD - SIS (DOSIS UNITARIA)",
    receta: "270065200",
    cuenta: "3013146",
  },
  "70919488": {
    dni: "70919488",
    nombre: "HUILLCAHUARI DURAND DANIEL",
    historia: "70919488",
    sexo: "M",
    fechaNac: "25/02/1998",
    seguro: "SOAT",
    tipoAtencion: "EMERGENCIA",
    especialidad: "CIRUGIA GENERAL",
    medico: "PINEDA CUSIHUAMAN EDSON GUSTAVO",
    transaccion: "VRO - SOAT",
    receta: "270065300",
    cuenta: "3013147",
  },
  "73101361": {
    dni: "73101361",
    nombre: "HOLGUIN CUCALON JORGE ALBERTO",
    historia: "73101361",
    sexo: "M",
    fechaNac: "25/02/1998",
    seguro: "SIS",
    tipoAtencion: "EMERGENCIA",
    especialidad: "CIRUGIA GENERAL",
    medico: "PINEDA CUSIHUAMAN EDSON GUSTAVO",
    transaccion: "VRS - SIS",
    receta: "270065400",
    cuenta: "3013148",
  },
};

const kardexPrueba: Record<string, any[]> = {
  "76516872": [
    {
      proforma: "1726151436",
      fecha: "23/09/2026",
      usuario: "RIVAS BRAVO FLOR DE MARIA",
      items: [
        { codItem: "170073", nombre: "MIDAZOLAM 5 MG 5 ML (S)", cantidad: 3, precio: "S/ 10.910", importe: "S/ 32.730" },
        { codItem: "170792", nombre: "GUANTE QUIRURG. N° 7", cantidad: 4, precio: "S/ 0.870", importe: "S/ 3.480" },
        { codItem: "170873", nombre: "EQUIPO DE VENOCLISIS (S)", cantidad: 1, precio: "S/ 0.980", importe: "S/ 0.980" },
        { codItem: "170893", nombre: "SONDA ASPIRACION N° 14 ENDOTRAQ.", cantidad: 4, precio: "S/ 1.240", importe: "S/ 4.960" },
        { codItem: "170945", nombre: "PROPOFOL 10 MG/ML (1 %) 20 ML INY", cantidad: 1, precio: "S/ 5.370", importe: "S/ 5.370" },
      ],
    },
    {
      proforma: "1726151435",
      fecha: "22/09/2026",
      usuario: "YALOPOMA POMA JHENRY",
      items: [
        { codItem: "170073", nombre: "MIDAZOLAM 5 MG 5 ML (S)", cantidad: 1, precio: "S/ 10.910", importe: "S/ 10.910" },
      ],
    },
  ],
  "41877141": [
    {
      proforma: "1726152001",
      fecha: "23/09/2026",
      usuario: "BASOMBRIO",
      items: [
        { codItem: "170093", nombre: "IBUPROFENO 400 MG TAB", cantidad: 12, precio: "S/ 1.80", importe: "S/ 21.60" },
      ],
    },
  ],
};


export default function DevolucionesPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchBy, setSearchBy] = useState("ingresoId");
  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const [modalNuevaDevolucion, setModalNuevaDevolucion] = useState(false);
  const [dni, setDni] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();
  const [fechaActual, setFechaActual] = useState("");
  const [pacienteData, setPacienteData] = useState<any | null>(null);
  const [tipoBusqueda, setTipoBusqueda] = useState("documento");
  const [resultadosBusqueda, setResultadosBusqueda] = useState<any[]>([]);
  const [filtroFarmacia, setFiltroFarmacia] = useState("CONSULTORIOS EXTERNOS");
  const [modalKardex, setModalKardex] = useState(false);
  const [kardexData, setKardexData] = useState<ProformaKardex[]>([]);
  const [modalDevolucion, setModalDevolucion] = useState(false);
  const [proformaSeleccionada, setProformaSeleccionada] = useState<ProformaKardex | null>(null);
  const [horaIngresoModal, setHoraIngresoModal] = useState("");
  const [modalConfirmacion, setModalConfirmacion] = useState(false);
  const [showConfirmProcesar, setShowConfirmProcesar] = useState(false);
  const [showSuccessProcesar, setShowSuccessProcesar] = useState(false);
  const [devolucionToDelete, setDevolucionToDelete] = useState<any>(null);
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);
  const [showSuccessDelete, setShowSuccessDelete] = useState(false);
  const [devolucionToProcess, setDevolucionToProcess] = useState<number | null>(null);
  const [devolucionesVisibles, setDevolucionesVisibles] = useState(devolucionesData);

  // Formatear a yyyy-MM-dd para que el input type="date" lo acepte
  const hoy = new Date();
  const primerDiaMes = new Date(hoy.getFullYear(), hoy.getMonth(), 1);
  const formatoISO = (fecha: Date) => fecha.toISOString().split("T")[0];
  const [fechaInicio, setFechaInicio] = useState(formatoISO(primerDiaMes));
  const [fechaFin, setFechaFin] = useState(formatoISO(hoy));
  const [fechaInicioKardex, setFechaInicioKardex] = useState(formatoISO(hoy));
  const [fechaFinKardex, setFechaFinKardex] = useState(formatoISO(hoy));

  // Simular procesamiento de devolución
  const confirmProcesar = () => {
    if (devolucionToProcess !== null) {
      setDevolucionesVisibles((prev) =>
        prev.map((d) =>
          d.id === devolucionToProcess ? { ...d, estado: "2" } : d
        )
      );
    }

    setShowConfirmProcesar(false);
    setTimeout(() => setShowSuccessProcesar(true), 200);
  };

  const confirmDelete = () => {
    setShowConfirmDelete(false);

    setTimeout(() => {
      setShowSuccessDelete(true);
    }, 200);
  };

  // ELIMINAR DOCUMENTO DE SALIDA
  const handleDeleteClick = (devolucion: any) => {
    setDevolucionToDelete(devolucion);
    setShowConfirmDelete(true);
  };

  // Al montar el componente, inicializa fecha y hora
  useEffect(() => {
    const ahora = new Date();
    const opcionesFecha: Intl.DateTimeFormatOptions = { day: "2-digit", month: "2-digit", year: "numeric" };
    const opcionesHora: Intl.DateTimeFormatOptions = { hour: "2-digit", minute: "2-digit", second: "2-digit" };

    setFechaActual(ahora.toLocaleDateString("es-PE", opcionesFecha));

    // Actualizar hora cada segundo
    const intervalo = setInterval(() => {
      const ahora = new Date();
    }, 1000);

    return () => clearInterval(intervalo);
  }, []);

  const opcionesBusqueda = [
    { value: "ingresoId", label: "Ingreso ID" },
    { value: "documento", label: "N° Proforma" },
    { value: "paciente", label: "Paciente" },
    { value: "historiaClinica", label: "Historia Clínica" }
  ];

  // INICIALIZAR CUANDO CARGUE LA PÁGINA
  useEffect(() => {
  }, [devolucionesData]);

  const getEstadoBadge = (estado: string) => {
    const variants = {
      "1": "bg-yellow-100 text-yellow-800 border-yellow-300",
      "2": "bg-green-100 text-green-800 border-green-300",
      "3": "bg-red-100 text-red-800 border-red-300",
    }

    const nombreEstado = {
      "1": "REGISTRADO",
      "2": "PROCESADO",
      "3": "ANULADO",
    }

    return <Badge className={`${variants[estado as keyof typeof variants]}`}>{nombreEstado[estado as keyof typeof nombreEstado]}</Badge>
  }

  const filtrarDevoluciones = () => {
    return devolucionesVisibles.filter((devolucion) => {
      // --- FILTRO POR FECHA ---
      const [dia, mes, anio] = devolucion.fecha.split("/");
      const fechaRegistro = new Date(`${anio}-${mes}-${dia}`);
      const inicio = fechaInicio ? new Date(fechaInicio) : null;
      const fin = fechaFin ? new Date(fechaFin) : null;

      if (inicio && fechaRegistro < inicio) return false;
      if (fin && fechaRegistro > fin) return false;

      // --- FILTRO POR BÚSQUEDA ---
      if (searchTerm) {
        let campo = "";
        switch (searchBy) {
          case "ingresoId":
            campo = devolucion.ingresoId;
            break;
          case "documento":
            campo = devolucion.documentoProforma;
            break;
          case "paciente":
            campo = devolucion.nombrePaciente;
            break;
          case "historiaClinica":
            campo = devolucion.historiaClinica;
            break;
          default:
            campo = "";
        }

        if (!campo.toLowerCase().includes(searchTerm.toLowerCase())) {
          return false;
        }
      }

      // --- FILTRO MAESTRO DE FARMACIA ---
      if (!devolucion.nombreAlmacen.toLowerCase().includes(filtroFarmacia.toLowerCase())) {
        return false;
      }

      return true;
    });
  };

  // FUNCION DE VALIDACION GENERICA
  const validarBusqueda = () => {
    if (dni.trim().length === 0) {
      setError("Debe ingresar un valor de búsqueda.");
      return;
    }

    if (tipoBusqueda === "documento") {
      const paciente = pacientesPrueba[dni.trim()];
      if (!paciente) {
        setError("No se encontró paciente con ese DNI en la data de prueba");
        setResultadosBusqueda([]);
        return;
      }
      setError("");
      setResultadosBusqueda([paciente]); // tabla con un resultado
    } else {
      const coincidencias = Object.values(pacientesPrueba).filter((p) =>
        p.nombre.toLowerCase().includes(dni.trim().toLowerCase())
      );
      if (coincidencias.length === 0) {
        setError("No se encontró paciente con esos apellidos y nombres");
        setResultadosBusqueda([]);
        return;
      }
      setError("");
      setResultadosBusqueda(coincidencias);
    }
  };

  // RESETEAR MODAL
  const resetForm = () => {
    setModalNuevaDevolucion(false);
    setDni("");
    setError("");
    setResultadosBusqueda([]);
    setTipoBusqueda("documento");
  };

  // LIMPIAR FILTROS DE BÚSQUEDA
  const limpiarFiltros = () => {
    // resetear búsqueda
    setSearchBy("ingresoId"); // valor inicial del combobox
    setSearchTerm(""); // limpiar input de búsqueda

    // resetear fechas
    setFechaInicio(formatoISO(primerDiaMes)); // fecha inicial (primer día del mes)
    setFechaFin(formatoISO(hoy)); // fecha final (hoy)

    // si manejas selección de filas
    setSelectedItems([]);
  };


  return (
    <div className="container mx-auto py-6">
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            className="border border-gray-300 h-9 shadow-sm cursor-pointer hover:shadow-md hover:bg-gray-100 transition"
            onClick={() => router.push("/dashboard/ventas")}
          >
            <Link href="/dashboard/ventas">
              <ArrowLeft className="w-5 h-5" />
            </Link>
            Regresar
          </Button>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Devolución de Medicamentos</h1>
            <p className="text-muted-foreground">Gestión del retorno de productos farmacéuticos</p>
          </div>
        </div>
        <div className="bg-cyan-50 border border-cyan-200 border-2 p-4 rounded-md">
          <Label htmlFor="filtroFarmacia" className="mr-2 font-medium">Farmacia:</Label>
          <select
            id="filtroFarmacia"
            value={filtroFarmacia}
            onChange={(e) => setFiltroFarmacia(e.target.value)}
            className="border p-2 h-10 rounded-md w-72"
          >
            <option value="CONSULTORIOS EXTERNOS">Consultorios Externos</option>
            <option value="FARMACIA EMERGENCIA">Farmacia Emergencia</option>
            <option value="FARMACIA HOSPITALIZACION">Farmacia Hospitalización</option>
          </select>
        </div>
      </div>

      <div>
        <div className="flex items-end gap-4 border border-cyan-300 rounded-md px-6 py-4 mb-6 shadow-sm">
          <div className="flex flex-col flex-1">
            <Label htmlFor="buscar" className="mb-1">Buscar por:</Label>

            <div className="flex gap-2">

              {/* Combobox */}
              <select
                className="h-10 w-44 rounded-md border border-input bg-background px-3 text-sm"
                value={searchBy}
                onChange={(e) => setSearchBy(e.target.value)}
              >
                {opcionesBusqueda.map((opcion) => (
                  <option
                    key={opcion.value}
                    value={opcion.value}
                  >
                    {opcion.label}
                  </option>
                ))}
              </select>

              {/* Caja de búsqueda */}
              <div className="relative flex-1">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />

                <Input
                  className="pl-9 h-10"
                  placeholder={`Ingrese ${opcionesBusqueda.find(o => o.value === searchBy)?.label}`}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
          </div>

          <div className="flex flex-col">
            <Label htmlFor="fechaInicio" className="mb-1">Desde:</Label>
            <Input
              id="fechaInicio"
              type="date"
              className="h-10 w-44"
              value={fechaInicio}
              onChange={(e) => setFechaInicio(e.target.value)}
            />
          </div>

          <div className="flex flex-col">
            <Label htmlFor="fechaFin" className="mb-1">Hasta:</Label>
            <Input
              id="fechaFin"
              type="date"
              className="h-10 w-44"
              value={fechaFin}
              onChange={(e) => setFechaFin(e.target.value)}
            />
          </div>

          <div className="flex gap-3">
            <Button variant="outline" size="sm" className="h-10 gap-1" onClick={limpiarFiltros}>
              <Eraser className="h-4 w-4" />
              Limpiar Filtros
            </Button>

            <Button variant="outline" size="sm" className="h-10 gap-1">
              <RefreshCw className="h-4 w-4" />
              Actualizar
            </Button>

            <Button
              className="bg-teal-600 hover:bg-teal-700 text-white gap-2 font-semibold h-10 px-4"
              onClick={() => setModalNuevaDevolucion(true)}
            >
              <Plus className="h-5 w-5" strokeWidth={3} />
              Nueva Devolución
            </Button>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto border rounded-md">
        <Table>
          <TableHeader>
            <TableRow className="bg-cyan-600 hover:bg-cyan-600">
              <TableHead className="font-semibold text-white hover:bg-transparent">Estado</TableHead>
              <TableHead className="font-semibold text-white hover:bg-transparent">Ingreso ID</TableHead>
              <TableHead className="font-semibold text-white hover:bg-transparent">Documento de Proforma</TableHead>
              <TableHead className="font-semibold text-white hover:bg-transparent">Paciente</TableHead>
              <TableHead className="font-semibold text-white hover:bg-transparent">Tipo de Transacción</TableHead>
              <TableHead className="font-semibold text-white hover:bg-transparent">Nombre de Transacción</TableHead>
              <TableHead className="font-semibold text-white hover:bg-transparent">Fecha Registro</TableHead>
              <TableHead className="font-semibold text-white hover:bg-transparent">Fecha Proceso</TableHead>
              <TableHead className="font-semibold text-white hover:bg-transparent">Almacén</TableHead>
              <TableHead className="font-semibold text-white hover:bg-transparent">Usuario</TableHead>
              <TableHead className="font-semibold text-white hover:bg-transparent">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtrarDevoluciones().length === 0 ? (
              <TableRow>
                <TableCell colSpan={10} className="text-center text-gray-500 italic">
                  No se hallaron registros según los filtros de búsqueda
                </TableCell>
              </TableRow>
            ) : (
              filtrarDevoluciones().map((devolucion) => (
                <TableRow key={devolucion.id} className={selectedItems.includes(devolucion.id) ? "bg-primary/10" : ""}>
                  <TableCell>{getEstadoBadge(devolucion.estado)}</TableCell>
                  <TableCell className="font-medium">{devolucion.ingresoId}</TableCell>
                  <TableCell className="font-medium">{devolucion.documentoProforma}</TableCell>
                  <TableCell className="font-medium">{devolucion.nombrePaciente}</TableCell>
                  <TableCell className="font-medium">{devolucion.tipoTransaccion}</TableCell>
                  <TableCell className="font-medium">{devolucion.nombreTransaccion}</TableCell>
                  <TableCell>
                    <div className="font-medium">{devolucion.fecha}</div>
                    <div className="text-sm text-gray-500">{devolucion.hora}</div>
                  </TableCell>
                  <TableCell>
                    <div className="font-medium">{devolucion.fecha_proceso}</div>
                    <div className="text-sm text-gray-500">{devolucion.hora_proceso}</div>
                  </TableCell>
                  <TableCell className="font-medium">{devolucion.nombreAlmacen}</TableCell>
                  <TableCell>{devolucion.usuario}</TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button
                        title="Procesar"
                        variant="outline"
                        className={`h-8 w-10 p-1.5 border-green-600 text-green-600 hover:bg-green-50
                                              ${devolucion.estado !== "1" ? "opacity-40 cursor-not-allowed" : ""}`}
                        disabled={devolucion.estado !== "1"}
                        onClick={() => {
                          setDevolucionToProcess(devolucion.id);
                          setShowConfirmProcesar(true);
                        }}
                      >
                        <CheckCircle className="w-3 h-3" />
                      </Button>
                      <Button
                        title="Ver detalle"
                        variant="outline"
                        className="h-8 w-10 p-1.5 border-blue-600 text-blue-600 hover:bg-blue-50 flex items-center justify-center"
                      >
                        <Eye className="w-4 h-4" />
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
                        title="Eliminar"
                        variant="outline"
                        className={`h-8 w-10 p-1.5 border-red-600 text-red-600 hover:bg-red-50
                        ${devolucion.estado !== "1" ? "opacity-40 cursor-not-allowed" : ""}`}
                        disabled={devolucion.estado !== "1"}
                        onClick={() => handleDeleteClick(devolucion)}
                      >
                        <Trash2 className="w-3 h-3" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* MODAL DE REGISTRO DE NUEVA DEVOLUCION */}
      {modalNuevaDevolucion && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50">
          <div className="bg-white rounded-md shadow-lg p-6 max-w-5xl w-full max-h-[90vh] overflow-y-auto relative">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Registrar Devolución</h2>

              <button
                type="button"
                onClick={resetForm}
                className="text-gray-500 hover:text-red-600"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <h3 className="mb-6">Kardex Detallado del Paciente por Historia Clínica</h3>

            {/* Aquí va tu formulario */}
            <form>
              {/* Filtros de rango de fechas y tipo de transacción */}
              <div className="flex gap-4 mb-6">
                {/* Fecha desde */}
                <div className="flex flex-col w-40">
                  <label className="text-sm font-medium mb-1">Desde:</label>
                  <Input
                    type="date"
                    className="border p-2 h-10"
                    value={fechaInicioKardex}
                    onChange={(e) => setFechaInicioKardex(e.target.value)}
                  />
                </div>

                {/* Fecha hasta */}
                <div className="flex flex-col w-40">
                  <label className="text-sm font-medium mb-1">Hasta:</label>
                  <Input
                    type="date"
                    className="border p-2 h-10"
                    value={fechaFinKardex}
                    onChange={(e) => setFechaFinKardex(e.target.value)}
                  />
                </div>

                {/* Tipo de transacción */}
                <div className="flex flex-col w-40">
                  <label className="text-sm font-medium mb-1">Tipo de Transacción:</label>
                  <Input />
                </div>
              </div>

              <div className="mb-4 text-sm">
                <label className="text-sm font-medium block mb-2">Paciente:</label>
                <div className="flex items-center gap-4">
                  <select
                    value={tipoBusqueda}
                    onChange={(e) => setTipoBusqueda(e.target.value)}
                    className="border p-2 h-10 w-56"
                  >
                    <option value="documento">N° de Historia Clínica</option>
                    <option value="nombres">Apellidos y Nombres</option>
                  </select>

                  {/* Contenedor vertical para input + error */}
                  <Input
                    id="documento"
                    type="text"
                    placeholder={tipoBusqueda === "documento" ? "Ingrese número de historia clínica" : "Ingrese apellidos y nombres"}
                    autoComplete="off"
                    className={`border p-2 h-10 flex-1 ${error ? "border-red-500" : ""}`}
                    value={dni}
                    onChange={(e) => {
                      setDni(e.target.value);
                      setError(""); // limpia error al escribir
                    }}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        validarBusqueda();
                      }
                    }}
                  />

                  <Button
                    type="button"
                    className="bg-blue-600 hover:bg-blue-700 text-white h-10 px-4"
                    onClick={validarBusqueda}
                  >
                    Buscar
                  </Button>

                  {resultadosBusqueda.length > 0 && (
                    <Button
                      type="button"
                      className="bg-gray-500 hover:bg-gray-600 text-white h-10 px-3"
                      onClick={() => {
                        setDni("");
                        setError("");
                        setResultadosBusqueda([]);
                        setPacienteData(null);
                        setTipoBusqueda("documento");
                      }}
                    >
                      Nueva Búsqueda
                    </Button>
                  )}
                </div>
              </div>

              {resultadosBusqueda.length > 0 && (
                <div className="mt-8">
                  <h3 className="text-md font-semibold">
                    Resultados de búsqueda ({resultadosBusqueda.length} {resultadosBusqueda.length === 1 ? "encontrado" : "encontrados"})
                  </h3>
                </div>
              )}

              {resultadosBusqueda.length > 0 && (
                <div className="mt-4 text-sm">
                  <table className="w-full border-collapse border border-gray-300">
                    <thead className="bg-gray-100">
                      <tr>
                        <th className="border border-gray-300 px-2 py-1">Historia</th>
                        <th className="border border-gray-300 px-2 py-1">Nombre</th>
                        <th className="border border-gray-300 px-2 py-1">Sexo</th>
                        <th className="border border-gray-300 px-2 py-1">Fecha Nac.</th>
                        <th className="border border-gray-300 px-2 py-1">Acciones</th>
                      </tr>
                    </thead>
                    <tbody>
                      {resultadosBusqueda.map((paciente, index) => (
                        <tr key={index}>
                          <td className="border border-gray-300 px-2 py-1">{paciente.historia}</td>
                          <td className="border border-gray-300 px-2 py-1">{paciente.nombre}</td>
                          <td className="border border-gray-300 px-2 py-1">{paciente.sexo}</td>
                          <td className="border border-gray-300 px-2 py-1">{paciente.fechaNac}</td>
                          <td className="border border-gray-300 px-2 py-1 flex gap-2 justify-center">
                            <Button
                              type="button"
                              className="bg-green-600 hover:bg-green-700 text-white flex items-center gap-2 px-4 py-2 rounded-md"
                              onClick={() => {
                                setPacienteData(paciente);
                                setKardexData(kardexPrueba[paciente.dni] || []);
                                setModalNuevaDevolucion(false);
                                setModalKardex(true);
                              }}
                            >
                              <CheckCircleIcon className="h-4 w-4" />
                              Revisar Kardex
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              <div className="flex justify-end gap-2 mt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={resetForm}
                >
                  Cancelar
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {modalKardex && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50">
          <div className="bg-white rounded-md shadow-lg p-6 max-w-6xl w-full max-h-[90vh] overflow-y-auto relative">
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => {
                    resetForm();
                    setModalKardex(false);
                    setModalNuevaDevolucion(true);
                  }}
                  className="text-gray-600 hover:text-blue-600 hover:bg-gray-100 p-2"
                >
                  <ArrowLeft className="h-5 w-5" />
                </button>
              </div>
              <h2 className="text-lg font-semibold">Kardex Detallado del Paciente</h2>
              <button
                type="button"
                onClick={() => {
                  resetForm();
                  setModalKardex(false);
                }}
                className="text-gray-500 hover:text-red-600"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {pacienteData && (
              <div className="mb-4 text-md font-semibold bg-gray-100 p-4 rounded-md border border-gray-300">
                <p><strong>Paciente:</strong> {pacienteData.nombre}</p>
                <p><strong>Historia Clínica:</strong> {pacienteData.historia}</p>
                <p><strong>Rango de fecha:</strong> Del {fechaInicioKardex} al {fechaFinKardex}</p>
              </div>
            )}

            {kardexData.map((proforma, idx) => (
              <div key={idx} className="border rounded-md p-4 mb-6 bg-gray-50">
                <h3 className="text-md font-semibold mb-2">
                  Proforma: {proforma.proforma} - Fecha: {proforma.fecha} - Usuario: {proforma.usuario}
                </h3>
                <table className="w-full border-collapse border border-gray-300 text-sm mb-3">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="border px-2 py-1">Item</th>
                      <th className="border px-2 py-1">Nombre</th>
                      <th className="border px-2 py-1">Cantidad</th>
                      <th className="border px-2 py-1">Precio</th>
                      <th className="border px-2 py-1">Descuento</th>
                      <th className="border px-2 py-1">Importe</th>
                    </tr>
                  </thead>
                  <tbody>
                    {proforma.items.map((item, i) => (
                      <tr key={i}>
                        <td className="border px-2 py-1">{item.codItem}</td>
                        <td className="border px-2 py-1">{item.nombre}</td>
                        <td className="border px-2 py-1">{item.cantidad}</td>
                        <td className="border px-2 py-1">{item.precio}</td>
                        <td className="border px-2 py-1">0.000</td>
                        <td className="border px-2 py-1">
                          {(() => {
                            const precioNum = parseFloat(item.precio.replace("S/", "").trim());
                            return `S/ ${(item.cantidad * precioNum).toFixed(3)}`;
                          })()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div className="flex justify-end">
                  <div className="font-bold px-6 py-2">
                    Subtotal: S/ {
                      proforma?.items
                        .filter(i => i.cantidad > 0)
                        .reduce((acc, i) => {
                          const precioNum = parseFloat(i.precio.replace("S/", "").trim());
                          return acc + (i.cantidad * precioNum);
                        }, 0).toFixed(2)
                    }
                  </div>
                </div>
                <Button
                  type="button"
                  className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md"
                  onClick={() => {
                    setProformaSeleccionada(proforma);
                    const ahora = new Date();
                    const opcionesHora: Intl.DateTimeFormatOptions = { hour: "2-digit", minute: "2-digit", second: "2-digit" };
                    setHoraIngresoModal(ahora.toLocaleTimeString("es-PE", opcionesHora));
                    setModalKardex(false);
                    setModalDevolucion(true);
                  }}
                >
                  Realizar Devolución
                </Button>
              </div>
            ))}
          </div>
        </div>
      )}

      {modalDevolucion && proformaSeleccionada && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50">
          <div className="bg-white rounded-md shadow-lg p-6 max-w-6xl w-full max-h-[90vh] overflow-y-auto relative">
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => {
                    resetForm();
                    setModalDevolucion(false);
                    setModalKardex(true);
                  }}
                  className="text-gray-600 hover:text-blue-600 hover:bg-gray-100 p-2"
                >
                  <ArrowLeft className="h-5 w-5" />
                </button>
                <h2 className="text-lg font-semibold">Registrar Devolución</h2>
              </div>

              <div className="flex items-center gap-4 bg-cyan-50 px-4 py-2 text-sm rounded-lg border border-cyan-200">
                <div className="flex items-center gap-2">
                  <p><strong>N° de Orden:</strong> 26013396</p>
                </div>
                <div className="flex items-center gap-2">
                  <p><strong>Fecha:</strong> {fechaActual}</p>
                </div>
                <div className="flex items-center gap-2">
                  <p><strong>Hora:</strong> {horaIngresoModal}</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => {
                  resetForm();
                  setModalDevolucion(false);
                }}
                className="text-gray-500 hover:text-red-600"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Datos generales */}
            <div className="grid grid-cols-2 gap-4 mb-6 text-sm">
              <div>
                <p><strong>Almacén:</strong> {filtroFarmacia}</p>
                <p><strong>Nro. Proforma:</strong> {proformaSeleccionada.proforma}</p>
                <p><strong>Paciente:</strong> {pacienteData?.nombre}</p>
                <p><strong>Tipo de Transacción:</strong> IDE</p>
              </div>
            </div>

            <div className="flex flex-col mb-4 text-sm">
              <label className="text-sm font-medium mb-1">Motivo:</label>
              <select className="border border-gray-400 p-2 h-10 w-full rounded-md">
                <option value="">Seleccione</option>
                <option value="motivo01">Traslado Interinstitucional de paciente</option>
                <option value="motivo02">Traslado (local) de paciente</option>
                <option value="motivo03">Error de Prescripción</option>
                <option value="motivo04">Error de Dispensación</option>
                <option value="motivo05">Cambio de Terapia</option>
                <option value="motivo06">Alta Paciente</option>
                <option value="motivo07">Fallecimiento de Paciente</option>
                {/*<option value="motivo08">Sobrestock</option>*/}
                <option value="motivo09">Otros</option>
              </select>
            </div>

            <div className="mb-4 text-sm">
              <Label className="text-sm font-medium mb-1">Observación:</Label>
              <input
                className="border border-gray-400 rounded-md p-2 w-full"
              />
            </div>

            {/* Detalle de items */}
            <table className="w-full border-collapse border border-gray-300 text-sm mb-4">
              <thead className="bg-gray-100">
                <tr>
                  <th className="border px-2 py-1">Item</th>
                  <th className="border px-2 py-1">Nombre</th>
                  <th className="border px-2 py-1">Cantidad atendida</th>
                  <th className="border px-2 py-1">Precio</th>
                  <th className="border px-2 py-1">Importe</th>
                  <th className="border px-2 py-1">Cantidad a devolver</th>
                </tr>
              </thead>
              <tbody>
                {proformaSeleccionada.items.map((item: KardexItem, idx: number) => (
                  <tr key={idx}>
                    <td className="border px-2 py-1">{item.codItem}</td>
                    <td className="border px-2 py-1">{item.nombre}</td>
                    <td className="border px-2 py-1">{item.cantidad}</td>
                    <td className="border px-2 py-1">{item.precio}</td>
                    <td className="border px-2 py-1">
                      {(() => {
                        const precioNum = parseFloat(item.precio.replace("S/", "").trim());
                        return `S/ ${(item.cantidad * precioNum).toFixed(3)}`;
                      })()}
                    </td>
                    <td className="border px-2 py-1">
                      <Input
                        type="number"
                        min={0}
                        max={item.cantidad}
                        className="border p-1 w-20"
                        placeholder="0"
                        onChange={(e) => {
                          const nuevaCantidad = parseInt(e.target.value, 10);
                          console.log("Devolver", nuevaCantidad, "de", item.nombre);
                        }}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Botones de acción */}
            <div className="flex justify-end gap-2 mt-4">
              <Button
                variant="outline"
                onClick={() => {
                  resetForm();
                  setModalDevolucion(false);
                }}
              >
                Cancelar
              </Button>
              <Button
                className="bg-green-600 hover:bg-green-700 text-white"
                onClick={() => {
                  setModalConfirmacion(true);
                  setModalDevolucion(false);
                }}
              >
                Grabar Devolución
              </Button>
            </div>
          </div>
        </div>
      )}

      {modalConfirmacion && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50">
          <div className="bg-white rounded-md shadow-lg p-6 max-w-md w-full">
            <div className="flex items-center gap-2 mb-4">
              <CheckCircle className="h-8 w-8 text-green-600" />
              <h2 className="text-lg font-semibold">Devolución Registrada</h2>
            </div>

            <p className="text-sm text-gray-700 mb-6 text-center">
              La devolución ha sido registrada con éxito.
            </p>

            <div className="flex justify-end">
              <Button
                className="bg-blue-600 hover:bg-blue-700 text-white"
                onClick={() => {
                  resetForm();
                  setModalConfirmacion(false);
                }}
              >
                Finalizar
              </Button>
            </div>
          </div>
        </div>
      )}

      {showConfirmProcesar && (
        <Dialog open={showConfirmProcesar} onOpenChange={setShowConfirmProcesar}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Confirmar procesamiento de devolución</DialogTitle>
              <DialogDescription>
                ¿Está seguro de procesar este documento?
                <br />
                <span className="text-red-500 font-medium">
                  Esta acción no podrá deshacerse.
                </span>
              </DialogDescription>
            </DialogHeader>

            <div className="flex justify-end gap-3 mt-4">
              <Button
                variant="outline"
                onClick={() => setShowConfirmProcesar(false)}
              >
                Cancelar
              </Button>

              <Button
                className="bg-blue-600 hover:bg-blue-700 text-white"
                onClick={confirmProcesar}
              >
                Confirmar
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      )}

      {showSuccessProcesar && (
        <Dialog open={showSuccessProcesar} onOpenChange={setShowSuccessProcesar}>
          <DialogContent>
            <DialogHeader>
              <CheckCircle className="mx-auto h-12 w-12 text-green-600 mb-3" />
              <DialogTitle className="text-center">Documento procesado</DialogTitle>
              <DialogDescription className="text-center">
                El documento de devolución ha sido procesado con éxito.
              </DialogDescription>
            </DialogHeader>

            <div className="flex justify-end mt-4">
              <Button
                className="bg-green-600 hover:bg-green-700 text-white"
                onClick={() => setShowSuccessProcesar(false)}
              >
                Aceptar
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      )}

      {showConfirmDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6">
            <h2 className="text-lg font-semibold mb-2">Confirmar eliminación</h2>
            <p className="text-sm text-gray-600 mb-4">
              ¿Está seguro de eliminar el documento{" "}
              <span className="font-semibold">{devolucionToDelete?.documento}</span>?
            </p>

            <div className="flex justify-end gap-2">
              <Button
                variant="outline"
                onClick={() => setShowConfirmDelete(false)}
              >
                Cancelar
              </Button>
              <Button
                className="bg-red-600 hover:bg-red-700 text-white"
                onClick={confirmDelete}
              >
                Eliminar
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL DE ÉXITO DE ELIMINACIÓN DE DOCUMENTO DE SALIDA */}
      {showSuccessDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 text-center">
            <CheckCircle className="mx-auto h-12 w-12 text-green-600 mb-3" />
            <h2 className="text-lg font-semibold mb-2">Eliminado con éxito</h2>
            <p className="text-sm text-gray-600 mb-4">
              El documento fue eliminado correctamente.
            </p>

            <Button
              className="bg-green-600 hover:bg-green-700 text-white"
              onClick={() => setShowSuccessDelete(false)}
            >
              Aceptar
            </Button>
          </div>
        </div>
      )}

    </div>
  )
}