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
  FileSignature,
  X,
} from "lucide-react"
import { useRouter } from "next/navigation"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"

// DATOS DE EJEMPLO PARA LA TABLA
const boletasVentaData = [
  {
    id: 1,
    estado: "1",
    pagoId: "26047887",
    numero: "B001-0335050",
    paciente: "CHUNGA HUAYLINOS LUIS DIEGO",
    historia: "76516872",
    consultorio: "MEDICINA INTERNA",
    origen: "CE",
    medico: "DIONICIO IBAÑEZ LUIS FELIPE",
    modulo: "CITA",
    ordenId: "260225223",
    fecha_registro: "21/10/2026",
    hora_registro: "11:12:07",
    turno: "GD",
    subtotal: 67.40,
    descuento: 0.00,
    total: 67.40,
    usuario: "73787897",
  },
  {
    id: 2,
    estado: "1",
    pagoId: "26047886",
    numero: "B001-0335042",
    paciente: "HILARIO GARCIA MIGUEL ANGEL",
    historia: "41877141",
    consultorio: "CIRUGIA GENERAL",
    origen: "CE",
    medico: "BASOMBRIO VELASQUEZ JORGE",
    modulo: "CITA",
    ordenId: "260225114",
    fecha_registro: "21/10/2026",
    hora_registro: "11:08:25",
    turno: "GD",
    subtotal: 10.00,
    descuento: 0.00,
    total: 10.00,
    usuario: "73787897",
  },
  {
    id: 3,
    estado: "1",
    pagoId: "26047885",
    numero: "B001-0335033",
    paciente: "HOLGUIN CUCALON JORGE ALBERTO",
    historia: "73101361",
    consultorio: "MEDICINA EMERGENCIA",
    origen: "EM",
    medico: "LLERENA ZAVALA CARMEN RUTH",
    modulo: "CAJA",
    ordenId: "",
    fecha_registro: "21/10/2026",
    hora_registro: "11:02:18",
    turno: "GD",
    subtotal: 23.33,
    descuento: 0.00,
    total: 23.33,
    usuario: "73787897",
  },
  {
    id: 4,
    estado: "1",
    pagoId: "26047884",
    numero: "B001-0335025",
    paciente: "QUISPE JAVIER TERRY ANFONI",
    historia: "46428041",
    consultorio: "MEDICINA EMERGENCIA",
    origen: "EM",
    medico: "LLERENA ZAVALA CARMEN RUTH",
    modulo: "CAJA",
    ordenId: "",
    fecha_registro: "20/10/2026",
    hora_registro: "10:21:45",
    turno: "GD",
    subtotal: 190.0,
    descuento: 0.0,
    total: 190.0,
    usuario: "73787897",
  },
  {
    id: 5,
    estado: "1",
    pagoId: "26047883",
    numero: "B001-0335012",
    paciente: "PRADO DAVILA CARLOS ENRIQUE ALBERTO",
    historia: "76478385",
    consultorio: "TRAUMATOLOGIA Y ORTOPEDIA",
    origen: "CE",
    medico: "BENDEZU SARAVIA MERLYN BERNARDO",
    modulo: "FARMACIA",
    ordenId: "",
    fecha_registro: "20/10/2026",
    hora_registro: "10:16:26",
    turno: "GD",
    subtotal: 5.83,
    descuento: 0.0,
    total: 5.83,
    usuario: "73787897",
  },
]


