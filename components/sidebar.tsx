"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { deleteCookie } from "cookies-next"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import {
  Database,
  Home,
  FileText,
  DollarSign,
  Menu,
  LogOut,
  User,
  Hospital,
  ChevronRight,
  Package,
  Tag,
  Building,
  Building2,
  ShieldCheck,
  Stethoscope,
  UserSquare,
  Boxes,
  CalendarDays,
  AlertTriangle,
  Pill,
} from "lucide-react"
import { ThemeToggle } from "./theme-toggle"
import { useAlmacen } from "@/context/AlmacenContext"

// Datos de prueba de medicamentos (puedes moverlos a un archivo común si quieres reutilizar)
const medicamentosPrueba: any[] = [
  {
    producto: "PARACETAMOL 500 MG",
    presentacion: "TAB",
    subfilas: [
      { lote: "LTPAR22222", venc: "31/10/2026" },
      { lote: "LTPAR33333", venc: "31/05/2027" },
    ],
  },
  {
    producto: "AMOXICILINA 500 MG",
    presentacion: "TAB",
    subfilas: [
      { lote: "LTAMOX210702", venc: "30/11/2027" },
    ],
  },
]

// Datos de prueba de medicamentos con stock bajo
const stockBajoPrueba: any[] = [
  { producto: "PARACETAMOL 500 MG", lote: "LTPAR22222", stock: 3 },
  { producto: "AMOXICILINA 500 MG", lote: "LTAMOX210702", stock: 2 },
];

// Función para calcular color según vencimiento
const obtenerColorVencimiento = (fechaVenc: string) => {
  const [dia, mes, anio] = fechaVenc.split("/").map(Number)
  const fechaVencimiento = new Date(anio, mes - 1, dia)
  const hoy = new Date()

  const diferenciaMeses =
    (fechaVencimiento.getFullYear() - hoy.getFullYear()) * 12 +
    (fechaVencimiento.getMonth() - hoy.getMonth())

  if (diferenciaMeses <= 7) return "bg-red-500 text-white"
  if (diferenciaMeses >= 8 && diferenciaMeses <= 12) return "bg-yellow-400 text-black"
  return "bg-green-500 text-white"
}

// Define types for navigation items
interface SubItem {
  name: string;
  href: string;
  icon?: React.ReactNode;
  subItems?: SubItem[];
}

interface SubCategory {
  name: string;
  subItems: SubItem[];
}

interface NavItem {
  name: string;
  href: string;
  icon: React.ReactNode;
  subItems?: SubItem[];
  subCategories?: SubCategory[];
}

