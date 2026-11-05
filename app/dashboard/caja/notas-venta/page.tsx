"use client"

import Link from "next/link"
import React, { useEffect, useState, useRef } from "react"
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
    FileSignature,
    X,
    Stethoscope,
    FileText,
    Receipt,
    Check,
    CheckCircle2,
} from "lucide-react"
import { useRouter } from "next/navigation"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"

// DATOS DE EJEMPLO PARA LA TABLA
const notasVentaData = [
    {
        id: 1,
        estado: "1",
        paciente: "CHUNGA HUAYLINOS LUIS DIEGO",
        historia: "76516872",
        origen: "CE",
        ordenId: "26122890",
        cuentaId: "3090500",
        seguro: "SIS SUBSIDIADO",
        desConsultorio: "MEDICINA INTERNA",
        desOrigen: "CONSULTA EXTERNA",
        fecha_registro: "21/10/2026",
        hora_registro: "11:12:07",
        total: 67.40,
        usuario: "73787897",

        // DETALLE FICTICIO DE LA ORDEN DE PAGO
        items: [
            {
                codigo: "CPT001",
                item: "001",
                nombre: "Consulta médica general",
                cantidad: 1,
                precio: 35.00,
                descuento: 0.00,
            },
            {
                codigo: "CPT004",
                item: "002",
                nombre: "Hemograma completo",
                cantidad: 1,
                precio: 25.00,
                descuento: 0.00,
            },
            {
                codigo: "CPT005",
                item: "003",
                nombre: "Glucosa en sangre",
                cantidad: 1,
                precio: 12.40,
                descuento: 5.00,
            },
        ],
    },
    {
        id: 2,
        estado: "1",
        paciente: "HILARIO GARCIA MIGUEL ANGEL",
        historia: "41877141",
        origen: "AD",
        ordenId: "26122889",
        cuentaId: "3090499",
        seguro: "SIS SUBSIDIADO",
        desConsultorio: "RAYOS X",
        desOrigen: "APOYO AL DIAGNOSTICO",
        fecha_registro: "21/10/2026",
        hora_registro: "11:08:25",
        total: 10.00,
        usuario: "73787897",

        // DETALLE FICTICIO DE LA ORDEN DE PAGO
        items: [
            {
                codigo: "CPT001",
                item: "001",
                nombre: "Consulta médica general",
                cantidad: 1,
                precio: 35.00,
                descuento: 0.00,
            },
            {
                codigo: "CPT004",
                item: "002",
                nombre: "Hemograma completo",
                cantidad: 1,
                precio: 25.00,
                descuento: 0.00,
            },
        ],
    },
    {
        id: 3,
        estado: "1",
        paciente: "HOLGUIN CUCALON JORGE ALBERTO",
        historia: "73101361",
        origen: "EM",
        ordenId: "26122888",
        cuentaId: "3090498",
        seguro: "SIS SUBSIDIADO",
        desConsultorio: "MEDICINA EMERGENCIA",
        desOrigen: "EMERGENCIA",
        fecha_registro: "21/10/2026",
        hora_registro: "11:02:18",
        total: 23.33,
        usuario: "73787897",

        // DETALLE FICTICIO DE LA ORDEN DE PAGO
        items: [
            {
                codigo: "CPT001",
                item: "001",
                nombre: "Consulta médica general",
                cantidad: 1,
                precio: 35.00,
                descuento: 0.00,
            },
            {
                codigo: "CPT005",
                item: "002",
                nombre: "Glucosa en sangre",
                cantidad: 1,
                precio: 12.40,
                descuento: 5.00,
            },
        ],
    },
    {
        id: 4,
        estado: "1",
        paciente: "QUISPE JAVIER TERRY ANFONI",
        historia: "46428041",
        origen: "EM",
        ordenId: "26122887",
        cuentaId: "3090497",
        seguro: "SIS SUBSIDIADO",
        desConsultorio: "MEDICINA EMERGENCIA",
        desOrigen: "EMERGENCIA",
        fecha_registro: "20/10/2026",
        hora_registro: "10:21:45",
        total: 190.0,
        usuario: "73787897",

        // DETALLE FICTICIO DE LA ORDEN DE PAGO
        items: [
            {
                codigo: "CPT001",
                item: "001",
                nombre: "Consulta médica general",
                cantidad: 1,
                precio: 35.00,
                descuento: 0.00,
            },
            {
                codigo: "CPT004",
                item: "002",
                nombre: "Hemograma completo",
                cantidad: 1,
                precio: 25.00,
                descuento: 0.00,
            },
            {
                codigo: "CPT005",
                item: "003",
                nombre: "Glucosa en sangre",
                cantidad: 1,
                precio: 12.40,
                descuento: 5.00,
            },
            {
                codigo: "CPT006",
                item: "004",
                nombre: "Examen de orina completo",
                cantidad: 1,
                precio: 15.50,
                descuento: 0.00,
            },
        ],
    },
    {
        id: 5,
        estado: "1",
        paciente: "PRADO DAVILA CARLOS ENRIQUE ALBERTO",
        historia: "76478385",
        origen: "CE",
        ordenId: "26122886",
        cuentaId: "3090496",
        seguro: "SIS SUBSIDIADO",
        desConsultorio: "REUMATOLOGIA",
        desOrigen: "CONSULTA EXTERNA",
        fecha_registro: "20/10/2026",
        hora_registro: "10:16:26",
        total: 5.83,
        usuario: "73787897",

        // DETALLE FICTICIO DE LA ORDEN DE PAGO
        items: [
            {
                codigo: "CPT001",
                item: "001",
                nombre: "Consulta médica general",
                cantidad: 1,
                precio: 35.00,
                descuento: 0.00,
            },
            {
                codigo: "CPT004",
                item: "002",
                nombre: "Hemograma completo",
                cantidad: 1,
                precio: 25.00,
                descuento: 0.00,
            },
            {
                codigo: "CPT005",
                item: "003",
                nombre: "Glucosa en sangre",
                cantidad: 1,
                precio: 12.40,
                descuento: 5.00,
            },
        ],
    },
    {
        id: 6,
        estado: "1",
        paciente: "HUILLCAHUARI DURAND DANIEL",
        historia: "70919488",
        origen: "CE",
        ordenId: "26122885",
        cuentaId: "3090495",
        seguro: "SIS SUBSIDIADO",
        desConsultorio: "TRAUMATOLOGIA Y ORTOPEDIA",
        desOrigen: "CONSULTA EXTERNA",
        fecha_registro: "20/10/2026",
        hora_registro: "10:12:46",
        total: 25.50,
        usuario: "73787897",

        // DETALLE FICTICIO DE LA ORDEN DE PAGO
        items: [
            {
                codigo: "CPT001",
                item: "001",
                nombre: "Consulta médica general",
                cantidad: 1,
                precio: 35.00,
                descuento: 0.00,
            },
            {
                codigo: "CPT004",
                item: "002",
                nombre: "Hemograma completo",
                cantidad: 1,
                precio: 25.00,
                descuento: 0.00,
            },
            {
                codigo: "CPT005",
                item: "003",
                nombre: "Glucosa en sangre",
                cantidad: 1,
                precio: 12.40,
                descuento: 5.00,
            },
            {
                codigo: "CPT007",
                item: "004",
                nombre: "Ecografía abdominal",
                cantidad: 1,
                precio: 120.30,
                descuento: 0.00,
            },
            {
                codigo: "CPT008",
                item: "005",
                nombre: "Curación de herida",
                cantidad: 1,
                precio: 32.40,
                descuento: 0.00,
            },
        ],
    },
    {
        id: 7,
        estado: "1",
        paciente: "PRADO DAVILA CARLOS ENRIQUE ALBERTO",
        historia: "76478385",
        origen: "CE",
        ordenId: "26122884",
        cuentaId: "3090494",
        seguro: "SIS SUBSIDIADO",
        desConsultorio: "REUMATOLOGIA",
        desOrigen: "CONSULTA EXTERNA",
        fecha_registro: "20/10/2026",
        hora_registro: "10:08:35",
        total: 12.25,
        usuario: "73787897",

        // DETALLE FICTICIO DE LA ORDEN DE PAGO
        items: [
            {
                codigo: "CPT001",
                item: "001",
                nombre: "Consulta médica general",
                cantidad: 1,
                precio: 35.00,
                descuento: 0.00,
            },
            {
                codigo: "CPT004",
                item: "002",
                nombre: "Hemograma completo",
                cantidad: 1,
                precio: 25.00,
                descuento: 0.00,
            },
            {
                codigo: "CPT005",
                item: "003",
                nombre: "Glucosa en sangre",
                cantidad: 1,
                precio: 12.40,
                descuento: 5.00,
            },
        ],
    },
    {
        id: 8,
        estado: "1",
        paciente: "MANRIQUE RODRIGUEZ DIJEIM SOLUN",
        historia: "72000870",
        origen: "CE",
        ordenId: "26122883",
        cuentaId: "3090493",
        seguro: "SIS SUBSIDIADO",
        desConsultorio: "MEDICINA INTERNA",
        desOrigen: "CONSULTA EXTERNA",
        fecha_registro: "20/10/2026",
        hora_registro: "10:08:35",
        total: 12.25,
        usuario: "73787897",

        // DETALLE FICTICIO DE LA ORDEN DE PAGO
        items: [
            {
                codigo: "CPT001",
                item: "001",
                nombre: "Consulta médica general",
                cantidad: 1,
                precio: 35.00,
                descuento: 0.00,
            },
            {
                codigo: "CPT004",
                item: "002",
                nombre: "Hemograma completo",
                cantidad: 1,
                precio: 25.00,
                descuento: 0.00,
            },
            {
                codigo: "CPT005",
                item: "003",
                nombre: "Glucosa en sangre",
                cantidad: 1,
                precio: 12.40,
                descuento: 5.00,
            },
        ],
    },
]

