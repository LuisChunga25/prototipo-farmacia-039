"use client"

import Link from "next/link"
import { use, useState } from "react"
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
} from "lucide-react"
import { useRouter } from "next/navigation"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"

// Datos de ejemplo para la tabla
const salidasData = [
  {
    id: 1,
    estado: "1",
    salidaId: "25000650",
    documento: "PPA-650",
    tipo_transaccion: "STS",
    nombre_transaccion: "Salida por Transferencias de Servicios",
    fecha: "31/01/2026",
    hora: "18:12:07",
    fecha_proceso: "31/01/2026",
    hora_proceso: "18:24:05",
    almacen: "F",
    total: 67.4,
    usuario: "MALVAREZ",
    observacion: "SALIDA POR TRANSFERENCIA",
  },
  {
    id: 2,
    estado: "1",
    salidaId: "25000648",
    documento: "PPA-558",
    tipo_transaccion: "STE",
    nombre_transaccion: "Salida por Transferencias entre Unidades Ejecutoras",
    fecha: "31/01/2026",
    hora: "14:42:24",
    fecha_proceso: "31/01/2026",
    hora_proceso: "14:45:19",
    almacen: "A",
    total: 213.68,
    usuario: "EROMERO",
    observacion: "CAMPAÑA MÉDICA",
  },
  {
    id: 3,
    estado: "2",
    salidaId: "25000647",
    documento: "25000647",
    tipo_transaccion: "STL",
    nombre_transaccion: "Salida por Transferencia de Laboratorio",
    fecha: "30/01/2026",
    hora: "13:26:28",
    fecha_proceso: "30/01/2026",
    hora_proceso: "13:26:55",
    almacen: "DU",
    total: 224.64,
    usuario: "MARIH",
    observacion: "",
  },
  {
    id: 4,
    estado: "2",
    salidaId: "25000646",
    documento: "PPA-646",
    tipo_transaccion: "STS",
    nombre_transaccion: "Salida por Transferencia de Servicios",
    fecha: "30/01/2026",
    hora: "11:19:24",
    fecha_proceso: "30/01/2026",
    hora_proceso: "11:20:45",
    almacen: "A",
    total: 5000,
    usuario: "ECHATE",
    observacion: "REQUERIMIENTO O2",
  },
  {
    id: 5,
    estado: "2",
    salidaId: "25000645",
    documento: "25000645",
    tipo_transaccion: "STS",
    nombre_transaccion: "Salida pr Transferencia de Servicios",
    fecha: "30/01/2026",
    hora: "10:18:50",
    fecha_proceso: "30/01/2026",
    hora_proceso: "11:19:12",
    almacen: "DU",
    total: 299.52,
    usuario: "MALVAREZ",
    observacion: "SOBRE STOCK",
  },
]