export default function Navbar() {
  const pathname = usePathname()
  const router = useRouter()
  const [userName, setUserName] = useState("Usuario")
  const [openSemaforo, setOpenSemaforo] = useState(false)

  const { almacen, setAlmacen } = useAlmacen();
  const [openAlmacen, setOpenAlmacen] = useState(false)
  const [openPeriodo, setOpenPeriodo] = useState(false)

  const [periodoMes, setPeriodoMes] = useState("")
  const [periodoAnio, setPeriodoAnio] = useState(new Date().getFullYear().toString())

  const almacenes = [
    { value: "A", label: "A - ALMACEN GENERAL (MEDICAMENTOS)" },
    { value: "AI", label: "AI - ALMACEN INSUMOS" },
    { value: "CE", label: "CE - CONSULTORIOS EXTERNOS" },
    { value: "DU", label: "DU - FARMACIA DOSIS UNITARIA" },
    { value: "F", label: "F - FARMACIA EMERGENCIA" },
  ]

  const meses = [
    "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
    "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
  ]

  useEffect(() => {
    // Obtener información del usuario del localStorage
    if (typeof window !== "undefined") {
      const userStr = localStorage.getItem("hospital-user")
      if (userStr) {
        const user = JSON.parse(userStr)
        setUserName(user.NOMBRE || user.name || "Usuario")
      }
    }
  }, [])

  const handleLogout = () => {
    // Eliminar token y datos de usuario
    deleteCookie('token')
    if (typeof window !== "undefined") {
      localStorage.removeItem("hospital-user")
    }
    router.push("/login")
  }

  // Estructura de navegación con categorías y subcategorías
  const navItems: NavItem[] = [
    {
      name: "Tablas",
      href: "/dashboard/tablas",
      icon: <Database className="h-5 w-5" />,
      subCategories: [
        {
          name: "Productos y Precios",
          subItems: [
            { name: "Items", href: "/dashboard/tablas/items", icon: <Package className="h-4 w-4" /> },
            { name: "Precios", href: "/dashboard/tablas/precios", icon: <Tag className="h-4 w-4" /> },
            { name: "Presentaciones", href: "/dashboard/tablas/presentaciones", icon: <Package className="h-4 w-4" /> },
            { name: "Genéricos", href: "/dashboard/tablas/genericos", icon: <FileText className="h-4 w-4" /> },
          ],
        },
        {
          name: "Clasificaciones",
          subItems: [
            { name: "Familias", href: "/dashboard/tablas/familias", icon: <Database className="h-4 w-4" /> },
            { name: "Clases", href: "/dashboard/tablas/clases", icon: <Database className="h-4 w-4" /> },
            { name: "Almacenes", href: "/dashboard/tablas/almacenes", icon: <Home className="h-4 w-4" /> },
            {
              name: "Tipo de Atención",
              href: "/dashboard/tablas/tipo-atencion",
              icon: <ShieldCheck className="h-4 w-4" />,
            },
          ],
        },
        {
          name: "Proveedores y Laboratorios",
          subItems: [
            { name: "Proveedores", href: "/dashboard/tablas/proveedores", icon: <Building className="h-4 w-4" /> },
            { name: "Laboratorios", href: "/dashboard/tablas/laboratorios", icon: <Building2 className="h-4 w-4" /> },
          ],
        },
        {
          name: "Seguros y Personal",
          subItems: [
            { name: "Consultorios", href: "/dashboard/tablas/consultorios", icon: <Home className="h-4 w-4" /> },
            { name: "Médicos", href: "/dashboard/tablas/medicos", icon: <Stethoscope className="h-4 w-4" /> },
            { name: "Personal", href: "/dashboard/tablas/personal", icon: <UserSquare className="h-4 w-4" /> },
            {
              name: "Empresas Aseguradoras",
              href: "/dashboard/tablas/empresas-aseguradoras",
              icon: <ShieldCheck className="h-4 w-4" />,
            },
          ],
        },
      ],
    },
    {
      name: "Almacenes",
      href: "/dashboard/almacenes",
      icon: <Home className="h-5 w-5" />,
      subItems: [
        { name: "Ingresos", href: "/dashboard/almacenes/ingresos" },
        { name: "Salidas", href: "/dashboard/almacenes/salidas" },
        { name: "Transferencias", href: "/dashboard/almacenes/transferencias" },
        { name: "Stock", href: "/dashboard/almacenes/stock" },
        { name: "Kardex", href: "/dashboard/almacenes/kardex" },
        { name: "Inventarios", href: "/dashboard/almacenes/inventarios" },
        { name: "Pedidos", href: "/dashboard/almacenes/pedidos" },
      ],
    },
    {
      name: "Ventas",
      href: "/dashboard/ventas",
      icon: <DollarSign className="h-5 w-5" />,
      subItems: [
        { name: "Proformas Web", href: "/dashboard/ventas/proformas" },
        //{ name: "Proformas Contado", href: "/dashboard/ventas/proformas-contado" },
        //{ name: "Proformas Crédito", href: "/dashboard/ventas/proformas-credito" },
        //{ name: "Proformas Exoneradas", href: "/dashboard/ventas/proformas-exoneradas" },
        { name: "Armado de Paquetes", href: "/dashboard/ventas/paquetes" },
        { name: "Devolución de Medicamentos", href: "/dashboard/ventas/devoluciones" },
        //{ name: "Visualizador de Proformas", href: "/dashboard/ventas/visualizador" },
      ],
    },
    {
      name: "Reportes",
      href: "/dashboard/reportes",
      icon: <FileText className="h-5 w-5" />,
      subItems: [
        {
          name: "Reportes de Ventas CE",
          href: "/dashboard/reportes/ventas-ce",
          subItems: [
            { name: "Conteo de Recetas", href: "/dashboard/reportes/conteo-recetas" },
          ],
        },
        {
          name: "Reportes Generales",
          href: "/dashboard/reportes/generales",
          subItems: [
            { name: "Parte Diario de Farmacia", href: "/dashboard/reportes/parte-diario" },
            { name: "Consumo Valorizado", href: "/dashboard/reportes/consumo-valorizado" },
            { name: "Listado de Proformas", href: "/dashboard/reportes/listado-proformas" },
            { name: "Reporte de Proformas", href: "/dashboard/reportes/reporte-proformas" },
            { name: "Recetas por Departamento", href: "/dashboard/reportes/recetas-departamento" },
            { name: "Recetas por Profesional", href: "/dashboard/reportes/recetas-profesional" },
          ],
        },
        {
          name: "Reportes de Análisis ABC",
          href: "/dashboard/reportes/analisis-abc",
          subItems: [
            { name: "Curva ABC Consumo", href: "/dashboard/reportes/curva-abc-consumo" },
            { name: "Curva ABC Importe", href: "/dashboard/reportes/curva-abc-importe" },
            { name: "Curva ABC Demanda", href: "/dashboard/reportes/curva-abc-demanda" },
          ],
        },
        {
          name: "Reportes de Kardex",
          href: "/dashboard/reportes/kardex",
          subItems: [
            { name: "Por Cuenta", href: "/dashboard/reportes/kardex-cuenta" },
            { name: "Por Historia Clínica", href: "/dashboard/reportes/kardex-historia" },
            { name: "Pacientes sin Cuenta", href: "/dashboard/reportes/kardex-sin-cuenta" },
          ],
        },
        {
          name: "Reportes Adicionales",
          href: "/dashboard/reportes/adicionales",
          subItems: [
            { name: "Artículos por Consultorio", href: "/dashboard/reportes/articulos-consultorio" },
            { name: "Proformas y Ventas por Usuario", href: "/dashboard/reportes/ventas-usuario" },
            { name: "Recetas Despachadas", href: "/dashboard/reportes/recetas-despachadas" },
            { name: "Devolución de Medicamentos", href: "/dashboard/reportes/devoluciones-medicamentos" },
          ],
        },
      ],
    },
    {
      name: "Farmacia Clínica",
      href: "/dashboard/farmacia-clinica",
      icon: <Pill className="h-5 w-5" />,
      subItems: [
        {
          name: "Seguimiento Farmacoterapéutico",
          href: "/dashboard/reportes/ventas-ce",
        },
        {
          name: "Hoja Farmacoterapéutica",
          href: "/dashboard/reportes/generales",
        },
        {
          name: "Anamnesis Farmacológica",
          href: "/dashboard/reportes/analisis-abc",
        },
        {
          name: "Cartilla de uso seguro de medicamentos",
          href: "/dashboard/reportes/kardex",
        },
      ],
    },
  ]

  // Función para renderizar los submenús en la versión móvil
  const renderMobileSubMenu = (items: SubItem[]) => {
    if (!items) return null

    return (
      <div className="pl-4 flex flex-col gap-1 mt-1">
        {items.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`text-sm ${pathname === item.href ? "text-primary font-medium" : "text-muted-foreground"}`}
          >
            {item.name}
          </Link>
        ))}
      </div>
    )
  }

  return (
    <aside className="w-64 bg-white border-r border-gray-200 flex flex-col">
        <div className="flex-1 overflow-y-auto py-4">
            <nav className="space-y-1 px-3">
                <button>Almacén</button>
            </nav>
        </div>
    </aside>
  )
}