const pacientesData = [
    {
        historia: "76516872",
        documento: "76516872",
        codPaciente: "2026000001",
        nombre: "CHUNGA HUAYLINOS LUIS DIEGO",
        sexo: "M",
        fechaNacimiento: "08/03/1996",
        seguro: "SOAT",
        direccion: "S/N",
        distrito: "LURIGANCHO",
    },
    {
        historia: "41877141",
        documento: "41877141",
        codPaciente: "2026000002",
        nombre: "HILARIO GARCIA MIGUEL ANGEL",
        sexo: "M",
        fechaNacimiento: "16/02/1983",
        seguro: "SOAT",
        direccion: "S/N",
        distrito: "MATUCANA",
    },
    {
        historia: "73101361",
        documento: "73101361",
        codPaciente: "2026000003",
        nombre: "HOLGUIN CUCALON JORGE ALBERTO",
        sexo: "M",
        fechaNacimiento: "11/05/1994",
        seguro: "SOAT",
        direccion: "S/N",
        distrito: "JESUS MARIA",
    },
    {
        historia: "46428041",
        documento: "46428041",
        codPaciente: "2026000004",
        nombre: "QUISPE JAVIER TERRY ANFONI",
        sexo: "M",
        fechaNacimiento: "26/07/1990",
        seguro: "ESSALUD",
        direccion: "S/N",
        distrito: "LURIGANCHO",
    },
    {
        historia: "76478385",
        documento: "76478385",
        codPaciente: "2026000005",
        nombre: "PRADO DAVILA CARLOS ENRIQUE ALBERTO",
        sexo: "M",
        fechaNacimiento: "12/04/1997",
        seguro: "ESSALUD",
        direccion: "S/N",
        distrito: "LURIGANCHO",
    },
];

// DATOS DE PRUEBA PARA LAS CUENTAS DE LOS PACIENTES
const cuentasPacienteData = [
    {
        id: 1,
        historia: "76516872",
        codigo: "3090500",
        nombre: "CONSULTA MEDICINA INTERNA",
        fecha: "05/11/2026",
        origen: "CONSULTA EXTERNA",
        seguro: "PAGANTE",
    },

    {
        id: 2,
        historia: "76516872",
        codigo: "3090501",
        nombre: "EXÁMENES DE LABORATORIO",
        fecha: "04/11/2026",
        origen: "LABORATORIO",
        seguro: "SIS SUBSIDIADO",
    },

    {
        id: 3,
        historia: "76516872",
        codigo: "3090502",
        nombre: "RADIOGRAFÍA DE TÓRAX",
        fecha: "03/11/2026",
        origen: "RAYOS X",
        seguro: "PAGANTE",
    },

    {
        id: 4,
        historia: "41877141",
        codigo: "3090499",
        nombre: "ATENCIÓN POR EMERGENCIA",
        fecha: "05/11/2026",
        origen: "EMERGENCIA",
        seguro: "SIS SUBSIDIADO",
    },

    {
        id: 5,
        historia: "73101361",
        codigo: "3090498",
        nombre: "CONSULTA MEDICINA GENERAL",
        fecha: "04/11/2026",
        origen: "CONSULTA EXTERNA",
        seguro: "PAGANTE",
    },

    {
        id: 6,
        historia: "46428041",
        codigo: "3090497",
        nombre: "ECOGRAFÍA ABDOMINAL",
        fecha: "03/11/2026",
        origen: "ECOGRAFÍA",
        seguro: "SIS SUBSIDIADO",
    },
];

const catalogoItems = [
    { codigo: "CPT001", nombre: "Consulta médica general", precio: 35.00, descuento: 0.00 },
    { codigo: "CPT002", nombre: "Consulta médica especializada", precio: 60.00, descuento: 0.00 },
    { codigo: "CPT003", nombre: "Consulta odontológica", precio: 45.00, descuento: 0.00 },
    { codigo: "CPT004", nombre: "Hemograma completo", precio: 25.00, descuento: 0.00 },
    { codigo: "CPT005", nombre: "Glucosa en sangre", precio: 12.00, descuento: 0.00 },
    { codigo: "CPT006", nombre: "Radiografía de tórax", precio: 50.00, descuento: 0.00 },
    { codigo: "CPT007", nombre: "Ecografía abdominal", precio: 80.00, descuento: 0.00 },
    { codigo: "CPT008", nombre: "Electrocardiograma", precio: 40.00, descuento: 0.00 },
    { codigo: "CPT009", nombre: "Curación de heridas", precio: 20.00, descuento: 0.00 },
    { codigo: "CPT010", nombre: "Inyectable intramuscular", precio: 15.00, descuento: 0.00 },
];


