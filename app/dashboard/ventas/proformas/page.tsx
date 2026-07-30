"use client"

import Link from "next/link"
import { use, useEffect, useState } from "react"
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
} from "lucide-react"
import { useRouter } from "next/navigation"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"

// Define la interfaz
interface Proforma {
    id: number;
    estado: string;
    ordenId: string;
    numReceta: string;
    cuentaId: string;
    fecha: string;
    hora: string;
    fecha_proceso: string;
    hora_proceso: string;
    numPaciente: string;
    historia: string;
    nombrePaciente: string;
    tipoSeguro: string;
    medico: string;
    nombreAlmacen: string;
    nombreConsultorio: string;
    tipoPago: string;
    total: number;
    usuario: string;
    medicamentos: {
        producto: string;
        cantSolicitada: number;
        cantAsignada: number;
        precio: string;
        importe: string;
        lote: string;
        fechaVenc: string;
    }[];
}

// DATOS DE EJEMPLO PARA LA TABLA
const proformasData = [
    {
        id: 1,
        estado: "2",
        ordenId: "1726126012",
        numReceta: "260363091",
        cuentaId: "3010196",
        fecha: "16/07/2026",
        hora: "11:12:07",
        fecha_proceso: "16/07/2026",
        hora_proceso: "18:12",
        numPaciente: "2008352165",
        historia: "09846541",
        nombrePaciente: "HERNANDEZ TORRES KIMBERLY ARMIDA",
        tipoSeguro: "SIS",
        medico: "ABANTO ARDILES YAZMIN ANDREA",
        nombreAlmacen: "CONSULTORIOS EXTERNOS",
        nombreConsultorio: "MEDICINA INTERNA 1",
        tipoPago: "R",
        total: 67.4,
        usuario: "40532847",
        medicamentos: [
            {
                producto: "PARACETAMOL 500 MG TAB",
                cantSolicitada: 10,
                cantAsignada: 5,
                precio: "S/ 2.00",
                importe: "S/ 10.00",
                lote: "LTPAR22222",
                fechaVenc: "31/10/2026",
            },
            {
                producto: "PARACETAMOL 500 MG TAB",
                cantSolicitada: 10,
                cantAsignada: 5,
                precio: "S/ 2.00",
                importe: "S/ 10.00",
                lote: "LTPAR33333",
                fechaVenc: "31/12/2026",
            },
        ],
    },
    {
        id: 2,
        estado: "2",
        ordenId: "1726126011",
        numReceta: "260363090",
        cuentaId: "3010195",
        fecha: "16/07/2026",
        hora: "11:10:25",
        fecha_proceso: "16/07/2026",
        hora_proceso: "18:12",
        numPaciente: "2008126535",
        historia: "48952215",
        nombrePaciente: "SUAREZ ORTEGA GABRIEL OCTAVIO",
        tipoSeguro: "SIS",
        medico: "DIONICIO IBAÑEZ LUIS FELIPE",
        nombreAlmacen: "CONSULTORIOS EXTERNOS",
        nombreConsultorio: "MEDICINA INTERNA 1",
        tipoPago: "R",
        total: 15.8,
        usuario: "40532847",
        medicamentos: [
            {
                producto: "PARACETAMOL 500 MG TAB",
                cantSolicitada: 10,
                cantAsignada: 5,
                precio: "S/ 2.00",
                importe: "S/ 10.00",
                lote: "LTPAR22222",
                fechaVenc: "31/10/2026",
            },
            {
                producto: "PARACETAMOL 500 MG TAB",
                cantSolicitada: 10,
                cantAsignada: 5,
                precio: "S/ 2.00",
                importe: "S/ 10.00",
                lote: "LTPAR33333",
                fechaVenc: "31/12/2026",
            },
        ],
    },
    {
        id: 3,
        estado: "2",
        ordenId: "1726126010",
        numReceta: "260363089",
        cuentaId: "3010194",
        fecha: "16/07/2026",
        hora: "11:09:35",
        fecha_proceso: "16/07/2026",
        hora_proceso: "18:12",
        numPaciente: "2008115424",
        historia: "47515642",
        nombrePaciente: "REYES SALCEDO JOSE ANTONIO",
        tipoSeguro: "PAGANTE",
        medico: "DIONICIO IBAÑEZ LUIS FELIPE",
        nombreAlmacen: "CONSULTORIOS EXTERNOS",
        nombreConsultorio: "MEDICINA INTERNA 1",
        tipoPago: "R",
        total: 26.5,
        usuario: "40532847",
        medicamentos: [
            {
                producto: "PARACETAMOL 500 MG TAB",
                cantSolicitada: 10,
                cantAsignada: 5,
                precio: "S/ 2.00",
                importe: "S/ 10.00",
                lote: "LTPAR22222",
                fechaVenc: "31/10/2026",
            },
            {
                producto: "PARACETAMOL 500 MG TAB",
                cantSolicitada: 10,
                cantAsignada: 5,
                precio: "S/ 2.00",
                importe: "S/ 10.00",
                lote: "LTPAR33333",
                fechaVenc: "31/12/2026",
            },
        ],
    },
    {
        id: 4,
        estado: "2",
        ordenId: "1726126009",
        numReceta: "260363088",
        cuentaId: "3010193",
        fecha: "16/07/2026",
        hora: "11:08:46",
        fecha_proceso: "16/07/2026",
        hora_proceso: "18:12",
        numPaciente: "2025451316",
        historia: "75486512",
        nombrePaciente: "RAMOS OJEDA ALBERTO FEDERICO",
        tipoSeguro: "SIS",
        medico: "BASOMBRIO VELAQUEZ JORGE",
        nombreAlmacen: "CONSULTORIOS EXTERNOS",
        nombreConsultorio: "CIRUGIA GENERAL",
        tipoPago: "R",
        total: 16.1,
        usuario: "40532847",
        medicamentos: [
            {
                producto: "PARACETAMOL 500 MG TAB",
                cantSolicitada: 10,
                cantAsignada: 5,
                precio: "S/ 2.00",
                importe: "S/ 10.00",
                lote: "LTPAR22222",
                fechaVenc: "31/10/2026",
            },
            {
                producto: "PARACETAMOL 500 MG TAB",
                cantSolicitada: 10,
                cantAsignada: 5,
                precio: "S/ 2.00",
                importe: "S/ 10.00",
                lote: "LTPAR33333",
                fechaVenc: "31/12/2026",
            },
        ],
    },
    {
        id: 5,
        estado: "2",
        ordenId: "1726126008",
        numReceta: "260363087",
        cuentaId: "3010192",
        fecha: "16/07/2026",
        hora: "11:06:29",
        fecha_proceso: "16/07/2026",
        hora_proceso: "18:12",
        numPaciente: "2011345165",
        historia: "73542141",
        nombrePaciente: "SANCHEZ FLORES BEATRIZ ALBERTINA",
        tipoSeguro: "PAGANTE",
        medico: "BASOMBRIO VELASQUEZ JORGE",
        nombreAlmacen: "CONSULTORIOS EXTERNOS",
        nombreConsultorio: "CIRUGIA GENERAL",
        tipoPago: "R",
        total: 8.6,
        usuario: "40532847",
        medicamentos: [
            {
                producto: "PARACETAMOL 500 MG TAB",
                cantSolicitada: 10,
                cantAsignada: 5,
                precio: "S/ 2.00",
                importe: "S/ 10.00",
                lote: "LTPAR22222",
                fechaVenc: "31/10/2026",
            },
            {
                producto: "PARACETAMOL 500 MG TAB",
                cantSolicitada: 10,
                cantAsignada: 5,
                precio: "S/ 2.00",
                importe: "S/ 10.00",
                lote: "LTPAR33333",
                fechaVenc: "31/12/2026",
            },
        ],
    },
]

