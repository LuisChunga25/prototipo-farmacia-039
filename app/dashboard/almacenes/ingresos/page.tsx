"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from "@/components/ui/tooltip"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  ArrowLeft,
  Edit,
  FileSpreadsheet,
  Filter,
  PackageCheck,
  Plus,
  Printer,
  RefreshCw,
  Search,
  Trash2,
  Pencil,
  CheckCircle,
  Eye,
  Eraser,
} from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Checkbox } from "@/components/ui/checkbox"
import { useAlmacen } from "@/context/AlmacenContext"

// Datos de ejemplo para ingresos
const ingresosData = [
  {
    id: 1,
    estado: "1",
    ingreso_id: "25001431",
    documento: "485-1115",
    tipo_transaccion: "ICO",
    nombre: "Ingreso por Compra",
    fecha: "21/11/2025",
    hora: "09:45:23",
    fecha_proceso: "",
    hora_proceso: "",
    almacen: "A",
    total: 5280.5,
    usuario: "JHUAMAN",
    proveedor: "PROV001",
    nombre_proveedor: "Distribuidora Médica",
    observacion: "Ingreso por compra directa",
    referencia: "OC-2023-001",
    tipo_documento: "FACTURA",
    ppa: "SI",
  },
  {
    id: 2,
    estado: "1",
    ingreso_id: "25001430",
    documento: "485-1114",
    tipo_transaccion: "IDO",
    nombre: "Ingreso por Donación",
    fecha: "21/11/2025",
    hora: "09:44:11",
    fecha_proceso: "",
    hora_proceso: "",
    almacen: "A",
    total: 3150.0,
    usuario: "JHUAMAN",
    proveedor: "PROV003",
    nombre_proveedor: "Centro Nacional de Abastecimiento",
    observacion: "Donación de medicamentos",
    referencia: "DON-2023-001",
    tipo_documento: "GUIA",
    ppa: "NO",
  },
  {
    id: 3,
    estado: "2",
    ingreso_id: "25001429",
    documento: "485-1113",
    tipo_transaccion: "ICO",
    nombre: "Ingreso por Compra",
    fecha: "20/11/2025",
    hora: "11:22:46",
    fecha_proceso: "20/11/2025",
    hora_proceso: "11:23:08",
    almacen: "A",
    total: 8750.25,
    usuario: "JHUAMAN",
    proveedor: "PROV002",
    nombre_proveedor: "Importadora Farmacéutica",
    observacion: "Compra programada mensual",
    referencia: "OC-2023-002",
    tipo_documento: "FACTURA",
    ppa: "SI",
  },
  {
    id: 4,
    estado: "2",
    ingreso_id: "25001428",
    documento: "485-1112",
    tipo_transaccion: "ITP",
    nombre: "Ingreso por Transferencia (Pecosa)",
    fecha: "20/11/2025",
    hora: "11:10:21",
    fecha_proceso: "20/11/2025",
    hora_proceso: "11:11:04",
    almacen: "A",
    total: 4200.0,
    usuario: "JHUAMAN",
    proveedor: "CENARES",
    nombre_proveedor: "Centro Nacional de Abastecimiento",
    observacion: "Transferencia desde almacén central",
    referencia: "TRANS-2023-001",
    tipo_documento: "GUIA",
    ppa: "NO",
  },
  {
    id: 5,
    estado: "2",
    ingreso_id: "25001427",
    documento: "485-1111",
    tipo_transaccion: "ICO",
    nombre: "Ingreso por Compra",
    fecha: "19/11/2025",
    hora: "10:23:47",
    fecha_proceso: "19/11/2025",
    hora_proceso: "10:24:11",
    almacen: "A",
    total: 12500.75,
    usuario: "JHUAMAN",
    proveedor: "PROV004",
    nombre_proveedor: "Química Distribuidora",
    observacion: "Compra de emergencia",
    referencia: "OC-2023-003",
    tipo_documento: "FACTURA",
    ppa: "SI",
  },
]

// Datos de ejemplo para proveedores
const proveedoresData = [
  { id: 1, codigo: "PROV001", nombre: "Centro de Salud Miguel Grau" },
  { id: 2, codigo: "PROV002", nombre: "Centro de Salud Moyopampa" },
  { id: 3, codigo: "PROV003", nombre: "Centro de Salud Ricardo Palma" },
  { id: 4, codigo: "PROV004", nombre: "Centro Nacional de Abastecimiento" },
  { id: 5, codigo: "PROV005", nombre: "Centro Salud Chosica" },
]