export default function SalidasPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSalida, setSelectedSalida] = useState(null);
  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const [selectAll, setSelectAll] = useState(false);
  const [fechaInicio, setFechaInicio] = useState("");
  const [fechaFin, setFechaFin] = useState("");
  const [nuevaSalida, setNuevaSalida] = useState(false);
  const router = useRouter();

  const almacenes = [
    { value: "A", label: "A - ALMACEN GENERAL (MEDICAMENTOS)" },
    { value: "AI", label: "AI - ALMACEN INSUMOS" },
    { value: "CE", label: "CE - CONSULTORIOS EXTERNOS" },
    { value: "DU", label: "DU - FARMACIA DOSIS UNITARIA" },
    { value: "F", label: "F - FARMACIA EMERGENCIA" },
  ];

  // Filtrar datos según término de búsqueda
  const filteredData = salidasData.filter(
    (salida) =>
      salida.documento.toLowerCase().includes(searchTerm.toLowerCase()) ||
      salida.nombre_transaccion.toLowerCase().includes(searchTerm.toLowerCase()) ||
      salida.observacion.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const filteredSalidas = salidasData.filter((salida) => {
    const matchesSearch =
      salida.salidaId.toString().includes(searchTerm.toLowerCase()) ||
      salida.documento.toLowerCase().includes(searchTerm.toLowerCase());

    const fecha = new Date(salida.fecha);

    const matchesFechaInicio = fechaInicio
      ? fecha >= new Date(fechaInicio)
      : true;

    const matchesFechaFin = fechaFin
      ? fecha <= new Date(fechaFin)
      : true;

    return matchesSearch && matchesFechaInicio && matchesFechaFin;
  });

  // Manejar selección de todos los items
  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedItems([])
    } else {
      setSelectedItems(filteredData.map((item) => item.id))
    }
    setSelectAll(!selectAll)
  }

  // Manejar selección individual
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

  // Verificar si hay elementos seleccionados
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
          onClick={() => router.push("/dashboard/almacenes")}
        >
          <Link href="/dashboard/almacenes">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          Regresar
        </Button>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Módulo de Salida</h1>
          <p className="text-muted-foreground">Gestione las salidas de productos del almacén</p>
        </div>
      </div>

      <div className="flex items-center py-4 justify-between">
        <div className="flex items-end gap-4">
          <div className="flex flex-col w-64">
            <Label htmlFor="buscar" className="mb-1">Buscar por:</Label>

            <div className="relative w-64">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Salida ID, documento..."
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
          <Button variant="outline" size="sm" className="gap-1" onClick={limpiarFiltros}>
            <Eraser className="h-4 w-4" />
            Limpiar Filtros
          </Button>

          <Button variant="outline" size="sm" className="gap-1">
            <RefreshCw className="h-4 w-4" />
            Actualizar
          </Button>

          <Button variant="outline" size="sm" className="gap-1">
            <FileSpreadsheet className="h-4 w-4" />
            Excel
          </Button>

          <Button 
            className="bg-green-600 hover:bg-green-700 text-white gap-2 font-semibold" 
            size="sm" 
            onClick={() => router.push("/dashboard/almacenes/salidas/nueva")}
          >
            <Plus className="h-4 w-4" strokeWidth={3} />
            Nueva Salida
          </Button>
        </div>
      </div>

      <div className="overflow-x-auto border rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Estado</TableHead>
              <TableHead>Salida ID</TableHead>
              <TableHead>Documento</TableHead>
              <TableHead>Tipo y Nombre Transacción</TableHead>
              <TableHead>Fecha y Hora Registro</TableHead>
              <TableHead>Fecha y Hora Proceso</TableHead>
              <TableHead>Total (S/.)</TableHead>
              <TableHead>Usuario</TableHead>
              <TableHead>Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredSalidas.map((salida) => (
              <TableRow key={salida.id} className={selectedItems.includes(salida.id) ? "bg-primary/10" : ""}>
                <TableCell>{getEstadoBadge(salida.estado)}</TableCell>
                <TableCell className="font-medium">{salida.salidaId}</TableCell>
                <TableCell className="font-medium">{salida.documento}</TableCell>
                <TableCell>
                  <div className="font-mediunm">{salida.tipo_transaccion}</div>
                  <div className="text-sm text-gray-500">{salida.nombre_transaccion}</div>
                </TableCell>
                <TableCell>
                  <div className="font-medium">{salida.fecha}</div>
                  <div className="text-sm text-gray-500">{salida.hora}</div>
                </TableCell>
                <TableCell>
                  <div className="font-medium">{salida.fecha_proceso}</div>
                  <div className="text-sm text-gray-500">{salida.hora_proceso}</div>
                </TableCell>
                <TableCell>{salida.total.toFixed(2)}</TableCell>
                <TableCell>{salida.usuario}</TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    <Button
                      title="Procesar"
                      variant="outline"
                      className={`h-8 w-10 p-1.5 border-green-600 text-green-600 hover:bg-green-50
              ${salida.estado !== "1" ? "opacity-40 cursor-not-allowed" : ""}`}
                      disabled={salida.estado !== "1"}
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
              ${salida.estado !== "1" ? "opacity-40 cursor-not-allowed" : ""}`}
                      disabled={salida.estado !== "1"}
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
              ${salida.estado !== "1" ? "opacity-40 cursor-not-allowed" : ""}`}
                      disabled={salida.estado !== "1"}
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
      
    </div>
  )
}

