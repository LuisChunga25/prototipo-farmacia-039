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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Define la interfaz
interface Devolucion {
  id: number;
  estado: string;
  ingresoId: string;
  documento: string;
  nombrePaciente: string;
  numPaciente: string;
  tipoTransaccion: string;
  nombreTransaccion: string;
  fecha: string;
  hora: string;
  fecha_proceso: string;
  hora_proceso: string;
  nombreAlmacen: string;
  usuario: string;
  nombreUsuario: string;
  motivo: string;
  observacion: string;
  productos: {
    item: number;
    nombreProd: string;
    presentacion: string;
    cantidad: number;
    precio: number;
    lote: string;
    fechaVenc: string;
  }[];
}

interface Subfila {
  cantAsignada: number;
  precio: string;
  importe: string;
  lote: string;
  venc: string;
}

interface Medicamento {
  item: number;
  producto: string;
  presentacion: string;
  sisMed: string;
  siga: string;
  cantSolicitada: number;
  subfilas: Subfila[];
}

interface Receta {
  fecha: string;
  seguro: string;
  servicio: string;
  farmaco: string;
  presentacion: string;
  cantidad: number;
  indicacion: string;
  via: string;
  diagnostico: string;
  medico: string;
}

interface Lote {
  cantAsignada: number;
  precio: string;
  importe: string;
  lote: string;
  venc: string;
}

interface MedicamentoBase {
  producto: string;
  sisMed: string;
  siga: string;
  presentacion: string;
  cantidadSolicitada?: number;
  lotes: Lote[];
}

interface Paciente {
  dni: string;
  historia: string;
  nombre: string;
  sexo: string;
  fechaNac: string;
  medico: string;
  seguro?: string;
  tipoAtencion?: string;
  especialidad?: string;
  transaccion?: string;
  receta?: string;
  cuenta?: string;
}


// DATOS DE EJEMPLO PARA LA TABLA
const devolucionesData = [
  {
    id: 1,
    estado: "1",
    ingresoId: "26013272",
    documento: "1726149898",
    nombrePaciente: "MANRIQUE RODRIGUEZ DIJEIM SOLUN",
    numPaciente: "2008112233",
    tipoTransaccion: "IDE",
    nombreTransaccion: "Ingreso por Devolución",
    fecha: "05/08/2026",
    hora: "11:26:15",
    fecha_proceso: "05/08/2026",
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
        cantidad: 1,
        precio: 1.87,
        lote: "LTGUAN1111",
        fechaVenc: "31/10/2026",
      },
      {
        item: 172556,
        nombreProd: "AGUA DESTILADA PARA INYECCION 1 L (S)",
        presentacion: "INY",
        cantidad: 1,
        precio: 7.86,
        lote: "LTAGUAD1111",
        fechaVenc: "31/12/2026",
      },
    ],
  },
  {
    id: 2,
    estado: "1",
    ingresoId: "26013271",
    documento: "1726149868",
    nombrePaciente: "URIBE CARLIN CARLOS ANTONIO",
    numPaciente: "2008445566",
    tipoTransaccion: "IDE",
    nombreTransaccion: "Ingreso por Devolución",
    fecha: "05/08/2026",
    hora: "11:12:07",
    fecha_proceso: "05/08/2026",
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
        precio: 1.87,
        lote: "LTGUAN1111",
        fechaVenc: "31/10/2026",
      },
      {
        item: 172556,
        nombreProd: "AGUA DESTILADA PARA INYECCION 1 L (S)",
        presentacion: "INY",
        cantidad: 1,
        precio: 7.86,
        lote: "LTAGUAD1111",
        fechaVenc: "31/12/2026",
      },
    ],
  },
  {
    id: 3,
    estado: "1",
    ingresoId: "26013270",
    documento: "1726149858",
    nombrePaciente: "CHUNGA HUAYLINOS LUIS DIEGO",
    numPaciente: "2008352165",
    tipoTransaccion: "IDE",
    nombreTransaccion: "Ingreso por Devolución",
    fecha: "05/08/2026",
    hora: "11:12:07",
    fecha_proceso: "05/08/2026",
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
        precio: 1.87,
        lote: "LTGUAN1111",
        fechaVenc: "31/10/2026",
      },
      {
        item: 172556,
        nombreProd: "AGUA DESTILADA PARA INYECCION 1 L (S)",
        presentacion: "INY",
        cantidad: 1,
        precio: 7.86,
        lote: "LTAGUAD1111",
        fechaVenc: "31/12/2026",
      },
    ],
  },
  {
    id: 4,
    estado: "1",
    ingresoId: "26013269",
    documento: "1726149869",
    nombrePaciente: "HILARIO GARCIA MIGUEL ANGEL",
    numPaciente: "2008126535",
    tipoTransaccion: "IDE",
    nombreTransaccion: "Ingreso por Devolución",
    fecha: "05/08/2026",
    hora: "11:10:25",
    fecha_proceso: "05/08/2026",
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
        precio: 1.87,
        lote: "LTGUAN1111",
        fechaVenc: "31/10/2026",
      },
      {
        item: 172556,
        nombreProd: "AGUA DESTILADA PARA INYECCION 1 L (S)",
        presentacion: "INY",
        cantidad: 1,
        precio: 7.86,
        lote: "LTAGUAD1111",
        fechaVenc: "31/12/2026",
      },
    ],
  },
  {
    id: 5,
    estado: "2",
    ingresoId: "26013268",
    documento: "1726149763",
    nombrePaciente: "HOLGUIN CUCALON JORGE ALBERTO",
    numPaciente: "2008136454",
    tipoTransaccion: "IDE",
    nombreTransaccion: "Ingreso por Devolución",
    fecha: "05/08/2026",
    hora: "11:09:11",
    fecha_proceso: "05/08/2026",
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
        precio: 1.87,
        lote: "LTGUAN1111",
        fechaVenc: "31/10/2026",
      },
      {
        item: 172556,
        nombreProd: "AGUA DESTILADA PARA INYECCION 1 L (S)",
        presentacion: "INY",
        cantidad: 1,
        precio: 7.86,
        lote: "LTAGUAD1111",
        fechaVenc: "31/12/2026",
      },
    ],
  },
  {
    id: 6,
    estado: "1",
    ingresoId: "26013267",
    documento: "1726149784",
    nombrePaciente: "HUILLCAHUARI DURAND DANIEL",
    numPaciente: "2008468421",
    tipoTransaccion: "IDE",
    nombreTransaccion: "Ingreso por Devolución",
    fecha: "05/08/2026",
    hora: "11:05:28",
    fecha_proceso: "05/08/2026",
    hora_proceso: "11:08:52",
    nombreAlmacen: "FARMACIA DOSIS UNITARIA",
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
        precio: 1.87,
        lote: "LTGUAN1111",
        fechaVenc: "31/10/2026",
      },
      {
        item: 172556,
        nombreProd: "AGUA DESTILADA PARA INYECCION 1 L (S)",
        presentacion: "INY",
        cantidad: 1,
        precio: 7.86,
        lote: "LTAGUAD1111",
        fechaVenc: "31/12/2026",
      },
    ],
  },
  {
    id: 7,
    estado: "2",
    ingresoId: "26013266",
    documento: "1726149635",
    nombrePaciente: "QUISPE JAVIER TERRY ANFONI",
    numPaciente: "2008561231",
    tipoTransaccion: "IDE",
    nombreTransaccion: "Ingreso por Devolución",
    fecha: "05/08/2026",
    hora: "11:02:01",
    fecha_proceso: "05/08/2026",
    hora_proceso: "11:02:35",
    nombreAlmacen: "FARMACIA DOSIS UNITARIA",
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
        precio: 1.87,
        lote: "LTGUAN1111",
        fechaVenc: "31/10/2026",
      },
      {
        item: 172556,
        nombreProd: "AGUA DESTILADA PARA INYECCION 1 L (S)",
        presentacion: "INY",
        cantidad: 1,
        precio: 7.86,
        lote: "LTAGUAD1111",
        fechaVenc: "31/12/2026",
      },
    ],
  },
  {
    id: 8,
    estado: "2",
    ingresoId: "26013265",
    documento: "1726149932",
    nombrePaciente: "PRADO DAVILA CARLOS ENRIQUE ALBERTO",
    numPaciente: "2008784213",
    tipoTransaccion: "IDE",
    nombreTransaccion: "Ingreso por Devolución",
    fecha: "05/08/2026",
    hora: "11:00:15",
    fecha_proceso: "05/08/2026",
    hora_proceso: "11:02:19",
    nombreAlmacen: "FARMACIA DOSIS UNITARIA",
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
        precio: 1.87,
        lote: "LTGUAN1111",
        fechaVenc: "31/10/2026",
      },
      {
        item: 172556,
        nombreProd: "AGUA DESTILADA PARA INYECCION 1 L (S)",
        presentacion: "INY",
        cantidad: 1,
        precio: 7.86,
        lote: "LTAGUAD1111",
        fechaVenc: "31/12/2026",
      },
    ],
  },
]

