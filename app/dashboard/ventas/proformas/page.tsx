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
} from "lucide-react"
import { useRouter } from "next/navigation"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"

// DATOS DE EJEMPLO PARA LA TABLA
const proformasData = [
    {
        id: 1,
        estado: "1",
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
        nombreAlmacen: "CONSULTORIOS EXTERNOS",
        nombreConsultorio: "MEDICINA INTERNA 1",
        tipoPago: "R",
        total: 67.4,
        usuario: "40532847",
    },
    {
        id: 2,
        estado: "1",
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
        nombreAlmacen: "CONSULTORIOS EXTERNOS",
        nombreConsultorio: "MEDICINA INTERNA 1",
        tipoPago: "R",
        total: 15.8,
        usuario: "40532847",
    },
    {
        id: 3,
        estado: "1",
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
        nombreAlmacen: "CONSULTORIOS EXTERNOS",
        nombreConsultorio: "MEDICINA INTERNA 1",
        tipoPago: "R",
        total: 26.5,
        usuario: "40532847",
    },
    {
        id: 4,
        estado: "1",
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
        nombreAlmacen: "CONSULTORIOS EXTERNOS",
        nombreConsultorio: "MEDICINA INTERNA 1",
        tipoPago: "R",
        total: 16.1,
        usuario: "40532847",
    },
    {
        id: 5,
        estado: "1",
        ordenId: "1726126008",
        numReceta: "260363087",
        cuentaId: "3010192",
        fecha: "16/07/2026",
        hora: "11:06:29",
        fecha_proceso: "16/07/2026",
        hora_proceso: "18:12",
        numPaciente: "2011345165",
        historia: "73542141",
        nombrePaciente: "TORRES MENDOZA CAROLINA LUCIA",
        tipoSeguro: "PAGANTE",
        nombreAlmacen: "CONSULTORIOS EXTERNOS",
        nombreConsultorio: "MEDICINA INTERNA 1",
        tipoPago: "R",
        total: 8.6,
        usuario: "40532847",
    },
]

// DATOS DE PRUEBA PARA PRODUCTOS
const productosMock = [
    {
        id: 1,
        codigo: "00070",
        nombre: "ACETILCISTEINA 100 MG SOB",
        regSan: "RS001",
        lote: "LR12345",
        fechaVenc: "02/02/2027",
        precio: 0.9,
        cantidad: 100,
    },
    {
        id: 2,
        codigo: "00132",
        nombre: "ACICLOVIR 250 MG INY X 10 ML",
        regSan: "RS002",
        lote: "H1477",
        fechaVenc: "15/06/2028",
        precio: 14.79,
        cantidad: 150,
    },
];