// Datos de ejemplo para almacenes
const almacenesData = [
  { id: 1, codigo: "A", nombre: "Almacén general (Medicamentos)" },
  { id: 2, codigo: "AI", nombre: "Almacén insumos" },
  { id: 3, codigo: "DU", nombre: "Farmacia Dosis Unitaria" },
  { id: 4, codigo: "F", nombre: "Farmacia Emergencia" },
  { id: 5, codigo: "CE", nombre: "Consultorios Externos" },
]

// Datos de ejemplo para tipos de documento
const tiposDocumentoData = [
  { id: 1, codigo: "ACTA", nombre: "Acta" },
  { id: 2, codigo: "GUIA", nombre: "Guía" },
  { id: 3, codigo: "OC", nombre: "Orden de compra" },
  { id: 4, codigo: "PECOSA", nombre: "Pecosa" },
  { id: 5, codigo: "OTRO", nombre: "Otro" },
]

// Datos de ejemplo para tipos de ingreso
const tiposIngresoData = [
  { id: 1, codigo: "IAP", nombre: "IAP - Ingreso por Autoproducción" },
  { id: 2, codigo: "ICO", nombre: "ICO - Ingreso por Compra" },
  { id: 3, codigo: "IDE", nombre: "IDE - Ingreso por Devolución" },
  { id: 4, codigo: "IDO", nombre: "IDO - Ingreso por Donación" },
  { id: 5, codigo: "IES", nombre: "IES - Ingreso por Estrategia Sanitaria" },
  { id: 6, codigo: "IPR", nombre: "IPR - Ingreso por Préstamo" },
  { id: 7, codigo: "ITP", nombre: "ITP - Ingreso por Transferencia (Pecosa)" },
]

// Datos de ejemplo para tipos de ingreso
const tiposModalidad = [
  { id: 1, codigo: "ADP", nombre: "Adjudicación Directa Pública" },
  { id: 2, codigo: "ASP", nombre: "Adjudicación Selectiva Pública" },
  { id: 3, codigo: "CP", nombre: "Concurso Público" },
  { id: 4, codigo: "LP", nombre: "Licitación Pública" },
  { id: 5, codigo: "MC", nombre: "Menor Cuantía" },
  { id: 6, codigo: "OT", nombre: "Otros" },
]