const pacientesPrueba: Record<string, any> = {
  "12345678": {
    dni: "12345678",
    nombre: "CHUNGA HUAYLINOS LUIS DIEGO",
    historia: "12345678",
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
  "87654321": {
    dni: "87654321",
    nombre: "HILARIO GARCIA MIGUEL ANGEL",
    historia: "87654321",
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
  "11223344": {
    dni: "11223344",
    nombre: "PRADO DAVILA CARLOS ENRIQUE ALBERTO",
    historia: "11223344",
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
  "55667788": {
    dni: "55667788",
    nombre: "HUILLCAHUARI DURAND DANIEL",
    historia: "55667788",
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
  "23456789": {
    dni: "23456789",
    nombre: "LOPEZ ORTEGA JORGE GUILLERMO",
    historia: "23456789",
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

const medicamentosPrueba: Record<string, any[]> = {
  "12345678": [
    {
      item: 1,
      producto: "PARACETAMOL 500 MG TAB",
      presentacion: "TAB",
      sisMed: "05335",
      siga: "580200460011",
      cantSolicitada: 10,
      subfilas: [
        { cantAsignada: 5, precio: "S/ 2.00", importe: "S/ 10.00", lote: "LTPAR22222", venc: "31/10/2026" },
        { cantAsignada: 5, precio: "S/ 2.00", importe: "S/ 10.00", lote: "LTPAR33333", venc: "31/12/2026" },
      ],
    },
    {
      item: 2,
      producto: "AMOXICILINA 500 MG",
      presentacion: "TAB",
      sisMed: "00808",
      siga: "580700100007",
      cantSolicitada: 7,
      subfilas: [
        { cantAsignada: 7, precio: "S/ 3.50", importe: "S/ 24.50", lote: "LTAMOX210702", venc: "30/09/2026" },
      ],
    },
    {
      item: 3,
      producto: "NAPROXENO 500 MG TAB",
      presentacion: "TAB",
      sisMed: "04982",
      siga: "580200450003",
      cantSolicitada: 7,
      subfilas: [
        { cantAsignada: 7, precio: "S/ 3.50", importe: "S/ 24.50", lote: "LTNAP210701", venc: "30/09/2027" },
      ],
    },
  ],
  "87654321": [
    {
      item: 1,
      producto: "IBUPROFENO 400 MG TAB",
      presentacion: "TAB",
      sisMed: "04034",
      siga: "580200430010",
      cantSolicitada: 12,
      subfilas: [
        { cantAsignada: 12, precio: "S/ 1.80", importe: "S/ 21.60", lote: "LTIBU2026", venc: "30/11/2026" },
      ],
    },
  ],
  "11223344": [
    {
      item: 1,
      producto: "TRAMADOL 50 MG",
      presentacion: "TAB",
      sisMed: "07654",
      siga: "580900100099",
      cantSolicitada: 12,
      subfilas: [
        { cantAsignada: 6, precio: "S/ 1.80", importe: "S/ 10.80", lote: "LTTRAM202601", venc: "30/11/2026" },
        { cantAsignada: 6, precio: "S/ 2.00", importe: "S/ 12.00", lote: "LTTRAM202602", venc: "31/03/2027" },
      ],
    },
  ],
  "55667788": [
    {
      item: 1,
      producto: "PARACETAMOL 500 MG TAB",
      presentacion: "TAB",
      sisMed: "07654",
      siga: "580900100099",
      cantSolicitada: 12,
      subfilas: [
        { cantAsignada: 6, precio: "S/ 1.50", importe: "S/ 9.00", lote: "LTPAR202601", venc: "30/11/2026" },
        { cantAsignada: 6, precio: "S/ 1.20", importe: "S/ 7.20", lote: "LTPAR202602", venc: "31/03/2027" },
      ],
    },
  ],
  "23456789": [
    {
      item: 1,
      producto: "IBUPROFENO 400 MG",
      presentacion: "TAB",
      sisMed: "07654",
      siga: "580900100099",
      cantSolicitada: 12,
      subfilas: [
        { cantAsignada: 6, precio: "S/ 1.50", importe: "S/ 9.00", lote: "LTPAR202601", venc: "30/11/2026" },
        { cantAsignada: 6, precio: "S/ 1.20", importe: "S/ 7.20", lote: "LTPAR202602", venc: "31/03/2027" },
      ],
    },
  ],
};

const historialPrueba: Record<string, Receta[]> = {
  "12345678": [
    {
      fecha: "15/08/2026",
      seguro: "SIS",
      servicio: "CE",
      farmaco: "PARACETAMOL 500 MG TAB",
      presentacion: "TAB",
      cantidad: 28,
      indicacion: "1 cada 6 hrs por 17 días",
      via: "Oral",
      diagnostico: "J110 - Influenza con Neumonía, Virus no Identificado",
      medico: "DIONICIO IBAÑEZ LUIS FELIPE",
    },
    {
      fecha: "10/08/2026",
      seguro: "SIS",
      servicio: "EM",
      farmaco: "AMOXICILINA 500 MG",
      presentacion: "TAB",
      cantidad: 12,
      indicacion: "1 cada 3 hrs por 14 días",
      via: "Oral",
      diagnostico: "J209 - Bronquitis Aguda, no Especificada",
      medico: "BASOMBRIO VELASQUEZ JORGE",
    },
    {
      fecha: "08/08/2026",
      seguro: "SIS",
      servicio: "CE",
      farmaco: "NAPROXENO 500 MG TAB",
      presentacion: "TAB",
      cantidad: 20,
      indicacion: "1 cada 12 hrs por 10 días",
      via: "Oral",
      diagnostico: "J040 - Laringitis Aguda",
      medico: "BASOMBRIO VELASQUEZ JORGE",
    },
  ],
  "87654321": [
    {
      fecha: "24/08/2026",
      seguro: "PAGANTE",
      servicio: "CE",
      farmaco: "IBUPROFENO 400 MG",
      presentacion: "TAB",
      cantidad: 20,
      indicacion: "1 cada 12 hrs por 2 días",
      via: "Oral",
      diagnostico: "M151 - Artritis",
      medico: "BASOMBRIO VELASQUEZ JORGE",
    },
    {
      fecha: "13/08/2026",
      seguro: "PAGANTE",
      servicio: "CE",
      farmaco: "ORFENADRINA CITRATO 100 MG",
      presentacion: "TAB",
      cantidad: 7,
      indicacion: "1 cada 24 hrs por 7 días",
      via: "Oral",
      diagnostico: "M151 - Artritis",
      medico: "BASOMBRIO VELASQUEZ JORGE",
    },
  ],
  "11223344": [
    {
      fecha: "13/08/2026",
      seguro: "SIS",
      servicio: "CE",
      farmaco: "IBUPROFENO 400 MG",
      presentacion: "TAB",
      cantidad: 20,
      indicacion: "1 cada 12 hrs por 10 días",
      via: "Oral",
      diagnostico: "M151 - Artritis",
      medico: "APAZA ARAUJO BERIOSKA PAMELA",
    },
    {
      fecha: "13/08/2026",
      seguro: "SIS",
      servicio: "CE",
      farmaco: "ORFENADRINA CITRATO 100 MG",
      presentacion: "TAB",
      cantidad: 7,
      indicacion: "1 cada 24 hrs por 7 días",
      via: "Oral",
      diagnostico: "M151 - Artritis",
      medico: "APAZA ARAUJO BERIOSKA PAMELA",
    },
    {
      fecha: "12/08/2026",
      seguro: "SIS",
      servicio: "CE",
      farmaco: "LORATADINA 10MG TABLETA",
      presentacion: "TAB",
      cantidad: 14,
      indicacion: "1 cada 1 hrs por 14 días",
      via: "Oral",
      diagnostico: "H609 - Otitis Externa, sin otra Especificacion",
      medico: "PACHAS CABREJOS MIGUEL ROLANDO",
    },
  ],
  "55667788": [
    {
      fecha: "13/08/2026",
      seguro: "SIS",
      servicio: "CE",
      farmaco: "IBUPROFENO 400 MG",
      presentacion: "TAB",
      cantidad: 20,
      indicacion: "1 cada 12 hrs por 10 días",
      via: "Oral",
      diagnostico: "M151 - Artritis",
      medico: "APAZA ARAUJO BERIOSKA PAMELA",
    },
    {
      fecha: "13/08/2026",
      seguro: "SIS",
      servicio: "CE",
      farmaco: "ORFENADRINA CITRATO 100 MG",
      presentacion: "TAB",
      cantidad: 7,
      indicacion: "1 cada 24 hrs por 7 días",
      via: "Oral",
      diagnostico: "M151 - Artritis",
      medico: "APAZA ARAUJO BERIOSKA PAMELA",
    },
    {
      fecha: "12/08/2026",
      seguro: "SIS",
      servicio: "CE",
      farmaco: "LORATADINA 10MG TABLETA",
      presentacion: "TAB",
      cantidad: 14,
      indicacion: "1 cada 1 hrs por 14 días",
      via: "Oral",
      diagnostico: "H609 - Otitis Externa, sin otra Especificacion",
      medico: "PACHAS CABREJOS MIGUEL ROLANDO",
    },
  ],
  "23456789": [
    {
      fecha: "24/08/2026",
      seguro: "SIS",
      servicio: "CE",
      farmaco: "IBUPROFENO 400 MG",
      presentacion: "TAB",
      cantidad: 20,
      indicacion: "1 cada 12 hrs por 2 días",
      via: "Oral",
      diagnostico: "M151 - Artritis",
      medico: "APAZA ARAUJO BERIOSKA PAMELA",
    },
    {
      fecha: "13/08/2026",
      seguro: "SIS",
      servicio: "CE",
      farmaco: "ORFENADRINA CITRATO 100 MG",
      presentacion: "TAB",
      cantidad: 7,
      indicacion: "1 cada 24 hrs por 7 días",
      via: "Oral",
      diagnostico: "M151 - Artritis",
      medico: "APAZA ARAUJO BERIOSKA PAMELA",
    },
    {
      fecha: "12/08/2026",
      seguro: "SIS",
      servicio: "CE",
      farmaco: "LORATADINA 10MG TABLETA",
      presentacion: "TAB",
      cantidad: 14,
      indicacion: "1 cada 1 hrs por 14 días",
      via: "Oral",
      diagnostico: "H609 - Otitis Externa, sin otra Especificacion",
      medico: "PACHAS CABREJOS MIGUEL ROLANDO",
    },
  ],
};

const medicamentosDisponibles: MedicamentoBase[] = [
  {
    producto: "PARACETAMOL 500 MG TAB",
    presentacion: "TAB",
    sisMed: "05335",
    siga: "580200460011",
    lotes: [
      { cantAsignada: 5, precio: "S/ 2.00", importe: "S/ 10.00", lote: "LTPAR22222", venc: "31/10/2026" },
      { cantAsignada: 5, precio: "S/ 2.00", importe: "S/ 10.00", lote: "LTPAR33333", venc: "31/12/2026" },
    ],
  },
  {
    producto: "AMOXICILINA 500 MG",
    presentacion: "TAB",
    sisMed: "00808",
    siga: "580700100007",
    lotes: [
      { cantAsignada: 7, precio: "S/ 3.50", importe: "S/ 24.50", lote: "LTAMOX210702", venc: "30/09/2026" },
    ],
  },
  {
    producto: "IBUPROFENO 400 MG",
    presentacion: "TAB",
    sisMed: "01234",
    siga: "580900100099",
    lotes: [
      { cantAsignada: 12, precio: "S/ 1.80", importe: "S/ 21.60", lote: "LTIBU2026", venc: "30/11/2026" },
    ],
  },
];

const tarifariosPrueba = {
  SIS: [
    { producto: "Paracetamol 500mg", presentacion: "TAB", precio: 0.07, costo: 0.06, stock: 87000 },
    { producto: "Amoxicilina 500mg", presentacion: "TAB", precio: 0.18, costo: 0.14, stock: 32800 },
  ],
  SOAT: [
    { producto: "Paracetamol 500mg", presentacion: "TAB", precio: 0.07, costo: 0.06, stock: 87000 },
  ],
  Pagante: [
    { producto: "Paracetamol 500mg", presentacion: "TAB", precio: 0.07, costo: 0.06, stock: 87000 },
    { producto: "Amoxicilina 500mg", presentacion: "TAB", precio: 0.18, costo: 0.14, stock: 32800 },
  ],
  Estrategia: [
    { producto: "(DES.) Azitromicina 200 mg/5 mL 60 mL", presentacion: "SUS", precio: 6.21, costo: 4.98, stock: 2999 },
    { producto: "(DES.) Cefalozina (COMO SAL SODICA) 1 g", presentacion: "INY", precio: 1.31, costo: 1.05, stock: 9025 },
    { producto: "(P.DIAB) Glimepirida 4 mg", presentacion: "TAB", precio: 0.62, costo: 0.62, stock: 700 },
    { producto: "(P.DIAB) Losartan Potasico 50 mg", presentacion: "TAB", precio: 0.04, costo: 0.04, stock: 22990 },
    { producto: "(P.DIAB) Metformina Clorhidrato 850 mg", presentacion: "TAB", precio: 0.04, costo: 0.04, stock: 18000 },
    { producto: "(P.VIH) Lopinavir + Ritonavir 200 mg + 50 mg", presentacion: "TAB", precio: 0.56, costo: 0.56, stock: 3120 },
    { producto: "(P.VIH) Raltegravir 400 mg", presentacion: "TAB", precio: 2.72, costo: 2.72, stock: 2340 },
    { producto: "(P.VIH) Ritonavir 100 mg", presentacion: "TAB", precio: 0.68, costo: 0.68, stock: 300 },
  ],
}


export default function SalidasPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchBy, setSearchBy] = useState("ingresoId");
  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const [devolucionesVisibles, setDevolucionesVisibles] = useState<any[]>([]);
  const [modalNuevaProforma, setModalNuevaProforma] = useState(false);
  const [modalDetallePaciente, setModalDetallePaciente] = useState(false);
  const [modalPacienteExterno, setModalPacienteExterno] = useState(false);
  const [modalRecetaExterna, setModalRecetaExterna] = useState(false);
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
  const [sugerencias, setSugerencias] = useState<MedicamentoBase[]>([]);
  const [cantidad, setCantidad] = useState("");
  const [medicamentos, setMedicamentos] = useState<MedicamentoBase[]>([]);
  const [medicamentosData, setMedicamentosData] = useState<Medicamento[]>([]);
  const [mostrarConfirmacion, setMostrarConfirmacion] = useState(false);
  const [mostrarExito, setMostrarExito] = useState(false);
  const [mostrarDetalle, setMostrarDetalle] = useState(false);
  const [devolucionSeleccionada, setDevolucionSeleccionada] = useState<Devolucion | null>(null);
  const [mostrarConfirmacionAnular, setMostrarConfirmacionAnular] = useState(false);
  const [mostrarExitoAnular, setMostrarExitoAnular] = useState(false);
  const [motivoAnulacion, setMotivoAnulacion] = useState("");
  const [pacienteData, setPacienteData] = useState<any | null>(null);
  const [medicoReceta, setMedicoReceta] = useState("");
  const [historialData, setHistorialData] = useState<Receta[]>([]);
  const [paciente, setPaciente] = useState("");
  const [historia, setHistoria] = useState("");
  const [seguro, setSeguro] = useState("");
  const [tipoAtencion, setTipoAtencion] = useState("");
  const [especialidad, setEspecialidad] = useState("");
  const [medico, setMedico] = useState("");
  const [activarRecetaEspecial, setActivarRecetaEspecial] = useState(false);
  const [recetaEspecial, setRecetaEspecial] = useState("");
  const [tipoBusqueda, setTipoBusqueda] = useState("documento");
  const [resultadosBusqueda, setResultadosBusqueda] = useState<any[]>([]);
  const [filtroFarmacia, setFiltroFarmacia] = useState("CONSULTORIOS EXTERNOS");
  const [modalAviso, setModalAviso] = useState(false);
  const [mensajeAviso, setMensajeAviso] = useState("");
  const [openTarifario, setOpenTarifario] = useState(false);
  const [busqueda, setBusqueda] = useState("");
  const [medicamentoEditando, setMedicamentoEditando] = useState<number | null>(null);
  const [nuevaCantidad, setNuevaCantidad] = useState("");
  const [modalEditarCantidadMed, setModalEditarCantidadMed] = useState(false);
  const [errorStock, setErrorStock] = useState("");

  // Estados de error
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [errorMedicamentos, setErrorMedicamentos] = useState("");

  // Formatear a yyyy-MM-dd para que el input type="date" lo acepte
  const formatoISO = (fecha: Date) => fecha.toISOString().split("T")[0];
  const [fechaInicio, setFechaInicio] = useState(formatoISO(primerDiaMes));
  const [fechaFin, setFechaFin] = useState(formatoISO(hoy));

  // Función validar DNI
  const validarDni = () => {
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
      setMedicamentosData(medicamentosPrueba[dni.trim()] || []);
      setMedicoReceta(pacientesPrueba[dni.trim()].medico);
      setHistorialData(historialPrueba[dni.trim()] || []);
      setDniValidado(true); // despliega datos solo si cumple
    }
  }

  // Parsear la fecha y duración
  const obtenerDiasDeIndicacion = (indicacion: string): number => {
    const match = indicacion.match(/(\d+)\s*d[ií]as/i);
    return match ? parseInt(match[1], 10) : 0;
  };

  // Función de verificación de vigencia
  const verificarConflicto = (dni: string | undefined, medicamento: any) => {
    if (!dni) return null;

    const recetasPrevias = historialPrueba[dni] || [];

    const fechaActualDate = new Date();

    const recetaPrev = recetasPrevias.find((r) => {
      // Verificar que sea el mismo medicamento
      const mismoMedicamento =
        r.farmaco.toUpperCase().includes(medicamento.producto.toUpperCase()) ||
        medicamento.producto.toUpperCase().includes(r.farmaco.toUpperCase());

      if (!mismoMedicamento) return false;

      // Obtener cantidad de días de la indicación
      const diasTratamiento = obtenerDiasDeIndicacion(r.indicacion);

      if (diasTratamiento <= 0) return false;

      // Convertir fecha DD/MM/YYYY a Date
      const [dia, mes, anio] = r.fecha.split("/").map(Number);

      const fechaInicio = new Date(anio, mes - 1, dia);

      // Fecha final = fecha inicial + días - 1
      const fechaFin = new Date(fechaInicio);
      fechaFin.setDate(fechaFin.getDate() + diasTratamiento - 1);

      // Verificar si el tratamiento continúa vigente
      return (
        fechaActualDate >= fechaInicio &&
        fechaActualDate <= fechaFin
      );
    });

    if (recetaPrev) {
      const diasTratamiento = obtenerDiasDeIndicacion(recetaPrev.indicacion);

      const [dia, mes, anio] = recetaPrev.fecha.split("/").map(Number);
      const fechaInicio = new Date(anio, mes - 1, dia);

      const fechaFin = new Date(fechaInicio);
      fechaFin.setDate(fechaFin.getDate() + diasTratamiento - 1);

      const fechaFinFormateada = fechaFin.toLocaleDateString("es-PE");

      return `Este medicamento ya fue recetado el ${recetaPrev.fecha} por ${diasTratamiento} días. Tratamiento vigente hasta el ${fechaFinFormateada}.`;
    }

    return null;
  };

  // Calcular color según la fecha de vencimiento
  const obtenerColorVencimiento = (fechaVenc: string) => {
    const [dia, mes, anio] = fechaVenc.split("/").map(Number);
    const fechaVencimiento = new Date(anio, mes - 1, dia);
    const hoy = new Date();

    const diferenciaMeses =
      (fechaVencimiento.getFullYear() - hoy.getFullYear()) * 12 +
      (fechaVencimiento.getMonth() - hoy.getMonth());

    if (diferenciaMeses <= 3) return "bg-red-500 text-white";     // Rojo
    if (diferenciaMeses <= 6) return "bg-yellow-400 text-black";  // Amarillo
    return "bg-green-500 text-white";                             // Verde
  };

  // Convertir el importe en número y sumar para obtener el total
  const totalImporte = medicamentosData.reduce((acc, med) => {
    return acc + med.subfilas.reduce((subAcc, subfila) => {
      // quitar "S/" y convertir a número
      const valor = parseFloat(subfila.importe.replace("S/", "").trim());
      return subAcc + (isNaN(valor) ? 0 : valor);
    }, 0);
  }, 0);

  // Función dinámica para la suma de los importes en la receta externa
  const totalImporteRecExt = medicamentos.reduce((acc, med) => {
    return acc + med.lotes.reduce((subAcc, lote) => {
      const valor = parseFloat(lote.importe.replace("S/", "").trim());
      return subAcc + (isNaN(valor) ? 0 : valor);
    }, 0);
  }, 0);

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

  // MAPEO DE LAS FARMACIAS
  const mapaFarmacias: Record<string, string> = {
    "CONSULTORIOS EXTERNOS": "CONSULTA EXTERNA",
    "FARMACIA EMERGENCIA": "EMERGENCIA",
    "FARMACIA DOSIS UNITARIA": "HOSPITALIZACON", // ojo con la ortografía en tu data
  };


  const opcionesBusqueda = [
    { value: "ingresoId", label: "Ingreso ID" },
    { value: "documento", label: "N° Proforma" },
    { value: "paciente", label: "Paciente" },
  ];

  // INICIALIZAR CUANDO CARGUE LA PÁGINA
  useEffect(() => {
    setDevolucionesVisibles(devolucionesData);
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
    return devolucionesData.filter((devolucion) => {
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
            campo = devolucion.documento;
            break;
          case "paciente":
            campo = devolucion.nombrePaciente;
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
      setDniValidado(false);
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
    setModalNuevaProforma(false);
    setModalDetallePaciente(false);
    setDniValidado(false);
    setDni("");
    setError("");
    setPacienteExterno(false);
    setMedicamentos([]); // limpia la tabla al cancelar
    setPaciente("");
    setHistoria("");
    setSeguro("");
    setTipoAtencion("");
    setEspecialidad("");
    setMedico("");
    setErrors({});
    setProducto("");
    setCantidad("");
    setSugerencias([]);
    setErrorMedicamentos("");
    setActivarRecetaEspecial(false);
    setRecetaEspecial("");
    setResultadosBusqueda([]);
    setTipoBusqueda("documento");
    setMostrarExito(false);
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
            <option value="FARMACIA DOSIS UNITARIA">Farmacia Dosis Unitaria</option>
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
            <Label htmlFor="fechaInicio" className="mb-1">Desde</Label>
            <Input
              id="fechaInicio"
              type="date"
              className="h-10 w-44"
              value={fechaInicio}
              onChange={(e) => setFechaInicio(e.target.value)}
            />
          </div>

          <div className="flex flex-col">
            <Label htmlFor="fechaFin" className="mb-1">Hasta</Label>
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
              onClick={() => setModalNuevaProforma(true)}
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
              <TableHead className="font-semibold text-white hover:bg-transparent">Documento</TableHead>
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
                  <TableCell className="font-medium">{devolucion.documento}</TableCell>
                  <TableCell>
                    <div className="font-mediunm">{devolucion.nombrePaciente}</div>
                    <div className="text-sm text-gray-500">{devolucion.numPaciente}</div>
                  </TableCell>
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
                        title="Ver detalle"
                        variant="outline"
                        className="h-8 w-10 p-1.5 border-blue-600 text-blue-600 hover:bg-blue-50 flex items-center justify-center"
                        onClick={() => {
                          setDevolucionSeleccionada(devolucion);
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
                          setDevolucionSeleccionada(devolucion);
                          setMostrarConfirmacionAnular(true);
                        }}
                        disabled={devolucion.estado === "3"}
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* MODAL DE DETALLE DE LA PROFORMA GENERADA */}
      {mostrarDetalle && devolucionSeleccionada && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50">
          <div className="bg-white rounded-md shadow-lg p-6 max-w-6xl w-full">
            {/* Encabezado con título y botón X */}
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-bold text-blue-900">Detalle de Proforma</h2>
              <button
                onClick={() => setMostrarDetalle(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Datos del paciente */}
            <div className="grid grid-cols-2 gap-4 mb-6 text-sm">
              <div>
                <p><strong>Paciente:</strong> {devolucionSeleccionada.nombrePaciente}</p>
                <p><strong>Código de paciente:</strong> {devolucionSeleccionada.numPaciente}</p>
                <p><strong>ID Ingreso:</strong> {devolucionSeleccionada.ingresoId}</p>
                <p><strong>Documento:</strong> {devolucionSeleccionada.documento}</p>
              </div>
              <div>
                <p><strong>Fecha de registro:</strong> {devolucionSeleccionada.fecha}</p>
                <p><strong>Hora de registro:</strong> {devolucionSeleccionada.hora}</p>
                <p><strong>Almacén:</strong> {devolucionSeleccionada.nombreAlmacen}</p>
                <p><strong>Usuario Creación:</strong> {devolucionSeleccionada.nombreUsuario}</p>
              </div>
            </div>

            {/* Botón historial */}
            {/*<Button variant="outline" className="mb-4">Ver historial de recetas</Button>*/}

            {/* Tabla de medicamentos */}
            <div className="overflow-x-auto max-h-[400px]">
              <table className="min-w-full border-collapse border border-gray-300 text-sm">
                <thead className="bg-blue-900 text-white">
                  <tr>
                    <th className="border px-3 py-2">Item</th>
                    <th className="border px-3 py-2">Producto</th>
                    <th className="border px-3 py-2">Presentación</th>
                    <th className="border px-3 py-2">Cantidad</th>
                    <th className="border px-3 py-2">Precio</th>
                    <th className="border px-3 py-2">Importe</th>
                    <th className="border px-3 py-2">Lote</th>
                    <th className="border px-3 py-2">F. Venc.</th>
                  </tr>
                </thead>
                <tbody>
                  {devolucionSeleccionada.productos.map((prod, idx) => (
                    <tr key={idx}>
                      <td className="border px-3 py-2">{prod.item}</td>
                      <td className="border px-3 py-2">{prod.nombreProd}</td>
                      <td className="border px-3 py-2">{prod.presentacion}</td>
                      <td className="border px-3 py-2">{prod.cantidad}</td>
                      <td className="border px-3 py-2">{prod.precio}</td>
                      <td className="border px-3 py-2">
                      </td>
                      <td className="border px-3 py-2">{prod.lote}</td>
                      <td className="border px-3 py-2">{prod.fechaVenc}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Total */}
            {/*<div className="flex justify-end mt-4">
              <div className="bg-blue-900 text-white font-bold px-6 py-2 rounded-md shadow">
                Total: S/ {devolucionSeleccionada.productos
                  .reduce((acc, prod) => {
                    const precio = parseFloat(prod.precio.replace("S/", "").trim());
                    return acc + (prod.cantidad * precio);
                  }, 0)
                  .toFixed(2)}
              </div>
            </div>*/}

            {/* Botón cerrar */}
            <div className="flex justify-end mt-4">
              <Button variant="outline" onClick={() => setMostrarDetalle(false)}>Cerrar</Button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL DE CONSULTA DE TARIFARIO */}
      <Dialog open={openTarifario} onOpenChange={setOpenTarifario}>
        <DialogContent
          onInteractOutside={(e) => e.preventDefault()}
          onEscapeKeyDown={(e) => e.preventDefault()}
          className="sm:max-w-3xl bg-white rounded-lg shadow-lg pt-8 pr-8"
        >
          <DialogHeader className="flex items-center justify-between bg-blue-50 p-3 rounded-t">
            <DialogTitle className="text-lg font-bold text-gray-800 flex items-center gap-2">
              <Search className="h-5 w-5 text-blue-600" />
              Consultar Tarifario
            </DialogTitle>
          </DialogHeader>

          {/* Buscador */}
          <div className="p-3">
            <Input
              type="text"
              placeholder="Buscar producto..."
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
              className="w-full border rounded px-3 py-2 text-sm"
            />
          </div>

          {/* Tabs de tarifarios */}
          <Tabs defaultValue="SIS" className="p-3">
            <TabsList className="grid grid-cols-4 gap-2 mb-4">
              <TabsTrigger value="SIS">SIS</TabsTrigger>
              <TabsTrigger value="SOAT">SOAT</TabsTrigger>
              <TabsTrigger value="Pagante">Pagante</TabsTrigger>
              <TabsTrigger value="Estrategia">Estrategia</TabsTrigger>
            </TabsList>

            {Object.entries(tarifariosPrueba).map(([tipo, items]) => (
              <TabsContent key={tipo} value={tipo}>
                <table className="min-w-full border-collapse border border-gray-300 text-sm">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="border px-3 py-2">Producto</th>
                      <th className="border px-3 py-2">Presentación</th>
                      <th className="border px-3 py-2">Precio (S/)</th>
                      <th className="border px-3 py-2">Costo</th>
                      <th className="border px-3 py-2">Stock</th>
                    </tr>
                  </thead>
                  <tbody>
                    {items
                      .filter((t) =>
                        t.producto.toLowerCase().includes(busqueda.toLowerCase())
                      )
                      .map((t, idx) => (
                        <tr key={idx} className="hover:bg-blue-50 transition-colors">
                          <td className="border px-3 py-2">{t.producto}</td>
                          <td className="border px-3 py-2">{t.presentacion}</td>
                          <td className="border px-3 py-2 text-right">
                            {t.precio.toFixed(2)}
                          </td>
                          <td className="border px-3 py-2">{t.costo}</td>
                          <td className="border px-3 py-2">{t.stock}</td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </TabsContent>
            ))}
          </Tabs>
        </DialogContent>
      </Dialog>

      {/* MODAL DE CONFIRMACIÓN DE ANULACIÓN DE PROFORMA */}
      {mostrarConfirmacionAnular && devolucionSeleccionada && (
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
      {mostrarExitoAnular && devolucionSeleccionada && (
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
                  if (devolucionSeleccionada) {
                    devolucionSeleccionada.estado = "3"; // nuevo estado
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
          <div className="bg-white rounded-md shadow-lg p-6 max-w-5xl w-full max-h-[90vh] overflow-y-auto relative">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Registrar Proforma</h2>

              <button
                type="button"
                onClick={resetForm}
                className="text-gray-500 hover:text-red-600"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Aquí va tu formulario */}
            <form>
              <div className="mb-6 mt-6 flex justify-between items-center">
                <h3 className="text-md font-semibold">Buscar Paciente</h3>

                {resultadosBusqueda.length > 0 && (
                  <Button
                    type="button"
                    className="bg-gray-500 hover:bg-gray-600 text-white h-9 px-3"
                    onClick={() => {
                      setDni("");
                      setError("");
                      setResultadosBusqueda([]);
                      setPacienteData(null);
                      setMedicamentosData([]);
                      setHistorialData([]);
                      setDniValidado(false);
                      setPacienteExterno(false);
                      setTipoBusqueda("documento");
                    }}
                  >
                    Nueva Búsqueda
                  </Button>
                )}
              </div>
              <div className="flex items-center gap-4 mb-4">
                <select
                  value={tipoBusqueda}
                  onChange={(e) => setTipoBusqueda(e.target.value)}
                  className="border p-2 h-10 w-56"
                >
                  <option value="documento">Documento</option>
                  <option value="nombres">Apellidos y Nombres</option>
                </select>

                {/* Contenedor vertical para input + error */}
                <Input
                  id="documento"
                  type="text"
                  placeholder={tipoBusqueda === "documento" ? "Ingrese número de documento" : "Ingrese apellidos y nombres"}
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
                  disabled={pacienteExterno}
                />

                <Button
                  type="button"
                  className="bg-blue-600 hover:bg-blue-700 text-white h-10 px-4"
                  onClick={validarBusqueda}
                  disabled={pacienteExterno}
                >
                  Buscar
                </Button>
              </div>

              {resultadosBusqueda.length > 0 && (
                <div className="mt-8">
                  <h3 className="text-md font-semibold">
                    Resultados de búsqueda ({resultadosBusqueda.length} {resultadosBusqueda.length === 1 ? "encontrado" : "encontrados"})
                  </h3>
                </div>
              )}

              {resultadosBusqueda.length > 0 && (
                <div className="mt-4">
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
                                const farmaciaEsperada = mapaFarmacias[filtroFarmacia];
                                if (paciente.tipoAtencion === farmaciaEsperada) {
                                  setPacienteData(paciente);
                                  setMedicamentosData(medicamentosPrueba[paciente.dni] || []);
                                  setMedicoReceta(paciente.medico);
                                  setHistorialData(historialPrueba[paciente.dni] || []);
                                  setDniValidado(true);
                                  setModalNuevaProforma(false);
                                  setModalDetallePaciente(true);
                                } else {
                                  setMensajeAviso(`No se tiene registro de una receta para ${filtroFarmacia}.`);
                                  setModalAviso(true);
                                }

                              }}
                            >
                              <CheckCircleIcon className="h-4 w-4" />
                              Validar Receta
                            </Button>
                            <Button
                              type="button"
                              className="bg-teal-600 hover:bg-teal-700 text-white flex items-center gap-2 px-4 py-2 rounded-md"
                              onClick={() => window.open("/Modelo Receta CE.pdf", "_blank")}
                            >
                              <Printer className="h-4 w-4" />
                              Imprimir Receta
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

      {modalAviso && (
        <Dialog open={modalAviso} onOpenChange={setModalAviso}>
          <DialogContent className="max-w-md" onInteractOutside={(e) => e.preventDefault()}>
            <DialogHeader className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-red-600" />
              <DialogTitle className="text-lg font-semibold text-red-600">Validación de Receta</DialogTitle>
              <DialogDescription className="bg-red-50 border border-red-200 text-red-800 p-4 rounded-md">
                {mensajeAviso}
              </DialogDescription>
            </DialogHeader>
            <div className="flex justify-end mt-4">
              <Button
                variant="outline"
                className="border border-gray-300 hover:bg-gray-100"
                onClick={() => setModalAviso(false)}
              >
                Cerrar
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      )}

      {modalDetallePaciente && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50">
          <div className="bg-white rounded-md shadow-lg p-6 max-w-7xl w-full max-h-[90vh] overflow-y-auto relative">
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => {
                    resetForm();
                    setModalDetallePaciente(false);
                    setModalNuevaProforma(true);
                  }}
                  className="text-gray-600 hover:text-blue-600 hover:bg-gray-100 p-2"
                >
                  <ArrowLeft className="h-5 w-5" />
                </button>
                <h2 className="text-lg font-semibold">Validación de receta</h2>
              </div>

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
                type="button"
                onClick={resetForm}
                className="text-gray-500 hover:text-red-600"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Aquí va tu formulario */}
            <form>
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
                        <p className="text-gray-700 font-medium">{pacienteData.tipoAtencion}</p>
                      </div>
                      <div>
                        <Label className="block mb-1">Especialidad:</Label>
                        <p className="text-gray-700 font-medium">{pacienteData.especialidad}</p>
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
                      <div className="col-span-3 flex items-center gap-6">
                        <div className="flex items-center gap-2">
                          <input
                            id="activarRecetaEspecial"
                            type="checkbox"
                            checked={activarRecetaEspecial}
                            onChange={(e) => {
                              const checked = e.target.checked;
                              setActivarRecetaEspecial(checked);
                              if (!checked) {
                                setRecetaEspecial("");
                              }
                            }}
                            className="w-5 h-5"
                          />
                          <Label htmlFor="activarRecetaEspecial" className="mb-0">
                            Activar Receta Especial
                          </Label>
                        </div>

                        <div className="flex items-center gap-2 flex-1">
                          <Label className="mb-0">N° Receta Especial:</Label>
                          <input
                            type="text"
                            className={`border-2 rounded-md p-2 flex-1 ${activarRecetaEspecial
                              ? "border-gray-500 bg-white text-black"
                              : "border-gray-300 bg-gray-100 text-gray-500 cursor-not-allowed"}`}
                            value={recetaEspecial}
                            onChange={(e) => setRecetaEspecial(e.target.value)}
                            disabled={!activarRecetaEspecial}
                          />
                        </div>
                      </div>
                      {/* Comentario ocupa toda la fila */}
                      <div className="col-span-3">
                        <Label className="block mb-1">Comentario:</Label>
                        <input
                          className="border-2 border-gray-500 rounded-md p-2 w-full"
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
                    <div className="flex justify-between items-center mb-3">
                      <div>
                        <h3 className="text-md font-semibold">Medicamentos registrados</h3>
                        <div className="flex items-center text-sm text-gray-600 mb-3 gap-2">
                          <Stethoscope className="h-4 w-4 text-gray-500" />
                          <span>Médico: {medicoReceta}</span>
                        </div>
                      </div>
                    </div>

                    <div className="overflow-x-auto">
                      <table className="min-w-full border-collapse border border-gray-300">
                        <thead className="bg-blue-900 text-white">
                          <tr>
                            <th className="border border-gray-300 px-3 py-2 text-left">Item</th>
                            <th className="border border-gray-300 px-3 py-2 text-left">Producto</th>
                            <th className="border border-gray-300 px-3 py-2 text-left">SISMED / SIGA</th>
                            <th className="border border-gray-300 px-3 py-2 text-left">Cantidad solicitada</th>
                            <th className="border border-gray-300 px-3 py-2 text-left">Cantidad por lote</th>
                            <th className="border border-gray-300 px-3 py-2 text-left">Precio de Operación</th>
                            <th className="border border-gray-300 px-3 py-2 text-left">Importe</th>
                            <th className="border border-gray-300 px-3 py-2 text-left">Lote</th>
                            <th className="border border-gray-300 px-3 py-2 text-left">F. Venc.</th>
                          </tr>
                        </thead>
                        <tbody>
                          {medicamentosData.map((med) =>
                            med.subfilas.map((subfila, idx) => (
                              <tr key={`${med.item}-${idx}`}>
                                {idx === 0 && (
                                  <>
                                    <td className="border px-3 py-2" rowSpan={med.subfilas.length}>{med.item}</td>
                                    <td className="border px-3 py-2" rowSpan={med.subfilas.length}>
                                      {med.producto}
                                      <div className="font-bold text-gray-700">{med.presentacion}</div>
                                      {verificarConflicto(pacienteData?.dni, med) && (
                                        <div className="text-yellow-600 text-xs mt-1 flex items-center gap-1 animate-parpadeo">
                                          <AlertTriangle className="h-10 w-10" />
                                          {verificarConflicto(pacienteData?.dni, med)}
                                        </div>
                                      )}
                                    </td>
                                    <td className="border px-3 py-2" rowSpan={med.subfilas.length}>
                                      <div><span className="font-semibold">SISMED:</span> {med.sisMed}</div>
                                      <div><span className="font-semibold">SIGA:</span> {med.siga}</div>
                                    </td>
                                    <td className="border px-3 py-2" rowSpan={med.subfilas.length}>{med.cantSolicitada}</td>
                                  </>
                                )}
                                <td className="border px-3 py-2">
                                  <span className="bg-green-100 text-green-700 font-semibold px-2 py-1 rounded">
                                    {subfila.cantAsignada}
                                  </span>
                                </td>
                                <td className="border px-3 py-2">{subfila.precio}</td>
                                <td className="border px-3 py-2">{subfila.importe}</td>
                                <td className="border px-3 py-2">
                                  <span className="bg-blue-100 text-blue-700 font-medium px-2 py-1 rounded">
                                    {subfila.lote}
                                  </span>
                                </td>
                                <td className="border px-3 py-2 text-center">
                                  <div className="flex flex-col items-center gap-1">
                                    <span>{subfila.venc}</span>
                                    <span
                                      className={`px-2 py-0.5 rounded-full text-xs font-semibold ${obtenerColorVencimiento(subfila.venc)}`}
                                    >
                                      {obtenerColorVencimiento(subfila.venc).includes("red")
                                        ? "⚠️ Próximo a vencer"
                                        : obtenerColorVencimiento(subfila.venc).includes("yellow")
                                          ? "Vencimiento medio"
                                          : " ✔️ Vencimiento lejano"}
                                    </span>
                                  </div>
                                </td>
                              </tr>
                            ))
                          )}
                        </tbody>
                      </table>
                    </div>
                    <div className="flex justify-end mt-4">
                      <div className="bg-blue-900 text-white font-bold px-6 py-2 rounded-md shadow">
                        Total: S/ {totalImporte.toFixed(2)}
                      </div>
                    </div>
                  </div>

                  {modalEditarCantidad && (
                    <div className="fixed inset-0 flex items-center justify-center bg-black/50">
                      <div className="bg-white rounded-md shadow-lg p-6 max-w-md w-full relative">
                        <div className="flex justify-between items-center mb-4">
                          <h2 className="text-lg font-semibold">Editar cantidad</h2>
                          <button
                            type="button"
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
                                type="button"
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
                            type="button"
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
                                <th className="border border-gray-300 px-3 py-2 text-left">Área</th>
                                <th className="border border-gray-300 px-3 py-2 text-left">Producto Farmacéutico</th>
                                <th className="border border-gray-300 px-3 py-2 text-left">Cantidad</th>
                                <th className="border border-gray-300 px-3 py-2 text-left">Indicación</th>
                                <th className="border border-gray-300 px-3 py-2 text-left">Vía</th>
                                <th className="border border-gray-300 px-3 py-2 text-left">Diagnóstico</th>
                                <th className="border border-gray-300 px-3 py-2 text-left">Médico</th>
                              </tr>
                            </thead>
                            <tbody>
                              {historialData.map((receta, idx) => (
                                <tr key={`${receta.fecha}-${receta.farmaco}-${idx}`}>
                                  <td className="border px-3 py-2">{receta.fecha}</td>
                                  <td className="border px-3 py-2">{receta.seguro}</td>
                                  <td className="border px-3 py-2">{receta.servicio}</td>
                                  <td className="border px-3 py-2">
                                    <div>{receta.farmaco}</div>
                                    <span className="inline-block bg-blue-600 text-white text-xs font-semibold px-2 py-1 rounded mt-1">
                                      {receta.presentacion}
                                    </span>
                                  </td>
                                  <td className="border px-3 py-2">{receta.cantidad}</td>
                                  <td className="border px-3 py-2">{receta.indicacion}</td>
                                  <td className="border px-3 py-2">{receta.via}</td>
                                  <td className="border px-3 py-2">{receta.diagnostico}</td>
                                  <td className="border px-3 py-2">{receta.medico}</td>
                                </tr>
                              ))}
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
                        <Input
                          className="border-2 border-gray-500"
                          type="text"
                          placeholder="Ingrese nombre completo"
                          value={paciente}
                          onChange={(e) => {
                            setPaciente(e.target.value);
                            if (errors.paciente) {
                              setErrors(prev => ({ ...prev, paciente: "" }));
                            }
                          }}
                        />
                        {errors.paciente && <p className="text-red-600 text-sm">{errors.paciente}</p>}
                      </div>
                      <div>
                        <Label>Historia/DNI:</Label>
                        <Input
                          className="border-2 border-gray-500"
                          type="text"
                          placeholder="Ingrese DNI"
                          value={historia}
                          onChange={(e) => {
                            setHistoria(e.target.value);
                            if (errors.historia) {
                              setErrors(prev => ({ ...prev, historia: "" }));
                            }
                          }}
                        />
                        {errors.historia && <p className="text-red-600 text-sm">{errors.historia}</p>}
                      </div>
                      <div>
                        <Label>Seguro:</Label>
                        <Input
                          className="border-2 border-gray-500"
                          type="text"
                          placeholder="Ingrese seguro"
                          value={seguro}
                          onChange={(e) => {
                            setSeguro(e.target.value);
                            if (errors.seguro) {
                              setErrors(prev => ({ ...prev, seguro: "" }));
                            }
                          }}
                        />
                        {errors.seguro && <p className="text-red-600 text-sm">{errors.seguro}</p>}
                      </div>
                      <div>
                        <Label>Tipo de Atención:</Label>
                        <Input
                          className="border-2 border-gray-500"
                          type="text"
                          placeholder="Ingrese tipo de atención"
                          value={tipoAtencion}
                          onChange={(e) => {
                            setTipoAtencion(e.target.value);
                            if (errors.tipoAtencion) {
                              setErrors(prev => ({ ...prev, tipoAtencion: "" }));
                            }
                          }}
                        />
                        {errors.tipoAtencion && <p className="text-red-600 text-sm">{errors.tipoAtencion}</p>}
                      </div>
                      <div>
                        <Label>Especialidad:</Label>
                        <Input
                          className="border-2 border-gray-500"
                          type="text"
                          placeholder="Ingrese especialidad"
                          value={especialidad}
                          onChange={(e) => {
                            setEspecialidad(e.target.value);
                            if (errors.especialidad) {
                              setErrors(prev => ({ ...prev, especialidad: "" }));
                            }
                          }}
                        />
                        {errors.especialidad && <p className="text-red-600 text-sm">{errors.especialidad}</p>}
                      </div>
                      <div>
                        <Label>Médico:</Label>
                        <Input
                          className="border-2 border-gray-500"
                          type="text"
                          placeholder="Ingrese médico"
                          value={medico}
                          onChange={(e) => {
                            setMedico(e.target.value);
                            if (errors.medico) {
                              setErrors(prev => ({ ...prev, medico: "" }));
                            }
                          }}
                        />
                        {errors.medico && <p className="text-red-600 text-sm">{errors.medico}</p>}
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

                    <div className="flex items-start gap-4 mb-4">
                      <div className="relative">
                        <Label>Producto:</Label>
                        <Input
                          className="border-2 border-gray-500 w-[600px]"
                          type="text"
                          placeholder="Ingrese producto"
                          value={producto}
                          onChange={(e) => {
                            const valor = e.target.value;
                            setProducto(valor);
                            if (valor.trim()) {
                              setSugerencias(
                                medicamentosDisponibles.filter(m =>
                                  m.producto.toLowerCase().includes(valor.toLowerCase())
                                )
                              );
                            } else {
                              setSugerencias([]);
                            }
                          }}
                        />
                        {sugerencias.length > 0 && (
                          <ul className="absolute left-0 right-0 border border-gray-300 bg-white mt-1 rounded shadow z-10">
                            {sugerencias.map((med, idx) => (
                              <li
                                key={idx}
                                className="px-2 py-1 hover:bg-blue-100 cursor-pointer"
                                onClick={() => {
                                  setProducto(med.producto);
                                  setSugerencias([]);
                                }}
                              >
                                {med.producto}
                              </li>
                            ))}
                          </ul>
                        )}
                        <div className="min-h-[24px] mt-1">
                          {producto && (
                            <span className="text-green-600 font-semibold">
                              Stock total: {
                                medicamentosDisponibles.find(m => m.producto === producto)
                                  ?.lotes.reduce((acc, lote) => acc + lote.cantAsignada, 0)
                              }
                            </span>
                          )}
                        </div>
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
                      <div>
                        <Label className="invisible">Acción</Label>
                        <Button
                          type="button"
                          className="bg-green-600 hover:bg-green-700 text-white h-10 px-4 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                          onClick={() => {
                            const medBase = medicamentosDisponibles.find(
                              m => m.producto.toLowerCase() === producto.toLowerCase()
                            );
                            if (medBase && cantidad.trim()) {
                              let cantidadSolicitada = parseInt(cantidad, 10);
                              let lotesDistribuidos: Lote[] = [];

                              for (const lote of medBase.lotes) {
                                if (cantidadSolicitada <= 0) break;

                                const asignar = Math.min(lote.cantAsignada, cantidadSolicitada);
                                lotesDistribuidos.push({
                                  ...lote,
                                  cantAsignada: asignar,
                                  importe: `S/ ${(asignar * parseFloat(lote.precio.replace("S/ ", ""))).toFixed(2)}`
                                });
                                cantidadSolicitada -= asignar;
                              }

                              setMedicamentos([
                                ...medicamentos,
                                { ...medBase, cantidadSolicitada: parseInt(cantidad, 10), lotes: lotesDistribuidos }
                              ]);

                              setErrorMedicamentos("");

                              setProducto("");
                              setCantidad("");
                            }
                          }}
                          disabled={!producto.trim() || !cantidad.trim()}
                        >
                          <CirclePlus className="h-4 w-4" />
                          Agregar
                        </Button>
                      </div>
                    </div>

                    {/* Tabla de medicamentos registrados */}
                    <table className="w-full border-collapse border border-gray-300">
                      <thead className="bg-blue-100">
                        <tr>
                          <th className="border border-gray-300 px-2 py-1">Item</th>
                          <th className="border border-gray-300 px-2 py-1">Producto</th>
                          <th className="border border-gray-300 px-2 py-1">SISMED / SIGA</th>
                          <th className="border border-gray-300 px-2 py-1">Cantidad solicitada</th>
                          <th className="border border-gray-300 px-2 py-1">Cantidad por lote</th>
                          <th className="border border-gray-300 px-2 py-1">Precio</th>
                          <th className="border border-gray-300 px-2 py-1">Importe</th>
                          <th className="border border-gray-300 px-2 py-1">Lote</th>
                          <th className="border border-gray-300 px-2 py-1">F. Venc.</th>
                          <th className="border border-gray-300 px-2 py-1">Acción</th>
                        </tr>
                      </thead>
                      <tbody>
                        {medicamentos.length === 0 ? (
                          <tr>
                            <td colSpan={10} className="border px-3 py-2 text-center text-gray-500 italic">
                              No hay medicamentos registrados
                            </td>
                          </tr>
                        ) : (
                          medicamentos.map((med, index) => (
                            <React.Fragment key={med.producto + index}>
                              {med.lotes.map((lote, idx) => (
                                <tr key={`${med.producto}-${lote.lote}-${idx}`}>
                                  {idx === 0 && (
                                    <>
                                      <td className="border px-3 py-2" rowSpan={med.lotes.length}>{index + 1}</td>
                                      <td className="border px-3 py-2" rowSpan={med.lotes.length}>
                                        {med.producto}
                                        <div className="font-bold text-gray-700">{med.presentacion}</div>
                                      </td>
                                      <td className="border px-3 py-2" rowSpan={med.lotes.length}>
                                        <div><span className="font-semibold">SISMED:</span> {med.sisMed}</div>
                                        <div><span className="font-semibold">SIGA:</span> {med.siga}</div>
                                      </td>
                                      <td className="border px-3 py-2" rowSpan={med.lotes.length}>{med.cantidadSolicitada}</td>
                                    </>
                                  )}
                                  <td className="border px-3 py-2">
                                    <span className="bg-green-100 text-green-700 font-semibold px-2 py-1 rounded">
                                      {lote.cantAsignada}
                                    </span>
                                  </td>
                                  <td className="border px-3 py-2">{lote.precio}</td>
                                  <td className="border px-3 py-2">{lote.importe}</td>
                                  <td className="border px-3 py-2">
                                    <span className="bg-blue-100 text-blue-700 font-medium px-2 py-1 rounded">
                                      {lote.lote}
                                    </span>
                                  </td>
                                  <td className="border px-3 py-2">{lote.venc}</td>
                                  {idx === 0 && (
                                    <td className="border px-3 py-2 text-center" rowSpan={med.lotes.length}>
                                      <button
                                        onClick={() => {
                                          setMedicamentos(medicamentos.filter((_, i) => i !== index));
                                        }}
                                        className="border border-red-600 rounded-md p-2 text-red-600 hover:bg-red-50"
                                        title="Eliminar registro"
                                      >
                                        <Trash2 className="h-5 w-5" />
                                      </button>
                                    </td>
                                  )}
                                </tr>
                              ))}
                            </React.Fragment>
                          ))
                        )}
                      </tbody>
                    </table>
                    {errorMedicamentos && (
                      <p className="text-red-600 text-sm mt-2">{errorMedicamentos}</p>
                    )}
                  </div>

                </>
              )}

              <div className="flex justify-end gap-2 mt-4">
                <Button
                  variant="outline"
                  onClick={resetForm}
                >
                  Cancelar
                </Button>

                {(dniValidado || pacienteExterno) && (
                  <Button
                    type="button"
                    className="bg-cyan-600 hover:bg-cyan-700 text-white"
                    onClick={() => {
                      if (pacienteExterno) {
                        const newErrors: Record<string, string> = {};

                        if (!paciente.trim()) newErrors.paciente = "El campo Paciente es obligatorio";
                        if (!historia.trim()) newErrors.historia = "El campo Historia/DNI es obligatorio";
                        if (!seguro.trim()) newErrors.seguro = "El campo Seguro es obligatorio";
                        if (!tipoAtencion.trim()) newErrors.tipoAtencion = "El campo Tipo de Atención es obligatorio";
                        if (!especialidad.trim()) newErrors.especialidad = "El campo Especialidad es obligatorio";
                        if (!medico.trim()) newErrors.medico = "El campo Médico es obligatorio";

                        setErrors(newErrors);

                        if (medicamentos.length === 0) {
                          setErrorMedicamentos("Debe registrar al menos un medicamento");
                        } else {
                          setErrorMedicamentos("");
                        }

                        if (Object.keys(newErrors).length === 0 && medicamentos.length > 0) {
                          setMostrarConfirmacion(true);
                        }
                      } else {
                        setMostrarConfirmacion(true); // caso DNI validado normal
                      }
                    }}
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
                      {pacienteData?.seguro === "PAGANTE" ? (
                        <>
                          La proforma se generó con éxito. <br /><br />
                          Se generó el siguiente ID Orden: <span className="font-semibold">2025000001</span>. <br /><br />
                          Acuda a caja para pagar por los medicamentos y así proceder con su respectivo despacho.
                        </>
                      ) : (
                        "La proforma se generó con éxito."
                      )}
                    </p>
                    <div className="flex justify-end">
                      <Button
                        className="bg-blue-600 hover:bg-blue-700 text-white"
                        onClick={() => {
                          resetForm();
                          setModalDetallePaciente(false);
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

      {modalRecetaExterna && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50">
          <div className="bg-white rounded-md shadow-lg p-6 max-w-7xl w-full max-h-[90vh] overflow-y-auto relative">
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-semibold">Registro manual de receta externa</h2>
              </div>

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
                type="button"
                onClick={() => {
                  resetForm();
                  setModalRecetaExterna(false);
                }}
                className="text-gray-500 hover:text-red-600"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="border rounded-md p-4 mb-4 bg-yellow-100">
              <p className="text-yellow-900 font-semibold">
                Debe registrar manualmente los datos de la venta de medicamentos para la receta externa.
              </p>
            </div>

            {/* Sección de datos del paciente */}
            <div className="border rounded-md p-4 mb-4 bg-gray-50">
              <h3 className="text-md font-semibold mb-3">Datos del paciente</h3>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label className="block mb-1">Paciente:</Label>
                  <Input
                    className="border-2 border-gray-500"
                    type="text"
                    placeholder="Ingrese nombre de paciente"
                    value={paciente}
                    onChange={(e) => {
                      setPaciente(e.target.value);
                      if (errors.seguro) {
                        setErrors(prev => ({ ...prev, paciente: "" }));
                      }
                    }}
                  />
                </div>
                <div>
                  <Label className="block mb-1">Historia/DNI:</Label>
                  <Input
                    className="border-2 border-gray-500"
                    type="text"
                    placeholder="Ingrese historia / DNI"
                    value={historia}
                    onChange={(e) => {
                      setHistoria(e.target.value);
                      if (errors.seguro) {
                        setErrors(prev => ({ ...prev, historia: "" }));
                      }
                    }}
                  />
                </div>
                <div>
                  <Label className="block mb-1">Seguro:</Label>
                  <Input
                    className="border-2 border-gray-500"
                    type="text"
                    placeholder="Ingrese seguro"
                    value={seguro}
                    onChange={(e) => {
                      setSeguro(e.target.value);
                      if (errors.seguro) {
                        setErrors(prev => ({ ...prev, seguro: "" }));
                      }
                    }}
                  />
                </div>
                <div>
                  <Label>Tipo de Atención:</Label>
                  <Input
                    className="border-2 border-gray-500"
                    type="text"
                    placeholder="Ingrese tipo de atención"
                    value={tipoAtencion}
                    onChange={(e) => {
                      setTipoAtencion(e.target.value);
                      if (errors.tipoAtencion) {
                        setErrors(prev => ({ ...prev, tipoAtencion: "" }));
                      }
                    }}
                  />
                  {errors.tipoAtencion && <p className="text-red-600 text-sm">{errors.tipoAtencion}</p>}
                </div>
                <div>
                  <Label>Especialidad:</Label>
                  <Input
                    className="border-2 border-gray-500"
                    type="text"
                    placeholder="Ingrese especialidad"
                    value={especialidad}
                    onChange={(e) => {
                      setEspecialidad(e.target.value);
                      if (errors.especialidad) {
                        setErrors(prev => ({ ...prev, especialidad: "" }));
                      }
                    }}
                  />
                  {errors.especialidad && <p className="text-red-600 text-sm">{errors.especialidad}</p>}
                </div>
                <div>
                  <Label>Médico:</Label>
                  <Input
                    className="border-2 border-gray-500"
                    type="text"
                    placeholder="Ingrese médico"
                    value={medico}
                    onChange={(e) => {
                      setMedico(e.target.value);
                      if (errors.medico) {
                        setErrors(prev => ({ ...prev, medico: "" }));
                      }
                    }}
                  />
                  {errors.medico && <p className="text-red-600 text-sm">{errors.medico}</p>}
                </div>
                <div>
                  <Label>Transacción:</Label>
                  <Input className="border-2 border-gray-500" type="text" placeholder="Ingrese transacción" />
                </div>
                <div>
                  <Label>N° Receta:</Label>
                  <Input className="border-2 border-gray-500" type="text" placeholder="Ingrese número de receta" />
                </div>
                <div className="col-span-3 flex items-center gap-6">
                  <div className="flex items-center gap-2">
                    <input
                      id="activarRecetaEspecial"
                      type="checkbox"
                      checked={activarRecetaEspecial}
                      onChange={(e) => {
                        const checked = e.target.checked;
                        setActivarRecetaEspecial(checked);
                        if (!checked) {
                          setRecetaEspecial("");
                        }
                      }}
                      className="w-5 h-5"
                    />
                    <Label htmlFor="activarRecetaEspecial" className="mb-0">
                      Activar Receta Especial
                    </Label>
                  </div>

                  <div className="flex items-center gap-2 flex-1">
                    <Label className="mb-0">N° Receta Especial:</Label>
                    <input
                      type="text"
                      className={`border-2 rounded-md p-2 flex-1 ${activarRecetaEspecial
                        ? "border-gray-500 bg-white text-black"
                        : "border-gray-300 bg-gray-100 text-gray-500 cursor-not-allowed"}`}
                      value={recetaEspecial}
                      onChange={(e) => setRecetaEspecial(e.target.value)}
                      disabled={!activarRecetaEspecial}
                    />
                  </div>
                </div>
                <div className="col-span-3">
                  <Label className="block mb-1">Comentario:</Label>
                  <input
                    className="border-2 border-gray-500 rounded-md p-2 w-full"
                  />
                </div>
              </div>
            </div>

            {/* Botón Ver historial de recetas */}
            {/*<div className="mb-4">
                            <Button
                                type="button"
                                className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md"
                                onClick={() => setModalHistorial(true)}
                            >
                                <FileText className="w-4 h-4" />
                                Ver historial de recetas
                            </Button>
                        </div>*/}

            {/* Sección Registrar medicamentos */}
            <div className="border rounded-md p-4 mb-4 bg-gray-50">
              <h3 className="text-md font-semibold mb-3">Registrar medicamentos</h3>

              <div className="flex items-start gap-4 mb-4">
                <div className="relative">
                  <Label>Producto:</Label>
                  <Input
                    className="border-2 border-gray-500 w-[600px]"
                    type="text"
                    placeholder="Ingrese producto"
                    value={producto}
                    onChange={(e) => {
                      const valor = e.target.value;
                      setProducto(valor);
                      if (valor.trim()) {
                        setSugerencias(
                          medicamentosDisponibles.filter(m =>
                            m.producto.toLowerCase().includes(valor.toLowerCase())
                          )
                        );
                      } else {
                        setSugerencias([]);
                      }
                    }}
                  />
                  {sugerencias.length > 0 && (
                    <ul className="absolute left-0 right-0 border border-gray-300 bg-white mt-1 rounded shadow z-10">
                      {sugerencias.map((med, idx) => (
                        <li
                          key={idx}
                          className="px-2 py-1 hover:bg-blue-100 cursor-pointer"
                          onClick={() => {
                            setProducto(med.producto);
                            setSugerencias([]);
                          }}
                        >
                          {med.producto}
                        </li>
                      ))}
                    </ul>
                  )}
                  <div className="min-h-[24px] mt-1">
                    {producto && (
                      <span className="text-green-600 font-semibold">
                        Stock total: {
                          medicamentosDisponibles.find(m => m.producto === producto)
                            ?.lotes.reduce((acc, lote) => acc + lote.cantAsignada, 0)
                        }
                      </span>
                    )}
                  </div>
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
                <div>
                  <Label className="invisible">Acción</Label>
                  <Button
                    type="button"
                    className="bg-green-600 hover:bg-green-700 text-white h-10 px-4 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                    onClick={() => {
                      const medBase = medicamentosDisponibles.find(
                        m => m.producto.toLowerCase() === producto.toLowerCase()
                      );
                      if (medBase && cantidad.trim()) {
                        let cantidadSolicitada = parseInt(cantidad, 10);
                        let lotesDistribuidos: Lote[] = [];

                        for (const lote of medBase.lotes) {
                          if (cantidadSolicitada <= 0) break;

                          const asignar = Math.min(lote.cantAsignada, cantidadSolicitada);
                          lotesDistribuidos.push({
                            ...lote,
                            cantAsignada: asignar,
                            importe: `S/ ${(asignar * parseFloat(lote.precio.replace("S/ ", ""))).toFixed(2)}`
                          });
                          cantidadSolicitada -= asignar;
                        }

                        setMedicamentos([
                          ...medicamentos,
                          { ...medBase, cantidadSolicitada: parseInt(cantidad, 10), lotes: lotesDistribuidos }
                        ]);

                        setErrorMedicamentos("");

                        setProducto("");
                        setCantidad("");
                      }
                    }}
                    disabled={!producto.trim() || !cantidad.trim()}
                  >
                    <CirclePlus className="h-4 w-4" />
                    Agregar
                  </Button>
                </div>
              </div>

              {/* Tabla de medicamentos registrados */}
              <table className="w-full border-collapse border border-gray-300">
                <thead className="bg-blue-100">
                  <tr>
                    <th className="border border-gray-300 px-2 py-1">Item</th>
                    <th className="border border-gray-300 px-2 py-1">Producto</th>
                    <th className="border border-gray-300 px-2 py-1">SISMED / SIGA</th>
                    <th className="border border-gray-300 px-2 py-1">Cantidad solicitada</th>
                    <th className="border border-gray-300 px-2 py-1">Cantidad por lote</th>
                    <th className="border border-gray-300 px-2 py-1">Precio</th>
                    <th className="border border-gray-300 px-2 py-1">Importe</th>
                    <th className="border border-gray-300 px-2 py-1">Lote</th>
                    <th className="border border-gray-300 px-2 py-1">F. Venc.</th>
                    <th className="border border-gray-300 px-2 py-1">Acción</th>
                  </tr>
                </thead>
                <tbody>
                  {medicamentos.length === 0 ? (
                    <tr>
                      <td colSpan={10} className="border px-3 py-2 text-center text-gray-500 italic">
                        No hay medicamentos registrados
                      </td>
                    </tr>
                  ) : (
                    medicamentos.map((med, index) => (
                      <React.Fragment key={med.producto + index}>
                        {med.lotes.map((lote, idx) => (
                          <tr key={`${med.producto}-${lote.lote}-${idx}`}>
                            {idx === 0 && (
                              <>
                                <td className="border px-3 py-2" rowSpan={med.lotes.length}>{index + 1}</td>
                                <td className="border px-3 py-2" rowSpan={med.lotes.length}>
                                  {med.producto}
                                  <div className="font-bold text-gray-700">{med.presentacion}</div>
                                </td>
                                <td className="border px-3 py-2" rowSpan={med.lotes.length}>
                                  <div><span className="font-semibold">SISMED:</span> {med.sisMed}</div>
                                  <div><span className="font-semibold">SIGA:</span> {med.siga}</div>
                                </td>
                                <td className="border px-3 py-2" rowSpan={med.lotes.length}>{med.cantidadSolicitada}</td>
                              </>
                            )}
                            <td className="border px-3 py-2">
                              <span className="bg-green-100 text-green-700 font-semibold px-2 py-1 rounded">
                                {lote.cantAsignada}
                              </span>
                            </td>
                            <td className="border px-3 py-2">{lote.precio}</td>
                            <td className="border px-3 py-2">{lote.importe}</td>
                            <td className="border px-3 py-2">
                              <span className="bg-blue-100 text-blue-700 font-medium px-2 py-1 rounded">
                                {lote.lote}
                              </span>
                            </td>
                            <td className="border px-3 py-2">{lote.venc}</td>
                            {idx === 0 && (
                              <td className="border px-3 py-2 text-center" rowSpan={med.lotes.length}>
                                <button
                                  onClick={() => {
                                    setMedicamentoEditando(index);
                                    setNuevaCantidad(med.cantidadSolicitada?.toString() || "");
                                    setModalEditarCantidadMed(true);
                                  }}
                                  className="border border-blue-600 rounded-md p-2 text-blue-600 hover:bg-blue-50"
                                  title="Editar cantidad"
                                >
                                  <FileEdit className="h-5 w-5" />
                                </button>

                                <button
                                  onClick={() => {
                                    setMedicamentos(medicamentos.filter((_, i) => i !== index));
                                  }}
                                  className="border border-red-600 rounded-md p-2 text-red-600 hover:bg-red-50"
                                  title="Eliminar registro"
                                >
                                  <Trash2 className="h-5 w-5" />
                                </button>
                              </td>
                            )}
                          </tr>
                        ))}
                      </React.Fragment>
                    ))
                  )}
                </tbody>
              </table>

              <div className="flex justify-end mt-4">
                <div className="bg-blue-900 text-white font-bold px-6 py-2 rounded-md shadow">
                  Total: S/ {totalImporteRecExt.toFixed(2)}
                </div>
              </div>

              {errorMedicamentos && (
                <p className="text-red-600 text-sm mt-2">{errorMedicamentos}</p>
              )}
            </div>

            {/* Botones de acción */}
            <div className="flex justify-end gap-2 mt-4">
              <Button variant="outline" onClick={() => {
                resetForm();
                setModalRecetaExterna(false);
              }}>
                Cancelar
              </Button>
              <Button
                type="button"
                className="bg-cyan-600 hover:bg-cyan-700 text-white"
                onClick={() => {
                  if (pacienteExterno) {
                    const newErrors: Record<string, string> = {};

                    setErrors(newErrors);

                    if (medicamentos.length === 0) {
                      setErrorMedicamentos("Debe registrar al menos un medicamento");
                    } else {
                      setErrorMedicamentos("");
                    }

                    if (Object.keys(newErrors).length === 0 && medicamentos.length > 0) {
                      setMostrarConfirmacion(true);
                    }
                  } else {
                    setMostrarConfirmacion(true); // caso DNI validado normal
                  }
                }}
              >
                Generar Proforma
              </Button>
            </div>

            {modalHistorial && (
              <div className="fixed inset-0 flex items-center justify-center bg-black/50">
                <div className="bg-white rounded-md shadow-lg p-6 max-w-6xl w-full max-h-[90vh] overflow-y-auto relative">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-semibold">Historial de recetas</h2>
                    <button
                      type="button"
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
                          <th className="border border-gray-300 px-3 py-2 text-left">Área</th>
                          <th className="border border-gray-300 px-3 py-2 text-left">Producto Farmacéutico</th>
                          <th className="border border-gray-300 px-3 py-2 text-left">Cantidad</th>
                          <th className="border border-gray-300 px-3 py-2 text-left">Indicación</th>
                          <th className="border border-gray-300 px-3 py-2 text-left">Vía</th>
                          <th className="border border-gray-300 px-3 py-2 text-left">Diagnóstico</th>
                          <th className="border border-gray-300 px-3 py-2 text-left">Médico</th>
                        </tr>
                      </thead>
                      <tbody>
                        {historialData.map((receta, idx) => (
                          <tr key={`${receta.fecha}-${receta.farmaco}-${idx}`}>
                            <td className="border px-3 py-2">{receta.fecha}</td>
                            <td className="border px-3 py-2">{receta.seguro}</td>
                            <td className="border px-3 py-2">{receta.servicio}</td>
                            <td className="border px-3 py-2">
                              <div>{receta.farmaco}</div>
                              <span className="inline-block bg-blue-600 text-white text-xs font-semibold px-2 py-1 rounded mt-1">
                                {receta.presentacion}
                              </span>
                            </td>
                            <td className="border px-3 py-2">{receta.cantidad}</td>
                            <td className="border px-3 py-2">{receta.indicacion}</td>
                            <td className="border px-3 py-2">{receta.via}</td>
                            <td className="border px-3 py-2">{receta.diagnostico}</td>
                            <td className="border px-3 py-2">{receta.medico}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {modalEditarCantidadMed && medicamentoEditando !== null && (
              <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
                <div className="bg-white rounded-md shadow-lg p-6 w-[400px]">
                  <h2 className="text-lg font-semibold mb-4">Editar cantidad solicitada</h2>

                  <Input
                    type="number"
                    value={nuevaCantidad}
                    onChange={(e) => setNuevaCantidad(e.target.value)}
                    className="border-2 border-gray-500 w-full mb-4"
                  />
                  {errorStock && (
                    <p className="text-red-600 text-sm mt-2">{errorStock}</p>
                  )}

                  <div className="flex justify-end gap-2">
                    <Button
                      variant="outline"
                      onClick={() => {
                        setModalEditarCantidadMed(false);
                        setMedicamentoEditando(null);
                        setNuevaCantidad("");
                        setErrorStock("");
                      }}
                    >
                      Cancelar
                    </Button>

                    <Button
                      className="bg-blue-600 hover:bg-blue-700 text-white"
                      onClick={() => {
                        const medBase = medicamentos[medicamentoEditando];
                        if (medBase && nuevaCantidad.trim()) {
                          const cantidadSolicitada = parseInt(nuevaCantidad, 10);

                          const stockTotal = medicamentosDisponibles.find(m => m.producto === medBase.producto)
                            ?.lotes.reduce((acc, lote) => acc + lote.cantAsignada, 0) || 0;

                          if (cantidadSolicitada > stockTotal) {
                            setErrorStock(`La cantidad solicitada (${cantidadSolicitada}) supera el stock total disponible (${stockTotal}).`);
                            return;
                          }

                          let restante = cantidadSolicitada;
                          let lotesDistribuidos: Lote[] = [];

                          for (const lote of medicamentosDisponibles.find(m => m.producto === medBase.producto)?.lotes || []) {
                            if (restante <= 0) break;
                            const stockDisponible = lote.cantAsignada;
                            const asignar = Math.min(restante, stockDisponible);
                            lotesDistribuidos.push({
                              ...lote,
                              cantAsignada: asignar,
                              importe: `S/ ${(asignar * parseFloat(lote.precio.replace("S/ ", ""))).toFixed(2)}`
                            });
                            restante -= asignar;
                          }

                          const nuevosMedicamentos = [...medicamentos];
                          nuevosMedicamentos[medicamentoEditando] = {
                            ...medBase,
                            cantidadSolicitada,
                            lotes: lotesDistribuidos
                          };

                          setMedicamentos(nuevosMedicamentos);
                          setModalEditarCantidadMed(false);
                          setMedicamentoEditando(null);
                          setNuevaCantidad("");
                          setErrorStock("");
                        }
                      }}
                    >
                      Guardar
                    </Button>
                  </div>
                </div>
              </div>
            )}

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
                    La proforma se generó con éxito. <br /><br />
                    Se generó el siguiente código: <span className="font-semibold">2025000001</span>. <br /><br />
                    Acuda a caja para pagar por los medicamentos y así proceder con su respectivo despacho.
                  </p>
                  <div className="flex justify-end">
                    <Button
                      className="bg-blue-600 hover:bg-blue-700 text-white"
                      onClick={() => {
                        resetForm();
                        setModalRecetaExterna(false);
                      }}
                    >
                      Finalizar
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}