export default function SalidasPage() {
    const [searchTerm, setSearchTerm] = useState("");
    const [searchBy, setSearchBy] = useState("ordenId");
    const [selectedSalida, setSelectedSalida] = useState(null);
    const [selectedItems, setSelectedItems] = useState<number[]>([]);
    const [selectAll, setSelectAll] = useState(false);
    const [fechaInicio, setFechaInicio] = useState("");
    const [fechaFin, setFechaFin] = useState("");
    const [nuevaSalida, setNuevaSalida] = useState(false);
    const [showConfirmDelete, setShowConfirmDelete] = useState(false);
    const [showSuccessDelete, setShowSuccessDelete] = useState(false);
    const [salidaToDelete, setSalidaToDelete] = useState<any>(null);
    const [proformasVisibles, setProformasVisibles] = useState<any[]>([]);
    const [showConfirmProcesar, setShowConfirmProcesar] = useState(false);
    const [showSuccessProcesar, setShowSuccessProcesar] = useState(false);
    const [salidaToProcesar, setSalidaToProcesar] = useState<any>(null);
    const [showDetalleModal, setShowDetalleModal] = useState(false);
    const [modalNuevaProforma, setModalNuevaProforma] = useState(false);
    const [salidaDetalle, setSalidaDetalle] = useState<any>(null);
    const [dni, setDni] = useState("");
    const [dniValidado, setDniValidado] = useState(false);
    const [error, setError] = useState("");
    const [modalHistorial, setModalHistorial] = useState(false);
    const [modalEditarCantidad, setModalEditarCantidad] = useState(false);
    const [medicamentoSeleccionado, setMedicamentoSeleccionado] = useState<any>(null);
    const router = useRouter();

    const opcionesBusqueda = [
        { value: "ordenId", label: "Orden ID" },
        { value: "receta", label: "N° Receta" },
        { value: "historia", label: "Historia Clínica" },
        { value: "paciente", label: "Paciente" },
    ];

    const almacenes = [
        { value: "A", label: "A - ALMACEN GENERAL (MEDICAMENTOS)" },
        { value: "AI", label: "AI - ALMACEN INSUMOS" },
        { value: "CE", label: "CE - CONSULTORIOS EXTERNOS" },
        { value: "DU", label: "DU - FARMACIA DOSIS UNITARIA" },
        { value: "F", label: "F - FARMACIA EMERGENCIA" },
    ];

    // FILTRAR DATOS SEGÚN TÉRMINO DE BÚSQUEDA
    const filteredData = proformasData.filter(
        (proforma) =>
            proforma.ordenId.toLowerCase().includes(searchTerm.toLowerCase()) ||
            proforma.numReceta.toLowerCase().includes(searchTerm.toLowerCase()) ||
            proforma.nombrePaciente.toLowerCase().includes(searchTerm.toLowerCase()),
    )

    const filteredSalidas = proformasData.filter((salida) => {
        const matchesSearch =
            salida.ordenId.toString().includes(searchTerm.toLowerCase()) ||
            salida.numReceta.toLowerCase().includes(searchTerm.toLowerCase());

        const fecha = new Date(salida.fecha);

        const matchesFechaInicio = fechaInicio
            ? fecha >= new Date(fechaInicio)
            : true;

        const matchesFechaFin = fechaFin
            ? fecha <= new Date(fechaFin)
            : true;

        return matchesSearch && matchesFechaInicio && matchesFechaFin;
    });

    // INICIALIZAR CUANDO CARGUE LA PÁGINA
    useEffect(() => {
        setProformasVisibles(proformasData);
    }, [proformasData]);

    // MANEJAR SELECCIÓN DE TODOS LOS ÍTEMS
    const handleSelectAll = () => {
        if (selectAll) {
            setSelectedItems([])
        } else {
            setSelectedItems(filteredData.map((item) => item.id))
        }
        setSelectAll(!selectAll)
    }

    // MANEJAR SELECCIÓN INDIVIDUAL
    const handleSelectItem = (id: number) => {
        if (selectedItems.includes(id)) {
            setSelectedItems(selectedItems.filter((itemId) => itemId !== id))
            setSelectAll(false)
        } else {
            setSelectedItems([...selectedItems, id])
            if (selectedItems.length + 1 === filteredData.length) {
                setSelectAll(true)
            }
        }
    }

    // ELIMINAR DOCUMENTO DE SALIDA
    const handleDeleteClick = (salida: any) => {
        setSalidaToDelete(salida);
        setShowConfirmDelete(true);
    };

    const confirmDelete = () => {
        setShowConfirmDelete(false);

        // Ocultamiento visual
        setProformasVisibles((prev) =>
            prev.filter((s) => s.id !== salidaToDelete.id)
        );

        setTimeout(() => {
            setShowSuccessDelete(true);
        }, 200);
    };

    // SIMULAR PROCESAMIENTO DE UN DOCUMENTO DE SALIDA
    const confirmProcesar = () => {
        setShowConfirmProcesar(false);

        // Simulación de cambio de estado
        setProformasVisibles((prev) =>
            prev.map((s) =>
                s.id === salidaToProcesar.id
                    ? { ...s, estado: "2" }
                    : s
            )
        );

        setTimeout(() => {
            setShowSuccessProcesar(true);
        }, 200);
    };

    // VERIFICAR SI HAY ELEMENTOS SELECCIONADOS
    const hasSelection = selectedItems.length > 0

    const getEstadoBadge = (estado: string) => {
        const variants = {
            "1": "bg-yellow-100 text-yellow-800 border-yellow-300",
            "2": "bg-green-100 text-green-800 border-green-300",
        }

        const nombreEstado = {
            "1": "REGISTRADO",
            "2": "PROCESADO",
        }

        return <Badge className={`${variants[estado as keyof typeof variants]}`}>{nombreEstado[estado as keyof typeof nombreEstado]}</Badge>
    }

    // LIMPIAR FILTROS DE BÚSQUEDA
    const limpiarFiltros = () => {
        setSearchTerm("");
        setFechaInicio("");
        setFechaFin("");
    }


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
                    <h1 className="text-3xl font-bold tracking-tight">Módulo de Proformas</h1>
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
                        className="bg-green-600 hover:bg-green-700 text-white gap-2 font-semibold"
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
                        {proformasVisibles.map((proforma) => (
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
                                            className="h-8 w-10 p-1.5 border-blue-600 text-blue-600 hover:bg-blue-50"
                                            onClick={() => {
                                                setSalidaDetalle(proforma);
                                                setShowDetalleModal(true);
                                            }}
                                        >
                                            <Eye className="w-3 h-3" />
                                        </Button>
                                        <Button
                                            title="Anular documento"
                                            variant="outline"
                                            className={`h-8 w-10 p-1.5 border-red-600 text-red-600 hover:bg-red-50
                        ${proforma.estado !== "1" ? "opacity-40 cursor-not-allowed" : ""}`}
                                            disabled={proforma.estado !== "1"}
                                            onClick={() => handleDeleteClick(proforma)}
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

            {/* MODAL DE REGISTRO DE NUEVA PROFORMA DE VENTA */}
            {modalNuevaProforma && (
                <div className="fixed inset-0 flex items-center justify-center bg-black/50">
                    <div className="bg-white rounded-md shadow-lg p-6 max-w-7xl w-full max-h-[90vh] overflow-y-auto relative">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-lg font-semibold mb-4">Registrar Proforma</h2>
                            <button
                                onClick={() => {
                                    setModalNuevaProforma(false);
                                    setDniValidado(false); // reinicia validación
                                    setDni(""); // limpia input
                                    setError(""); // limpia mensaje de error
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
                                        className={`border p-2 h-10 w-40 ${error ? "border-red-500" : ""}`}
                                        value={dni}
                                        onChange={(e) => {
                                            setDni(e.target.value);
                                            setError(""); // limpia error al escribir
                                        }}
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
                                        } else {
                                            setError("");
                                            setDniValidado(true); // despliega datos solo si cumple
                                        }
                                    }}
                                >
                                    Validar
                                </Button>

                                {/* Checkbox Paciente Externo */}
                                <div className="flex items-center gap-2 ml-6">
                                    <input
                                        id="pacienteExterno"
                                        type="checkbox"
                                        className="h-4 w-4"
                                    />
                                    <Label htmlFor="pacienteExterno" className="text-sm">
                                        Paciente Externo
                                    </Label>
                                </div>
                            </div>

                            {/* Contenedor de error debajo de los campos iniciales */}
                            {error && (
                                <div className="border rounded-md p-4 mb-4 bg-red-100">
                                    <p className="text-red-800 font-semibold">{error}</p>
                                </div>
                            )}

                            {/* Campos condicionales: aparecen solo si se validó el DNI */}
                            {dniValidado && (
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
                                                <p className="text-gray-700 font-medium">2025352638 - LUIS DIEGO CHUNGA HUAYLINOS</p>
                                            </div>
                                            <div>
                                                <Label className="block mb-1">Historia/DNI:</Label>
                                                <p className="text-gray-700 font-medium">76516872</p>
                                            </div>
                                            <div>
                                                <Label className="block mb-1">Seguro:</Label>
                                                <p className="text-gray-700 font-medium">SIS</p>
                                            </div>
                                            <div>
                                                <Label className="block mb-1">Tipo de Atención:</Label>
                                                <p className="text-gray-700 font-medium">CE - CONSULTA EXTERNA</p>
                                            </div>
                                            <div>
                                                <Label className="block mb-1">Especialidad:</Label>
                                                <p className="text-gray-700 font-medium">1011 - MEDICINA INTERNA 1</p>
                                            </div>
                                            <div>
                                                <Label className="block mb-1">Médico:</Label>
                                                <p className="text-gray-700 font-medium">DIL - DIONICIO IBAÑEZ LUIS FELIPE</p>
                                            </div>
                                            <div>
                                                <Label className="block mb-1">Transacción:</Label>
                                                <p className="text-gray-700 font-medium">VC - CONTADO</p>
                                            </div>
                                            <div>
                                                <Label className="block mb-1">N° Receta:</Label>
                                                <p className="text-gray-700 font-medium">270065000</p>
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
                                        <h3 className="text-md font-semibold mb-3">Medicamentos registrados</h3>

                                        <div className="overflow-x-auto">
                                            <table className="min-w-full border-collapse border border-gray-300">
                                                <thead className="bg-blue-900 text-white">
                                                    <tr>
                                                        <th className="border border-gray-300 px-3 py-2 text-left">Item</th>
                                                        <th className="border border-gray-300 px-3 py-2 text-left">Nombre</th>
                                                        <th className="border border-gray-300 px-3 py-2 text-left">Presentación</th>
                                                        <th className="border border-gray-300 px-3 py-2 text-left">Precio</th>
                                                        <th className="border border-gray-300 px-3 py-2 text-left">Cantidad</th>
                                                        <th className="border border-gray-300 px-3 py-2 text-left">Importe</th>
                                                        <th className="border border-gray-300 px-3 py-2 text-left">Médico</th>
                                                        <th className="border border-gray-300 px-3 py-2 text-center">Acción</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {/* Datos de prueba estáticos */}
                                                    <tr>
                                                        <td className="border border-gray-300 px-3 py-2">1</td>
                                                        <td className="border border-gray-300 px-3 py-2">Paracetamol</td>
                                                        <td className="border border-gray-300 px-3 py-2">Tabletas 500mg</td>
                                                        <td className="border border-gray-300 px-3 py-2">S/ 2.00</td>
                                                        <td className="border border-gray-300 px-3 py-2">10</td>
                                                        <td className="border border-gray-300 px-3 py-2">S/ 20.00</td>
                                                        <td className="border border-gray-300 px-3 py-2">DIONICIO IBAÑEZ LUIS FELIPE</td>
                                                        <td className="border border-gray-300 px-3 py-2 text-center">
                                                            <button
                                                                type="button"
                                                                className="p-1 border border-yellow-600 text-yellow-600 rounded hover:bg-yellow-50"
                                                                title="Editar cantidad"
                                                                onClick={() => {
                                                                    setMedicamentoSeleccionado({
                                                                        nombre: "Paracetamol",
                                                                        cantidad: 10
                                                                    });
                                                                    setModalEditarCantidad(true);
                                                                }}
                                                            >
                                                                <Edit className="w-4 h-4" />
                                                            </button>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td className="border border-gray-300 px-3 py-2">2</td>
                                                        <td className="border border-gray-300 px-3 py-2">Amoxicilina</td>
                                                        <td className="border border-gray-300 px-3 py-2">Cápsulas 500mg</td>
                                                        <td className="border border-gray-300 px-3 py-2">S/ 3.50</td>
                                                        <td className="border border-gray-300 px-3 py-2">7</td>
                                                        <td className="border border-gray-300 px-3 py-2">S/ 24.50</td>
                                                        <td className="border border-gray-300 px-3 py-2">DIONICIO IBAÑEZ LUIS FELIPE</td>
                                                        <td className="border border-gray-300 px-3 py-2 text-center">
                                                            <button
                                                                type="button"
                                                                className="p-1 border border-yellow-600 text-yellow-600 rounded hover:bg-yellow-50"
                                                                title="Editar cantidad"
                                                                onClick={() => {
                                                                    setMedicamentoSeleccionado({
                                                                        nombre: "Amoxicilina",
                                                                        cantidad: 7
                                                                    });
                                                                    setModalEditarCantidad(true);
                                                                }}
                                                            >
                                                                <Edit className="w-4 h-4" />
                                                            </button>
                                                        </td>
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
                                                                <td className="border border-gray-300 px-3 py-2">Consulta Externa</td>
                                                                <td className="border border-gray-300 px-3 py-2">Paracetamol</td>
                                                                <td className="border border-gray-300 px-3 py-2">28</td>
                                                                <td className="border border-gray-300 px-3 py-2">1 cada 6 hrs por 7 días</td>
                                                                <td className="border border-gray-300 px-3 py-2">Oral</td>
                                                                <td className="border border-gray-300 px-3 py-2">J110 - Influenza con Neumonía, Virus no Identificado</td>
                                                                <td className="border border-gray-300 px-3 py-2">DIONICIO IBAÑEZ LUIS FELIPE</td>
                                                            </tr>
                                                            <tr>
                                                                <td className="border border-gray-300 px-3 py-2">10/07/2026</td>
                                                                <td className="border border-gray-300 px-3 py-2">SIS</td>
                                                                <td className="border border-gray-300 px-3 py-2">Emergencia</td>
                                                                <td className="border border-gray-300 px-3 py-2">Amoxicilina</td>
                                                                <td className="border border-gray-300 px-3 py-2">12</td>
                                                                <td className="border border-gray-300 px-3 py-2">1 cada 3 hrs por 4 días</td>
                                                                <td className="border border-gray-300 px-3 py-2">Oral</td>
                                                                <td className="border border-gray-300 px-3 py-2">J209 - Bronquitis Aguda, no Especificada</td>
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

                            <div className="flex justify-end gap-2 mt-4">
                                <Button
                                    variant="outline"
                                    onClick={() => {
                                        setModalNuevaProforma(false);
                                        setDniValidado(false);
                                        setDni("");
                                        setError("");
                                    }}
                                >
                                    Cancelar
                                </Button>
                                <Button className="bg-green-600 text-white">Guardar</Button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* MODAL DE CONFIRMACIÓN DE ELIMINAR DOCUMENTO DE SALIDA */}
            {showConfirmDelete && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
                    <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6">
                        <h2 className="text-lg font-semibold mb-2">Confirmar eliminación</h2>
                        <p className="text-sm text-gray-600 mb-4">
                            ¿Está seguro de eliminar el documento{" "}
                            <span className="font-semibold">{salidaToDelete?.documento}</span>?
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

            {/* MODAL DE CONFIRMACIÓN DE PROCESAR DOCUMENTO DE SALIDA */}
            {showConfirmProcesar && (
                <Dialog open={showConfirmProcesar} onOpenChange={setShowConfirmProcesar}>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Confirmar procesamiento</DialogTitle>
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

            {/* MODAL DE ÉXITO DE PROCESAMIENTO DE DOCUMENTO DE SALIDA */}
            {showSuccessProcesar && (
                <Dialog open={showSuccessProcesar} onOpenChange={setShowSuccessProcesar}>
                    <DialogContent>
                        <DialogHeader>
                            <CheckCircle className="mx-auto h-12 w-12 text-green-600 mb-3" />
                            <DialogTitle className="text-center">Documento procesado</DialogTitle>
                            <DialogDescription className="text-center">
                                El documento de salida ha sido procesado con éxito.
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

            {/* MODAL DE VER DETALLE (SOLO LECTURA) */}
            {showDetalleModal && salidaDetalle && (
                <Dialog open={showDetalleModal} onOpenChange={setShowDetalleModal}>
                    <DialogContent className="max-w-6xl" onInteractOutside={(e) => e.preventDefault()}>
                        <DialogHeader>
                            <DialogTitle>Detalle de Documento de Salida</DialogTitle>
                            <DialogDescription>
                                Información del documento de salida (solo lectura)
                            </DialogDescription>
                        </DialogHeader>

                        {/* CONTENIDO */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">

                            <div>
                                <Label>Estado</Label>
                                <div className="mt-1">
                                    {getEstadoBadge(salidaDetalle.estado)}
                                </div>
                            </div>

                            <div>
                                <Label>Salida ID</Label>
                                <Input disabled value={salidaDetalle.salidaId} />
                            </div>

                            <div>
                                <Label>Documento</Label>
                                <Input disabled value={salidaDetalle.documento} />
                            </div>

                            <div>
                                <Label>Tipo de Transacción</Label>
                                <Input disabled value={`${salidaDetalle.tipo_transaccion} - ${salidaDetalle.nombre_transaccion}`} />
                            </div>

                            <div>
                                <Label>Fecha Registro</Label>
                                <Input
                                    disabled
                                    value={`${salidaDetalle.fecha} ${salidaDetalle.hora}`}
                                />
                            </div>

                            <div>
                                <Label>Fecha Proceso</Label>
                                <Input
                                    disabled
                                    value={`${salidaDetalle.fecha_proceso} ${salidaDetalle.hora_proceso}`}
                                />
                            </div>

                            <div>
                                <Label>Total (S/.)</Label>
                                <Input disabled value={salidaDetalle.total.toFixed(2)} />
                            </div>

                            <div>
                                <Label>Usuario</Label>
                                <Input disabled value={salidaDetalle.usuario} />
                            </div>

                            <div className="md:col-span-2">
                                <Label>Observación</Label>
                                <Input disabled value={salidaDetalle.observacion || "-"} />
                            </div>

                        </div>

                        <div className="mt-6">
                            <h3 className="text-base font-semibold mb-3">
                                Detalle de Productos
                            </h3>

                            <div className="border rounded-lg overflow-x-auto">
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>N°</TableHead>
                                            <TableHead>Item</TableHead>
                                            <TableHead>Nombre</TableHead>
                                            <TableHead>Registro Sanitario</TableHead>
                                            <TableHead>Lote</TableHead>
                                            <TableHead>F. Venc.</TableHead>
                                            <TableHead className="text-right">Precio</TableHead>
                                            <TableHead className="text-right">Cantidad</TableHead>
                                            <TableHead className="text-right">Importe</TableHead>
                                        </TableRow>
                                    </TableHeader>

                                    <TableBody>
                                        {productosMock.map((prod, index) => {
                                            const importe = prod.precio * prod.cantidad;

                                            return (
                                                <TableRow key={prod.id}>
                                                    <TableCell>{index + 1}</TableCell>
                                                    <TableCell>{prod.codigo}</TableCell>
                                                    <TableCell>{prod.nombre}</TableCell>
                                                    <TableCell>{prod.regSan}</TableCell>
                                                    <TableCell>{prod.lote}</TableCell>
                                                    <TableCell>{prod.fechaVenc}</TableCell>
                                                    <TableCell className="text-right">
                                                        {prod.precio.toFixed(2)}
                                                    </TableCell>
                                                    <TableCell className="text-right">
                                                        {prod.cantidad}
                                                    </TableCell>
                                                    <TableCell className="text-right">
                                                        {(importe).toFixed(2)}
                                                    </TableCell>
                                                </TableRow>
                                            );
                                        })}
                                    </TableBody>
                                </Table>
                            </div>

                            <div className="flex justify-end mt-4 font-semibold">
                                Total: S/{" "}
                                {productosMock
                                    .reduce((sum, p) => sum + p.precio * p.cantidad, 0)
                                    .toFixed(2)}
                            </div>
                        </div>


                        {/* FOOTER */}
                        <div className="flex justify-end mt-6">
                            <Button variant="outline" onClick={() => setShowDetalleModal(false)}>
                                Cerrar
                            </Button>
                        </div>

                    </DialogContent>
                </Dialog>
            )}


        </div>
    )
}