export default function NotasVentaPage() {
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedItems, setSelectedItems] = useState<number[]>([]);
    const [paginaActual, setPaginaActual] = useState(1);
    const registrosPorPagina = 5;
    const [notasVentaVisibles, setNotasVentaVisibles] = useState<any[]>([]);
    const router = useRouter();
    const [searchBy, setSearchBy] = useState("ordenId");
    const hoy = new Date();
    const primerDiaMes = new Date(hoy.getFullYear(), hoy.getMonth(), 1);
    const formatoISO = (fecha: Date) => fecha.toISOString().split("T")[0];
    const [fechaInicio, setFechaInicio] = useState(formatoISO(primerDiaMes));
    const [fechaFin, setFechaFin] = useState(formatoISO(hoy));
    const [openEmisionNotaVenta, setOpenEmisionNotaVenta] = useState(false);
    const origenInputRef = useRef<HTMLInputElement>(null);
    const itemInputRef = useRef<HTMLInputElement>(null);
    const cantidadInputRef = useRef<HTMLInputElement>(null);
    const busquedaPacienteInputRef = useRef<HTMLInputElement>(null);
    const [itemBusqueda, setItemBusqueda] = useState("");
    const [mostrarSugerencias, setMostrarSugerencias] = useState(false);
    const [indiceSugerencia, setIndiceSugerencia] = useState(-1);
    const [itemConfirmado, setItemConfirmado] = useState(false);
    const [showBusquedaPaciente, setShowBusquedaPaciente] = useState(false);
    const [tipoBusquedaPaciente, setTipoBusquedaPaciente] = useState("Documento");
    const [tipoDocumento, setTipoDocumento] = useState("DNI");
    const [pacienteSeleccionado, setPacienteSeleccionado] = useState<any>(null);
    const [pacientesEncontrados, setPacientesEncontrados] = useState<any[]>([]);
    const [valorBusquedaPaciente, setValorBusquedaPaciente] = useState("");
    const [showCobroCita, setShowCobroCita] = useState(false);
    const [showCobroProforma, setShowCobroProforma] = useState(false);
    const [fechaHoraActual, setFechaHoraActual] = useState(new Date());
    const [showSuccessCobroCita, setShowSuccessCobroCita] = useState(false);

    // CONTROL DE LA CUENTA SELECCIONADA
    const [cuentaSeleccionada, setCuentaSeleccionada] = useState<any>(null);

    // CONTROL PARA MOSTRAR U OCULTAR LA TABLA DE CUENTAS
    const [mostrarTablaCuentas, setMostrarTablaCuentas] = useState(true);

    // FECHA DE CITA
    const [fechaCita, setFechaCita] = useState(() => {
        const hoy = new Date();

        const anio = hoy.getFullYear();
        const mes = String(hoy.getMonth() + 1).padStart(2, "0");
        const dia = String(hoy.getDate()).padStart(2, "0");

        return `${anio}-${mes}-${dia}`;
    });

    // CONTROL DE DETALLE EXPANDIDO EN LA TABLA
    const [notaVentaExpandidaId, setNotaVentaExpandidaId] = useState<number | null>(null);

    // ESTADOS PARA LA ANULACIÓN DE NOTAS DE VENTA
    const [showConfirmAnulacion, setShowConfirmAnulacion] = useState(false);
    const [showSuccessAnulacion, setShowSuccessAnulacion] = useState(false);
    const [notaVentaToAnular, setNotaVentaToAnular] = useState<any>(null);

    const [motivoAnulacion, setMotivoAnulacion] = useState("");
    const [autorizaAnulacion, setAutorizaAnulacion] = useState("");

    const [itemsRegistrados, setItemsRegistrados] = useState<
        Array<{
            id: number;
            codigo: string;
            nombre: string;
            cantidad: number;
            precio: number;
            descuento: number;
        }>
    >([]);

    const opcionesBusqueda = [
        { value: "ordenId", label: "Orden ID" },
        { value: "paciente", label: "Paciente" },
        { value: "historiaClinica", label: "Historia Clínica" }
    ];

    // FUNCIÓN SELECCIONAR CUENTA DEL PACIENTE
    const seleccionarCuenta = (cuenta: any) => {
        // Guardar los datos de la cuenta seleccionada
        setCuentaSeleccionada(cuenta);

        // Ocultar el listado de cuentas
        setMostrarTablaCuentas(false);

        // Establecer la fecha actual
        const hoy = new Date();

        const anio = hoy.getFullYear();
        const mes = String(hoy.getMonth() + 1).padStart(2, "0");
        const dia = String(hoy.getDate()).padStart(2, "0");

        setFechaCita(`${anio}-${mes}-${dia}`);
    };

    // FUNCIÓN AGREGAR ÍTEM
    const agregarItem = () => {
        const itemSeleccionado = catalogoItems.find(
            (item) => item.nombre === itemBusqueda
        );

        const cantidad = Number(cantidadInputRef.current?.value ?? 1);

        // Validar que se haya seleccionado un ítem válido
        if (!itemConfirmado || !itemSeleccionado) {
            return;
        }

        // Validar que la cantidad sea mayor que cero
        if (!Number.isFinite(cantidad) || cantidad <= 0) {
            return;
        }

        const nuevoItem = {
            id: Date.now(),
            codigo: itemSeleccionado.codigo,
            nombre: itemSeleccionado.nombre,
            cantidad,
            precio: itemSeleccionado.precio,
            descuento: itemSeleccionado.descuento,
        };

        setItemsRegistrados((itemsActuales) => [
            ...itemsActuales,
            nuevoItem,
        ]);

        // Limpiar el campo Ítem para registrar otro
        setItemBusqueda("");
        setItemConfirmado(false);
        setMostrarSugerencias(false);
        setIndiceSugerencia(-1);

        // Restablecer la cantidad
        if (cantidadInputRef.current) {
            cantidadInputRef.current.value = "1";
        }

        // Devolver el foco al campo Ítem
        requestAnimationFrame(() => {
            itemInputRef.current?.focus();
        });
    };

    // FUNCIÓN ELIMINAR ÍTEM
    const eliminarItem = (id: number) => {
        setItemsRegistrados((itemsActuales) =>
            itemsActuales.filter((item) => item.id !== id)
        );
    };

    // CALCULAR TOTAL A PAGAR
    const totalPagar = itemsRegistrados.reduce(
        (total, item) =>
            total + item.cantidad * item.precio - item.descuento,
        0
    );

    // CALCULAR PAGINACIÓN DE NOTAS DE
    const totalPaginas = Math.ceil(
        notasVentaVisibles.length / registrosPorPagina
    );

    const indiceInicial = (paginaActual - 1) * registrosPorPagina;

    const indiceFinal = indiceInicial + registrosPorPagina;

    const notasVentaPaginadas = notasVentaVisibles.slice(
        indiceInicial,
        indiceFinal
    );

    // CAMBIAR DE PÁGINA
    const cambiarPagina = (pagina: number) => {
        if (pagina >= 1 && pagina <= totalPaginas) {
            setPaginaActual(pagina);
        }
    };

    // FILTRAR ÍTEMS SEGÚN EL TEXTO INGRESADO
    const itemsFiltrados = catalogoItems.filter((item) =>
        item.nombre
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .toLowerCase()
            .includes(
                itemBusqueda
                    .normalize("NFD")
                    .replace(/[\u0300-\u036f]/g, "")
                    .toLowerCase()
                    .trim()
            )
    );

    // SELECCIONAR UNA OPCIÓN DEL DESPLEGABLE
    const seleccionarItem = (nombre: string) => {
        setItemBusqueda(nombre);
        setItemConfirmado(true);
        setMostrarSugerencias(false);
        setIndiceSugerencia(-1);
    };

    // INICIALIZAR CUANDO CARGUE LA PÁGINA
    useEffect(() => {
        setNotasVentaVisibles(notasVentaData);
    }, [notasVentaData]);

    // RELOJ EN TIEMPO REAL
    useEffect(() => {
        const intervalo = setInterval(() => {
            setFechaHoraActual(new Date());
        }, 1000);

        return () => clearInterval(intervalo);
    }, []);

    // AJUSTAR PÁGINA SI CAMBIA LA CANTIDAD DE REGISTROS
    useEffect(() => {
        const paginasDisponibles = Math.ceil(
            notasVentaVisibles.length / registrosPorPagina
        );

        if (paginaActual > paginasDisponibles && paginaActual > 1) {
            setPaginaActual(Math.max(1, paginasDisponibles));
        }
    }, [notasVentaVisibles.length, paginaActual]);

    // FUNCIÓN BUSCAR PACIENTE
    const buscarPacientes = () => {
        const texto = valorBusquedaPaciente
            .trim()
            .toLowerCase();

        if (!texto) {
            return;
        }

        const resultados = pacientesData.filter((paciente) =>
            paciente.nombre.toLowerCase().includes(texto) ||
            paciente.historia.includes(texto)
        );

        setPacientesEncontrados(resultados);

    };

    // FUNCIÓN LIMPIAR CAMPOS PARA BÚSQUEDA DE PACIENTE
    const abrirBusquedaPaciente = () => {
        setTipoBusquedaPaciente("Documento");
        setTipoDocumento("DNI");
        setValorBusquedaPaciente("");
        setPacientesEncontrados([]);
        setShowBusquedaPaciente(true);
    };

    // ABRIR MODAL DE CONFIRMACIÓN DE ANULACIÓN
    const handleAnularClick = (notaVenta: any) => {
        setNotaVentaToAnular(notaVenta);
        setMotivoAnulacion("");
        setAutorizaAnulacion("");
        setShowConfirmAnulacion(true);
    };

    // CONFIRMAR ANULACIÓN DE NOTA DE VENTA
    const confirmarAnulacion = () => {
        if (!motivoAnulacion.trim() || !autorizaAnulacion.trim()) {
            return;
        }

        // Actualizar el estado de la nota de venta seleccionada
        setNotasVentaVisibles((notasVentaActuales) =>
            notasVentaActuales.map((notaVenta) =>
                notaVenta.id === notaVentaToAnular.id
                    ? {
                        ...notaVenta,
                        estado: "3",
                        motivoAnulacion: motivoAnulacion.trim(),
                        autorizaAnulacion: autorizaAnulacion.trim(),
                    }
                    : notaVenta
            )
        );

        // Cerrar confirmación y mostrar mensaje de éxito
        setShowConfirmAnulacion(false);
        setShowSuccessAnulacion(true);
    };

    // OBTENER LA FECHA ACTUAL
    const obtenerFechaActual = () => {
        return fechaHoraActual.toLocaleDateString("es-PE", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
        });
    };

    // OBTENER LA HORA ACTUAL
    const obtenerHoraActual = () => {
        return fechaHoraActual.toLocaleTimeString("es-PE", {
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
            hour12: false,
        });
    };

    const getEstadoBadge = (estado: string) => {
        const variants = {
            "1": "bg-yellow-100 text-yellow-800 border-yellow-300",
            "2": "bg-green-100 text-green-800 border-green-300",
            "3": "bg-red-100 text-red-800 border-red-300",
        };

        const nombreEstado = {
            "1": "REGISTRADO",
            "2": "PROCESADO",
            "3": "ANULADO",
        };

        return (
            <Badge
                className={`${variants[estado as keyof typeof variants]}`}
            >
                {nombreEstado[estado as keyof typeof nombreEstado]}
            </Badge>
        );
    };

    // MOSTRAR U OCULTAR DETALLE DE LA NOTA DE VENTA
    const alternarDetalleNotaVenta = (notaVentaId: number) => {
        setNotaVentaExpandidaId((actual) =>
            actual === notaVentaId ? null : notaVentaId
        );
    };

    // OBTENER LOS DATOS DE LA NOTA DE VENTA SELECCIONADA
    const notaVentaSeleccionada = notasVentaVisibles.find(
        (notaVenta) => notaVenta.id === notaVentaExpandidaId
    );


    return (
        <div className="container mx-auto py-6">
            <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-4">
                    <Button
                        variant="outline"
                        className="border border-gray-300 h-9 shadow-sm cursor-pointer hover:shadow-md hover:bg-gray-100 transition"
                        onClick={() => router.push("/dashboard/caja")}
                    >
                        <Link href="/dashboard/caja">
                            <ArrowLeft className="w-5 h-5" />
                        </Link>
                        Regresar
                    </Button>
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Notas de Venta</h1>
                    </div>
                </div>
                {/*<div className="bg-cyan-50 border border-cyan-200 border-2 p-4 rounded-md">
          <Label htmlFor="filtroArea" className="mr-2 font-medium">Área:</Label>
          <select
            id="filtroArea"
            className="border p-2 h-10 rounded-md w-72"
          >
            <option value="CONSULTORIOS EXTERNOS">Consultorios Externos</option>
            <option value="EMERGENCIA">Emergencia</option>
            <option value="HOSPITALIZACION">Hospitalización</option>
          </select>
        </div>*/}
            </div>

            <div>
                <div className="flex items-end gap-4 border border-cyan-300 rounded-md px-6 py-4 mb-6 shadow-sm">
                    <div className="flex flex-col flex-1">
                        <Label htmlFor="buscar" className="mb-1">Buscar por:</Label>

                        <div className="flex gap-2">
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
                        <Button variant="outline" size="sm" className="h-10 gap-1">
                            <Eraser className="h-4 w-4" />
                            Limpiar Filtros
                        </Button>

                        <Button variant="outline" size="sm" className="h-10 gap-1">
                            <RefreshCw className="h-4 w-4" />
                            Actualizar
                        </Button>

                        <Button
                            className="bg-teal-600 hover:bg-teal-700 text-white gap-2 font-semibold h-10 px-4"
                            size="sm"
                            onClick={abrirBusquedaPaciente}
                        >
                            <Plus className="h-5 w-5" strokeWidth={3} />
                            Emisión de Nota de Venta
                        </Button>
                    </div>
                </div>
            </div>

            <div className="overflow-x-auto border rounded-md">
                <Table className="text-xs">
                    <TableHeader>
                        <TableRow className="bg-cyan-600 hover:bg-cyan-600">
                            <TableHead className="font-semibold text-white hover:bg-transparent">Estado</TableHead>
                            <TableHead className="font-semibold text-white hover:bg-transparent">Orden ID</TableHead>
                            <TableHead className="font-semibold text-white hover:bg-transparent">Cuenta ID</TableHead>
                            <TableHead className="font-semibold text-white hover:bg-transparent">Paciente</TableHead>
                            <TableHead className="font-semibold text-white hover:bg-transparent">Historia</TableHead>
                            <TableHead className="font-semibold text-white hover:bg-transparent">Seguro</TableHead>
                            <TableHead className="font-semibold text-white hover:bg-transparent">Origen</TableHead>
                            <TableHead className="font-semibold text-white hover:bg-transparent">Consultorio</TableHead>
                            <TableHead className="font-semibold text-white hover:bg-transparent">Total (S/)</TableHead>
                            <TableHead className="font-semibold text-white hover:bg-transparent">Fecha y Hora Registro</TableHead>
                            <TableHead className="font-semibold text-white hover:bg-transparent">Usuario</TableHead>
                            <TableHead className="font-semibold text-white hover:bg-transparent">Acciones</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {notasVentaPaginadas.map((notaVenta) => (
                            <TableRow
                                key={notaVenta.id}
                                onClick={() => alternarDetalleNotaVenta(notaVenta.id)}
                                className={`cursor-pointer transition-colors ${notaVentaExpandidaId === notaVenta.id
                                    ? "bg-cyan-50"
                                    : "hover:bg-slate-50"
                                    }`}
                            >
                                <TableCell>{getEstadoBadge(notaVenta.estado)}</TableCell>
                                <TableCell className="font-medium">{notaVenta.ordenId}</TableCell>
                                <TableCell className="font-medium">{notaVenta.cuentaId}</TableCell>
                                <TableCell className="font-medium">{notaVenta.paciente}</TableCell>
                                <TableCell className="font-medium">{notaVenta.historia}</TableCell>
                                <TableCell className="font-medium">{notaVenta.seguro}</TableCell>
                                <TableCell className="font-medium">{notaVenta.origen}</TableCell>
                                <TableCell className="font-medium">{notaVenta.desConsultorio}</TableCell>
                                <TableCell className="font-medium">{notaVenta.total}</TableCell>
                                <TableCell>
                                    <div className="font-medium">{notaVenta.fecha_registro}</div>
                                    <div className="text-gray-500">{notaVenta.hora_registro}</div>
                                </TableCell>
                                <TableCell>{notaVenta.usuario}</TableCell>
                                <TableCell>
                                    <div
                                        className="flex space-x-2"
                                        onClick={(e) => e.stopPropagation()}
                                    >
                                        {/*<Button
                      title="Firmar documento"
                      variant="outline"
                      className="h-8 w-10 p-1.5 border-green-600 text-green-600 hover:bg-green-50"
                    >
                      <FileSignature className="w-3 h-3" />
                    </Button>*/}
                                        {/*<Button
                      title="Ver detalle"
                      variant="outline"
                      className="h-8 w-10 p-1.5 border-blue-600 text-blue-600 hover:bg-blue-50"
                      onClick={() =>
                        router.push(`/dashboard/farmacia-clinica/seguimiento-farmaco/detalle/${notaVenta.seguimientoId}`)
                      }
                    >
                      <Eye className="w-3 h-3" />
                    </Button>*/}
                                        {/*<Button
                      title="Cambiar N° de notaVenta"
                      variant="outline"
                      className={`h-8 w-10 p-1.5 border-yellow-600 text-yellow-600 hover:bg-yellow-50
                        ${notaVenta.estado !== "1" ? "opacity-40 cursor-not-allowed" : ""}`}
                      disabled={notaVenta.estado !== "1"}
                      onClick={() =>
                        router.push(`/dashboard/farmacia-clinica/seguimiento-farmaco/editar/${notaVenta.seguimientoId}`)
                      }
                    >
                      <Edit className="w-3 h-3" />
                    </Button>*/}
                                        {/*<Button
                      title="Imprimir"
                      variant="outline"
                      className="h-8 w-10 p-1.5 border-purple-600 text-purple-600 hover:bg-purple-50"
                      onClick={() =>
                        window.open(
                          `/dashboard/almacenes/salidas/imprimir/${seguimiento.id}`,
                          "_blank"
                        )
                      }
                    >
                      <Printer className="w-3 h-3" />
                    </Button>*/}
                                        <Button
                                            title="Anular documento"
                                            variant="outline"
                                            className={`h-8 w-10 p-1.5 border-red-600 text-red-600 hover:bg-red-50
                        ${notaVenta.estado !== "1" ? "opacity-40 cursor-not-allowed" : ""}`}
                                            disabled={notaVenta.estado !== "1"}
                                            onClick={() => handleAnularClick(notaVenta)}
                                        >
                                            <X className="w-3 h-3" />
                                        </Button>
                                    </div>
                                </TableCell>
                            </TableRow>


                        ))}
                    </TableBody>
                </Table>
            </div>


            {/* PAGINACIÓN DE LA TABLA */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 mt-4">

                {/* INFORMACIÓN DE REGISTROS */}
                <div className="text-sm text-gray-500">
                    Mostrando{" "}
                    {notasVentaVisibles.length === 0 ? 0 : indiceInicial + 1}
                    {" "}al{" "}
                    {Math.min(indiceFinal, notasVentaVisibles.length)}
                    {" "}de{" "}
                    {notasVentaVisibles.length} registros
                </div>

                {/* BOTONES DE NAVEGACIÓN */}
                <div className="flex items-center gap-1">

                    <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        disabled={paginaActual === 1 || totalPaginas === 0}
                        onClick={() => cambiarPagina(paginaActual - 1)}
                    >
                        Anterior
                    </Button>

                    {Array.from(
                        { length: totalPaginas },
                        (_, index) => index + 1
                    ).map((pagina) => (
                        <Button
                            key={pagina}
                            type="button"
                            variant={paginaActual === pagina ? "default" : "outline"}
                            size="sm"
                            className={
                                paginaActual === pagina
                                    ? "bg-cyan-600 hover:bg-cyan-700 text-white"
                                    : ""
                            }
                            onClick={() => cambiarPagina(pagina)}
                        >
                            {pagina}
                        </Button>
                    ))}

                    <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        disabled={paginaActual === totalPaginas || totalPaginas === 0}
                        onClick={() => cambiarPagina(paginaActual + 1)}
                    >
                        Siguiente
                    </Button>
                </div>
            </div>



            {/* DETALLE DE LA NOTA DE VENTA SELECCIONADA */}
            {notaVentaSeleccionada && (
                <div className="mt-6 border rounded-lg bg-white shadow-sm overflow-hidden">

                    {/* ENCABEZADO DEL DETALLE */}
                    <div className="flex items-center justify-between gap-3 bg-slate-50 border-b px-5 py-4">

                        <div>
                            <h3 className="font-semibold text-cyan-700">
                                Detalle de la nota de venta
                            </h3>

                            <p className="text-sm text-gray-500 mt-1">
                                Nota de Venta: {notaVentaSeleccionada.numero}
                                {" | "}
                                Paciente: {notaVentaSeleccionada.paciente}
                            </p>
                        </div>

                        <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => setNotaVentaExpandidaId(null)}
                        >
                            Cerrar detalle
                        </Button>

                    </div>

                    {/* TABLA DE ÍTEMS */}
                    <div className="p-4">

                        <div className="overflow-x-auto border rounded-md">

                            <Table>

                                <TableHeader>
                                    <TableRow className="bg-slate-100 hover:bg-slate-100">
                                        <TableHead>Código CPT</TableHead>
                                        <TableHead>Ítem</TableHead>
                                        <TableHead>Nombre</TableHead>
                                        <TableHead className="text-center">Cantidad</TableHead>
                                        <TableHead className="text-right">Precio (S/)</TableHead>
                                        <TableHead className="text-right">Importe (S/)</TableHead>
                                    </TableRow>
                                </TableHeader>

                                <TableBody>
                                    {notaVentaSeleccionada.items?.map((item: any, index: number) => {
                                        const importe =
                                            item.cantidad * item.precio - item.descuento;

                                        return (
                                            <TableRow key={`${notaVentaSeleccionada.id}-${index}`}>

                                                <TableCell>{item.codigo}</TableCell>

                                                <TableCell>{item.item}</TableCell>

                                                <TableCell>{item.nombre}</TableCell>

                                                <TableCell className="text-center">
                                                    {item.cantidad}
                                                </TableCell>

                                                <TableCell className="text-right">
                                                    {item.precio.toFixed(2)}
                                                </TableCell>

                                                <TableCell className="text-right font-medium">
                                                    {importe.toFixed(2)}
                                                </TableCell>

                                            </TableRow>
                                        );
                                    })}

                                    {(!notaVentaSeleccionada.items ||
                                        notaVentaSeleccionada.items.length === 0) && (
                                            <TableRow>
                                                <TableCell colSpan={7} className="text-center text-gray-500 py-6">
                                                    No hay ítems registrados para esta cobranza.
                                                </TableCell>
                                            </TableRow>
                                        )}
                                </TableBody>

                            </Table>

                        </div>

                        {/* TOTAL DE LA COBRANZA */}
                        <div className="flex justify-end mt-4">
                            <div className="text-right">
                                <span className="text-sm text-gray-500">
                                    Total:
                                </span>

                                <p className="text-xl font-bold text-cyan-700">
                                    S/ {notaVentaSeleccionada.total.toFixed(2)}
                                </p>
                            </div>
                        </div>

                    </div>
                </div>
            )}


            {/* MODAL DE BÚDQUEDA DE PACIENTE */}
            <Dialog
                open={showBusquedaPaciente}
                onOpenChange={setShowBusquedaPaciente}
            >
                <DialogContent
                    className="max-w-6xl"
                    onPointerDownOutside={(e) => e.preventDefault()}
                    //onEscapeKeyDown={(e) => e.preventDefault()}
                    onOpenAutoFocus={(e) => {
                        e.preventDefault();
                        busquedaPacienteInputRef.current?.focus();
                    }}
                >
                    <DialogHeader>
                        <DialogTitle>Buscar Paciente</DialogTitle>
                        <DialogDescription>Seleccione un paciente para generar la nota de venta.</DialogDescription>
                    </DialogHeader>

                    <div className="grid grid-cols-12 gap-3 text-sm">
                        <div className="col-span-2">
                            <Label>Buscar por</Label>
                            <select
                                className="w-full h-10 border rounded-md px-2"
                                value={tipoBusquedaPaciente}
                                onChange={(e) => setTipoBusquedaPaciente(e.target.value)}
                            >
                                <option value="Documento">Documento</option>
                                <option value="Historia Clínica">Historia Clínica</option>
                                <option value="Apellidos y Nombres">Apellidos y Nombres</option>
                            </select>
                        </div>

                        {tipoBusquedaPaciente === "Documento" && (
                            <div className="col-span-2">
                                <Label className="invisible">Tipo de documento</Label>
                                <select className="w-full h-10 border rounded-md px-2">
                                    <option value="DNI">DNI</option>
                                    <option value="carnet-ext">Carnet de Extranjería</option>
                                    <option value="carnet-seg">Carnet de Seguro</option>
                                    <option value="cedula-ie">Cédula de Identidad Extranjera</option>
                                    <option value="cnv">Certificado de nacido vivo</option>
                                    <option value="cip">CIP (Policía)</option>
                                    <option value="partida-nac">Partida Nacimiento</option>
                                    <option value="pasaporte">Pasaporte</option>
                                    <option value="ninguno">Ninguno</option>
                                </select>
                            </div>
                        )}

                        <div
                            className={
                                tipoBusquedaPaciente === "Documento"
                                    ? "col-span-6"
                                    : "col-span-8"
                            }
                        >
                            <Label className="invisible">Valor</Label>
                            <Input
                                placeholder="Ingrese dato de búsqueda..."
                                ref={busquedaPacienteInputRef}
                                value={valorBusquedaPaciente}
                                onChange={(e) => setValorBusquedaPaciente(e.target.value)}
                                onKeyDown={(e) => {
                                    if (e.key === "Enter") {
                                        buscarPacientes();
                                    }
                                }}
                            />
                        </div>

                        <div className="col-span-2 flex items-end">
                            <Button className="w-full" onClick={buscarPacientes}>
                                Buscar
                            </Button>
                        </div>
                    </div>

                    {pacientesEncontrados.length > 0 && (
                        <div className="border rounded-md mt-4">
                            <Table className="text-sm">
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Historia</TableHead>
                                        <TableHead>Paciente</TableHead>
                                        <TableHead className="text-center">Acciones</TableHead>
                                    </TableRow>
                                </TableHeader>

                                <TableBody>
                                    {pacientesEncontrados.map((paciente) => (
                                        <TableRow key={paciente.historia}>
                                            <TableCell>{paciente.historia}</TableCell>
                                            <TableCell>{paciente.nombre}</TableCell>
                                            <TableCell>
                                                <div className="flex justify-center gap-2">
                                                    <Button
                                                        size="sm"
                                                        variant="outline"
                                                        className="border-cyan-600 text-cyan-600 hover:bg-cyan-50"
                                                        onClick={() => {
                                                            setPacienteSeleccionado(paciente);
                                                            setShowBusquedaPaciente(false);
                                                            setShowCobroCita(true);
                                                        }}
                                                    >
                                                        <Stethoscope className="w-4 h-4 mr-1" />
                                                        Cobrar Cita SOAT
                                                    </Button>

                                                    <Button
                                                        size="sm"
                                                        variant="outline"
                                                        className="border-green-600 text-green-600 hover:bg-green-50"
                                                        onClick={() => {
                                                            setPacienteSeleccionado(paciente);

                                                            // Limpiar la cuenta seleccionada anteriormente
                                                            setCuentaSeleccionada(null);

                                                            // Volver a mostrar la tabla de cuentas
                                                            setMostrarTablaCuentas(true);

                                                            setShowBusquedaPaciente(false);
                                                            setOpenEmisionNotaVenta(true);
                                                        }}
                                                    >
                                                        <Receipt className="w-4 h-4 mr-1" />
                                                        Cobranza Manual
                                                    </Button>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                    )}
                </DialogContent>
            </Dialog>

            {/* MODAL DE COBRO DE CITA */}
            <Dialog
                open={showCobroCita}
                onOpenChange={setShowCobroCita}
            >
                <DialogContent
                    className="max-w-4xl max-h-[90vh] overflow-y-auto"
                    onPointerDownOutside={(e) => e.preventDefault()}
                    onEscapeKeyDown={(e) => e.preventDefault()}
                >
                    <DialogHeader>
                        <div className="flex items-center gap-3">
                            {/* BOTÓN PARA REGRESAR A LA BÚSQUEDA DE PACIENTE */}
                            <Button
                                type="button"
                                variant="ghost"
                                size="icon"
                                className="shrink-0 text-slate-600 hover:text-cyan-700"
                                title="Volver a búsqueda de paciente"
                                aria-label="Volver a búsqueda de paciente"
                                onClick={() => {
                                    setShowCobroCita(false);
                                    setValorBusquedaPaciente("");
                                    setPacientesEncontrados([]);
                                    setShowBusquedaPaciente(true);
                                }}
                            >
                                <ArrowLeft className="h-5 w-5" />
                            </Button>

                            {/* TÍTULO */}
                            <div>
                                <DialogTitle>Cobro de Cita</DialogTitle>
                            </div>
                        </div>
                    </DialogHeader>

                    {/* DATOS DEL PACIENTE */}
                    <Card>
                        <CardContent className="pt-5">
                            <h3 className="font-semibold text-cyan-700 mb-4">Datos del paciente</h3>

                            <div className="grid grid-cols-4 gap-4">
                                <div>
                                    <Label>Historia Clínica</Label>
                                    <Input
                                        value={pacienteSeleccionado?.historia}
                                        className="border-slate-300 disabled:cursor-not-allowed disabled:opacity-50"
                                        disabled
                                    />
                                </div>

                                <div className="md:col-span-2">
                                    <Label>Apellidos y Nombres</Label>
                                    <Input
                                        value={pacienteSeleccionado?.nombre}
                                        className="border-slate-300 disabled:cursor-not-allowed disabled:opacity-50"
                                        disabled
                                    />
                                </div>

                                <div>
                                    <Label>Seguro</Label>
                                    <Input
                                        value={pacienteSeleccionado?.seguro}
                                        className="border-slate-300 disabled:cursor-not-allowed disabled:opacity-50"
                                        disabled
                                    />
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* INFORMACIÓN DE LA CITA */}
                    <Card>
                        <CardContent className="pt-5">
                            <h3 className="font-semibold text-cyan-700 mb-4">Ingresar número de la Cita</h3>

                            <div className="grid grid-cols-8 gap-4">
                                <div>
                                    <Label>N° Cita</Label>
                                    <Input value="26" />
                                </div>

                                <div className="md:col-span-2">
                                    <Label className="invisible">Valores restantes</Label>
                                    <Input value="26047887" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* PACIENTE */}
                    <Card>
                        <CardContent className="pt-5">
                            <h3 className="font-semibold text-cyan-700 mb-4">Datos de la Cita</h3>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <Label>Consultorio</Label>
                                    <Input
                                        value="MEDICINA INTERNA"
                                        className="border-slate-300 disabled:cursor-not-allowed disabled:opacity-100"
                                        disabled
                                    />
                                </div>

                                <div>
                                    <Label>N° Cuenta</Label>
                                    <Input />
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* COBRANZA */}
                    <Card>
                        <CardContent className="pt-5">
                            <h3 className="font-semibold text-cyan-700 mb-4">Datos de Cobro</h3>

                            <div className="grid grid-cols-3 gap-4">
                                <div>
                                    <Label>Categoría</Label>
                                    <Input value="A [Principal]" />
                                </div>

                                <div>
                                    <Label>N° Boleta S.S.</Label>
                                    <Input />
                                </div>

                                <div>
                                    <Label>Tipo de Pago</Label>
                                    <Input value="C" className="border-slate-300 disabled:cursor-not-allowed disabled:opacity-50" disabled />
                                    {/*<select className="w-full h-10 border rounded-md px-3">
                    <option>CONTADO</option>
                    <option>SIS</option>
                    <option>SOAT</option>
                  </select>*/}
                                </div>

                                <div>
                                    <Label>Admisión</Label>
                                    <Input value="0.00" className="border-slate-300 disabled:cursor-not-allowed disabled:opacity-100" disabled />
                                </div>

                                <div>
                                    <Label>Consulta</Label>
                                    <Input value="10.00" className="border-slate-300 disabled:cursor-not-allowed disabled:opacity-100" disabled />
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* TOTAL */}
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-5">
                        <div className="flex justify-between items-center">
                            <span className="font-semibold text-lg">Total a Cobrar</span>
                            <span className="text-3xl font-bold text-blue-700">S/ 10.00</span>
                        </div>
                    </div>

                    {/* BOTONES */}
                    <div className="bg-white border-t pt-4 flex justify-end gap-3">
                        <Button
                            className="bg-green-600 hover:bg-green-700"
                            onClick={() => {
                                setShowCobroCita(false);
                                setShowSuccessCobroCita(true);
                            }}
                        >
                            Guardar Cobranza de Cita
                        </Button>

                        <Button
                            variant="outline"
                            onClick={() => setShowCobroCita(false)}
                        >
                            Cancelar
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>

            {/* MODAL DE COBRO DE PROFORMA */}
            <Dialog
                open={showCobroProforma}
                onOpenChange={setShowCobroProforma}
            >
                <DialogContent
                    className="max-w-5xl max-h-[90vh] overflow-y-auto"
                    onPointerDownOutside={(e) => e.preventDefault()}
                    onEscapeKeyDown={(e) => e.preventDefault()}
                >

                    <DialogHeader>
                        <div className="flex items-center gap-3">
                            {/* BOTÓN PARA REGRESAR A LA BÚSQUEDA */}
                            <Button
                                type="button"
                                variant="ghost"
                                size="icon"
                                className="shrink-0 text-slate-600 hover:text-cyan-700"
                                title="Volver a búsqueda de paciente"
                                aria-label="Volver a búsqueda de paciente"
                                onClick={() => {
                                    setShowCobroProforma(false);
                                    setValorBusquedaPaciente("");
                                    setPacientesEncontrados([]);
                                    setShowBusquedaPaciente(true);
                                }}
                            >
                                <ArrowLeft className="h-5 w-5" />
                            </Button>

                            {/* TÍTULO */}
                            <div>
                                <DialogTitle>
                                    Cobro de Proforma / Orden
                                </DialogTitle>
                            </div>
                        </div>
                    </DialogHeader>


                    {/* PACIENTE */}
                    <Card>
                        <CardContent className="pt-5">
                            <h3 className="font-semibold text-cyan-700 mb-4">Paciente Seleccionado</h3>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <Label>Historia Clínica</Label>
                                    <Input
                                        value={pacienteSeleccionado?.historia}
                                        className="border-slate-300 disabled:cursor-not-allowed disabled:opacity-50"
                                        disabled
                                    />
                                </div>

                                <div>
                                    <Label>Paciente</Label>
                                    <Input
                                        value={pacienteSeleccionado?.nombre}
                                        className="border-slate-300 disabled:cursor-not-allowed disabled:opacity-50"
                                        disabled
                                    />
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* MODULO Y DATOS DE LA PROFORMA */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 items-strecht">

                        {/* MÓDULO DE ORIGEN - COLUMNA IZQUIERDA */}
                        <Card>
                            <CardContent className="pt-5">
                                <h3 className="font-semibold text-cyan-700 mb-4">
                                    Módulo de Origen
                                </h3>

                                <div className="grid grid-cols-1 gap-3 text-sm">
                                    <label className="flex items-center gap-2">
                                        <input type="radio" name="modulo" />
                                        Farmacia
                                    </label>

                                    <label className="flex items-center gap-2">
                                        <input type="radio" name="modulo" />
                                        Liquidaciones
                                    </label>

                                    <label className="flex items-center gap-2">
                                        <input type="radio" name="modulo" />
                                        Laboratorio
                                    </label>

                                    <label className="flex items-center gap-2">
                                        <input type="radio" name="modulo" />
                                        Rayos X
                                    </label>

                                    <label className="flex items-center gap-2">
                                        <input type="radio" name="modulo" />
                                        Ecografía
                                    </label>

                                    <label className="flex items-center gap-2">
                                        <input type="radio" name="modulo" />
                                        Pendientes de Pago Medicamentos
                                    </label>
                                </div>
                            </CardContent>
                        </Card>

                        {/* DATOS DE LA PROFORMA - COLUMNA DERECHA */}
                        <Card>
                            <CardContent className="pt-5">
                                <h3 className="font-semibold text-cyan-700 mb-4">
                                    Datos de la Proforma
                                </h3>

                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                    <div>
                                        <Label>N° Proforma</Label>
                                        <Input />
                                    </div>

                                    <div>
                                        <Label>N° Orden</Label>
                                        <Input />
                                    </div>

                                    <div>
                                        <Label>N° Cuenta</Label>
                                        <Input />
                                    </div>
                                </div>

                                <div className="mt-4">
                                    <label className="flex items-center gap-2">
                                        <input type="checkbox" />
                                        Exonerar Pago
                                    </label>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* RESULTADO */}
                    <Card>
                        <CardContent className="pt-5">
                            <h3 className="font-semibold text-cyan-700 mb-4">Información de Cobro</h3>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <Label>Tipo de Paciente</Label>

                                    <Input
                                        value="PAGANTE"
                                        className="border-slate-300 disabled:cursor-not-allowed disabled:opacity-50"
                                        disabled
                                    />
                                </div>

                                <div>
                                    <Label>Departamento</Label>
                                    <Input
                                        value="MEDICINA"
                                        className="border-slate-300 disabled:cursor-not-allowed disabled:opacity-50"
                                        disabled
                                    />
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* TOTAL */}
                    <div className="bg-amber-50 border border-amber-200 rounded-lg p-5">
                        <div className="flex justify-between items-center">
                            <span className="font-semibold text-lg">Total a Cobrar</span>
                            <span className="text-3xl font-bold text-amber-700">S/ 25.00</span>
                        </div>
                    </div>

                    {/* BOTONES */}
                    <div className="bg-white border-t pt-4 flex justify-end gap-3">
                        <Button
                            className="bg-green-600 hover:bg-green-700"
                        >
                            Guardar Cobranza
                        </Button>

                        <Button
                            variant="outline"
                            onClick={() => setShowCobroProforma(false)}
                        >
                            Cancelar
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>

            {/* MODAL DE EMISIÓN DE NOTA DE VENTA */}
            <Dialog
                open={openEmisionNotaVenta}
                onOpenChange={setOpenEmisionNotaVenta}
            >
                <DialogContent
                    className="max-w-7xl max-h-[90vh] overflow-y-auto"
                    onPointerDownOutside={(e) => e.preventDefault()}
                    onEscapeKeyDown={(e) => e.preventDefault()}
                    onOpenAutoFocus={(e) => {
                        e.preventDefault();
                    }}
                >
                    <DialogHeader>
                        <div className="flex items-center gap-3">
                            {/* BOTÓN PARA REGRESAR A LA BÚSQUEDA DE PACIENTE */}
                            <Button
                                type="button"
                                variant="ghost"
                                size="icon"
                                className="shrink-0 text-slate-600 hover:text-cyan-700"
                                title="Volver a búsqueda de paciente"
                                aria-label="Volver a búsqueda de paciente"
                                onClick={() => {
                                    setOpenEmisionNotaVenta(false);
                                    setValorBusquedaPaciente("");
                                    setPacientesEncontrados([]);
                                    setShowBusquedaPaciente(true);
                                }}
                            >
                                <ArrowLeft className="h-5 w-5" />
                            </Button>

                            {/* TÍTULO */}
                            <div>
                                <DialogTitle>Emisión de Nota de Venta</DialogTitle>
                            </div>
                        </div>
                    </DialogHeader>

                    {/* CABECERA */}
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 rounded-lg bg-slate-50 border p-2">
                        <div className="flex items-center gap-2">
                            <Label className="text-xs whitespace-nowrap">Usuario</Label>
                            <Input
                                value="MCHUYES"
                                className="h-8 bg-gray-100 text-gray-600 font-semibold text-xs"
                                disabled
                            />
                        </div>

                        <div className="flex items-center gap-2">
                            <Label className="text-xs whitespace-nowrap">Orden</Label>
                            <Input
                                value="26122906"
                                className="h-8 bg-gray-100 text-gray-600 font-semibold text-xs"
                                disabled
                            />
                        </div>

                        <div className="flex items-center gap-2">
                            <Label className="text-xs whitespace-nowrap">Fecha</Label>
                            <Input
                                value={obtenerFechaActual()}
                                className="h-8 bg-gray-100 text-gray-600 font-semibold text-xs"
                                disabled
                            />
                        </div>

                        <div className="flex items-center gap-2">
                            <Label className="text-xs whitespace-nowrap">Hora</Label>
                            <Input
                                value={obtenerHoraActual()}
                                className="h-8 bg-gray-100 text-gray-600 font-semibold text-xs"
                                disabled
                            />
                        </div>
                    </div>

                    {/* DATOS DEL PACIENTE */}
                    <Card>
                        <CardContent className="px-4 py-3">
                            <h3 className="font-semibold text-cyan-700 text-sm mb-2">
                                Datos del Paciente
                            </h3>

                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2">
                                <div className="lg:col-span-2">
                                    <Label className="text-xs">Paciente</Label>
                                    <Input
                                        value={pacienteSeleccionado?.nombre ?? ""}
                                        className="h-8 text-xs border-slate-300 disabled:cursor-not-allowed disabled:opacity-70"
                                        disabled
                                    />
                                </div>

                                <div>
                                    <Label className="text-xs">Historia Clínica</Label>
                                    <Input
                                        value={pacienteSeleccionado?.historia ?? ""}
                                        className="h-8 text-xs border-slate-300 disabled:cursor-not-allowed disabled:opacity-70"
                                        disabled
                                    />
                                </div>

                                <div>
                                    <Label className="text-xs">Código de Paciente</Label>
                                    <Input
                                        value={pacienteSeleccionado?.codPaciente ?? ""}
                                        className="h-8 text-xs border-slate-300 disabled:cursor-not-allowed disabled:opacity-70"
                                        disabled
                                    />
                                </div>

                                <div>
                                    <Label className="text-xs">Seguro</Label>
                                    <Input
                                        value={pacienteSeleccionado?.seguro ?? ""}
                                        className="h-8 text-xs border-slate-300 disabled:cursor-not-allowed disabled:opacity-70"
                                        disabled
                                    />
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* LISTADO DE CUENTAS DEL PACIENTE */}
                    {mostrarTablaCuentas && (
                        <Card>
                            <CardContent className="px-4 py-3">
                                <div className="flex items-center justify-between mb-3">
                                    <h3 className="font-semibold text-cyan-700 text-sm">Cuentas del Paciente</h3>

                                    <span className="text-xs text-gray-500">
                                        Registros: {
                                            cuentasPacienteData.filter(
                                                (cuenta) =>
                                                    cuenta.historia === pacienteSeleccionado?.historia
                                            ).length
                                        }
                                    </span>
                                </div>

                                <div className="overflow-x-auto border rounded-md">
                                    <Table className="text-xs">
                                        <TableHeader>
                                            <TableRow className="bg-slate-100 hover:bg-slate-100">
                                                <TableHead className="font-semibold">Código</TableHead>
                                                <TableHead className="font-semibold">Nombre</TableHead>
                                                <TableHead className="font-semibold">Fecha</TableHead>
                                                <TableHead className="font-semibold">Origen</TableHead>
                                                <TableHead className="font-semibold">Seguro</TableHead>
                                                <TableHead className="font-semibold text-center">Acción</TableHead>
                                            </TableRow>
                                        </TableHeader>

                                        <TableBody>
                                            {cuentasPacienteData
                                                .filter(
                                                    (cuenta) =>
                                                        cuenta.historia === pacienteSeleccionado?.historia
                                                )
                                                .map((cuenta) => (
                                                    <TableRow key={cuenta.id}>
                                                        <TableCell className="font-medium">{cuenta.codigo}</TableCell>
                                                        <TableCell>{cuenta.nombre}</TableCell>
                                                        <TableCell>{cuenta.fecha}</TableCell>
                                                        <TableCell>{cuenta.origen}</TableCell>
                                                        <TableCell>{cuenta.seguro}</TableCell>
                                                        <TableCell className="text-center">
                                                            <Button
                                                                type="button"
                                                                size="sm"
                                                                variant="outline"
                                                                className="h-7 px-3 border-cyan-600 text-cyan-700 hover:bg-cyan-50"
                                                                onClick={() => seleccionarCuenta(cuenta)}
                                                            >
                                                                Seleccionar
                                                            </Button>
                                                        </TableCell>
                                                    </TableRow>
                                                ))}

                                            {cuentasPacienteData.filter(
                                                (cuenta) =>
                                                    cuenta.historia === pacienteSeleccionado?.historia
                                            ).length === 0 && (
                                                    <TableRow>
                                                        <TableCell
                                                            colSpan={6}
                                                            className="h-16 text-center text-gray-500"
                                                        >
                                                            No existen cuentas registradas para este paciente.
                                                        </TableCell>
                                                    </TableRow>
                                                )}
                                        </TableBody>
                                    </Table>
                                </div>
                            </CardContent>
                        </Card>
                    )}

                    {/* REGISTRO DE INFORMACIÓN */}
                    <Card>
                        <CardContent className="px-4 py-3">
                            <h3 className="font-semibold text-cyan-700 text-sm mb-2">Registro de información</h3>

                            <div
                                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2"

                                onKeyDown={(e) => {
                                    if (e.key === "Enter") {
                                        e.preventDefault();

                                        const inputs = Array.from(
                                            e.currentTarget.querySelectorAll<HTMLInputElement>(
                                                'input:not([disabled]):not([type="hidden"])'
                                            )
                                        );

                                        const currentIndex = inputs.indexOf(
                                            e.target as HTMLInputElement
                                        );

                                        if (
                                            currentIndex !== -1 &&
                                            currentIndex < inputs.length - 1
                                        ) {
                                            inputs[currentIndex + 1].focus();
                                        } else if (
                                            currentIndex === inputs.length - 1
                                        ) {
                                            // Pasar al campo Ítem
                                            itemInputRef.current?.focus();
                                        }
                                    }
                                }}
                            >
                                {/* CUENTA */}
                                <div>
                                    <Label className="text-xs">Cuenta</Label>

                                    <Input
                                        value={cuentaSeleccionada?.codigo ?? ""}
                                        className="h-8 text-xs border-slate-300 bg-gray-100 text-gray-600 disabled:opacity-70"
                                        disabled
                                    />
                                </div>

                                {/* ORIGEN */}
                                <div>
                                    <Label className="text-xs">Origen</Label>
                                    <Input
                                        value={cuentaSeleccionada?.origen ?? ""}
                                        className="h-8 text-xs border-slate-300 bg-gray-100 text-gray-600 disabled:opacity-70"
                                        disabled
                                    />
                                </div>

                                {/* CONSULTORIO */}
                                <div className="lg:col-span-2">
                                    <Label className="text-xs">Consultorio</Label>
                                    <Input
                                        value={cuentaSeleccionada?.nombre ?? ""}
                                        className="h-8 text-xs border-slate-300 bg-gray-100 text-gray-600 disabled:opacity-70"
                                        disabled
                                    />
                                </div>

                                {/* FECHA DE CITA */}
                                <div>
                                    <Label className="text-xs">Fecha de Cita</Label>
                                    <Input
                                        type="date"
                                        value={fechaCita}
                                        onChange={(e) => setFechaCita(e.target.value)}
                                        className="h-8 text-xs border-slate-300"
                                    />
                                </div>
                            </div>
                        </CardContent>
                    </Card>


                    {/* CATÁLOGO */}
                    <Card>
                        <CardContent className="px-4 py-3">
                            <div className="mb-2">
                                <h3 className="font-semibold text-cyan-700 text-sm">Ingreso de Ítems</h3>
                            </div>

                            {/* FORMULARIO DE INGRESO */}
                            <div className="grid grid-cols-12 gap-2 mb-3">
                                <div className="col-span-7 relative">
                                    <Label className="text-xs">Ítem</Label>
                                    <Input
                                        ref={itemInputRef}
                                        value={itemBusqueda}
                                        placeholder="Escriba el nombre del ítem..."
                                        className="h-8 text-xs"
                                        autoComplete="off"
                                        onChange={(e) => {
                                            setItemBusqueda(e.target.value);
                                            setItemConfirmado(false);
                                            setIndiceSugerencia(-1);
                                            setMostrarSugerencias(e.target.value.trim().length > 0);
                                        }}
                                        onFocus={() => {
                                            if (itemBusqueda.trim().length > 0 && !itemConfirmado) {
                                                setMostrarSugerencias(true);
                                            }
                                        }}
                                        onBlur={() => {
                                            setMostrarSugerencias(false);
                                        }}
                                        onKeyDown={(e) => {
                                            if (e.key === "ArrowDown" && mostrarSugerencias && itemsFiltrados.length > 0) {
                                                e.preventDefault();
                                                setIndiceSugerencia((actual) =>
                                                    actual < itemsFiltrados.length - 1 ? actual + 1 : 0
                                                );
                                                return;
                                            }

                                            if (e.key === "ArrowUp" && mostrarSugerencias && itemsFiltrados.length > 0) {
                                                e.preventDefault();
                                                setIndiceSugerencia((actual) =>
                                                    actual > 0 ? actual - 1 : itemsFiltrados.length - 1
                                                );
                                                return;
                                            }

                                            if (e.key === "Escape" && mostrarSugerencias) {
                                                e.preventDefault();
                                                setMostrarSugerencias(false);
                                                setIndiceSugerencia(-1);
                                                return;
                                            }

                                            if (e.key === "Enter") {
                                                e.preventDefault();

                                                // Primera pulsación: seleccionar un ítem del desplegable
                                                if (mostrarSugerencias && itemsFiltrados.length > 0) {
                                                    const indice =
                                                        indiceSugerencia >= 0 ? indiceSugerencia : 0;

                                                    seleccionarItem(itemsFiltrados[indice].nombre);
                                                    return;
                                                }

                                                // Segunda pulsación: avanzar a Cantidad
                                                if (itemConfirmado) {
                                                    cantidadInputRef.current?.focus();
                                                }
                                            }
                                        }}
                                    />

                                    {mostrarSugerencias && itemBusqueda.trim().length > 0 && (
                                        <div className="absolute left-0 right-0 top-full z-50 mt-1 max-h-60 overflow-y-auto rounded-md border border-slate-200 bg-white shadow-lg">
                                            {itemsFiltrados.length > 0 ? (
                                                itemsFiltrados.map((item, index) => (
                                                    <button
                                                        key={item.codigo}
                                                        type="button"
                                                        className={`flex w-full items-center gap-3 px-3 py-2 text-left text-sm ${indiceSugerencia === index
                                                            ? "bg-cyan-100 text-cyan-900"
                                                            : "hover:bg-slate-100"
                                                            }`}
                                                        onMouseDown={(e) => {
                                                            // Evita que el input pierda el foco antes de seleccionar
                                                            e.preventDefault();
                                                        }}
                                                        onClick={() => seleccionarItem(item.nombre)}
                                                    >
                                                        <span className="shrink-0 text-xs text-slate-500">
                                                            {item.codigo}
                                                        </span>
                                                        <span>{item.nombre}</span>
                                                    </button>
                                                ))
                                            ) : (
                                                <div className="px-3 py-2 text-sm text-slate-500">
                                                    No se encontraron ítems.
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </div>

                                <div className="col-span-2">
                                    <Label className="text-xs">Cantidad</Label>

                                    <Input
                                        ref={cantidadInputRef}
                                        className="h-8 text-xs"
                                        type="number"
                                        defaultValue="1"
                                        onKeyDown={(e) => {
                                            if (e.key === "Enter") {
                                                e.preventDefault();
                                                agregarItem();
                                            }
                                        }}
                                    />
                                </div>

                                <div className="col-span-3 flex items-end">
                                    <Button
                                        type="button"
                                        onClick={agregarItem}
                                        className="w-full h-8 text-xs bg-green-600 hover:bg-green-700"
                                    >
                                        <Plus className="h-4 w-4" strokeWidth={3} />
                                        Agregar
                                    </Button>
                                </div>
                            </div>

                            {/* TABLA */}
                            <div className="border rounded-md overflow-auto">
                                <Table className="text-xs">
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead className="w-[110px] px-2 py-2 text-xs">Código CPT</TableHead>
                                            <TableHead className="w-[65px] px-2 py-2 text-xs">Item</TableHead>
                                            <TableHead className="px-2 py-2 text-xs">Nombre</TableHead>
                                            <TableHead className="w-[80px] px-2 py-2 text-xs text-center">Cantidad</TableHead>
                                            <TableHead className="w-[85px] px-2 py-2 text-xs text-right">Precio</TableHead>
                                            <TableHead className="w-[90px] px-2 py-2 text-xs text-right">Descuento</TableHead>
                                            <TableHead className="w-[100px] px-2 py-2 text-xs text-right">Importe</TableHead>
                                            <TableHead className="w-[75px] px-2 py-2 text-xs text-center">Acción</TableHead>
                                        </TableRow>
                                    </TableHeader>

                                    <TableBody>

                                        {itemsRegistrados.length > 0 ? (
                                            itemsRegistrados.map((item, index) => {
                                                const importe =
                                                    item.cantidad * item.precio - item.descuento;

                                                return (
                                                    <TableRow key={item.id}>
                                                        <TableCell className="px-2 py-2">{item.codigo}</TableCell>

                                                        <TableCell className="px-2 py-2">{index + 1}</TableCell>

                                                        <TableCell className="px-2 py-2">{item.nombre}</TableCell>

                                                        <TableCell className="px-2 py-2 text-center">
                                                            {item.cantidad}
                                                        </TableCell>

                                                        <TableCell className="px-2 py-2 text-right">
                                                            {item.precio.toFixed(2)}
                                                        </TableCell>

                                                        <TableCell className="px-2 py-2 text-right">
                                                            {item.descuento.toFixed(2)}
                                                        </TableCell>

                                                        <TableCell className="px-2 py-2 text-right font-medium">
                                                            {importe.toFixed(2)}
                                                        </TableCell>

                                                        <TableCell className="px-2 py-1 text-center">
                                                            <Button
                                                                type="button"
                                                                variant="ghost"
                                                                size="icon"
                                                                title="Eliminar ítem"
                                                                aria-label={`Eliminar ${item.nombre}`}
                                                                className="text-red-600 hover:bg-red-50 hover:text-red-700"
                                                                onClick={() => eliminarItem(item.id)}
                                                            >
                                                                <Trash2 className="h-4 w-4" />
                                                            </Button>
                                                        </TableCell>
                                                    </TableRow>
                                                );
                                            })
                                        ) : (
                                            <TableRow>
                                                <TableCell
                                                    colSpan={8}
                                                    className="h-12 text-center text-xs text-slate-500"
                                                >
                                                    No hay ítems registrados.
                                                </TableCell>
                                            </TableRow>
                                        )}
                                    </TableBody>
                                </Table>
                            </div>

                            <div className="flex justify-end items-center gap-2 mt-2">
                                <span className="text-sm font-semibold text-gray-700">Total a Pagar:</span>

                                <div className="bg-blue-50 border border-blue-200 rounded-lg px-4 py-2 min-w-[130px]">
                                    <div className="text-xl font-bold text-blue-700 text-center">
                                        S/ {totalPagar.toFixed(2)}
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* BOTONES */}
                    <div className="flex justify-end gap-3">
                        <Button
                            className="bg-green-600 hover:bg-green-700"
                        >
                            Guardar Nota de Venta
                        </Button>

                        <Button
                            variant="destructive"
                            onClick={() => setOpenEmisionNotaVenta(false)}
                        >
                            Cerrar
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>

            {/* MODAL DE ÉXITO DE COBRANZA DE CITA */}
            <Dialog
                open={showSuccessCobroCita}
                onOpenChange={setShowSuccessCobroCita}
            >
                <DialogContent
                    onPointerDownOutside={(e) => e.preventDefault()}
                    onEscapeKeyDown={(e) => e.preventDefault()}
                >
                    <div className="text-center mb-4">
                        <CheckCircle2 className="mx-auto h-12 w-12 text-green-600 mb-4" />
                        <p>La cobranza de la cita se ha realizado con éxito</p>
                    </div>

                    <div className="flex justify-center">
                        <Button
                            className="bg-green-600 hover:bg-green-700"
                            onClick={() => setShowSuccessCobroCita(false)}
                        >
                            Finalizar
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>


            {/* MODAL DE CONFIRMACIÓN DE ANULACIÓN DE NOTA DE VENTA */}

            <Dialog
                open={showConfirmAnulacion}
                onOpenChange={(open) => {
                    if (!open) {
                        setShowConfirmAnulacion(false);
                    }
                }}
            >
                <DialogContent
                    className="max-w-md"
                    onPointerDownOutside={(e) => e.preventDefault()}
                    onEscapeKeyDown={(e) => e.preventDefault()}
                >
                    <DialogHeader>
                        <div className="flex items-center gap-2">
                            <X className="h-6 w-6 text-red-600" />
                            <DialogTitle>
                                Confirmar anulación de nota de venta
                            </DialogTitle>
                        </div>

                        <DialogDescription>
                            ¿Está seguro de anular la nota de venta{" "}
                            <span className="font-semibold text-gray-900">
                                {notaVentaToAnular?.numero}
                            </span>
                            ?
                        </DialogDescription>
                    </DialogHeader>

                    <div className="space-y-4 py-2">

                        <div>
                            <Label htmlFor="motivoAnulacion">
                                Motivo de anulación
                            </Label>

                            <textarea
                                id="motivoAnulacion"
                                value={motivoAnulacion}
                                onChange={(e) => setMotivoAnulacion(e.target.value)}
                                placeholder="Ingrese el motivo de la anulación..."
                                rows={3}
                                className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
                            />
                        </div>

                        <div>
                            <Label htmlFor="autorizaAnulacion">
                                Autoriza la anulación
                            </Label>

                            <Input
                                id="autorizaAnulacion"
                                value={autorizaAnulacion}
                                onChange={(e) => setAutorizaAnulacion(e.target.value)}
                                placeholder="Ingrese el nombre de quien autoriza..."
                                className="mt-1"
                            />
                        </div>

                    </div>

                    <DialogFooter>
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => setShowConfirmAnulacion(false)}
                        >
                            Cancelar
                        </Button>

                        <Button
                            type="button"
                            className="bg-red-600 hover:bg-red-700 text-white"
                            disabled={
                                !motivoAnulacion.trim() ||
                                !autorizaAnulacion.trim()
                            }
                            onClick={confirmarAnulacion}
                        >
                            Confirmar anulación
                        </Button>
                    </DialogFooter>

                </DialogContent>
            </Dialog>


            {/* MODAL DE ÉXITO DE ANULACIÓN DE NOTA DE VENTA */}

            <Dialog
                open={showSuccessAnulacion}
                onOpenChange={setShowSuccessAnulacion}
            >
                <DialogContent
                    className="max-w-md"
                    onPointerDownOutside={(e) => e.preventDefault()}
                    onEscapeKeyDown={(e) => e.preventDefault()}
                >
                    <DialogHeader>
                        <div className="flex flex-col items-center text-center">

                            <CheckCircle className="h-12 w-12 text-green-600 mb-3" />

                            <DialogTitle>
                                Anulación realizada con éxito
                            </DialogTitle>

                            <DialogDescription className="mt-2">
                                La anulación de la nota de venta{" "}
                                <span className="font-semibold text-gray-900">
                                    {notaVentaToAnular?.numero}
                                </span>{" "}
                                se realizó correctamente.
                            </DialogDescription>

                        </div>
                    </DialogHeader>

                    <DialogFooter className="sm:justify-center">
                        <Button
                            type="button"
                            className="bg-green-600 hover:bg-green-700 text-white"
                            onClick={() => setShowSuccessAnulacion(false)}
                        >
                            Finalizar
                        </Button>
                    </DialogFooter>

                </DialogContent>
            </Dialog>


        </div>
    )
}