export default function IngresosPage() {
  const [openDialog, setOpenDialog] = useState(false)
  const [dialogType, setDialogType] = useState<"add" | "edit" | "delete" | "process">("add")
  const [showFilters, setShowFilters] = useState(false)
  const [selectedItem, setSelectedItem] = useState<any>(null)
  const [currentTab, setCurrentTab] = useState("listado")
  const [selectedItems, setSelectedItems] = useState<number[]>([])
  const [selectAll, setSelectAll] = useState(false)
  const [nuevoIngreso, setNuevoIngreso] = useState(false)
  const [fechaInicio, setFechaInicio] = useState("");
  const [fechaFin, setFechaFin] = useState("");
  const { almacen } = useAlmacen();

  const almacenes = [
    { value: "A", label: "A - ALMACEN GENERAL (MEDICAMENTOS)" },
    { value: "AI", label: "AI - ALMACEN INSUMOS" },
    { value: "CE", label: "CE - CONSULTORIOS EXTERNOS" },
    { value: "DU", label: "DU - FARMACIA DOSIS UNITARIA" },
    { value: "F", label: "F - FARMACIA EMERGENCIA" },
  ];

  const almacenActualLabel = almacenes.find(a => a.value === almacen)?.label;

  // Estado para manejar el texto ingresado en el buscador
  const [searchTerm, setSearchTerm] = useState("");

  // Filtro automático: filtra por ingreso_id o documento
  const filteredIngresos = ingresosData.filter((ingreso) => {
    const matchesSearch =
      ingreso.ingreso_id.toString().includes(searchTerm.toLowerCase()) ||
      ingreso.documento.toLowerCase().includes(searchTerm.toLowerCase());

    const fecha = new Date(ingreso.fecha);

    const matchesFechaInicio = fechaInicio
      ? fecha >= new Date(fechaInicio)
      : true;

    const matchesFechaFin = fechaFin
      ? fecha <= new Date(fechaFin)
      : true;

    return matchesSearch && matchesFechaInicio && matchesFechaFin;
  });


  const renderFilterContent = () => {
    return (
      <>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="filter-documento">Documento</Label>
            <Input id="filter-documento" placeholder="Filtrar por documento" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="filter-tipo">Tipo de Ingreso</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Todos los tipos" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todos">Todos</SelectItem>
                {tiposIngresoData.map((tipo) => (
                  <SelectItem key={tipo.id} value={tipo.codigo}>
                    {tipo.nombre}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="filter-fecha-desde">Fecha Desde</Label>
            <Input id="filter-fecha-desde" type="date" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="filter-fecha-hasta">Fecha Hasta</Label>
            <Input id="filter-fecha-hasta" type="date" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="filter-almacen">Almacén</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Todos los almacenes" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todos">Todos</SelectItem>
                {almacenesData.map((alm) => (
                  <SelectItem key={alm.id} value={alm.codigo}>
                    {alm.nombre}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="filter-proveedor">Proveedor</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Todos los proveedores" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todos">Todos</SelectItem>
                {proveedoresData.map((prov) => (
                  <SelectItem key={prov.id} value={prov.codigo}>
                    {prov.nombre}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="flex justify-end gap-2 mt-4">
          <Button variant="outline" onClick={() => setShowFilters(false)}>
            Cancelar
          </Button>
          <Button>Aplicar Filtros</Button>
        </div>
      </>
    )
  }

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
    <div className="space-y-4 pt-4">
      <div className="w-full flex justify-cente">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 w-full max-w-4xl">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Ingresos de Items a Almacenes</h1>
            <p className="text-muted-foreground text-sm">Gestión de ingresos de productos al almacén</p>
          </div>

          <div className="flex flex-col">
            <span className="text-sm font-medium text-gray-600">Almacén actual:</span>
            <span className="text-base font-semibold">
              {almacenActualLabel ?? "No seleccionado"}
            </span>
          </div>
        </div>
      </div>

      <div className="flex items-center py-4 justify-between">
        <div className="flex items-end gap-4">
          <div className="flex flex-col w-64">
            <Label htmlFor="buscar" className="mb-1">Buscar por:</Label>

            <div className="relative w-64">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Ingreso ID, documento..."
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
          {/*<Button variant="outline" size="sm" className="gap-1" onClick={() => setShowFilters(!showFilters)}>
            <Filter className="h-4 w-4" />
            Filtros
          </Button>*/}

          <Link href="/dashboard/almacenes">
            <Button variant="outline" size="sm" className="gap-1">
              <ArrowLeft className="h-4 w-4" />
              Volver
            </Button>
          </Link>

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

          {/*<Button
            variant="outline"
            size="sm"
            className="gap-1"

          >
            <PackageCheck className="h-4 w-4" />
            Procesar Stock
          </Button>

          <Button
            variant="outline"
            size="sm"
            className="gap-1"
            disabled={selectedItems.length !== 1}
          >
            <Edit className="h-4 w-4" />
            Editar
          </Button>

          <Button
            variant="outline"
            size="sm"
            className="gap-1"
          >
            <Trash2 className="h-4 w-4" />
            Eliminar
          </Button>*/}

          <Button className="bg-green-600 hover:bg-green-700 text-white gap-2 font-semibold" size="sm" onClick={() => setNuevoIngreso(true)}>
            <Plus className="h-4 w-4" strokeWidth={3} />
            Nuevo Ingreso
          </Button>
        </div>
      </div>

      <Dialog open={nuevoIngreso} onOpenChange={setNuevoIngreso}>
        <DialogContent
          className="max-w-6xl max-h-[90vh] overflow-y-auto"
          onInteractOutside={(e) => e.preventDefault()}
          onEscapeKeyDown={(e) => e.preventDefault()}
        >
          <DialogHeader className="flex flex-row items-start justify-between">
            <div>
              <DialogTitle>REGISTRAR NUEVO INGRESO</DialogTitle>
              <DialogDescription>
                Complete los campos para registrar el ingreso.
              </DialogDescription>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="flex items-center gap-2">
                <Label htmlFor="id" className="whitespace-nowrap text-sm">ID:</Label>
                <Input id="id" value="25001448" disabled className="h-8 w-24" />
              </div>
              <div className="flex items-center gap-2">
                <Label htmlFor="fecha" className="whitespace-nowrap text-sm">Fecha:</Label>
                <Input id="fecha" value="24/11/2025" disabled className="h-9 w-28" />
              </div>
              <div className="flex items-center gap-2">
                <Label htmlFor="hora" className="whitespace-nowrap text-sm">Hora:</Label>
                <Input id="hora" value="08:06" disabled className="h-8 w-20" />
              </div>
            </div>
          </DialogHeader>
          <div className="py-4">
            <div className="border border-gray-300 rounded-md p-4">
              <h1 className="font-bold text-lg mb-4">Datos Generales</h1>
              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="tipo_documento">Tipo de Documento:</Label>
                  <Select defaultValue={selectedItem?.tipo_documento || ""}>
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccionar tipo de documento" />
                    </SelectTrigger>
                    <SelectContent>
                      {tiposDocumentoData.map((tipo) => (
                        <SelectItem key={tipo.id} value={tipo.codigo}>
                          {tipo.nombre}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="documento">Nro. Documento:</Label>
                  <Input id="documento" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="ppa">PPA:</Label>
                  <Input id="ppa" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="tipo">Tipo de Transacción:</Label>
                  <Select defaultValue={selectedItem?.tipo || ""}>
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccionar tipo" />
                    </SelectTrigger>
                    <SelectContent>
                      {tiposIngresoData.map((tipo) => (
                        <SelectItem key={tipo.id} value={tipo.codigo}>
                          {tipo.nombre}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="tipo-modalidad">Modalidad-Compra:</Label>
                  <Select defaultValue={selectedItem?.tipo || ""}>
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccionar modalidad de compra" />
                    </SelectTrigger>
                    <SelectContent>
                      {tiposModalidad.map((tipo) => (
                        <SelectItem key={tipo.id} value={tipo.codigo}>
                          {tipo.nombre}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="almacen">Almacén:</Label>
                  <Select defaultValue={selectedItem?.alm || ""}>
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccionar almacén" />
                    </SelectTrigger>
                    <SelectContent>
                      {almacenesData.map((alm) => (
                        <SelectItem key={alm.id} value={alm.codigo}>
                          {alm.nombre}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 pt-4">
                <div className="space-y-2">
                  <Label htmlFor="proveedor">Proveedor:</Label>
                  <Select defaultValue={selectedItem?.proveedor || ""}>
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccionar proveedor" />
                    </SelectTrigger>
                    <SelectContent>
                      {proveedoresData.map((prov) => (
                        <SelectItem key={prov.id} value={prov.codigo}>
                          {prov.nombre}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="remesa">Nro. Remesa:</Label>
                  <Input id="remesa" />
                </div>
              </div>

              <div className="space-y-2 pt-4">
                <Label htmlFor="referencia">Referencia:</Label>
                <Input id="referencia" defaultValue={selectedItem?.referencia || ""} />
              </div>
              <div className="space-y-2 pt-4">
                <Label htmlFor="observacion">Observación:</Label>
                <Input id="observacion" defaultValue={selectedItem?.observacion || ""} />
              </div>
            </div>

            <div className="border border-gray-300 rounded-md p-4 mt-4">
              <h1 className="font-bold text-lg mb-4">Detalle del Producto</h1>
              <div className="space-y-2">
                <Label htmlFor="item">ITEM:</Label>
                <Input id="item" />
              </div>
              <div className="grid grid-cols-3 gap-4 pt-4">
                <div className="space-y-2">
                  <Label htmlFor="cantidad">Cantidad:</Label>
                  <Input id="cantidad" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="precioCosto">Precio de Adquisición:</Label>
                  <Input id="precioCosto" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="importe">Importe:</Label>
                  <Input id="importe" />
                </div>
              </div>

              <div className="grid grid-cols-4 gap-4 pt-4">
                <div className="space-y-2">
                  <Label htmlFor="utilidad">Gastos Operativos %:</Label>
                  <Input id="utilidad" value="24.8" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="precioPublico">Precio de Operación:</Label>
                  <Input id="precioPublico" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="precioVenta">Precio Venta:</Label>
                  <Input id="precioVenta" disabled />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-4">
                <div className="space-y-2">
                  <Label htmlFor="marca">Marca:</Label>
                  <Input id="marca" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="laboratorio">Laboratorio:</Label>
                  <Input id="laboratorio" />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4 pt-4">
                <div className="space-y-2">
                  <Label htmlFor="lote">Lote:</Label>
                  <Input id="lote" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="regSanitario">Registro Sanitario:</Label>
                  <Input id="regSanitario" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="fechaVenc">Fecha Vencimiento:</Label>
                  <Input id="fechaVenc" />
                </div>
              </div>

              <div className="flex justify-between mb-4 pt-4">
                <Button size="sm" className="bg-green-600 hover:bg-green-700 text-white gap-2 font-semibold">
                  <Plus className="h-4 w-4" />
                  Agregar Producto
                </Button>
              </div>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Código</TableHead>
                    <TableHead>Descripción</TableHead>
                    <TableHead className="text-right">Cantidad</TableHead>
                    <TableHead className="text-right">Precio Unit.</TableHead>
                    <TableHead className="text-right">Total</TableHead>
                    <TableHead className="text-right">Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {dialogType === "edit" ? (
                    <>
                      <TableRow>
                        <TableCell className="font-medium">MED001</TableCell>
                        <TableCell>Paracetamol 500mg</TableCell>
                        <TableCell className="text-right">1000</TableCell>
                        <TableCell className="text-right">0.50</TableCell>
                        <TableCell className="text-right">500.00</TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="icon">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">MED003</TableCell>
                        <TableCell>Amoxicilina 500mg</TableCell>
                        <TableCell className="text-right">500</TableCell>
                        <TableCell className="text-right">1.20</TableCell>
                        <TableCell className="text-right">600.00</TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="icon">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    </>
                  ) : (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center text-muted-foreground">
                        No hay productos agregados
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
              <div className="flex justify-end">
                <div className="w-64 space-y-2">
                  <div className="flex justify-between">
                    <span className="font-medium">Subtotal:</span>
                    <span>S/. 1,100.00</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">IGV (18%):</span>
                    <span>S/. 198.00</span>
                  </div>
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total:</span>
                    <span>S/. 1,298.00</span>
                  </div>
                </div>
              </div>

            </div>


          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setNuevoIngreso(false)}>
              Cancelar
            </Button>
            <Button>Guardar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {showFilters && (
        <Card className="mb-4">
          <CardContent className="pt-6">{renderFilterContent()}</CardContent>
        </Card>
      )}

      <div className="overflow-x-auto border rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Estado</TableHead>
              <TableHead>Ingreso ID</TableHead>
              <TableHead>Documento</TableHead>
              <TableHead>Tipo Transacción</TableHead>
              <TableHead>Nombre Transacción</TableHead>
              <TableHead>Fecha y Hora Registro</TableHead>
              <TableHead>Fecha y Hora Proceso</TableHead>
              <TableHead>Total (S/.)</TableHead>
              <TableHead>Nombre Proveedor</TableHead>
              <TableHead>Usuario</TableHead>
              <TableHead>Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredIngresos.map((ingreso) => (
              <TableRow key={ingreso.id} className={selectedItems.includes(ingreso.id) ? "bg-primary/10" : ""}>
                <TableCell>{getEstadoBadge(ingreso.estado)}</TableCell>
                <TableCell className="font-medium">{ingreso.ingreso_id}</TableCell>
                <TableCell className="font-medium">{ingreso.documento}</TableCell>
                <TableCell>{ingreso.tipo_transaccion}</TableCell>
                <TableCell>{ingreso.nombre}</TableCell>
                <TableCell>
                  <div className="font-medium">{ingreso.fecha}</div>
                  <div className="text-sm text-gray-500">{ingreso.hora}</div>
                </TableCell>
                <TableCell>
                  <div className="font-medium">{ingreso.fecha_proceso}</div>
                  <div className="text-sm text-gray-500">{ingreso.hora_proceso}</div>
                </TableCell>
                <TableCell>{ingreso.total.toFixed(2)}</TableCell>
                <TableCell>{ingreso.nombre_proveedor}</TableCell>
                <TableCell>{ingreso.usuario}</TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    <Button
                      title="Procesar"
                      variant="outline"
                      className={`h-8 w-10 p-1.5 border-green-600 text-green-600 hover:bg-green-50
        ${ingreso.estado !== "1" ? "opacity-40 cursor-not-allowed" : ""}`}
                      disabled={ingreso.estado !== "1"}
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
        ${ingreso.estado !== "1" ? "opacity-40 cursor-not-allowed" : ""}`}
                      disabled={ingreso.estado !== "1"}
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
        ${ingreso.estado !== "1" ? "opacity-40 cursor-not-allowed" : ""}`}
                      disabled={ingreso.estado !== "1"}
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