export default function BoletasVentaPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);
  const [showSuccessDelete, setShowSuccessDelete] = useState(false);
  const [boletaToDelete, setBoletaToDelete] = useState<any>(null);
  const [boletasVisibles, setBoletasVisibles] = useState<any[]>([]);
  const router = useRouter();
  const [searchBy, setSearchBy] = useState("pagoId");
  const hoy = new Date();
  const primerDiaMes = new Date(hoy.getFullYear(), hoy.getMonth(), 1);
  const formatoISO = (fecha: Date) => fecha.toISOString().split("T")[0];
  const [fechaInicio, setFechaInicio] = useState(formatoISO(primerDiaMes));
  const [fechaFin, setFechaFin] = useState(formatoISO(hoy));
  const [openEmisionBoleta, setOpenEmisionBoleta] = useState(false);

  const opcionesBusqueda = [
    { value: "pagoId", label: "Pago ID" },
    { value: "paciente", label: "Paciente" },
    { value: "historiaClinica", label: "Historia Clínica" }
  ];

  // INICIALIZAR CUANDO CARGUE LA PÁGINA
  useEffect(() => {
    setBoletasVisibles(boletasVentaData);
  }, [boletasVentaData]);

  // ELIMINAR SEGUIMIENTO FARMACOTERAPÉUTICO
  const handleDeleteClick = (boleta: any) => {
    setBoletaToDelete(boleta);
    setShowConfirmDelete(true);
  };

  const confirmDelete = () => {
    setShowConfirmDelete(false);

    // Ocultamiento visual
    setBoletasVisibles((prev) =>
      prev.filter((s) => s.id !== boletaToDelete.id)
    );

    setTimeout(() => {
      setShowSuccessDelete(true);
    }, 200);
  };

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
            <h1 className="text-3xl font-bold tracking-tight">Boletas de Venta</h1>
            <p className="text-muted-foreground">Gestione la emisión de las boletas de ventas por los servicios médicos brindados</p>
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
              onClick={() => setOpenEmisionBoleta(true)}
            >
              <Plus className="h-5 w-5" strokeWidth={3} />
              Emisión de Boleta
            </Button>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto border rounded-md">
        <Table className="text-xs">
          <TableHeader>
            <TableRow className="bg-cyan-600 hover:bg-cyan-600">
              <TableHead className="font-semibold text-white hover:bg-transparent">Estado</TableHead>
              <TableHead className="font-semibold text-white hover:bg-transparent">Pago ID</TableHead>
              <TableHead className="font-semibold text-white hover:bg-transparent">Número</TableHead>
              <TableHead className="font-semibold text-white hover:bg-transparent">Paciente</TableHead>
              <TableHead className="font-semibold text-white hover:bg-transparent">Historia</TableHead>
              <TableHead className="font-semibold text-white hover:bg-transparent">Origen</TableHead>
              <TableHead className="font-semibold text-white hover:bg-transparent">Total (S/)</TableHead>
              <TableHead className="font-semibold text-white hover:bg-transparent">Fecha y Hora Registro</TableHead>
              <TableHead className="font-semibold text-white hover:bg-transparent">Usuario</TableHead>
              <TableHead className="font-semibold text-white hover:bg-transparent">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {boletasVisibles.map((boleta) => (
              <TableRow key={boleta.id} className={selectedItems.includes(boleta.id) ? "bg-primary/10" : ""}>
                <TableCell>{getEstadoBadge(boleta.estado)}</TableCell>
                <TableCell className="font-medium">{boleta.pagoId}</TableCell>
                <TableCell className="font-medium">{boleta.numero}</TableCell>
                <TableCell className="font-medium">{boleta.paciente}</TableCell>
                <TableCell className="font-medium">{boleta.historia}</TableCell>
                <TableCell className="font-medium">{boleta.origen}</TableCell>
                <TableCell className="font-medium">{boleta.total}</TableCell>
                <TableCell>
                  <div className="font-medium">{boleta.fecha_registro}</div>
                  <div className="text-gray-500">{boleta.hora_registro}</div>
                </TableCell>
                <TableCell>{boleta.usuario}</TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    {/*<Button
                      title="Firmar documento"
                      variant="outline"
                      className="h-8 w-10 p-1.5 border-green-600 text-green-600 hover:bg-green-50"
                    >
                      <FileSignature className="w-3 h-3" />
                    </Button>*/}
                    <Button
                      title="Ver detalle"
                      variant="outline"
                      className="h-8 w-10 p-1.5 border-blue-600 text-blue-600 hover:bg-blue-50"
                      onClick={() =>
                        router.push(`/dashboard/farmacia-clinica/seguimiento-farmaco/detalle/${boleta.seguimientoId}`)
                      }
                    >
                      <Eye className="w-3 h-3" />
                    </Button>
                    <Button
                      title="Cambiar N° de boleta"
                      variant="outline"
                      className={`h-8 w-10 p-1.5 border-yellow-600 text-yellow-600 hover:bg-yellow-50
                        ${boleta.estado !== "1" ? "opacity-40 cursor-not-allowed" : ""}`}
                      disabled={boleta.estado !== "1"}
                      onClick={() =>
                        router.push(`/dashboard/farmacia-clinica/seguimiento-farmaco/editar/${boleta.seguimientoId}`)
                      }
                    >
                      <Edit className="w-3 h-3" />
                    </Button>
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
                      title="Anular boleta"
                      variant="outline"
                      className={`h-8 w-10 p-1.5 border-red-600 text-red-600 hover:bg-red-50
                        ${boleta.estado !== "1" ? "opacity-40 cursor-not-allowed" : ""}`}
                      disabled={boleta.estado !== "1"}
                      onClick={() => handleDeleteClick(boleta)}
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

      {/* MODAL DE EMISIÓN DE BOLETA DE PAGO */}
      <Dialog
        open={openEmisionBoleta}
        onOpenChange={setOpenEmisionBoleta}
      >
        <DialogContent className="max-w-7xl max-h-[90vh] overflow-y-auto">

          <DialogHeader>
            <DialogTitle>
              Emisión de Boleta de Venta
            </DialogTitle>

            <DialogDescription>
              Registro de servicios médicos y generación de boleta.
            </DialogDescription>
          </DialogHeader>

          {/* CABECERA */}
          <div className="grid grid-cols-4 gap-4 rounded-lg bg-slate-50 border p-4">

            <div>
              <Label>Turno</Label>
              <Input value="GD" readOnly />
            </div>

            <div>
              <Label>Boleta</Label>
              <Input value="B004-0015090" readOnly />
            </div>

            <div>
              <Label>Fecha</Label>
              <Input value="20/10/2026" readOnly />
            </div>

            <div>
              <Label>Hora</Label>
              <Input value="15:26:45" readOnly />
            </div>

          </div>

          {/* DATOS DEL PACIENTE */}
          <Card>
            <CardContent className="pt-5">

              <h3 className="font-semibold text-cyan-700 mb-4">
                Datos del Paciente
              </h3>

              <div className="grid grid-cols-4 gap-3">

                <div>
                  <Label>Pago ID</Label>
                  <Input />
                </div>

                <div>
                  <Label>Historia Clínica</Label>
                  <Input />
                </div>

                <div>
                  <Label>Origen</Label>
                  <Input />
                </div>

                <div>
                  <Label>Tipo Pago</Label>
                  <Input />
                </div>

                <div className="col-span-2">
                  <Label>Paciente</Label>
                  <Input />
                </div>

                <div>
                  <Label>Consultorio</Label>
                  <Input />
                </div>

                <div>
                  <Label>N° SS</Label>
                  <Input />
                </div>

              </div>

            </CardContent>
          </Card>

          {/* ITEMS SELECCIONADOS */}
          <Card>
            <CardContent className="pt-5">

              <div className="flex justify-between items-center mb-3">

                <h3 className="font-semibold text-cyan-700">
                  Conceptos de la Boleta
                </h3>

                <div className="text-xl font-bold text-blue-700">
                  Total: S/. 0.00
                </div>

              </div>

              <Table>

                <TableHeader>

                  <TableRow>

                    <TableHead>Código</TableHead>

                    <TableHead>Descripción</TableHead>

                    <TableHead>Cant.</TableHead>

                    <TableHead>Precio</TableHead>

                    <TableHead>Importe</TableHead>

                    <TableHead></TableHead>

                  </TableRow>

                </TableHeader>

                <TableBody>
                  {/* Items agregados */}
                </TableBody>

              </Table>

            </CardContent>
          </Card>

          {/* CATÁLOGO */}
          <Card>

            <CardContent className="pt-5">

              <h3 className="font-semibold text-cyan-700 mb-4">

                Ingreso de Conceptos

              </h3>

              <div className="flex gap-3 mb-4">

                <Input
                  placeholder="Buscar CPT o concepto..."
                />

                <Button>
                  Buscar
                </Button>

              </div>

              <div className="border rounded-md h-64 overflow-auto">

                <Table>

                  <TableHeader>

                    <TableRow>

                      <TableHead>Código</TableHead>

                      <TableHead>Descripción</TableHead>

                      <TableHead>Precio</TableHead>

                    </TableRow>

                  </TableHeader>

                  <TableBody>
                    {/* Resultados */}
                  </TableBody>

                </Table>

              </div>

            </CardContent>

          </Card>

          {/* BOTONES */}
          <div className="flex justify-end gap-3">

            <Button
              className="bg-green-600 hover:bg-green-700"
            >
              Grabar
            </Button>

            <Button variant="outline">
              Nuevo
            </Button>

            <Button
              variant="outline"
            >
              Cobrar Cita
            </Button>

            <Button
              variant="destructive"
              onClick={() => setOpenEmisionBoleta(false)}
            >
              Cerrar
            </Button>

          </div>

        </DialogContent>
      </Dialog>

      {/* MODAL DE CONFIRMACIÓN DE ELIMINAR SEGUIMIENTO FARMACOTERAPÉUTICO */}
      {showConfirmDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6">
            <h2 className="text-lg font-semibold mb-2">Confirmar eliminación</h2>
            <p className="text-sm text-gray-600 mb-4">
              ¿Está seguro de eliminar el seguimiento farmacoterapéutico{" "}
              <span className="font-semibold">{boletaToDelete?.seguimientoId}</span>?
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

      {/* MODAL DE ÉXITO DE ELIMINACIÓN DE SEGUIMIENTO FARMACOTERAPÉUTICO */}
      {showSuccessDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 text-center">
            <CheckCircle className="mx-auto h-12 w-12 text-green-600 mb-3" />
            <h2 className="text-lg font-semibold mb-2">Eliminado con éxito</h2>
            <p className="text-sm text-gray-600 mb-4">
              El seguimiento farmacoterapéutico fue eliminado correctamente.
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