const pacientesPrueba: Record<string, any> = {
  "12345678": {
    nombre: "2025001122 - CHUNGA HUAYLINOS LUIS DIEGO",
    historia: "123456878",
    seguro: "SIS",
    tipoAtencion: "CE - CONSULTA EXTERNA",
    especialidad: "1011 - MEDICINA INTERNA 1",
    medico: "DIL - DIONICIO IBAÑEZ LUIS FELIPE",
    transaccion: "VRS - SIS",
    receta: "270065000",
    cuenta: "3013144",
  },
  "41877141": {
    nombre: "2012345678 - HILARIO GARCIA MIGUEL ANGEL",
    historia: "41877141",
    seguro: "PAGANTE",
    tipoAtencion: "CE - CONSULTA EXTERNA",
    especialidad: "2021 - CIRUGÍA GENERAL",
    medico: "BVJ - BASOMBRIO VELASQUEZ JORGE",
    transaccion: "VC - CONTADO",
    receta: "270065100",
    cuenta: "3013145",
  },
};


export default function SalidasPage() {
    const [searchTerm, setSearchTerm] = useState("");
    const [searchBy, setSearchBy] = useState("ordenId");
    const [selectedItems, setSelectedItems] = useState<number[]>([]);
    const [proformasVisibles, setProformasVisibles] = useState<any[]>([]);
    const [modalNuevaProforma, setModalNuevaProforma] = useState(false);
    const [dni, setDni] = useState("");
    const [dniValidado, setDniValidado] = useState(false);
    const [error, setError] = useState("");
    const [modalHistorial, setModalHistorial] = useState(false);
    const [modalEditarCantidad, setModalEditarCantidad] = useState(false);
    const [medicamentoSeleccionado, setMedicamentoSeleccionado] = useState<any>(null);
    const router = useRouter();
    const hoy = new Date();
    const primerDiaMes = new Date(hoy.getFullYear(), hoy.getMonth(), 1);
    const [fechaActual, setFechaActual] = useState("");
    const [horaActual, setHoraActual] = useState("");
    const [pacienteExterno, setPacienteExterno] = useState(false);
    const [producto, setProducto] = useState("");
    const [cantidad, setCantidad] = useState("");
    const [medicamentos, setMedicamentos] = useState<
        { producto: string; cantidad: string }[]
    >([]);
    const [mostrarConfirmacion, setMostrarConfirmacion] = useState(false);
    const [mostrarExito, setMostrarExito] = useState(false);
    const [mostrarDetalle, setMostrarDetalle] = useState(false);
    const [proformaSeleccionada, setProformaSeleccionada] = useState<Proforma | null>(null);
    const [mostrarConfirmacionAnular, setMostrarConfirmacionAnular] = useState(false);
    const [mostrarExitoAnular, setMostrarExitoAnular] = useState(false);
    const [motivoAnulacion, setMotivoAnulacion] = useState("");
    const [pacienteData, setPacienteData] = useState<any | null>(null);

    // Formatear a yyyy-MM-dd para que el input type="date" lo acepte
    const formatoISO = (fecha: Date) => fecha.toISOString().split("T")[0];
    const [fechaInicio, setFechaInicio] = useState(formatoISO(primerDiaMes));
    const [fechaFin, setFechaFin] = useState(formatoISO(hoy));

    // Al montar el componente, inicializa fecha y hora
    useEffect(() => {
        const ahora = new Date();
        const opcionesFecha: Intl.DateTimeFormatOptions = { day: "2-digit", month: "2-digit", year: "numeric" };
        const opcionesHora: Intl.DateTimeFormatOptions = { hour: "2-digit", minute: "2-digit", second: "2-digit" };

        setFechaActual(ahora.toLocaleDateString("es-PE", opcionesFecha));
        setHoraActual(ahora.toLocaleTimeString("es-PE", opcionesHora));

        // Actualizar hora cada segundo
        const intervalo = setInterval(() => {
            const ahora = new Date();
            setHoraActual(ahora.toLocaleTimeString("es-PE", opcionesHora));
        }, 1000);

        return () => clearInterval(intervalo);
    }, []);

    const opcionesBusqueda = [
        { value: "ordenId", label: "Orden ID" },
        { value: "receta", label: "N° Receta" },
        { value: "historia", label: "Historia Clínica" },
        { value: "paciente", label: "Paciente" },
    ];

    // INICIALIZAR CUANDO CARGUE LA PÁGINA
    useEffect(() => {
        setProformasVisibles(proformasData);
    }, [proformasData]);

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

    const filtrarProformas = () => {
        return proformasData.filter((proforma) => {
            // convertir fecha del registro (ej. "16/07/2026") a Date
            // --- FILTRO POR FECHA ---
            const [dia, mes, anio] = proforma.fecha.split("/");
            const fechaRegistro = new Date(`${anio}-${mes}-${dia}`);
            const inicio = fechaInicio ? new Date(fechaInicio) : null; // ya es ISO
            const fin = fechaFin ? new Date(fechaFin) : null;          // ya es ISO

            if (inicio && fechaRegistro < inicio) return false;
            if (fin && fechaRegistro > fin) return false;

            // --- FILTRO POR BÚSQUEDA ---
            if (searchTerm) {
                let campo = "";
                switch (searchBy) {
                    case "ordenId":
                        campo = proforma.ordenId;
                        break;
                    case "receta":
                        campo = proforma.numReceta;
                        break;
                    case "historia":
                        campo = proforma.historia;
                        break;
                    case "paciente":
                        campo = proforma.nombrePaciente;
                        break;
                    default:
                        campo = "";
                }

                if (!campo.toLowerCase().includes(searchTerm.toLowerCase())) {
                    return false;
                }
            }

            return true;
        });
    };

    // LIMPIAR FILTROS DE BÚSQUEDA
    const limpiarFiltros = () => {
        // resetear búsqueda
        setSearchBy("ordenId"); // valor inicial del combobox
        setSearchTerm(""); // limpiar input de búsqueda

        // resetear fechas
        setFechaInicio(formatoISO(primerDiaMes)); // fecha inicial (primer día del mes)
        setFechaFin(formatoISO(hoy)); // fecha final (hoy)

        // si manejas selección de filas
        setSelectedItems([]);
    };


    return (
        <div className="container mx-auto py-6">
            <div className="flex items-center gap-4 mb-4">
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
                    <h1 className="text-3xl font-bold tracking-tight">Módulo de Proformas de Consulta Externa</h1>
                    <p className="text-muted-foreground">Gestione la emisión de proformas con el detalle y costo estimado de los medicamentos solicitados por el paciente antes de la venta</p>
                </div>
            </div>

            <div className="flex items-center py-4 justify-between">
                <div className="flex items-end gap-4">
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
                    <Button variant="outline" size="sm" className="gap-1" onClick={limpiarFiltros}>
                        <Eraser className="h-4 w-4" />
                        Limpiar Filtros
                    </Button>

                    <Button variant="outline" size="sm" className="gap-1">
                        <RefreshCw className="h-4 w-4" />
                        Actualizar
                    </Button>

                    <Button
                        className="bg-teal-600 hover:bg-teal-700 text-white gap-2 font-semibold"
                        size="sm"
                        onClick={() => setModalNuevaProforma(true)}
                    >
                        <Plus className="h-4 w-4" strokeWidth={3} />
                        Nueva Proforma
                    </Button>
                </div>
            </div>

            <div className="overflow-x-auto border rounded-md">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Estado</TableHead>
                            <TableHead>Orden ID</TableHead>
                            <TableHead>Número de Receta</TableHead>
                            <TableHead>Paciente</TableHead>
                            <TableHead>Historia</TableHead>
                            <TableHead>Tipo de Seguro</TableHead>
                            <TableHead>Fecha</TableHead>
                            <TableHead>Almacén</TableHead>
                            <TableHead>Total (S/.)</TableHead>
                            <TableHead>Usuario</TableHead>
                            <TableHead>Acciones</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {filtrarProformas().map((proforma) => (
                            <TableRow key={proforma.id} className={selectedItems.includes(proforma.id) ? "bg-primary/10" : ""}>
                                <TableCell>{getEstadoBadge(proforma.estado)}</TableCell>
                                <TableCell className="font-medium">{proforma.ordenId}</TableCell>
                                <TableCell className="font-medium">{proforma.numReceta}</TableCell>
                                <TableCell>
                                    <div className="font-mediunm">{proforma.nombrePaciente}</div>
                                    <div className="text-sm text-gray-500">{proforma.numPaciente}</div>
                                </TableCell>
                                <TableCell className="font-medium">{proforma.historia}</TableCell>
                                <TableCell className="font-medium">{proforma.tipoSeguro}</TableCell>
                                <TableCell>
                                    <div className="font-medium">{proforma.fecha}</div>
                                    <div className="text-sm text-gray-500">{proforma.hora}</div>
                                </TableCell>
                                <TableCell className="font-medium">{proforma.nombreAlmacen}</TableCell>
                                <TableCell>{proforma.total.toFixed(2)}</TableCell>
                                <TableCell>{proforma.usuario}</TableCell>
                                <TableCell>
                                    <div className="flex space-x-2">
                                        <Button
                                            title="Ver detalle"
                                            variant="outline"
                                            className="h-8 w-10 p-1.5 border-blue-600 text-blue-600 hover:bg-blue-50 flex items-center justify-center"
                                            onClick={() => {
                                                setProformaSeleccionada(proforma);
                                                setMostrarDetalle(true);
                                            }}
                                        >
                                            <Eye className="w-4 h-4" />
                                        </Button>
                                        <Button
                                            title="Anular documento"
                                            variant="outline"
                                            className="h-8 w-10 p-1.5 border-red-600 text-red-600 hover:bg-red-50 flex items-center justify-center"
                                            onClick={() => {
                                                setProformaSeleccionada(proforma);
                                                setMostrarConfirmacionAnular(true);
                                            }}
                                            disabled={proforma.estado === "3"}
                                        >
                                            <X className="w-4 h-4" />
                                        </Button>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>

            {/* MODAL DE DETALLE DE LA PROFORMA GENERADA */}
            {mostrarDetalle && proformaSeleccionada && (
                <div className="fixed inset-0 flex items-center justify-center bg-black/50">
                    <div className="bg-white rounded-md shadow-lg p-6 max-w-7xl w-full">
                        {/* Encabezado con título y botón X */}
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-lg font-semibold">Detalle de Proforma</h2>
                            <button
                                onClick={() => setMostrarDetalle(false)}
                                className="text-gray-500 hover:text-gray-700"
                            >
                                <X className="h-5 w-5" />
                            </button>
                        </div>

                        {/* Datos del paciente */}
                        <div className="mb-4">
                            <p><strong>Paciente:</strong> {proformaSeleccionada.nombrePaciente}</p>
                            <p><strong>Historia:</strong> {proformaSeleccionada.historia}</p>
                            <p><strong>Seguro:</strong> {proformaSeleccionada.tipoSeguro}</p>
                            <p><strong>Médico:</strong> {proformaSeleccionada.medico}</p>
                        </div>

                        {/* Botón historial */}
                        <Button variant="outline" className="mb-4">Ver historial de recetas</Button>

                        {/* Tabla de medicamentos */}
                        <div className="overflow-x-auto">
                            <table className="min-w-full border-collapse border border-gray-300">
                                <thead className="bg-blue-900 text-white">
                                    <tr>
                                        <th className="border px-3 py-2">Producto</th>
                                        <th className="border px-3 py-2">Cant. Solicitada</th>
                                        <th className="border px-3 py-2">Cant. Asignada</th>
                                        <th className="border px-3 py-2">Precio</th>
                                        <th className="border px-3 py-2">Importe</th>
                                        <th className="border px-3 py-2">Lote</th>
                                        <th className="border px-3 py-2">F. Venc.</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {proformaSeleccionada.medicamentos.map((med, idx) => (
                                        <tr key={idx}>
                                            <td className="border px-3 py-2">{med.producto}</td>
                                            <td className="border px-3 py-2">{med.cantSolicitada}</td>
                                            <td className="border px-3 py-2">{med.cantAsignada}</td>
                                            <td className="border px-3 py-2">{med.precio}</td>
                                            <td className="border px-3 py-2">{med.importe}</td>
                                            <td className="border px-3 py-2">{med.lote}</td>
                                            <td className="border px-3 py-2">{med.fechaVenc}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {/* Botón cerrar */}
                        <div className="flex justify-end mt-4">
                            <Button variant="outline" onClick={() => setMostrarDetalle(false)}>Cerrar</Button>
                        </div>
                    </div>
                </div>
            )}

            {/* MODAL DE CONFIRMACIÓN DE ANULACIÓN DE PROFORMA */}
            {mostrarConfirmacionAnular && proformaSeleccionada && (
                <div className="fixed inset-0 flex items-center justify-center bg-black/50">
                    <div className="bg-white rounded-md shadow-lg p-6 max-w-md w-full">
                        <div className="flex items-center gap-2 mb-4">
                            <AlertTriangle className="h-6 w-6 text-yellow-600" />
                            <h2 className="text-lg font-semibold">Confirmar anulación</h2>
                        </div>
                        <p className="mb-4 text-gray-700">
                            ¿Está seguro de anular la proforma? Esta acción no se podrá deshacer.
                        </p>

                        <div className="mb-4">
                            <Label htmlFor="motivo" className="block mb-1 text-sm font-medium text-gray-700">
                                Escriba el motivo de la anulación:
                            </Label>
                            <textarea
                                id="motivo"
                                className="w-full border rounded-md p-2 text-sm"
                                rows={3}
                                value={motivoAnulacion}
                                onChange={(e) => setMotivoAnulacion(e.target.value)}
                                placeholder="Ingrese motivo..."
                            />

                            {motivoAnulacion.length > 0 && motivoAnulacion.length < 10 && (
                                <p className="text-red-600 text-sm mt-1">
                                    El motivo debe tener al menos 10 caracteres.
                                </p>
                            )}
                        </div>

                        <div className="flex justify-end gap-2">
                            <Button 
                                variant="outline"
                                onClick={() => {
                                    setMostrarConfirmacionAnular(false);
                                    setMotivoAnulacion("");
                                }}
                            >
                                Cancelar
                            </Button>
                            <Button
                                className="bg-red-600 hover:bg-red-700 text-white"
                                disabled={motivoAnulacion.trim().length < 10}
                                onClick={() => {
                                    setMostrarConfirmacionAnular(false);
                                    setMostrarExitoAnular(true);
                                }}
                            >
                                Confirmar
                            </Button>
                        </div>
                    </div>
                </div>
            )}

            {/* MODAL DE ÉXITO DE ANULACIÓN */}
            {mostrarExitoAnular && proformaSeleccionada && (
                <div className="fixed inset-0 flex items-center justify-center bg-black/50">
                    <div className="bg-white rounded-md shadow-lg p-6 max-w-md w-full">
                        <div className="flex items-center gap-2 mb-4">
                            <CheckCircle className="h-6 w-6 text-green-600" />
                            <h2 className="text-lg font-semibold">Proforma anulada</h2>
                        </div>
                        <p className="mb-4 text-gray-700">
                            La proforma se anuló con éxito.
                        </p>
                        <div className="flex justify-end">
                            <Button
                                className="bg-blue-600 hover:bg-blue-700 text-white"
                                onClick={() => {
                                    setMostrarExitoAnular(false);
                                    // Simulación: cambiar estado a "ANULADO"
                                    if (proformaSeleccionada) {
                                        proformaSeleccionada.estado = "3"; // nuevo estado
                                    }
                                }}
                            >
                                Finalizar
                            </Button>
                        </div>
                    </div>
                </div>
            )}

            {/* MODAL DE REGISTRO DE NUEVA PROFORMA DE VENTA */}
            {modalNuevaProforma && (
                <div className="fixed inset-0 flex items-center justify-center bg-black/50">
                    <div className="bg-white rounded-md shadow-lg p-6 max-w-7xl w-full max-h-[90vh] overflow-y-auto relative">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-lg font-semibold">Registrar Proforma</h2>

                            {/* Bloque de fecha y hora */}
                            <div className="text-right text-sm flex gap-4">
                                <div className="bg-blue-100 text-blue-900 font-semibold px-3 py-1 rounded">
                                    Fecha: {fechaActual}
                                </div>
                                <div className="bg-blue-100 text-blue-900 font-semibold px-3 py-1 rounded">
                                    Hora: {horaActual}
                                </div>
                            </div>

                            <button
                                onClick={() => {
                                    setModalNuevaProforma(false);
                                    setDniValidado(false); // reinicia validación
                                    setDni(""); // limpia input
                                    setError(""); // limpia mensaje de error
                                    setPacienteExterno(false);
                                    setMedicamentos([]); // limpia la tabla al cerrar
                                }}
                                className="text-gray-500 hover:text-red-600"
                            >
                                <X className="h-5 w-5" />
                            </button>
                        </div>

                        {/* Aquí va tu formulario */}
                        <form>
                            <div className="flex items-center gap-4 mb-4">
                                <Label htmlFor="documento" className="w-48">
                                    Documento de identidad del paciente:
                                </Label>

                                {/* Contenedor vertical para input + error */}
                                <div className="flex flex-col">
                                    <Input
                                        id="documento"
                                        type="text"
                                        placeholder="Ingrese DNI"
                                        autoComplete="off"
                                        className={`border p-2 h-10 w-40 ${error ? "border-red-500" : ""}`}
                                        value={dni}
                                        onChange={(e) => {
                                            setDni(e.target.value);
                                            setError(""); // limpia error al escribir
                                        }}
                                        disabled={pacienteExterno}
                                    />
                                </div>

                                <Button
                                    type="button"
                                    className="bg-blue-600 hover:bg-blue-700 text-white h-10 px-4"
                                    onClick={() => {
                                        if (dni.trim().length === 0) {
                                            setError("Debe ingresar un número de documento.");
                                            setDniValidado(false);
                                        } else if (dni.trim().length < 8) {
                                            setError("El documento debe tener al menos 8 caracteres");
                                            setDniValidado(false);
                                        } else if (!pacientesPrueba[dni.trim()]) {
                                            setError("No se encontró paciente con ese DNI en la data de prueba");
                                            setDniValidado(false);
                                        } else {
                                            setError("");
                                            setPacienteData(pacientesPrueba[dni.trim()]);
                                            setDniValidado(true); // despliega datos solo si cumple
                                        }
                                    }}
                                    disabled={pacienteExterno}
                                >
                                    Validar
                                </Button>

                                {/* Checkbox Paciente Externo */}
                                <div className="flex items-center gap-2 ml-6">
                                    <input
                                        id="pacienteExterno"
                                        type="checkbox"
                                        className={`h-4 w-4 ${dniValidado ? "cursor-not-allowed opacity-50" : ""}`}
                                        checked={pacienteExterno}
                                        onChange={(e) => {
                                            setPacienteExterno(e.target.checked);
                                            if (!e.target.checked) {
                                                setMedicamentos([]); // limpia la tabla al desmarcar
                                            }
                                        }}
                                        disabled={dniValidado}
                                        title={dniValidado ? "Deshabilitado porque ya se validó un DNI" : ""}
                                    />
                                    <Label
                                        htmlFor="pacienteExterno"
                                        className={`text-sm ${dniValidado ? "text-gray-400" : ""}`}
                                        title={dniValidado ? "Deshabilitado porque ya se validó un DNI" : ""}
                                    >
                                        Paciente Externo
                                    </Label>
                                </div>

                                {/* Botón Resetear: visible si el DNI fue validado o si es paciente externo */}
                                {(dniValidado || pacienteExterno) && (
                                    <div className="ml-auto">
                                        <Button
                                            type="button"
                                            className="bg-gray-500 hover:bg-gray-600 text-white h-10 px-4 flex items-center gap-2"
                                            onClick={() => {
                                                setDni("");
                                                setError("");
                                                setDniValidado(false);
                                                setPacienteExterno(false);
                                                setMedicamentos([]);   // limpia la tabla también
                                            }}
                                        >
                                            <RefreshCcw className="h-4 w-4" />
                                            Resetear
                                        </Button>
                                    </div>
                                )}

                            </div>

                            {/* Contenedor de error debajo de los campos iniciales */}
                            {error && (
                                <div className="border rounded-md p-4 mb-4 bg-red-100">
                                    <p className="text-red-800 font-semibold">{error}</p>
                                </div>
                            )}

                            {/* Campos condicionales: aparecen solo si se validó el DNI */}
                            {dniValidado && pacienteData && (
                                <>
                                    {/* Contenedor de mensaje de receta */}
                                    <div className="border rounded-md p-4 mb-4 bg-green-100">
                                        <p className="text-green-800 font-semibold">
                                            El paciente cuenta con una receta registrada dentro del sistema
                                        </p>
                                    </div>

                                    {/* Contenedor de datos del paciente */}
                                    <div className="border rounded-md p-4 mb-4 bg-gray-50">
                                        <h3 className="text-md font-semibold mb-3">Datos del paciente</h3>

                                        <div className="grid grid-cols-3 gap-4">
                                            <div>
                                                <Label className="block mb-1">Paciente:</Label>
                                                <p className="text-gray-700 font-medium">{pacienteData.nombre}</p>
                                            </div>
                                            <div>
                                                <Label className="block mb-1">Historia/DNI:</Label>
                                                <p className="text-gray-700 font-medium">{pacienteData.historia}</p>
                                            </div>
                                            <div>
                                                <Label className="block mb-1">Seguro:</Label>
                                                <p className="text-gray-700 font-medium">{pacienteData.seguro}</p>
                                            </div>
                                            <div>
                                                <Label className="block mb-1">Tipo de Atención:</Label>
                                                <p className="text-gray-700 font-medium">{pacienteData.seguro}</p>
                                            </div>
                                            <div>
                                                <Label className="block mb-1">Especialidad:</Label>
                                                <p className="text-gray-700 font-medium">{pacienteData.tipoAtencion}</p>
                                            </div>
                                            <div>
                                                <Label className="block mb-1">Médico:</Label>
                                                <p className="text-gray-700 font-medium">{pacienteData.medico}</p>
                                            </div>
                                            <div>
                                                <Label className="block mb-1">Transacción:</Label>
                                                <p className="text-gray-700 font-medium">{pacienteData.transaccion}</p>
                                            </div>
                                            <div>
                                                <Label className="block mb-1">N° Receta:</Label>
                                                <p className="text-gray-700 font-medium">{pacienteData.receta}</p>
                                            </div>
                                            <div>
                                                <Label className="block mb-1">Cuenta:</Label>
                                                <p className="text-gray-700 font-medium">{pacienteData.cuenta}</p>
                                            </div>
                                            {/* Comentario ocupa toda la fila */}
                                            <div className="col-span-3">
                                                <Label className="block mb-1">Comentario:</Label>
                                                <input
                                                    className="border-2 border-gray-500 rounded-md p-2 w-full"
                                                    placeholder="Ingrese comentario..."
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Botón Ver historial de recetas */}
                                    <div className="mb-4">
                                        <Button
                                            type="button"
                                            className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md"
                                            onClick={() => setModalHistorial(true)}
                                        >
                                            <FileText className="w-4 h-4" />
                                            Ver historial de recetas
                                        </Button>
                                    </div>

                                    {/* Tabla de medicamentos */}
                                    <div className="border rounded-md p-4 mb-4 bg-white">
                                        <h3 className="text-md font-semibold">Medicamentos registrados</h3>
                                        <div className="flex items-center text-sm text-gray-600 mb-3 gap-2">
                                            <Stethoscope className="h-4 w-4 text-gray-500" />
                                            <span>Médico: DIONICIO IBAÑEZ LUIS FELIPE</span>
                                        </div>

                                        <div className="overflow-x-auto">
                                            <table className="min-w-full border-collapse border border-gray-300">
                                                <thead className="bg-blue-900 text-white">
                                                    <tr>
                                                        <th className="border border-gray-300 px-3 py-2 text-left">Item</th>
                                                        <th className="border border-gray-300 px-3 py-2 text-left">Producto</th>
                                                        <th className="border border-gray-300 px-3 py-2 text-left">SISMED / SIGA</th>
                                                        <th className="border border-gray-300 px-3 py-2 text-left">Cant. Solicitada</th>
                                                        <th className="border border-gray-300 px-3 py-2 text-left">Cant. Asignada</th>
                                                        <th className="border border-gray-300 px-3 py-2 text-left">Precio</th>
                                                        <th className="border border-gray-300 px-3 py-2 text-left">Importe</th>
                                                        <th className="border border-gray-300 px-3 py-2 text-left">Lote</th>
                                                        <th className="border border-gray-300 px-3 py-2 text-left">F. Venc.</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {/* Datos de prueba estáticos */}
                                                    <tr>
                                                        <td className="border border-gray-300 px-3 py-2" rowSpan={2}>1</td>
                                                        <td className="border border-gray-300 px-3 py-2" rowSpan={2}>
                                                            PARACETAMOL 500 MG
                                                            <div className="font-bold text-gray-700">TAB</div>
                                                        </td>
                                                        <td className="border border-gray-300 px-3 py-2" rowSpan={2}>
                                                            <div><span className="font-semibold">SISMED:</span> 05335</div>
                                                            <div><span className="font-semibold">SIGA:</span> 580200460011</div>
                                                        </td>
                                                        <td className="border border-gray-300 px-3 py-2" rowSpan={2}>10</td>

                                                        {/* Subfila 1 */}
                                                        <td className="border border-gray-300 px-3 py-2">
                                                            <span className="bg-green-100 text-green-700 font-semibold px-2 py-1 rounded">
                                                                5
                                                            </span>
                                                        </td>
                                                        <td className="border border-gray-300 px-3 py-2">S/ 2.00</td>
                                                        <td className="border border-gray-300 px-3 py-2">S/ 10.00</td>
                                                        <td className="border border-gray-300 px-3 py-2">
                                                            <span className="bg-blue-100 text-blue-700 font-medium px-2 py-1 rounded">
                                                                LTPAR22222
                                                            </span>
                                                        </td>
                                                        <td className="border border-gray-300 px-3 py-2">31/10/2026</td>
                                                    </tr>
                                                    <tr>
                                                        {/* Subfila 2 */}
                                                        <td className="border border-gray-300 px-3 py-2">
                                                            <span className="bg-green-100 text-green-700 font-semibold px-2 py-1 rounded">
                                                                5
                                                            </span>
                                                        </td>
                                                        <td className="border border-gray-300 px-3 py-2">S/ 2.00</td>
                                                        <td className="border border-gray-300 px-3 py-2">S/ 10.00</td>
                                                        <td className="border border-gray-300 px-3 py-2">
                                                            <span className="bg-blue-100 text-blue-700 font-medium px-2 py-1 rounded">
                                                                LTPAR33333
                                                            </span>
                                                        </td>
                                                        <td className="border border-gray-300 px-3 py-2">31/12/2026</td>
                                                    </tr>
                                                    <tr>
                                                        <td className="border border-gray-300 px-3 py-2">2</td>
                                                        <td className="border border-gray-300 px-3 py-2">
                                                            AMOXICILINA 500 MG
                                                            <div className="font-bold text-gray-700">TAB</div>
                                                        </td>
                                                        <td className="border border-gray-300 px-3 py-2">
                                                            <div><span className="font-semibold">SISMED:</span> 00808</div>
                                                            <div><span className="font-semibold">SIGA:</span> 580700100007</div>
                                                        </td>
                                                        <td className="border border-gray-300 px-3 py-2">7</td>
                                                        <td className="border border-gray-300 px-3 py-2">
                                                            <span className="bg-green-100 text-green-700 font-semibold px-2 py-1 rounded">
                                                                7
                                                            </span>
                                                        </td>
                                                        <td className="border border-gray-300 px-3 py-2">S/ 3.50</td>
                                                        <td className="border border-gray-300 px-3 py-2">S/ 24.50</td>
                                                        <td className="border border-gray-300 px-3 py-2">
                                                            <span className="bg-blue-100 text-blue-700 font-medium px-2 py-1 rounded">
                                                                LTAMOX210702
                                                            </span>
                                                        </td>
                                                        <td className="border border-gray-300 px-3 py-2">30/09/2026</td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>

                                    {modalEditarCantidad && (
                                        <div className="fixed inset-0 flex items-center justify-center bg-black/50">
                                            <div className="bg-white rounded-md shadow-lg p-6 max-w-md w-full relative">
                                                <div className="flex justify-between items-center mb-4">
                                                    <h2 className="text-lg font-semibold">Editar cantidad</h2>
                                                    <button
                                                        onClick={() => setModalEditarCantidad(false)}
                                                        className="text-gray-500 hover:text-red-600"
                                                    >
                                                        <X className="h-5 w-5" />
                                                    </button>
                                                </div>

                                                {medicamentoSeleccionado && (
                                                    <div className="space-y-4">
                                                        <p className="text-gray-700">
                                                            <span className="font-semibold">Medicamento:</span> {medicamentoSeleccionado.nombre}
                                                        </p>
                                                        <p className="text-gray-700">
                                                            <span className="font-semibold">Cantidad actual:</span> {medicamentoSeleccionado.cantidad}
                                                        </p>

                                                        {/* Nueva cantidad */}
                                                        <div className="flex items-center gap-2">
                                                            <Label className="w-32">Nueva cantidad:</Label>
                                                            <input
                                                                type="number"
                                                                className="border-2 border-gray-400 rounded-md p-2 w-32"
                                                                placeholder="Ingrese nueva cantidad"
                                                            />
                                                        </div>

                                                        {/* Motivo */}
                                                        <div>
                                                            <Label className="block mb-1">Motivo:</Label>
                                                            <textarea
                                                                className="border-2 border-gray-400 rounded-md p-2 w-full h-24"
                                                                placeholder="Explique el motivo del cambio..."
                                                            />
                                                        </div>

                                                        {/* Botón confirmar */}
                                                        <div className="flex justify-end">
                                                            <Button
                                                                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md"
                                                                onClick={() => {
                                                                    console.log("Confirmar cambio de cantidad");
                                                                    setModalEditarCantidad(false);
                                                                }}
                                                            >
                                                                Confirmar
                                                            </Button>
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    )}

                                    {modalHistorial && (
                                        <div className="fixed inset-0 flex items-center justify-center bg-black/50">
                                            <div className="bg-white rounded-md shadow-lg p-6 max-w-6xl w-full max-h-[90vh] overflow-y-auto relative">
                                                <div className="flex justify-between items-center mb-4">
                                                    <h2 className="text-lg font-semibold">Historial de recetas</h2>
                                                    <button
                                                        onClick={() => setModalHistorial(false)}
                                                        className="text-gray-500 hover:text-red-600"
                                                    >
                                                        <X className="h-5 w-5" />
                                                    </button>
                                                </div>

                                                {/* Tabla de historial */}
                                                <div className="overflow-x-auto">
                                                    <table className="min-w-full border-collapse border border-gray-300">
                                                        <thead className="bg-blue-800 text-white">
                                                            <tr>
                                                                <th className="border border-gray-300 px-3 py-2 text-left">Fecha</th>
                                                                <th className="border border-gray-300 px-3 py-2 text-left">Tipo de Seguro</th>
                                                                <th className="border border-gray-300 px-3 py-2 text-left">Servicio</th>
                                                                <th className="border border-gray-300 px-3 py-2 text-left">Fármaco</th>
                                                                <th className="border border-gray-300 px-3 py-2 text-left">Cantidad</th>
                                                                <th className="border border-gray-300 px-3 py-2 text-left">Indicación</th>
                                                                <th className="border border-gray-300 px-3 py-2 text-left">Vía</th>
                                                                <th className="border border-gray-300 px-3 py-2 text-left">Diagnóstico</th>
                                                                <th className="border border-gray-300 px-3 py-2 text-left">Médico</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {/* Datos de prueba estáticos */}
                                                            <tr>
                                                                <td className="border border-gray-300 px-3 py-2">15/07/2026</td>
                                                                <td className="border border-gray-300 px-3 py-2">SIS</td>
                                                                <td className="border border-gray-300 px-3 py-2">CE</td>
                                                                <td className="border border-gray-300 px-3 py-2">
                                                                    <div>PARACETAMOL 500 MG</div>
                                                                    <span className="inline-block bg-blue-600 text-white text-xs font-semibold px-2 py-1 rounded mt-1">
                                                                        TAB
                                                                    </span>
                                                                </td>
                                                                <td className="border border-gray-300 px-3 py-2">28</td>
                                                                <td className="border border-gray-300 px-3 py-2">1 cada 6 hrs por 7 días</td>
                                                                <td className="border border-gray-300 px-3 py-2">Oral</td>
                                                                <td className="border border-gray-300 px-3 py-2">J110 - Influenza con Neumonía, Virus no Identificado</td>
                                                                <td className="border border-gray-300 px-3 py-2">DIONICIO IBAÑEZ LUIS FELIPE</td>
                                                            </tr>
                                                            <tr>
                                                                <td className="border border-gray-300 px-3 py-2">10/07/2026</td>
                                                                <td className="border border-gray-300 px-3 py-2">SIS</td>
                                                                <td className="border border-gray-300 px-3 py-2">EM</td>
                                                                <td className="border border-gray-300 px-3 py-2">
                                                                    <div>AMOXICILINA 500 MG</div>
                                                                    <span className="inline-block bg-blue-600 text-white text-xs font-semibold px-2 py-1 rounded mt-1">
                                                                        TAB
                                                                    </span>
                                                                </td>
                                                                <td className="border border-gray-300 px-3 py-2">12</td>
                                                                <td className="border border-gray-300 px-3 py-2">1 cada 3 hrs por 4 días</td>
                                                                <td className="border border-gray-300 px-3 py-2">Oral</td>
                                                                <td className="border border-gray-300 px-3 py-2">J209 - Bronquitis Aguda, no Especificada</td>
                                                                <td className="border border-gray-300 px-3 py-2">BASOMBRIO VELASQUEZ JORGE</td>
                                                            </tr>
                                                            <tr>
                                                                <td className="border border-gray-300 px-3 py-2">08/07/2026</td>
                                                                <td className="border border-gray-300 px-3 py-2">SIS</td>
                                                                <td className="border border-gray-300 px-3 py-2">EM</td>
                                                                <td className="border border-gray-300 px-3 py-2">
                                                                    <div>NAPROXENO 500 MG</div>
                                                                    <span className="inline-block bg-blue-600 text-white text-xs font-semibold px-2 py-1 rounded mt-1">
                                                                        TAB
                                                                    </span>
                                                                </td>
                                                                <td className="border border-gray-300 px-3 py-2">14</td>
                                                                <td className="border border-gray-300 px-3 py-2">1 cada 12 hrs por 7 días</td>
                                                                <td className="border border-gray-300 px-3 py-2">Oral</td>
                                                                <td className="border border-gray-300 px-3 py-2">J410 - Bronquitis Cronica Simple</td>
                                                                <td className="border border-gray-300 px-3 py-2">BASOMBRIO VELASQUEZ JORGE</td>
                                                            </tr>
                                                            <tr>
                                                                <td className="border border-gray-300 px-3 py-2">05/07/2026</td>
                                                                <td className="border border-gray-300 px-3 py-2">SIS</td>
                                                                <td className="border border-gray-300 px-3 py-2">CE</td>
                                                                <td className="border border-gray-300 px-3 py-2">
                                                                    <div>TRAMADOL 50 MG TAB (S)</div>
                                                                    <span className="inline-block bg-blue-600 text-white text-xs font-semibold px-2 py-1 rounded mt-1">
                                                                        TAB
                                                                    </span>
                                                                </td>
                                                                <td className="border border-gray-300 px-3 py-2">30</td>
                                                                <td className="border border-gray-300 px-3 py-2">1 cada 24 hrs por 30 días</td>
                                                                <td className="border border-gray-300 px-3 py-2">Oral</td>
                                                                <td className="border border-gray-300 px-3 py-2">J40X - Bronquiti, no Especificada como Aguda o Cronica</td>
                                                                <td className="border border-gray-300 px-3 py-2">BASOMBRIO VELASQUEZ JORGE</td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </>
                            )}

                            {pacienteExterno && (
                                <>
                                    <div className="border rounded-md p-4 mb-4 bg-yellow-100">
                                        <p className="text-yellow-900 font-semibold">
                                            Debe registrar manualmente los datos de la venta de medicamentos para el paciente externo.
                                        </p>
                                    </div>

                                    {/* Sección de datos del paciente */}
                                    <div className="border rounded-md p-4 mb-4 bg-gray-50">
                                        <h3 className="text-md font-semibold mb-3">Datos del paciente</h3>

                                        <div className="grid grid-cols-3 gap-4">
                                            <div>
                                                <Label>Paciente:</Label>
                                                <Input className="border-2 border-gray-500" type="text" placeholder="Ingrese nombre completo" />
                                            </div>
                                            <div>
                                                <Label>Historia/DNI:</Label>
                                                <Input className="border-2 border-gray-500" type="text" placeholder="Ingrese DNI" />
                                            </div>
                                            <div>
                                                <Label>Seguro:</Label>
                                                <Input className="border-2 border-gray-500" type="text" placeholder="Ingrese seguro" />
                                            </div>
                                            <div>
                                                <Label>Tipo de Atención:</Label>
                                                <Input className="border-2 border-gray-500" type="text" placeholder="Ingrese tipo de atención" />
                                            </div>
                                            <div>
                                                <Label>Especialidad:</Label>
                                                <Input className="border-2 border-gray-500" type="text" placeholder="Ingrese especialidad" />
                                            </div>
                                            <div>
                                                <Label>Médico:</Label>
                                                <Input className="border-2 border-gray-500" type="text" placeholder="Ingrese médico" />
                                            </div>
                                            <div>
                                                <Label>Transacción:</Label>
                                                <Input className="border-2 border-gray-500" type="text" placeholder="Ingrese transacción" />
                                            </div>
                                            <div>
                                                <Label>N° Receta:</Label>
                                                <Input className="border-2 border-gray-500" type="text" placeholder="Ingrese número de receta" />
                                            </div>
                                            <div className="col-span-3">
                                                <Label className="block mb-1">Comentario:</Label>
                                                <input
                                                    className="border-2 border-gray-500 rounded-md p-2 w-full"
                                                    placeholder="Ingrese comentario..."
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Sección Registrar medicamentos */}
                                    <div className="border rounded-md p-4 mb-4 bg-gray-50">
                                        <h3 className="text-md font-semibold mb-3">Registrar medicamentos</h3>

                                        <div className="flex items-end gap-4 mb-4">
                                            <div>
                                                <Label>Producto:</Label>
                                                <Input
                                                    className="border-2 border-gray-500"
                                                    type="text"
                                                    placeholder="Ingrese producto"
                                                    value={producto}
                                                    onChange={(e) => setProducto(e.target.value)}
                                                />
                                            </div>
                                            <div>
                                                <Label>Cantidad:</Label>
                                                <Input
                                                    className="border-2 border-gray-500"
                                                    type="number"
                                                    placeholder="Ingrese cantidad"
                                                    value={cantidad}
                                                    onChange={(e) => setCantidad(e.target.value)}
                                                />
                                            </div>
                                            <Button
                                                type="button"
                                                className="bg-green-600 hover:bg-green-700 text-white h-10 px-4"
                                                onClick={() => {
                                                    if (producto.trim() && cantidad.trim()) {
                                                        setMedicamentos([...medicamentos, { producto, cantidad }]);
                                                        setProducto("");
                                                        setCantidad("");
                                                    }
                                                }}
                                            >
                                                <CirclePlus className="h-4 w-4" />
                                                Agregar
                                            </Button>
                                        </div>

                                        {/* Tabla de medicamentos registrados */}
                                        <table className="w-full border-collapse border border-gray-300">
                                            <thead className="bg-blue-100">
                                                <tr>
                                                    <th className="border border-gray-300 px-2 py-1">Item</th>
                                                    <th className="border border-gray-300 px-2 py-1">Nombre</th>
                                                    <th className="border border-gray-300 px-2 py-1">Cantidad</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {medicamentos.length > 0 ? (
                                                    medicamentos.map((med, index) => (
                                                        <tr key={index}>
                                                            <td className="border border-gray-300 px-2 py-1">{index + 1}</td>
                                                            <td className="border border-gray-300 px-2 py-1">{med.producto}</td>
                                                            <td className="border border-gray-300 px-2 py-1">{med.cantidad}</td>
                                                        </tr>
                                                    ))
                                                ) : (
                                                    <tr>
                                                        <td
                                                            colSpan={3}
                                                            className="border border-gray-300 px-2 py-2 text-center text-gray-500"
                                                        >
                                                            No hay medicamentos registrados
                                                        </td>
                                                    </tr>
                                                )}
                                            </tbody>
                                        </table>
                                    </div>

                                </>
                            )}

                            <div className="flex justify-end gap-2 mt-4">
                                <Button
                                    variant="outline"
                                    onClick={() => {
                                        setModalNuevaProforma(false);
                                        setDniValidado(false);
                                        setDni("");
                                        setError("");
                                        setPacienteExterno(false);
                                        setMedicamentos([]); // limpia la tabla al cancelar
                                    }}
                                >
                                    Cancelar
                                </Button>

                                {(dniValidado || pacienteExterno) && (
                                    <Button
                                        type="button"
                                        className="bg-cyan-600 hover:bg-cyan-700 text-white"
                                        onClick={() => setMostrarConfirmacion(true)}
                                    >
                                        <FilePlus className="h-4 w-4" />
                                        Generar Proforma
                                    </Button>
                                )}
                            </div>

                            {mostrarConfirmacion && (
                                <div className="fixed inset-0 flex items-center justify-center bg-black/50">
                                    <div className="bg-white rounded-md shadow-lg p-6 max-w-md w-full">
                                        <div className="flex items-center gap-2 mb-4">
                                            <HelpCircle className="h-6 w-6 text-yellow-600" />
                                            <h2 className="text-lg font-semibold">Confirmar acción</h2>
                                        </div>
                                        <p className="mb-4 text-gray-700">
                                            ¿Está seguro de generar la proforma? Esta acción no se podrá deshacer.
                                        </p>
                                        <div className="flex justify-end gap-2">
                                            <Button
                                                variant="outline"
                                                onClick={() => setMostrarConfirmacion(false)}
                                            >
                                                Cancelar
                                            </Button>
                                            <Button
                                                className="bg-green-600 hover:bg-green-700 text-white"
                                                onClick={() => {
                                                    setMostrarConfirmacion(false);
                                                    setMostrarExito(true);
                                                }}
                                            >
                                                Confirmar
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {mostrarExito && (
                                <div className="fixed inset-0 flex items-center justify-center bg-black/50">
                                    <div className="bg-white rounded-md shadow-lg p-6 max-w-md w-full">
                                        <div className="flex items-center gap-2 mb-4">
                                            <BadgeCheck className="h-6 w-6 text-green-600" />
                                            <h2 className="text-lg font-semibold">Proforma generada</h2>
                                        </div>
                                        <p className="mb-4 text-gray-700">
                                            La proforma se generó con éxito.
                                        </p>
                                        <div className="flex justify-end">
                                            <Button
                                                className="bg-blue-600 hover:bg-blue-700 text-white"
                                                onClick={() => {
                                                    setMostrarExito(false);
                                                    setModalNuevaProforma(false); // cierra modal principal
                                                    // aquí puedes añadir lógica para redirigir a pantalla principal
                                                    setDniValidado(false);
                                                    setDni("");
                                                    setError("");
                                                    setPacienteExterno(false);
                                                    setMedicamentos([]);
                                                }}
                                            >
                                                Finalizar
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </form>
                    </div>
                </div>
            )}
        </div>
    )
}

