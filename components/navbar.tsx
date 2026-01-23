"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { deleteCookie } from "cookies-next"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter,} from "@/components/ui/dialog"
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
} from "lucide-react"
import { ThemeToggle } from "./theme-toggle"
import { useAlmacen } from "@/context/AlmacenContext"

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
        { name: "Proformas Contado", href: "/dashboard/ventas/proformas-contado" },
        { name: "Proformas Crédito", href: "/dashboard/ventas/proformas-credito" },
        { name: "Proformas Exoneradas", href: "/dashboard/ventas/proformas-exoneradas" },
        { name: "Armado de Paquetes", href: "/dashboard/ventas/paquetes" },
        { name: "Devoluciones", href: "/dashboard/ventas/devoluciones" },
        { name: "Visualizador de Proformas", href: "/dashboard/ventas/visualizador" },
      ],
    },
    {
      name: "Reportes",
      href: "/dashboard/reportes",
      icon: <FileText className="h-5 w-5" />,
      subItems: [
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
    <header className="bg-gradient-to-r from-[#114C5F] to-[#4A6EB0] text-white shadow-md border-b border-[#9CD2D3]/20">
      <div className="flex items-center justify-between px-6 py-4">
        <div className="flex items-center space-x-4">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-64">
              <div className="flex items-center space-x-4">
                <div className="h-6 w-6">
                  <Hospital className="text-white" />
                </div>
                <div>
                  <h1 className="font-bold text-white">Hospital José Agurto Tello</h1>
                </div>
              </div>
              <nav className="flex flex-col gap-4">
                <Link
                  href="/dashboard"
                  className={`flex items-center gap-2 text-sm ${pathname === "/dashboard" ? "text-primary font-medium" : "text-muted-foreground"}`}
                >
                  <User className="h-5 w-5" />
                  Dashboard
                </Link>

                {navItems.map((item) => (
                  <div key={item.href} className="flex flex-col gap-1">
                    <Link
                      href={item.href}
                      className={`flex items-center gap-2 text-sm ${pathname === item.href ? "text-primary font-medium" : "text-muted-foreground"}`}
                    >
                      {item.icon}
                      {item.name}
                    </Link>

                    {item.subCategories && (
                      <div className="pl-7 flex flex-col gap-2 mt-1">
                        {item.subCategories.map((category, idx) => (
                          <div key={idx} className="flex flex-col gap-1">
                            <span className="text-sm font-medium">{category.name}</span>
                            {category.subItems && renderMobileSubMenu(category.subItems)}
                          </div>
                        ))}
                      </div>
                    )}

                    {item.subItems && !item.subCategories && (
                      <div className="pl-7 flex flex-col gap-1 mt-1">
                        {item.subItems.map((subItem) => (
                          <div key={typeof subItem === "object" ? subItem.href : ""} className="flex flex-col gap-1">
                            {typeof subItem === "object" && (
                              <>
                                <Link
                                  href={subItem.href}
                                  className={`text-sm ${pathname === subItem.href ? "text-primary font-medium" : "text-muted-foreground"}`}
                                >
                                  {subItem.name}
                                </Link>
                                {'subItems' in subItem && subItem.subItems && renderMobileSubMenu(subItem.subItems)}
                              </>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}

                <Button variant="ghost" className="justify-start px-2" onClick={handleLogout}>
                  <LogOut className="h-5 w-5 mr-2" />
                  Cerrar Sesión
                </Button>
              </nav>
            </SheetContent>
          </Sheet>

          <Link href="/dashboard" className="flex items-center space-x-4">
            <div className="flex items-center gap-2">
              <Hospital className="w-8 h-8 flex items-center justify-center" />
            </div>
            <div>
              <h1 className="text-x1 font-bold">Sistema de Farmacia Web</h1>
              <p className="text-sm opacity-90">HOSPITAL JOSÉ AGURTO TELLO DE CHOSICA - HJATCH</p>
            </div>
          </Link>

          <div className="hidden md:flex items-center gap-2 ml-6">
            <Button
              variant="secondary"
              onClick={() => setOpenAlmacen(true)}
              className="bg-white/20 text-white hover:bg-white/30 flex items-center gap-2"
            >
              <Boxes className="h-4 w-4" />
              Seleccionar Almacén
            </Button>

            {/*<Button
              variant="secondary"
              onClick={() => setOpenPeriodo(true)}
              className="bg-white/20 text-white hover:bg-white/30 flex items-center gap-2"
            >
              <CalendarDays className="h-4 w-4" />
              Periodo
            </Button>*/}
          </div>

          {/* MODAL ALMACÉN */}
          <Dialog open={openAlmacen} onOpenChange={setOpenAlmacen}>
            <DialogContent onInteractOutside={(e) => e.preventDefault()} onEscapeKeyDown={(e) => e.preventDefault()}>
              <DialogHeader>
                <DialogTitle>Seleccionar Almacén</DialogTitle>
              </DialogHeader>


              <div>
                <label className="text-sm font-medium">Almacén</label>
                <Select value={almacen} onValueChange={setAlmacen}>
                  <SelectTrigger className="mt-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {almacenes.map((a) => (
                      <SelectItem key={a.value} value={a.value}>{a.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>


              <DialogFooter className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setOpenAlmacen(false)}>Cancelar</Button>
                <Button onClick={() => setOpenAlmacen(false)}>Aceptar</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>


          {/* MODAL PERIODO */}
          <Dialog open={openPeriodo} onOpenChange={setOpenPeriodo}>
            <DialogContent onInteractOutside={(e) => e.preventDefault()} onEscapeKeyDown={(e) => e.preventDefault()}>
              <DialogHeader>
                <DialogTitle>Seleccionar Periodo</DialogTitle>
              </DialogHeader>


              <div className="flex flex-col gap-4">
                <div>
                  <label className="text-sm font-medium">Año</label>
                  <Input
                    value={periodoAnio}
                    onChange={(e) => setPeriodoAnio(e.target.value)}
                    className="mt-1"
                  />
                </div>


                <div>
                  <label className="text-sm font-medium">Mes</label>
                  <Select onValueChange={setPeriodoMes}>
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Seleccione un mes" />
                    </SelectTrigger>
                    <SelectContent>
                      {meses.map((m, i) => (
                        <SelectItem key={i} value={m}>{m}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>


              <DialogFooter className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setOpenPeriodo(false)}>Cancelar</Button>
                <Button onClick={() => setOpenPeriodo(false)}>Aceptar</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        <nav className="hidden md:flex items-center gap-6">
          {navItems.map((item) => (
            <div key={item.href} className="relative group">
              <Link
                href={item.href}
                className={`flex items-center gap-2 text-sm ${pathname === item.href ? "text-white font-semibold" : "text-white/70 hover:text-white"}`}
              >
                {item.icon}
                {item.name}
              </Link>

              {/* Menú desplegable para categorías */}
              {item.subCategories && (
                <div className="absolute left-0 top-full pt-2 w-64 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                  <div className="bg-white rounded-md shadow-md border p-2 flex flex-col gap-1 text-gray-800">
                    {item.subCategories.map((category, idx) => (
                      <div key={idx} className="relative group/category">
                        <div className="text-sm font-medium px-3 py-2 rounded-sm flex justify-between items-center hover:bg-muted">
                          {category.name}
                          <ChevronRight className="h-4 w-4" />
                        </div>
                        <div className="absolute left-full top-0 pt-0 pl-2 w-64 opacity-0 invisible group-hover/category:opacity-100 group-hover/category:visible transition-all duration-200 z-50">
                          <div className="bg-white rounded-md shadow-md border p-2 flex flex-col gap-1 text-gray-800">
                            {category.subItems.map((subItem) => (
                              <Link
                                key={subItem.href}
                                href={subItem.href}
                                className={`text-sm px-3 py-2 rounded-sm flex items-center gap-2 ${pathname === subItem.href ? "bg-blue-50 text-blue-700 font-medium" : "text-gray-800 hover:bg-gray-100"}`}
                              >
                                {subItem.icon}
                                {subItem.name}
                              </Link>
                            ))}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Menú desplegable para subítems (para Almacenes, Ventas, etc.) */}
              {item.subItems && !item.subCategories && (
                <div className="absolute left-0 top-full pt-2 w-64 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                  <div className="bg-white rounded-md shadow-md border p-2 flex flex-col gap-1 text-gray-800">
                    {item.subItems.map((subItem) => (
                      <div key={typeof subItem === "object" ? subItem.href : ""} className="relative group/subitem">
                        {typeof subItem === "object" && (
                          <>
                            <Link
                              href={subItem.href}
                              className={`text-sm px-3 py-2 rounded-sm flex justify-between items-center ${pathname === subItem.href ? "bg-blue-50 text-blue-700 font-medium" : "text-gray-800 hover:bg-gray-100"}`}
                            >
                              {subItem.name}
                              {'subItems' in subItem && subItem.subItems && <ChevronRight className="h-4 w-4" />}
                            </Link>

                            {'subItems' in subItem && subItem.subItems && (
                              <div className="absolute left-full top-0 pt-0 pl-2 w-64 opacity-0 invisible group-hover/subitem:opacity-100 group-hover/subitem:visible transition-all duration-200 z-50">
                                <div className="bg-white rounded-md shadow-md border p-2 flex flex-col gap-1 gray-800">
                                  {subItem.subItems.map((nestedItem: SubItem) => (
                                    <Link
                                      key={nestedItem.href}
                                      href={nestedItem.href}
                                      className={`text-sm px-3 py-2 rounded-sm ${pathname === nestedItem.href ? "bg-blue-50 text-blue-700 font-medium" : "text-gray-800 hover:bg-gray-100"}`}
                                    >
                                      {nestedItem.name}
                                    </Link>
                                  ))}
                                </div>
                              </div>
                            )}
                          </>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          {/*<ThemeToggle />*/}

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="flex items-center gap-2 px-3">
                <User className="h-4 w-4" />
                <span className="text-sm">{userName}</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Mi Cuenta</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout}>
                <LogOut className="mr-2 h-4 w-4" />
                <span>Cerrar Sesión</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}
