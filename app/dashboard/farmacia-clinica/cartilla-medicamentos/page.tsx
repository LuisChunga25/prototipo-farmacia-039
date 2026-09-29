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
    estado: "1",
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
    estado: "1",
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
    estado: "1",
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
  const [salidaToDelete, setSalidaToDelete] = useState<any>(null);
  const [seguimientosVisibles, setSeguimientosVisibles] = useState<any[]>([]);
  const [showConfirmProcesar, setShowConfirmProcesar] = useState(false);
  const [showSuccessProcesar, setShowSuccessProcesar] = useState(false);
  const [salidaToProcesar, setSalidaToProcesar] = useState<any>(null);
  const [showDetalleModal, setShowDetalleModal] = useState(false);
  const [seguimientoDetalle, setSeguimientoDetalle] = useState<any>(null);
  const router = useRouter();
  const [searchBy, setSearchBy] = useState("seguimientoId");
  const hoy = new Date();
  const primerDiaMes = new Date(hoy.getFullYear(), hoy.getMonth(), 1);
  const formatoISO = (fecha: Date) => fecha.toISOString().split("T")[0];
  const [fechaInicio, setFechaInicio] = useState(formatoISO(primerDiaMes));
  const [fechaFin, setFechaFin] = useState(formatoISO(hoy));

  const opcionesBusqueda = [
    { value: "seguimientoId", label: "Seguimiento ID" },
    { value: "paciente", label: "Paciente" },
    { value: "historiaClinica", label: "Historia Clínica" }
  ];

  // INICIALIZAR CUANDO CARGUE LA PÁGINA
  useEffect(() => {
    setSeguimientosVisibles(seguimientosFarmacoData);
  }, [seguimientosFarmacoData]);

  // ELIMINAR DOCUMENTO DE SALIDA
  const handleDeleteClick = (salida: any) => {
    setSalidaToDelete(salida);
    setShowConfirmDelete(true);
  };

  const confirmDelete = () => {
    setShowConfirmDelete(false);

    // Ocultamiento visual
    setSeguimientosVisibles((prev) =>
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
    setSeguimientosVisibles((prev) =>
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
              onClick={() => router.push("/dashboard/almacenes/salidas/nueva")}
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
            {seguimientosVisibles.map((seguimiento) => (
              <TableRow key={seguimiento.id} className={selectedItems.includes(seguimiento.id) ? "bg-primary/10" : ""}>
                {/*<TableCell>{getEstadoBadge(salida.estado)}</TableCell>*/}
                <TableCell className="font-medium">{seguimiento.salidaId}</TableCell>
                <TableCell className="font-medium">{seguimiento.documento}</TableCell>
                {/*<TableCell className="font-medium">{salida.tipo_transaccion}</TableCell>*/}
                <TableCell className="font-medium">{seguimiento.nombre_transaccion}</TableCell>
                {/*<TableCell>
                  <div className="font-mediunm">{seguimiento.tipo_transaccion}</div>
                  <div className="text-sm text-gray-500">{seguimiento.nombre_transaccion}</div>
                </TableCell>*/}
                <TableCell>
                  <div className="font-medium">{seguimiento.fecha}</div>
                  <div className="text-sm text-gray-500">{seguimiento.hora}</div>
                </TableCell>
                <TableCell>{seguimiento.usuario}</TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    {/*<Button
                      title="Procesar"
                      variant="outline"
                      className={`h-8 w-10 p-1.5 border-green-600 text-green-600 hover:bg-green-50
                        ${salida.estado !== "1" ? "opacity-40 cursor-not-allowed" : ""}`}
                      disabled={salida.estado !== "1"}
                      onClick={() => {
                        setSalidaToProcesar(salida);
                        setShowConfirmProcesar(true);
                      }}
                    >
                      <CheckCircle className="w-3 h-3" />
                    </Button>*/}
                    <Button
                      title="Ver detalle"
                      variant="outline"
                      className="h-8 w-10 p-1.5 border-blue-600 text-blue-600 hover:bg-blue-50"
                      onClick={() => {
                        setSeguimientoDetalle(seguimiento);
                        setShowDetalleModal(true);
                      }}
                    >
                      <Eye className="w-3 h-3" />
                    </Button>
                    <Button
                      title="Editar"
                      variant="outline"
                      className={`h-8 w-10 p-1.5 border-yellow-600 text-yellow-600 hover:bg-yellow-50
                        ${seguimiento.estado !== "1" ? "opacity-40 cursor-not-allowed" : ""}`}
                      disabled={seguimiento.estado !== "1"}
                      onClick={() =>
                        router.push(`/dashboard/almacenes/salidas/editar/${seguimiento.id}`)
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
                          `/dashboard/almacenes/salidas/imprimir/${seguimiento.id}`,
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
                        ${seguimiento.estado !== "1" ? "opacity-40 cursor-not-allowed" : ""}`}
                      disabled={seguimiento.estado !== "1"}
                      onClick={() => handleDeleteClick(seguimiento)}
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
      {showDetalleModal && seguimientoDetalle && (
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
                  {getEstadoBadge(seguimientoDetalle.estado)}
                </div>
              </div>

              <div>
                <Label>Salida ID</Label>
                <Input disabled value={seguimientoDetalle.salidaId} />
              </div>

              <div>
                <Label>Documento</Label>
                <Input disabled value={seguimientoDetalle.documento} />
              </div>

              <div>
                <Label>Tipo de Transacción</Label>
                <Input disabled value={`${seguimientoDetalle.tipo_transaccion} - ${seguimientoDetalle.nombre_transaccion}`} />
              </div>

              <div>
                <Label>Fecha Registro</Label>
                <Input
                  disabled
                  value={`${seguimientoDetalle.fecha} ${seguimientoDetalle.hora}`}
                />
              </div>

              <div>
                <Label>Fecha Proceso</Label>
                <Input
                  disabled
                  value={`${seguimientoDetalle.fecha_proceso} ${seguimientoDetalle.hora_proceso}`}
                />
              </div>

              <div>
                <Label>Total (S/.)</Label>
                <Input disabled value={seguimientoDetalle.total.toFixed(2)} />
              </div>

              <div>
                <Label>Usuario</Label>
                <Input disabled value={seguimientoDetalle.usuario} />
              </div>

              <div className="md:col-span-2">
                <Label>Observación</Label>
                <Input disabled value={seguimientoDetalle.observacion || "-"} />
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

