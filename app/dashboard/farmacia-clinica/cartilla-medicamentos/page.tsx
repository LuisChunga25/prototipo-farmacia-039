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
} from "lucide-react"
import { useRouter } from "next/navigation"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"

// DATOS DE EJEMPLO PARA LA TABLA
const seguimientosFarmacoData = [
  {
    id: 1,
    estado: "1",
    salidaId: "25000650",
    cartillaId: "00000005",
    paciente: "CHUNGA HUAYLINOS LUIS DIEGO",
    servicio: "MEDICINA INTERNA",
    documento: "PPA-650",
    tipo_transaccion: "STS",
    nombre_transaccion: "Salida por Transferencias de Servicios",
    fecha: "31/01/2026",
    hora: "18:12:07",
    fecha_proceso: "31/01/2026",
    hora_proceso: "18:24:05",
    almacen: "F",
    total: 67.4,
    usuario: "06649520",
    observacion: "SALIDA POR TRANSFERENCIA",
  },
  {
    id: 2,
    estado: "1",
    salidaId: "25000648",
    cartillaId: "00000004",
    paciente: "HILARIO GARCIA MIGUEL ANGEL",
    servicio: "MEDICINA INTERNA",
    documento: "PPA-558",
    tipo_transaccion: "STE",
    nombre_transaccion: "Salida por Transferencias entre Unidades Ejecutoras",
    fecha: "31/01/2026",
    hora: "14:42:24",
    fecha_proceso: "31/01/2026",
    hora_proceso: "14:45:19",
    almacen: "A",
    total: 213.68,
    usuario: "06649520",
    observacion: "CAMPAÑA MÉDICA",
  },
  {
    id: 3,
    estado: "1",
    salidaId: "25000647",
    cartillaId: "00000003",
    paciente: "PRADO DAVILA CARLOS ENRIQUE ALBERTO",
    servicio: "CIRUGIA GENERAL",
    documento: "25000647",
    tipo_transaccion: "STL",
    nombre_transaccion: "Salida por Transferencia de Laboratorio",
    fecha: "30/01/2026",
    hora: "13:26:28",
    fecha_proceso: "30/01/2026",
    hora_proceso: "13:26:55",
    almacen: "DU",
    total: 224.64,
    usuario: "06649520",
    observacion: "",
  },
  {
    id: 4,
    estado: "1",
    salidaId: "25000646",
    cartillaId: "00000002",
    paciente: "HOLGUIN CUCALON JORGE ALBERTO",
    servicio: "TRAUMATOLOGIA Y ORTOPEDIA",
    documento: "PPA-646",
    tipo_transaccion: "STS",
    nombre_transaccion: "Salida por Transferencia de Servicios",
    fecha: "30/01/2026",
    hora: "11:19:24",
    fecha_proceso: "30/01/2026",
    hora_proceso: "11:20:45",
    almacen: "A",
    total: 5000,
    usuario: "06649520",
    observacion: "REQUERIMIENTO O2",
  },
  {
    id: 5,
    estado: "1",
    salidaId: "25000645",
    cartillaId: "00000001",
    paciente: "MANRIQUE RODRIGUEZ DIJEIM SOLUN",
    servicio: "MEDICINA INTERNA",
    documento: "25000645",
    tipo_transaccion: "STS",
    nombre_transaccion: "Salida por Transferencia de Servicios",
    fecha: "30/01/2026",
    hora: "10:18:50",
    fecha_proceso: "30/01/2026",
    hora_proceso: "11:19:12",
    almacen: "DU",
    total: 299.52,
    usuario: "06649520",
    observacion: "SOBRE STOCK",
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

export default function CartillaMedicamentosPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSalida, setSelectedSalida] = useState(null);
  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const [selectAll, setSelectAll] = useState(false);
  const [nuevaSalida, setNuevaSalida] = useState(false);
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);
  const [showSuccessDelete, setShowSuccessDelete] = useState(false);
  const [cartillaToDelete, setCartillaToDelete] = useState<any>(null);
  const [cartillasVisibles, setCartillasVisibles] = useState<any[]>([]);
  const [showConfirmProcesar, setShowConfirmProcesar] = useState(false);
  const [showSuccessProcesar, setShowSuccessProcesar] = useState(false);
  const [salidaToProcesar, setSalidaToProcesar] = useState<any>(null);
  const [showDetalleModal, setShowDetalleModal] = useState(false);
  const [seguimientoDetalle, setSeguimientoDetalle] = useState<any>(null);
  const router = useRouter();
  const [searchBy, setSearchBy] = useState("cartillaId");
  const hoy = new Date();
  const primerDiaMes = new Date(hoy.getFullYear(), hoy.getMonth(), 1);
  const formatoISO = (fecha: Date) => fecha.toISOString().split("T")[0];
  const [fechaInicio, setFechaInicio] = useState(formatoISO(primerDiaMes));
  const [fechaFin, setFechaFin] = useState(formatoISO(hoy));

  const opcionesBusqueda = [
    { value: "cartillaId", label: "Cartilla ID" },
    { value: "paciente", label: "Paciente" },
    { value: "historiaClinica", label: "Historia Clínica" }
  ];

  // INICIALIZAR CUANDO CARGUE LA PÁGINA
  useEffect(() => {
    setCartillasVisibles(seguimientosFarmacoData);
  }, [seguimientosFarmacoData]);

  // ELIMINAR CARTILLA
  const handleDeleteClick = (salida: any) => {
    setCartillaToDelete(salida);
    setShowConfirmDelete(true);
  };

  const confirmDelete = () => {
    setShowConfirmDelete(false);

    // Ocultamiento visual
    setCartillasVisibles((prev) =>
      prev.filter((s) => s.id !== cartillaToDelete.id)
    );

    setTimeout(() => {
      setShowSuccessDelete(true);
    }, 200);
  };

  // SIMULAR PROCESAMIENTO DE UN DOCUMENTO DE SALIDA
  const confirmProcesar = () => {
    setShowConfirmProcesar(false);

    // Simulación de cambio de estado
    setCartillasVisibles((prev) =>
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
            onClick={() => router.push("/dashboard/farmacia-clinica")}
          >
            <Link href="/dashboard/farmacia-clinica">
              <ArrowLeft className="w-5 h-5" />
            </Link>
            Regresar
          </Button>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Cartilla de uso seguro de medicamentos</h1>
            <p className="text-muted-foreground">Gestione la aplicación del consumo seguro del medicamento por parte del paciente</p>
          </div>
        </div>
        <div className="bg-cyan-50 border border-cyan-200 border-2 p-4 rounded-md">
          <Label htmlFor="filtroArea" className="mr-2 font-medium">Área:</Label>
          <select
            id="filtroArea"
            className="border p-2 h-10 rounded-md w-72"
          >
            <option value="CONSULTORIOS EXTERNOS">Consultorios Externos</option>
            <option value="EMERGENCIA">Emergencia</option>
            <option value="HOSPITALIZACION">Hospitalización</option>
          </select>
        </div>
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
              onClick={() => router.push("/dashboard/farmacia-clinica/cartilla-medicamentos/registrar")}
            >
              <Plus className="h-5 w-5" strokeWidth={3} />
              Nuevo Documento
            </Button>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto border rounded-md">
        <Table>
          <TableHeader>
            <TableRow className="bg-cyan-600 hover:bg-cyan-600">
              {/*<TableHead>Estado</TableHead>*/}
              <TableHead className="font-semibold text-white hover:bg-transparent">Cartilla ID</TableHead>
              <TableHead className="font-semibold text-white hover:bg-transparent">Paciente</TableHead>
              {/*<TableHead className="font-semibold text-white hover:bg-transparent">Departamento de Hospitalización</TableHead>*/}
              <TableHead className="font-semibold text-white hover:bg-transparent">Servicio</TableHead>
              <TableHead className="font-semibold text-white hover:bg-transparent">Fecha y Hora Registro</TableHead>
              <TableHead className="font-semibold text-white hover:bg-transparent">Usuario</TableHead>
              <TableHead className="font-semibold text-white hover:bg-transparent">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {cartillasVisibles.map((cartilla) => (
              <TableRow key={cartilla.id} className={selectedItems.includes(cartilla.id) ? "bg-primary/10" : ""}>
                {/*<TableCell>{getEstadoBadge(salida.estado)}</TableCell>*/}
                <TableCell className="font-medium">{cartilla.cartillaId}</TableCell>
                <TableCell className="font-medium">{cartilla.paciente}</TableCell>
                {/*<TableCell className="font-medium">{salida.tipo_transaccion}</TableCell>*/}
                <TableCell className="font-medium">{cartilla.servicio}</TableCell>
                {/*<TableCell>
                  <div className="font-mediunm">{seguimiento.tipo_transaccion}</div>
                  <div className="text-sm text-gray-500">{seguimiento.nombre_transaccion}</div>
                </TableCell>*/}
                <TableCell>
                  <div className="font-medium">{cartilla.fecha}</div>
                  <div className="text-sm text-gray-500">{cartilla.hora}</div>
                </TableCell>
                <TableCell>{cartilla.usuario}</TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    <Button
                      title="Firmar documento"
                      variant="outline"
                      className="h-8 w-10 p-1.5 border-green-600 text-green-600 hover:bg-green-50"
                    >
                      <FileSignature className="w-3 h-3" />
                    </Button>
                    <Button
                      title="Ver detalle"
                      variant="outline"
                      className="h-8 w-10 p-1.5 border-blue-600 text-blue-600 hover:bg-blue-50"
                      onClick={() => 
                        router.push(`/dashboard/farmacia-clinica/cartilla-medicamentos/detalle/${cartilla.cartillaId}`)
                      }
                    >
                      <Eye className="w-3 h-3" />
                    </Button>
                    <Button
                      title="Editar"
                      variant="outline"
                      className={`h-8 w-10 p-1.5 border-yellow-600 text-yellow-600 hover:bg-yellow-50
                        ${cartilla.estado !== "1" ? "opacity-40 cursor-not-allowed" : ""}`}
                      disabled={cartilla.estado !== "1"}
                      onClick={() =>
                        router.push(`/dashboard/farmacia-clinica/cartilla-medicamentos/editar/${cartilla.cartillaId}`)
                      }
                    >
                      <Edit className="w-3 h-3" />
                    </Button>
                    <Button
                      title="Imprimir"
                      variant="outline"
                      className="h-8 w-10 p-1.5 border-purple-600 text-purple-600 hover:bg-purple-50"
                      onClick={() =>
                        window.open(
                          `/dashboard/almacenes/salidas/imprimir/${cartilla.id}`,
                          "_blank"
                        )
                      }
                    >
                      <Printer className="w-3 h-3" />
                    </Button>
                    <Button
                      title="Eliminar"
                      variant="outline"
                      className={`h-8 w-10 p-1.5 border-red-600 text-red-600 hover:bg-red-50
                        ${cartilla.estado !== "1" ? "opacity-40 cursor-not-allowed" : ""}`}
                      disabled={cartilla.estado !== "1"}
                      onClick={() => handleDeleteClick(cartilla)}
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

      {/* MODAL DE CONFIRMACIÓN DE ELIMINAR CARTILLA DE USO SEGURO DE MEDICAMENTOS */}
      {showConfirmDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6">
            <h2 className="text-lg font-semibold mb-2">Confirmar eliminación</h2>
            <p className="text-sm text-gray-600 mb-4">
              ¿Está seguro de eliminar la cartilla{" "}
              <span className="font-semibold">{cartillaToDelete?.documento}</span>?
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

      {/* MODAL DE ÉXITO DE ELIMINACIÓN DE CARTILLA DE USO SEGURO DE MEDICAMENTOS */}
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

