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
  Stethoscope,
  FileText,
  Receipt,
  Check,
  CheckCircle2,
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

const pacientesData = [
  {
    historia: "76516872",
    documento: "76516872",
    nombre: "CHUNGA HUAYLINOS LUIS DIEGO",
    sexo: "M",
    fechaNacimiento: "08/03/1996",
    seguro: "Pagante",
    direccion: "S/N",
    distrito: "LURIGANCHO",
  },
  {
    historia: "41877141",
    documento: "41877141",
    nombre: "HILARIO GARCIA MIGUEL ANGEL",
    sexo: "M",
    fechaNacimiento: "16/02/1983",
    seguro: "Pagante",
    direccion: "S/N",
    distrito: "MATUCANA",
  },
  {
    historia: "73101361",
    documento: "73101361",
    nombre: "HOLGUIN CUCALON JORGE ALBERTO",
    sexo: "M",
    fechaNacimiento: "11/05/1994",
    seguro: "Pagante",
    direccion: "S/N",
    distrito: "JESUS MARIA",
  },
  {
    historia: "46428041",
    documento: "46428041",
    nombre: "QUISPE JAVIER TERRY ANFONI",
    sexo: "M",
    fechaNacimiento: "26/07/1990",
    seguro: "Pagante",
    direccion: "S/N",
    distrito: "LURIGANCHO",
  },
  {
    historia: "76478385",
    documento: "76478385",
    nombre: "PRADO DAVILA CARLOS ENRIQUE ALBERTO",
    sexo: "M",
    fechaNacimiento: "12/04/1997",
    seguro: "Pagante",
    direccion: "S/N",
    distrito: "LURIGANCHO",
  },
];


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
  const [showBusquedaPaciente, setShowBusquedaPaciente] = useState(false);
  const [tipoBusquedaPaciente, setTipoBusquedaPaciente] = useState("Documento");
  const [tipoDocumento, setTipoDocumento] = useState("DNI");
  const [pacienteSeleccionado, setPacienteSeleccionado] = useState<any>(null);
  const [pacientesEncontrados, setPacientesEncontrados] = useState<any[]>([]);
  const [valorBusquedaPaciente, setValorBusquedaPaciente] = useState("");
  const [showEmisionBoleta, setShowEmisionBoleta] = useState(false);
  const [showCobroCita, setShowCobroCita] = useState(false);
  const [showCobroProforma, setShowCobroProforma] = useState(false);
  const [fechaHoraActual, setFechaHoraActual] = useState(new Date());
  const [showSuccessCobroCita, setShowSuccessCobroCita] = useState(false);

  const opcionesBusqueda = [
    { value: "pagoId", label: "Pago ID" },
    { value: "paciente", label: "Paciente" },
    { value: "historiaClinica", label: "Historia Clínica" }
  ];

  // INICIALIZAR CUANDO CARGUE LA PÁGINA
  useEffect(() => {
    setBoletasVisibles(boletasVentaData);
  }, [boletasVentaData]);

  // RELOJ EN TIEMPO REAL
  useEffect(() => {
    const intervalo = setInterval(() => {
      setFechaHoraActual(new Date());
    }, 1000);

    return () => clearInterval(intervalo);
  }, []);

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
              onClick={abrirBusquedaPaciente}
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

      {/* MODAL DE BÚDQUEDA DE PACIENTE */}
      <Dialog
        open={showBusquedaPaciente}
        onOpenChange={setShowBusquedaPaciente}
      >
        <DialogContent
          className="max-w-6xl"
          onPointerDownOutside={(e) => e.preventDefault()}
          onEscapeKeyDown={(e) => e.preventDefault()}
        >
          <DialogHeader>
            <DialogTitle>Buscar Paciente</DialogTitle>
            <DialogDescription>Seleccione un paciente para generar la boleta.</DialogDescription>
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
                value={valorBusquedaPaciente}
                onChange={(e) =>
                  setValorBusquedaPaciente(e.target.value)
                }
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
                            Cobrar Cita
                          </Button>

                          <Button
                            size="sm"
                            variant="outline"
                            className="border-purple-600 text-purple-600 hover:bg-purple-50"
                            onClick={() => {
                              setPacienteSeleccionado(paciente);
                              setShowBusquedaPaciente(false);
                              setShowCobroProforma(true);
                            }}
                          >
                            <FileText className="w-4 h-4 mr-1" />
                            Cobrar Prof./Orden
                          </Button>

                          <Button
                            size="sm"
                            variant="outline"
                            className="border-green-600 text-green-600 hover:bg-green-50"
                            onClick={() => {
                              setPacienteSeleccionado(paciente);
                              setShowBusquedaPaciente(false);
                              setOpenEmisionBoleta(true);
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
            <DialogTitle>Cobro de Cita</DialogTitle>
            <DialogDescription>Registro y cobro de atención médica.</DialogDescription>
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
            <DialogTitle>Cobro de Proforma / Orden</DialogTitle>
            <DialogDescription>Cobro de servicios generados por módulos asistenciales.</DialogDescription>
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

          {/* MODULO */}
          <Card>
            <CardContent className="pt-5">
              <h3 className="font-semibold text-cyan-700 mb-4">Módulo de Origen</h3>

              <div className="grid grid-cols-2 gap-3">
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

          {/* DATOS */}
          <Card>
            <CardContent className="pt-5">
              <h3 className="font-semibold text-cyan-700 mb-4">Datos de la Proforma</h3>

              <div className="grid grid-cols-8 gap-4">
                <div>
                  <Label>N° Proforma</Label>
                  <Input />
                </div>

                <div>
                  <Label>N° Orden</Label>
                  <Input />
                </div>

                <div className="md:col-span-2">
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

      {/* MODAL DE EMISIÓN DE BOLETA DE PAGO */}
      <Dialog
        open={openEmisionBoleta}
        onOpenChange={setOpenEmisionBoleta}
      >
        <DialogContent
          className="max-w-7xl max-h-[90vh] overflow-y-auto"
          onPointerDownOutside={(e) => e.preventDefault()}
          onEscapeKeyDown={(e) => e.preventDefault()}
        >
          <DialogHeader>
            <DialogTitle>Emisión de Boleta de Venta</DialogTitle>
            <DialogDescription>Registro de servicios médicos y generación de boleta.</DialogDescription>
          </DialogHeader>

          {/* CABECERA */}
          <div className="grid grid-cols-4 gap-4 rounded-lg bg-slate-50 border p-4">
            <div>
              <Label>Turno</Label>
              <Input value="GD" className="bg-gray-100 text-gray-600 font-semibold" disabled />
            </div>

            <div>
              <Label>Boleta</Label>
              <Input value="B004-0015090" className="bg-gray-100 text-gray-600 font-semibold" disabled />
            </div>

            <div>
              <Label>Fecha</Label>
              <Input value={obtenerFechaActual()} className="bg-gray-100 text-gray-600 font-semibold" disabled />
            </div>

            <div>
              <Label>Hora</Label>
              <Input value={obtenerHoraActual()} className="bg-gray-100 text-gray-600 font-semibold" disabled />
            </div>
          </div>

          {/* DATOS DEL PACIENTE */}
          <Card>
            <CardContent className="pt-5">
              <h3 className="font-semibold text-cyan-700 mb-4">Datos del Paciente</h3>
              <div className="grid grid-cols-4 gap-3">
                <div>
                  <Label>Pago ID</Label>
                  <Input />
                </div>

                <div>
                  <Label>Historia Clínica</Label>
                  <Input value={pacienteSeleccionado?.historia} className="border-slate-300 disabled:cursor-not-allowed disabled:opacity-50" disabled />
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
                  <Input value={pacienteSeleccionado?.nombre} />
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

          {/* CATÁLOGO */}
          <Card>
            <CardContent className="pt-5">
              <div className="mb-4">
                <h3 className="font-semibold text-cyan-700">Ingreso de Ítems</h3>
              </div>

              {/* FORMULARIO DE INGRESO */}
              <div className="grid grid-cols-12 gap-3 mb-5">
                <div className="col-span-7">
                  <Label>CPT</Label>
                  <Input
                    placeholder="Ingrese código CPT o nombre del concepto..."
                  />
                </div>

                <div className="col-span-2">
                  <Label>Cantidad</Label>

                  <Input
                    type="number"
                    defaultValue="1"
                  />
                </div>

                <div className="col-span-3 flex items-end">
                  <Button
                    className="w-full bg-green-600 hover:bg-green-700"
                  >
                    <Plus className="h-5 w-5" strokeWidth={3} />
                    Agregar
                  </Button>
                </div>
              </div>

              {/* TABLA */}
              <div className="border rounded-md overflow-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[120px]">Código CPT</TableHead>
                      <TableHead className="w-[80px]">Item</TableHead>
                      <TableHead>Nombre</TableHead>
                      <TableHead className="w-[90px] text-center">Cantidad</TableHead>
                      <TableHead className="w-[100px] text-right">Precio</TableHead>
                      <TableHead className="w-[100px] text-right">Descuento</TableHead>
                      <TableHead className="w-[120px] text-right">Importe</TableHead>
                      <TableHead className="w-[90px] text-center">Acción</TableHead>
                    </TableRow>
                  </TableHeader>

                  <TableBody>

                    {/* Ítems registrados */}

                  </TableBody>
                </Table>
              </div>

              <div className="flex justify-end items-center gap-3 mt-4">
                <span className="text-lg font-semibold text-gray-700">Total a Pagar:</span>

                <div className="bg-blue-50 border border-blue-200 rounded-lg px-6 py-4 min-w-[150px]">
                  <div className="text-2xl font-bold text-blue-700 text-center">
                    S/ 0.00
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
              Guardar Boleta
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

