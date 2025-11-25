"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calculator } from "lucide-react"
import { deleteCookie } from "cookies-next"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"

const obtenerPeriodoActual = () => {
  const fecha = new Date()
  const meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio",
    "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"]

  const mes = meses[fecha.getMonth()]
  const anio = fecha.getFullYear()

  return `${mes} ${anio}`
}

const obtenerFechaActual = () => {
  const hoy = new Date();
  const dia = String(hoy.getDate()).padStart(2, "0");
  const mes = String(hoy.getMonth() + 1).padStart(2, "0");
  const anio = hoy.getFullYear();
  return `${dia}/${mes}/${anio}`;
};


// Componente de Calculadora
const CalculadoraComponent = () => {
  const [display, setDisplay] = useState("0")
  const [operation, setOperation] = useState("")
  const [prevValue, setPrevValue] = useState<number | null>(null)
  const [waitingForOperand, setWaitingForOperand] = useState(false)

  const clearAll = () => {
    setDisplay("0")
    setOperation("")
    setPrevValue(null)
    setWaitingForOperand(false)
  }

  const inputDigit = (digit: string) => {
    if (waitingForOperand) {
      setDisplay(digit)
      setWaitingForOperand(false)
    } else {
      setDisplay(display === "0" ? digit : display + digit)
    }
  }

  const inputDecimal = () => {
    if (waitingForOperand) {
      setDisplay("0.")
      setWaitingForOperand(false)
    } else if (display.indexOf(".") === -1) {
      setDisplay(display + ".")
    }
  }

  const performOperation = (nextOperation: string) => {
    const inputValue = Number.parseFloat(display)

    if (prevValue === null) {
      setPrevValue(inputValue)
    } else if (operation) {
      const currentValue = prevValue || 0
      let newValue = 0

      switch (operation) {
        case "+":
          newValue = currentValue + inputValue
          break
        case "-":
          newValue = currentValue - inputValue
          break
        case "*":
          newValue = currentValue * inputValue
          break
        case "/":
          newValue = currentValue / inputValue
          break
        default:
          break
      }

      setPrevValue(newValue)
      setDisplay(String(newValue))
    }

    setWaitingForOperand(true)
    setOperation(nextOperation)
  }

  const calculateResult = () => {
    if (!prevValue || !operation) return

    performOperation("=")
    setOperation("")
  }

  return (
    <div className="bg-background border rounded-lg shadow-lg p-4 w-64">
      <div className="bg-muted p-2 rounded mb-4 text-right text-xl font-mono h-10">{display}</div>
      <div className="grid grid-cols-4 gap-2">
        <Button variant="outline" onClick={clearAll} className="col-span-2">
          AC
        </Button>
        <Button variant="outline" onClick={() => setDisplay(display.slice(0, -1) || "0")}>
          ←
        </Button>
        <Button variant="outline" onClick={() => performOperation("/")}>
          ÷
        </Button>

        <Button variant="outline" onClick={() => inputDigit("7")}>
          7
        </Button>
        <Button variant="outline" onClick={() => inputDigit("8")}>
          8
        </Button>
        <Button variant="outline" onClick={() => inputDigit("9")}>
          9
        </Button>
        <Button variant="outline" onClick={() => performOperation("*")}>
          ×
        </Button>

        <Button variant="outline" onClick={() => inputDigit("4")}>
          4
        </Button>
        <Button variant="outline" onClick={() => inputDigit("5")}>
          5
        </Button>
        <Button variant="outline" onClick={() => inputDigit("6")}>
          6
        </Button>
        <Button variant="outline" onClick={() => performOperation("-")}>
          -
        </Button>

        <Button variant="outline" onClick={() => inputDigit("1")}>
          1
        </Button>
        <Button variant="outline" onClick={() => inputDigit("2")}>
          2
        </Button>
        <Button variant="outline" onClick={() => inputDigit("3")}>
          3
        </Button>
        <Button variant="outline" onClick={() => performOperation("+")}>
          +
        </Button>

        <Button variant="outline" onClick={() => inputDigit("0")} className="col-span-2">
          0
        </Button>
        <Button variant="outline" onClick={inputDecimal}>
          .
        </Button>
        <Button variant="outline" onClick={calculateResult}>
          =
        </Button>
      </div>
    </div>
  )
}

// Componente de Footer unificado
export default function UnifiedFooter() {
  const [almacen, setAlmacen] = useState("F")
  const [periodo, setPeriodo] = useState(obtenerPeriodoActual)
  const [fechaActual] = useState(obtenerFechaActual())
  const [usuario, setUsuario] = useState("Usuario")
  const router = useRouter()

  useEffect(() => {
    // Obtener información del usuario del localStorage
    if (typeof window !== "undefined") {
      const userStr = localStorage.getItem("hospital-user")
      if (userStr) {
        const user = JSON.parse(userStr)
        setUsuario(user.NOMBRE || user.name || "Usuario")
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

  // Opciones para los selectores
  const almacenes = [
    { value: "A", label: "A - ALMACEN GENERAL (MEDICAMENTOS)" },
    { value: "AI", label: "AI - ALMACEN INSUMOS" },
    { value: "CE", label: "CE - CONSULTORIOS EXTERNOS" },
    { value: "DU", label: "DU - FARMACIA DOSIS UNITARIA" },
    { value: "F", label: "F - FARMACIA EMERGENCIA" },
  ]

  const periodos = [
    { value: "Enero 2025", label: "Enero 2025" },
    { value: "Febrero 2025", label: "Febrero 2025" },
    { value: "Marzo 2025", label: "Marzo 2025" },
    { value: "Abril 2025", label: "Abril 2025" },
    { value: "Mayo 2025", label: "Mayo 2025" },
  ]

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 border-t border-gray-300 py-1 px-2 z-50">
      <div className="flex flex-wrap justify-between items-center text-xs">
        <div className="flex items-center space-x-4">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" size="icon" className="h-8 w-8">
                <Calculator className="h-4 w-4" />
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Calculadora</DialogTitle>
              </DialogHeader>
              <CalculadoraComponent />
            </DialogContent>
          </Dialog>
          <div>
            <span className="font-bold">Usuario:</span> {usuario}
          </div>
          <div>
            <span className="font-bold">Fecha:</span> {fechaActual}
          </div>
          {/*<div>
            <span className="font-bold">Almacén:</span> {almacen}
          </div>*/}
          <div>
            <span className="font-bold">Periodo:</span> {periodo}
          </div>
        </div>

        {/*<div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <span>Almacén:</span>
            <Select value={almacen} onValueChange={setAlmacen}>
              <SelectTrigger className="h-7 w-[180px]">
                <SelectValue placeholder="Seleccionar almacén" />
              </SelectTrigger>
              <SelectContent>
                {almacenes.map((a) => (
                  <SelectItem key={a.value} value={a.value}>
                    {a.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center space-x-2">
            <span>Periodo:</span>
            <Select value={periodo} onValueChange={setPeriodo}>
              <SelectTrigger className="h-7 w-[180px]">
                <SelectValue placeholder="Seleccionar periodo" />
              </SelectTrigger>
              <SelectContent>
                {periodos.map((p) => (
                  <SelectItem key={p.value} value={p.value}>
                    {p.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>*/}
      </div>
    </div>
  )
}

