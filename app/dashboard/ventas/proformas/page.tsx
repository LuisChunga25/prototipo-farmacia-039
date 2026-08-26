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
    nombreUsuario: string;
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
    farmacia: string;
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

interface ItemPaquete {
    nombre: string;
    presentacion: string;
    precio: string;
    stock: number;
}

interface Paquete {
    tipo: string;
    descripcion: string;
    items: ItemPaquete[];
}




// DATOS DE EJEMPLO PARA LA TABLA
const proformasData = [
    {
        id: 1,
        estado: "2",
        ordenId: "1726126012",
        numReceta: "260363091",
        cuentaId: "3010196",
        fecha: "05/08/2026",
        hora: "11:12:07",
        fecha_proceso: "05/08/2026",
        hora_proceso: "11:12",
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
        nombreUsuario: "ROMERO CRISTOBAL EDITH SANDRA",
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
                producto: "TRAMADOL 500 MG",
                cantSolicitada: 10,
                cantAsignada: 5,
                precio: "S/ 2.50",
                importe: "S/ 10.00",
                lote: "LTTRAM1111",
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
        fecha: "05/08/2026",
        hora: "11:10:25",
        fecha_proceso: "05/08/2026",
        hora_proceso: "11:10",
        numPaciente: "2008126535",
        historia: "48952215",
        nombrePaciente: "SUAREZ ORTEGA GABRIEL OCTAVIO",
        tipoSeguro: "SIS",
        medico: "DIONICIO IBAÑEZ LUIS FELIPE",
        nombreAlmacen: "CONSULTORIOS EXTERNOS",
        nombreConsultorio: "MEDICINA INTERNA",
        tipoPago: "R",
        total: 15.8,
        usuario: "07651840",
        nombreUsuario: "ZAMUDIO PEÑA GLORIA MARTHA",
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
        fecha: "04/08/2026",
        hora: "11:09:35",
        fecha_proceso: "04/08/2026",
        hora_proceso: "11:09",
        numPaciente: "2008115424",
        historia: "47515642",
        nombrePaciente: "REYES SALCEDO JOSE ANTONIO",
        tipoSeguro: "PAGANTE",
        medico: "DIONICIO IBAÑEZ LUIS FELIPE",
        nombreAlmacen: "CONSULTORIOS EXTERNOS",
        nombreConsultorio: "MEDICINA INTERNA",
        tipoPago: "R",
        total: 26.5,
        usuario: "07651840",
        nombreUsuario: "ZAMUDIO PEÑA GLORIA MARTHA",
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
        fecha: "04/08/2026",
        hora: "11:08:46",
        fecha_proceso: "04/08/2026",
        hora_proceso: "11:08",
        numPaciente: "2025451316",
        historia: "75486512",
        nombrePaciente: "RAMOS OJEDA ALBERTO FEDERICO",
        tipoSeguro: "SIS",
        medico: "BASOMBRIO VELAQUEZ JORGE",
        nombreAlmacen: "CONSULTORIOS EXTERNOS",
        nombreConsultorio: "MEDICINA INTERNA",
        tipoPago: "R",
        total: 16.1,
        usuario: "07672070",
        nombreUsuario: "CHUYES SILVA DE CADILLO MARIA ELENA",
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
        fecha: "04/08/2026",
        hora: "11:06:29",
        fecha_proceso: "04/08/2026",
        hora_proceso: "11:06",
        numPaciente: "2011345165",
        historia: "73542141",
        nombrePaciente: "SANCHEZ FLORES BEATRIZ ALBERTINA",
        tipoSeguro: "PAGANTE",
        medico: "BASOMBRIO VELASQUEZ JORGE",
        nombreAlmacen: "FARMACIA EMERGENCIA",
        nombreConsultorio: "CIRUGIA EMERGENCIA",
        tipoPago: "R",
        total: 8.6,
        usuario: "40532847",
        nombreUsuario: "ROMERO CRISTOBAL EDITH SANDRA",
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
        id: 6,
        estado: "2",
        ordenId: "1726126007",
        numReceta: "260363086",
        cuentaId: "3010191",
        fecha: "03/08/2026",
        hora: "10:55:29",
        fecha_proceso: "03/08/2026",
        hora_proceso: "10:55",
        numPaciente: "2024112233",
        historia: "46518494",
        nombrePaciente: "GONZALEZ LOPEZ PEDRO",
        tipoSeguro: "SIS",
        medico: "BASOMBRIO VELASQUEZ JORGE",
        nombreAlmacen: "FARMACIA EMERGENCIA",
        nombreConsultorio: "CIRUGIA EMERGENCIA",
        tipoPago: "R",
        total: 13.20,
        usuario: "07672070",
        nombreUsuario: "CHUYES SILVA DE CADILLO MARIA ELENA",
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
        id: 7,
        estado: "2",
        ordenId: "1726126006",
        numReceta: "260363085",
        cuentaId: "3010190",
        fecha: "03/08/2026",
        hora: "10:52:35",
        fecha_proceso: "03/08/2026",
        hora_proceso: "10:52",
        numPaciente: "2024998877",
        historia: "09845165",
        nombrePaciente: "DEL BOSQUE GONZALEZ VICENTE",
        tipoSeguro: "SIS",
        medico: "PINADO MICHUE EISEL",
        nombreAlmacen: "FARMACIA EMERGENCIA",
        nombreConsultorio: "MEDICINA EMERGENCIA",
        tipoPago: "R",
        total: 23.5,
        usuario: "07651840",
        nombreUsuario: "ZAMUDIO PEÑA GLORIA MARTHA",
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
        id: 8,
        estado: "2",
        ordenId: "1726126005",
        numReceta: "260363084",
        cuentaId: "3010189",
        fecha: "03/08/2026",
        hora: "10:48:35",
        fecha_proceso: "03/08/2026",
        hora_proceso: "10:48",
        numPaciente: "2026112233",
        historia: "79745121",
        nombrePaciente: "PACHECO MENDOZA XIMENA GABRIELA",
        tipoSeguro: "SIS",
        medico: "SOTO ESCALANTE MARIA EUGENIA",
        nombreAlmacen: "FARMACIA DOSIS UNITARIA",
        nombreConsultorio: "MEDICINA HOSPITALIZACION",
        tipoPago: "R",
        total: 7.90,
        usuario: "40532847",
        nombreUsuario: "ROMERO CRISTOBAL EDITH SANDRA",
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
        id: 9,
        estado: "2",
        ordenId: "1726126004",
        numReceta: "260363083",
        cuentaId: "3010188",
        fecha: "03/08/2026",
        hora: "10:40:35",
        fecha_proceso: "03/08/2026",
        hora_proceso: "10:40",
        numPaciente: "2026445566",
        historia: "70105410",
        nombrePaciente: "CASAS GARCIA SUSANA LETICIA",
        tipoSeguro: "SIS",
        medico: "DIONICIO IBAÑEZ LUIS FELIPE",
        nombreAlmacen: "FARMACIA DOSIS UNITARIA",
        nombreConsultorio: "MEDICINA HOSPITALIZACION",
        tipoPago: "R",
        total: 8.20,
        usuario: "40532847",
        nombreUsuario: "ROMERO CRISTOBAL EDITH SANDRA",
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
        id: 10,
        estado: "2",
        ordenId: "1726126003",
        numReceta: "260363082",
        cuentaId: "3010187",
        fecha: "03/08/2026",
        hora: "10:36:23",
        fecha_proceso: "03/08/2026",
        hora_proceso: "10:36",
        numPaciente: "2026778899",
        historia: "73212154",
        nombrePaciente: "ORTIGOSA GUTIERREZ REBECA MARIANA",
        tipoSeguro: "SIS",
        medico: "BASOMBRIO VELASQUEZ JORGE",
        nombreAlmacen: "FARMACIA DOSIS UNITARIA",
        nombreConsultorio: "CIRUGIA HOSPITALIZACION",
        tipoPago: "R",
        total: 4.10,
        usuario: "40532847",
        nombreUsuario: "ROMERO CRISTOBAL EDITH SANDRA",
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
        id: 11,
        estado: "2",
        ordenId: "1726126002",
        numReceta: "260363081",
        cuentaId: "3010186",
        fecha: "06/08/2026",
        hora: "09:45:12",
        fecha_proceso: "06/08/2026",
        hora_proceso: "09:45",
        numPaciente: "2009001122",
        historia: "55667788",
        nombrePaciente: "HUILLCAHUARI DURAND DANIEL",
        tipoSeguro: "SOAT",
        medico: "PINEDA CUSIHUAMAN EDSON GUSTAVO",
        nombreAlmacen: "FARMACIA EMERGENCIA",
        nombreConsultorio: "CIRUGIA GENERAL",
        tipoPago: "R",
        total: 32.5,
        usuario: "40532847",
        nombreUsuario: "ROMERO CRISTOBAL EDITH SANDRA",
        medicamentos: [
            {
                producto: "PARACETAMOL 500 MG TAB",
                cantSolicitada: 12,
                cantAsignada: 6,
                precio: "S/ 1.50",
                importe: "S/ 9.00",
                lote: "LTPAR202601",
                fechaVenc: "30/11/2026",
            },
            {
                producto: "PARACETAMOL 500 MG TAB",
                cantSolicitada: 12,
                cantAsignada: 6,
                precio: "S/ 1.20",
                importe: "S/ 7.20",
                lote: "LTPAR202602",
                fechaVenc: "31/03/2027",
            },
        ],
    },
    {
        id: 12,
        estado: "2",
        ordenId: "1726126001",
        numReceta: "260363080",
        cuentaId: "3010185",
        fecha: "07/08/2026",
        hora: "14:20:00",
        fecha_proceso: "07/08/2026",
        hora_proceso: "14:20",
        numPaciente: "2008112233",
        historia: "11223344",
        nombrePaciente: "PRADO DAVILA CARLOS ENRIQUE ALBERTO",
        tipoSeguro: "SIS",
        medico: "TOMANGUILLO VASQUEZ MIGUEL ALEJANDRO",
        nombreAlmacen: "FARMACIA DOSIS UNITARIA",
        nombreConsultorio: "ANESTESIOLOGIA",
        tipoPago: "R",
        total: 45.0,
        usuario: "07651840",
        nombreUsuario: "ZAMUDIO PEÑA GLORIA MARTHA",
        medicamentos: [
            {
                producto: "TRAMADOL 50 MG TAB",
                cantSolicitada: 12,
                cantAsignada: 6,
                precio: "S/ 1.80",
                importe: "S/ 10.80",
                lote: "LTTRAM202601",
                fechaVenc: "30/11/2026",
            },
            {
                producto: "TRAMADOL 50 MG TAB",
                cantSolicitada: 12,
                cantAsignada: 6,
                precio: "S/ 2.00",
                importe: "S/ 12.00",
                lote: "LTTRAM202602",
                fechaVenc: "31/03/2027",
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
            fecha: "25/08/2026",
            seguro: "SIS",
            servicio: "CE",
            farmaco: "PARACETAMOL 500 MG TAB",
            presentacion: "TAB",
            cantidad: 28,
            indicacion: "1 cada 6 hrs por 17 días",
            via: "Oral",
            diagnostico: "J110 - Influenza con Neumonía, Virus no Identificado",
            medico: "DIONICIO IBAÑEZ LUIS FELIPE",
            farmacia: "Consultorios Externos",
        },
        {
            fecha: "20/08/2026",
            seguro: "SIS",
            servicio: "EM",
            farmaco: "AMOXICILINA 500 MG",
            presentacion: "TAB",
            cantidad: 12,
            indicacion: "1 cada 3 hrs por 14 días",
            via: "Oral",
            diagnostico: "J209 - Bronquitis Aguda, no Especificada",
            medico: "BASOMBRIO VELASQUEZ JORGE",
            farmacia: "Farmacia Emergencia",
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
            farmacia: "Consultorios Externos",
        },
    ],
    "87654321": [
        {
            fecha: "24/08/2026",
            seguro: "PAGANTE",
            servicio: "EM",
            farmaco: "IBUPROFENO 400 MG",
            presentacion: "TAB",
            cantidad: 20,
            indicacion: "1 cada 12 hrs por 2 días",
            via: "Oral",
            diagnostico: "M151 - Artritis",
            medico: "BASOMBRIO VELASQUEZ JORGE",
            farmacia: "Farmacia Emergencia",
        },
        {
            fecha: "13/08/2026",
            seguro: "PAGANTE",
            servicio: "EM",
            farmaco: "ORFENADRINA CITRATO 100 MG",
            presentacion: "TAB",
            cantidad: 7,
            indicacion: "1 cada 24 hrs por 7 días",
            via: "Oral",
            diagnostico: "M151 - Artritis",
            medico: "BASOMBRIO VELASQUEZ JORGE",
            farmacia: "Farmacia Emergencia",
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
            farmacia: "Consultorios Externos",
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
            farmacia: "Consultorios Externos",
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
            farmacia: "Consultorios Externos",
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
            farmacia: "Consultorios Externos",
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
            farmacia: "Consultorios Externos",
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
            farmacia: "Consultorios Externos",
        },
    ],
    "23456789": [
        {
            fecha: "24/08/2026",
            seguro: "SIS",
            servicio: "EM",
            farmaco: "IBUPROFENO 400 MG",
            presentacion: "TAB",
            cantidad: 20,
            indicacion: "1 cada 12 hrs por 2 días",
            via: "Oral",
            diagnostico: "M151 - Artritis",
            medico: "APAZA ARAUJO BERIOSKA PAMELA",
            farmacia: "Farmacia Emergencia",
        },
        {
            fecha: "13/08/2026",
            seguro: "SIS",
            servicio: "EM",
            farmaco: "ORFENADRINA CITRATO 100 MG",
            presentacion: "TAB",
            cantidad: 7,
            indicacion: "1 cada 24 hrs por 7 días",
            via: "Oral",
            diagnostico: "M151 - Artritis",
            medico: "APAZA ARAUJO BERIOSKA PAMELA",
            farmacia: "Farmacia Emergencia",
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
            farmacia: "Farmacia Emergencia",
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

const paquetesPrueba: Paquete[] = [
    {
        tipo: "OBSTETRICIA",
        descripcion: "SET DE PARTO - PRIMIPARA",
        items: [
            { nombre: "Guantes quirúrgicos Nº 6 1/2", presentacion: "PAR", precio: "S/ 0.90", stock: 289 },
            { nombre: "Sonda nasogástrica Nº 12", presentacion: "UNI", precio: "S/ 1.30", stock: 11 },
        ]
    },
    {
        tipo: "NEONATOLOGIA",
        descripcion: "KIT RN- POR PARTO EUTOCICO actualizado 2024",
        items: [
            { nombre: "Compresa de gasa estéril", presentacion: "UNI", precio: "S/ 9.73", stock: 0 },
            { nombre: "Bolsa aspiración secreciones", presentacion: "UNI", precio: "S/ 57.41", stock: 5 },
        ]
    },
];


export default function SalidasPage() {
    const [searchTerm, setSearchTerm] = useState("");
    const [searchBy, setSearchBy] = useState("ordenId");
    const [selectedItems, setSelectedItems] = useState<number[]>([]);
    const [proformasVisibles, setProformasVisibles] = useState<any[]>([]);
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
    const [proformaSeleccionada, setProformaSeleccionada] = useState<Proforma | null>(null);
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
    const [openPaquetes, setOpenPaquetes] = useState(false);
    const [openItemsPaquete, setOpenItemsPaquete] = useState(false);
    const [paqueteSeleccionado, setPaqueteSeleccionado] = useState<Paquete | null>(null);
    const [cantidadesDispensar, setCantidadesDispensar] = useState<Record<string, number>>({});

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
        { value: "ordenId", label: "Orden ID" },
        { value: "receta", label: "N° Receta" },
        { value: "historia", label: "Historia Clínica" },
        { value: "paciente", label: "Paciente" },
    ];

    // INICIALIZAR CUANDO CARGUE LA PÁGINA
    useEffect(() => {
        setProformasVisibles(proformasData);
    }, [proformasData]);

    // INICIALIZAR CON LA CANTIDAD SOLICITADA
    useEffect(() => {
        const inicial = medicamentosData.reduce((acc, med) => {
            acc[med.item] = med.cantSolicitada;
            return acc;
        }, {} as Record<string, number>);
        setCantidadesDispensar(inicial);
    }, [medicamentosData]);


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
            // --- FILTRO POR FECHA ---
            const [dia, mes, anio] = proforma.fecha.split("/");
            const fechaRegistro = new Date(`${anio}-${mes}-${dia}`);
            const inicio = fechaInicio ? new Date(fechaInicio) : null;
            const fin = fechaFin ? new Date(fechaFin) : null;

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

            // --- FILTRO MAESTRO DE FARMACIA ---
            if (!proforma.nombreAlmacen.toLowerCase().includes(filtroFarmacia.toLowerCase())) {
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

        /*if (tipoBusqueda === "documento") {
            if (dni.trim().length < 8) {
                setError("El documento debe tener al menos 8 caracteres");
                setDniValidado(false);
                return;
            }
            if (!pacientesPrueba[dni.trim()]) {
                setError("No se encontró paciente con ese DNI en la data de prueba");
                setDniValidado(false);
                return;
            }
            // éxito por documento
            setError("");
            setPacienteData(pacientesPrueba[dni.trim()]);
            setMedicamentosData(medicamentosPrueba[dni.trim()] || []);
            setMedicoReceta(pacientesPrueba[dni.trim()].medico);
            setHistorialData(historialPrueba[dni.trim()] || []);
            setDniValidado(true);

        } else if (tipoBusqueda === "nombres") {
            // ejemplo básico: búsqueda por nombres
            const pacienteEncontrado = Object.values(pacientesPrueba).find(
                (p) => p.nombre.toLowerCase().includes(dni.trim().toLowerCase())
            );

            if (!pacienteEncontrado) {
                setError("No se encontró paciente con esos apellidos y nombres");
                setDniValidado(false);
                return;
            }
            // éxito por nombres
            setError("");
            setPacienteData(pacienteEncontrado);
            setMedicamentosData(medicamentosPrueba[pacienteEncontrado.dni] || []);
            setMedicoReceta(pacienteEncontrado.medico);
            setHistorialData(historialPrueba[pacienteEncontrado.dni] || []);
            setDniValidado(true);
        }*/
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
                        <h1 className="text-3xl font-bold tracking-tight">Módulo de Proformas Web</h1>
                        <p className="text-muted-foreground">Gestione la emisión de proformas con los detalles de los medicamentos antes de su entrega al paciente</p>
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
                <div className="flex justify-end mb-4 mt-12">
                    <div className="flex gap-2">
                        <Button
                            className="bg-indigo-600 hover:bg-indigo-700 text-white gap-2 font-semibold h-11 px-4"
                            onClick={() => setOpenTarifario(true)}
                        >
                            <FileSearch className="h-5 w-5" strokeWidth={2} />
                            Consultar Tarifario
                        </Button>

                        <Button
                            className="bg-purple-600 hover:bg-purple-700 text-white gap-2 font-semibold h-11 px-4"
                            onClick={() => setModalRecetaExterna(true)}
                        >
                            <ClipboardList className="h-5 w-5" strokeWidth={2} />
                            Receta Manual
                        </Button>

                        <Button
                            className="bg-teal-600 hover:bg-teal-700 text-white gap-2 font-semibold h-11 px-4"
                            onClick={() => setModalNuevaProforma(true)}
                        >
                            <Plus className="h-5 w-5" strokeWidth={3} />
                            Nueva Proforma
                        </Button>
                    </div>
                </div>

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

                    <div className="flex gap-2">
                        <Button variant="outline" size="sm" className="h-10 gap-1" onClick={limpiarFiltros}>
                            <Eraser className="h-4 w-4" />
                            Limpiar Filtros
                        </Button>

                        <Button variant="outline" size="sm" className="h-10 gap-1">
                            <RefreshCw className="h-4 w-4" />
                            Actualizar
                        </Button>
                    </div>
                </div>
            </div>

            <div className="overflow-x-auto border rounded-md">
                <Table>
                    <TableHeader>
                        <TableRow className="bg-cyan-600 hover:bg-cyan-600">
                            <TableHead className="font-semibold text-white hover:bg-transparent">Estado</TableHead>
                            <TableHead className="font-semibold text-white hover:bg-transparent">Orden ID</TableHead>
                            <TableHead className="font-semibold text-white hover:bg-transparent">Número de Receta</TableHead>
                            <TableHead className="font-semibold text-white hover:bg-transparent">Paciente</TableHead>
                            <TableHead className="font-semibold text-white hover:bg-transparent">Historia</TableHead>
                            <TableHead className="font-semibold text-white hover:bg-transparent">Tipo de Seguro</TableHead>
                            <TableHead className="font-semibold text-white hover:bg-transparent">Fecha</TableHead>
                            <TableHead className="font-semibold text-white hover:bg-transparent">Almacén</TableHead>
                            <TableHead className="font-semibold text-white hover:bg-transparent">Total (S/.)</TableHead>
                            <TableHead className="font-semibold text-white hover:bg-transparent">Usuario</TableHead>
                            <TableHead className="font-semibold text-white hover:bg-transparent">Acciones</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {filtrarProformas().length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={10} className="text-center text-gray-500 italic">
                                    No se hallaron registros según los filtros de búsqueda
                                </TableCell>
                            </TableRow>
                        ) : (
                            filtrarProformas().map((proforma) => (
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
                                    <TableCell>
                                        {proforma.medicamentos
                                            .reduce((acc, med) => {
                                                const precio = parseFloat(med.precio.replace("S/", "").trim());
                                                return acc + (med.cantAsignada * precio);
                                            }, 0)
                                            .toFixed(2)}
                                    </TableCell>
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
                            ))
                        )}
                    </TableBody>
                </Table>
            </div>

            {/* MODAL DE DETALLE DE LA PROFORMA GENERADA */}
            {mostrarDetalle && proformaSeleccionada && (
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
                                <p><strong>Paciente:</strong> {proformaSeleccionada.nombrePaciente}</p>
                                <p><strong>Código de paciente:</strong> {proformaSeleccionada.numPaciente}</p>
                                <p><strong>Historia:</strong> {proformaSeleccionada.historia}</p>
                                <p><strong>Seguro:</strong> {proformaSeleccionada.tipoSeguro}</p>
                                <p><strong>ID Orden:</strong> {proformaSeleccionada.ordenId}</p>
                                <p><strong>Número de Receta:</strong> {proformaSeleccionada.numReceta}</p>
                                <p><strong>ID Cuenta:</strong> {proformaSeleccionada.cuentaId}</p>
                            </div>
                            <div>
                                <p><strong>Fecha:</strong> {proformaSeleccionada.fecha}</p>
                                <p><strong>Hora:</strong> {proformaSeleccionada.hora}</p>
                                <p><strong>Médico:</strong> {proformaSeleccionada.medico}</p>
                                <p><strong>Almacén:</strong> {proformaSeleccionada.nombreAlmacen}</p>
                                <p><strong>Consultorio:</strong> {proformaSeleccionada.nombreConsultorio}</p>
                                <p><strong>Tipo de Pago:</strong> {proformaSeleccionada.tipoPago}</p>
                                <p><strong>Usuario Creación:</strong> {proformaSeleccionada.nombreUsuario}</p>
                            </div>
                        </div>

                        {/* Botón historial */}
                        {/*<Button variant="outline" className="mb-4">Ver historial de recetas</Button>*/}

                        {/* Tabla de medicamentos */}
                        <div className="overflow-x-auto max-h-[400px]">
                            <table className="min-w-full border-collapse border border-gray-300 text-sm">
                                <thead className="bg-blue-900 text-white">
                                    <tr>
                                        <th className="border px-3 py-2">Producto</th>
                                        <th className="border px-3 py-2">Cantidad solicitada</th>
                                        <th className="border px-3 py-2">Cantidad por lote</th>
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
                                            <td className="border px-3 py-2">
                                                {`S/ ${(med.cantAsignada * parseFloat(med.precio.replace("S/", "").trim())).toFixed(2)}`}
                                            </td>
                                            <td className="border px-3 py-2">{med.lote}</td>
                                            <td className="border px-3 py-2">{med.fechaVenc}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {/* Total */}
                        <div className="flex justify-end mt-4">
                            <div className="bg-blue-900 text-white font-bold px-6 py-2 rounded-md shadow">
                                Total: S/ {proformaSeleccionada.medicamentos
                                    .reduce((acc, med) => {
                                        const precio = parseFloat(med.precio.replace("S/", "").trim());
                                        return acc + (med.cantAsignada * precio);
                                    }, 0)
                                    .toFixed(2)}
                            </div>
                        </div>

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
                        <Button
                            variant="outline"
                            className="ml-auto border-blue-600 text-blue-600 hover:bg-blue-50"
                            onClick={() => setOpenPaquetes(true)}
                        >
                            Paquetes
                        </Button>
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

            {/* MODAL DE LISTADO DE PAQUETES */}
            <Dialog open={openPaquetes} onOpenChange={setOpenPaquetes}>
                <DialogContent className="sm:max-w-2xl bg-white rounded-lg shadow-lg p-6">
                    <DialogHeader>
                        <DialogTitle className="text-lg font-bold text-gray-800">Listado de Paquetes</DialogTitle>
                    </DialogHeader>

                    <table className="min-w-full border-collapse border border-gray-300 text-sm">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="border px-3 py-2">Tipo</th>
                                <th className="border px-3 py-2">Descripción</th>
                                <th className="border px-3 py-2">Acción</th>
                            </tr>
                        </thead>
                        <tbody>
                            {paquetesPrueba.map((paq, idx) => (
                                <tr key={idx} className="hover:bg-blue-50 transition-colors">
                                    <td className="border px-3 py-2">{paq.tipo}</td>
                                    <td className="border px-3 py-2">{paq.descripcion}</td>
                                    <td className="border px-3 py-2 text-center">
                                        <Button
                                            size="sm"
                                            className="bg-blue-600 text-white hover:bg-blue-700"
                                            onClick={() => {
                                                setPaqueteSeleccionado(paq);
                                                setOpenItemsPaquete(true);
                                            }}
                                        >
                                            Seleccionar
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </DialogContent>
            </Dialog>

            {/* MODAL DE ITEMS DE PAQUETE */}
            <Dialog open={openItemsPaquete} onOpenChange={setOpenItemsPaquete}>
                <DialogContent className="sm:max-w-3xl bg-white rounded-lg shadow-lg p-6">
                    <DialogHeader>
                        <DialogTitle className="text-lg font-bold text-gray-800">
                            Items del Paquete: {paqueteSeleccionado?.descripcion}
                        </DialogTitle>
                    </DialogHeader>

                    {/* Ítems con stock */}
                    <h3 className="text-md font-semibold text-green-700 mb-2">Con Stock</h3>
                    <table className="min-w-full border-collapse border border-gray-300 text-sm mb-4">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="border px-3 py-2">Producto</th>
                                <th className="border px-3 py-2">Presentación</th>
                                <th className="border px-3 py-2">Precio</th>
                                <th className="border px-3 py-2">Stock</th>
                            </tr>
                        </thead>
                        <tbody>
                            {paqueteSeleccionado?.items.filter(i => i.stock > 0).map((i, idx) => (
                                <tr key={idx}>
                                    <td className="border px-3 py-2">{i.nombre}</td>
                                    <td className="border px-3 py-2">{i.presentacion}</td>
                                    <td className="border px-3 py-2">{i.precio}</td>
                                    <td className="border px-3 py-2">{i.stock}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {/* Ítems sin stock */}
                    <h3 className="text-md font-semibold text-red-700 mb-2">Sin Stock</h3>
                    <table className="min-w-full border-collapse border border-gray-300 text-sm">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="border px-3 py-2">Producto</th>
                                <th className="border px-3 py-2">Presentación</th>
                                <th className="border px-3 py-2">Precio</th>
                            </tr>
                        </thead>
                        <tbody>
                            {paqueteSeleccionado?.items.filter(i => i.stock === 0).map((i, idx) => (
                                <tr key={idx}>
                                    <td className="border px-3 py-2">{i.nombre}</td>
                                    <td className="border px-3 py-2">{i.presentacion}</td>
                                    <td className="border px-3 py-2">{i.precio}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </DialogContent>
            </Dialog>

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
                                    <div className="border rounded-md p-4 mb-4 bg-gray-50 text-sm">
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
                                    <div className="border rounded-md p-4 mb-4 bg-white text-sm">
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
                                                        <th className="border border-gray-300 px-3 py-2 text-left">Cantidad a dispensar</th>
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
                                                                        <td className="border px-3 py-2" rowSpan={med.subfilas.length}>
                                                                            <input
                                                                                type="number"
                                                                                min={1}
                                                                                max={med.cantSolicitada}
                                                                                value={cantidadesDispensar[med.item] ?? med.cantSolicitada}
                                                                                onChange={(e) => {
                                                                                    const nuevaCantidad = parseInt(e.target.value, 10);
                                                                                    if (nuevaCantidad <= med.cantSolicitada) {
                                                                                        setCantidadesDispensar(prev => ({
                                                                                            ...prev,
                                                                                            [med.item]: nuevaCantidad
                                                                                        }));
                                                                                    }
                                                                                }}
                                                                                className="border rounded-md p-1 w-20 text-center"
                                                                            />
                                                                        </td>
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
                                                    <table className="min-w-full border-collapse border border-gray-300 text-sm">
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
                                                                <th className="border border-gray-300 px-3 py-2 text-left">Farmacia</th>
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
                                                                    <td className="border px-3 py-2">{receta.farmacia}</td>
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

