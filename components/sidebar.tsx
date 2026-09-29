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
    Warehouse,
    ChevronDown,
    ShoppingBag,
    Truck,
    ArrowUpDown,
    ClipboardList,
    BarChart3,
    ShoppingCart,
    Users,
    Layers,
    FolderTree,
    FlaskConical,
    ListChecks,
} from "lucide-react"
import { ThemeToggle } from "./theme-toggle"
import { useAlmacen } from "@/context/AlmacenContext"

export default function Sidebar() {
    const pathname = usePathname()
    const router = useRouter()
    const [userName, setUserName] = useState("Usuario")

    const [isAlmacenOpen, setIsAlmacenOpen] = useState(true);
    const [isTablasOpen, setIsTablasOpen] = useState(pathname.startsWith("/dashboard/tablas"));
    const [isVentasOpen, setIsVentasOpen] = useState(pathname.startsWith("/dashboard/ventas"));
    const [isReportesOpen, setIsReportesOpen] = useState(pathname.startsWith("/dashboard/reportes"));
    const [isTransferenciasOpen, setIsTransferenciasOpen] = useState(location.pathname.includes('/almacenes/transferencias'));
    const [isFarmaciaClinicaOpen, setIsFarmaciaClinicaOpen] = useState(pathname.startsWith("/dashboard/farmacia-clinica"));

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

    return (
        <aside className="w-64 bg-white border-r border-gray-200 flex flex-col">
            <div className="flex-1 overflow-y-auto py-4">
                <nav className="space-y-1 px-3">
                    {/* Almacén */}
                    <button
                        onClick={() => setIsAlmacenOpen(!isAlmacenOpen)}
                        className="w-full flex items-center justify-between px-3 py-2 text-sm font-semibold rounded-md text-gray-900 hover:bg-gray-100 transition-colors"
                    >
                        <div className="flex items-center gap-3">
                            <Warehouse className="h-5 w-5" />
                            <span>Almacén</span>
                        </div>
                        {isAlmacenOpen ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
                    </button>
                    <div className={`overflow-hidden transition-all duration-300 ease-in-out ${isAlmacenOpen ? "max-h-[600px] opacity-100" : "max-h-0 opacity-0"
                        }`}>
                        <div className="pl-4 space-y-1 mt-1">
                            <a
                                className={`flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md transition-colors ${pathname.startsWith("/dashboard/almacenes/ingresos")
                                    ? "bg-blue-50 text-blue-700"
                                    : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                                    }`}
                                href="/dashboard/almacenes/ingresos"
                                data-discover="true"
                                aria-current="page"
                            >
                                <Package className="h-4 w-4" />
                                <span>Ingresos</span>
                            </a>
                            <a
                                className={`flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md transition-colors ${pathname.startsWith("/dashboard/almacenes/salidas")
                                    ? "bg-blue-50 text-blue-700"
                                    : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                                    }`}
                                href="/dashboard/almacenes/salidas"
                                data-discover="true"
                                aria-current="page"
                            >
                                <ArrowUpDown className="h-4 w-4" />
                                <span>Salidas</span>
                            </a>
                            <a
                                className={`flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md transition-colors ${pathname.startsWith("/dashboard/almacenes/stock")
                                    ? "bg-blue-50 text-blue-700"
                                    : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                                    }`}
                                href="/dashboard/almacenes/stock"
                                data-discover="true"
                                aria-current="page"
                            >
                                <Database className="h-4 w-4" />
                                <span>Stock</span>
                            </a>
                            <a
                                className={`flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md transition-colors ${pathname.startsWith("/dashboard/almacenes/kardex")
                                    ? "bg-blue-50 text-blue-700"
                                    : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                                    }`}
                                href="/dashboard/almacenes/kardex"
                                data-discover="true"
                                aria-current="page"
                            >
                                <ClipboardList className="h-4 w-4" />
                                <span>Kardex</span>
                            </a>
                            <a
                                className={`flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md transition-colors ${pathname.startsWith("/dashboard/almacenes/inventarios")
                                    ? "bg-blue-50 text-blue-700"
                                    : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                                    }`}
                                href="/dashboard/almacenes/inventarios"
                                data-discover="true"
                                aria-current="page"
                            >
                                <BarChart3 className="h-4 w-4" />
                                <span>Inventarios</span>
                            </a>
                            <a
                                className={`flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md transition-colors ${pathname.startsWith("/dashboard/almacenes/pedidos")
                                    ? "bg-blue-50 text-blue-700"
                                    : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                                    }`}
                                href="/dashboard/almacenes/pedidos"
                                data-discover="true"
                                aria-current="page"
                            >
                                <ShoppingCart className="h-4 w-4" />
                                <span>Pedidos</span>
                            </a>
                            <a
                                className={`flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md transition-colors ${pathname.startsWith("/dashboard/almacenes/transferencias")
                                    ? "bg-blue-50 text-blue-700"
                                    : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                                    }`}
                                href="/dashboard/almacenes/transferencias"
                                data-discover="true"
                                aria-current="page"
                            >
                                <Truck className="h-4 w-4" />
                                <span>Transferencias</span>
                            </a>
                            {/* Transferencias con sub-items */}
                            {/*<div>
                                <button
                                    onClick={() => setIsTransferenciasOpen(!isTransferenciasOpen)}
                                    className="w-full flex items-center justify-between px-3 py-2 text-sm font-medium rounded-md transition-colors text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                                    
                                >
                                    <div className="flex items-center gap-3">
                                        <Truck className="h-4 w-4" />
                                        <span>Transferencias</span>
                                    </div>
                                    {isTransferenciasOpen ? <ChevronDown className="h-3 w-3" /> : <ChevronRight className="h-3 w-3" />}
                                </button>
                                <div className={`overflow-hidden transition-all duration-200 ease-in-out ${isTransferenciasOpen ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
                                    }`}>

                                </div>
                            </div>*/}
                        </div>
                    </div>

                    {/* Tablas */}
                    <button
                        onClick={() => setIsTablasOpen(!isTablasOpen)}
                        className="w-full flex items-center justify-between px-3 py-2 text-sm font-semibold rounded-md text-gray-900 hover:bg-gray-100 transition-colors"
                    >
                        <div className="flex items-center gap-3">
                            <Database className="h-5 w-5" />
                            <span>Tablas</span>
                        </div>
                        {isTablasOpen ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
                    </button>
                    <div className={`overflow-hidden transition-all duration-300 ease-in-out ${isTablasOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
                        }`}>
                        <div className="pl-4 space-y-1 mt-1">
                            <a
                                className={`flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md transition-colors ${pathname.startsWith("/dashboard/tablas/almacenes")
                                    ? "bg-blue-50 text-blue-700"
                                    : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                                    }`}
                                href="/dashboard/tablas/almacenes"
                                data-discover="true"
                                aria-current="page"
                            >
                                <Warehouse className="h-4 w-4" />
                                <span>Almacenes</span>
                            </a>
                            <a
                                className={`flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md transition-colors ${pathname.startsWith("/dashboard/tablas/proveedores")
                                    ? "bg-blue-50 text-blue-700"
                                    : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                                    }`}
                                href="/dashboard/tablas/proveedores"
                                data-discover="true"
                                aria-current="page"
                            >
                                <Users className="h-4 w-4" />
                                <span>Proveedores</span>
                            </a>
                            <a
                                className={`flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md transition-colors ${pathname.startsWith("/dashboard/tablas/clases")
                                    ? "bg-blue-50 text-blue-700"
                                    : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                                    }`}
                                href="/dashboard/tablas/clases"
                                data-discover="true"
                                aria-current="page"
                            >
                                <Layers className="h-4 w-4" />
                                <span>Clases</span>
                            </a>
                            <a
                                className="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md transition-colors text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                                data-discover="true"
                                aria-current="page"
                            >
                                <FolderTree className="h-4 w-4" />
                                <span>Clasificadores</span>
                            </a>
                            <a
                                className={`flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md transition-colors ${pathname.startsWith("/dashboard/tablas/familias")
                                    ? "bg-blue-50 text-blue-700"
                                    : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                                    }`}
                                href="/dashboard/tablas/familias"
                                data-discover="true"
                                aria-current="page"
                            >
                                <Tag className="h-4 w-4" />
                                <span>Familias</span>
                            </a>
                            <a
                                className={`flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md transition-colors ${pathname.startsWith("/dashboard/tablas/laboratorios")
                                    ? "bg-blue-50 text-blue-700"
                                    : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                                    }`}
                                href="/dashboard/tablas/laboratorios"
                                data-discover="true"
                                aria-current="page"
                            >
                                <FlaskConical className="h-4 w-4" />
                                <span>Laboratorios</span>
                            </a>
                            <a
                                className={`flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md transition-colors ${pathname.startsWith("/dashboard/tablas/presentaciones")
                                    ? "bg-blue-50 text-blue-700"
                                    : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                                    }`}
                                href="/dashboard/tablas/presentaciones"
                                data-discover="true"
                                aria-current="page"
                            >
                                <Package className="h-4 w-4" />
                                <span>Presentaciones</span>
                            </a>
                            <a
                                className="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md transition-colors text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                                data-discover="true"
                                aria-current="page"
                            >
                                <Pill className="h-4 w-4" />
                                <span>SISMED</span>
                            </a>
                            <a
                                className="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md transition-colors text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                                data-discover="true"
                                aria-current="page"
                            >
                                <ListChecks className="h-4 w-4" />
                                <span>Tipo Programa</span>
                            </a>
                        </div>
                    </div>

                    {/* Ventas */}
                    <button
                        onClick={() => setIsVentasOpen(!isVentasOpen)}
                        className="w-full flex items-center justify-between px-3 py-2 text-sm font-semibold rounded-md text-gray-900 hover:bg-gray-100 transition-colors"
                    >
                        <div className="flex items-center gap-3">
                            <ShoppingBag className="h-5 w-5" />
                            <span>Ventas</span>
                        </div>
                        {isVentasOpen ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
                    </button>
                    <div className={`overflow-hidden transition-all duration-300 ease-in-out ${isVentasOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                        }`}>
                        <div className="pl-4 space-y-1 mt-1">
                            <a
                                className={`flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md transition-colors ${pathname.startsWith("/dashboard/ventas/proformas")
                                    ? "bg-blue-50 text-blue-700"
                                    : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                                    }`}
                                href="/dashboard/ventas/proformas"
                                data-discover="true"
                                aria-current="page"
                            >
                                <Package className="h-4 w-4" />
                                <span>Proformas Web</span>
                            </a>
                            <a
                                className={`flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md transition-colors ${pathname.startsWith("/dashboard/ventas/devoluciones")
                                    ? "bg-blue-50 text-blue-700"
                                    : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                                    }`}
                                href="/dashboard/ventas/devoluciones"
                                data-discover="true"
                                aria-current="page"
                            >
                                <ArrowUpDown className="h-4 w-4" />
                                <span>Devolución de medicamentos</span>
                            </a>
                        </div>
                    </div>

                    {/* Reportes */}
                    <button
                        onClick={() => setIsReportesOpen(!isReportesOpen)}
                        className="w-full flex items-center justify-between px-3 py-2 text-sm font-semibold rounded-md text-gray-900 hover:bg-gray-100 transition-colors"
                    >
                        <div className="flex items-center gap-3">
                            <FileText className="h-5 w-5" />
                            <span>Reportes</span>
                        </div>
                        {isReportesOpen ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
                    </button>
                    <div className={`overflow-hidden transition-all duration-300 ease-in-out ${isReportesOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                        }`}>
                        <div className="pl-4 space-y-1 mt-1">
                            <p className="px-3 py-2 text-xs text-gray-500">Próximamente...</p>
                        </div>
                    </div>

                    {/* Farmacia Clínica */}
                    <button
                        onClick={() => setIsFarmaciaClinicaOpen(!isFarmaciaClinicaOpen)}
                        className="w-full flex items-center justify-between px-3 py-2 text-sm font-semibold rounded-md text-gray-900 hover:bg-gray-100 transition-colors"
                    >
                        <div className="flex items-center gap-3">
                            <Pill className="h-5 w-5" />
                            <span>Farmacia Clínica</span>
                        </div>
                        {isFarmaciaClinicaOpen ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
                    </button>
                    <div className={`overflow-hidden transition-all duration-300 ease-in-out ${isFarmaciaClinicaOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                        }`}>
                        <div className="pl-4 space-y-1 mt-1">
                            <a
                                className={`flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md transition-colors ${pathname.startsWith("/dashboard/farmacia-clinica/seguimiento-farmaco")
                                    ? "bg-blue-50 text-blue-700"
                                    : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                                    }`}
                                href="/dashboard/farmacia-clinica/seguimiento-farmaco"
                                data-discover="true"
                                aria-current="page"
                            >
                                <Package className="h-4 w-4" />
                                <span>Seguimiento Farmacoterapéutico</span>
                            </a>
                            <a
                                className={`flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md transition-colors ${pathname.startsWith("/dashboard/farmacia-clinica/hoja-farmaco")
                                    ? "bg-blue-50 text-blue-700"
                                    : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                                    }`}
                                href="/dashboard/farmacia-clinica/hoja-farmaco"
                                data-discover="true"
                                aria-current="page"
                            >
                                <ArrowUpDown className="h-4 w-4" />
                                <span>Hoja Farmacoterapéutica</span>
                            </a>
                            <a
                                className={`flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md transition-colors ${pathname.startsWith("/dashboard/farmacia-clinica/anamnesis-farmaco")
                                    ? "bg-blue-50 text-blue-700"
                                    : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                                    }`}
                                href="/dashboard/farmacia-clinica/anamnesis-farmaco"
                                data-discover="true"
                                aria-current="page"
                            >
                                <Database className="h-4 w-4" />
                                <span>Anamnesis Farmacológica</span>
                            </a>
                            <a
                                className={`flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md transition-colors ${pathname.startsWith("/dashboard/farmacia-clinica/cartilla-medicamentos")
                                    ? "bg-blue-50 text-blue-700"
                                    : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                                    }`}
                                href="/dashboard/farmacia-clinica/cartilla-medicamentos"
                                data-discover="true"
                                aria-current="page"
                            >
                                <ClipboardList className="h-4 w-4" />
                                <span>Cartilla de uso seguro de medicamentos</span>
                            </a>
                        </div>
                    </div>
                </nav>
            </div>
        </aside>
    )
}
