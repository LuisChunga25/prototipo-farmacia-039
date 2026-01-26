import { useState } from "react";
import { Button } from "../ui/button";
import { CardContent, CardHeader, CardTitle } from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { ArrowLeft, Edit, PackagePlus, Trash2 } from "lucide-react";

interface Props {
    onCancel: () => void;
    onSave: () => void;
}

export function FormularioNuevaDevolucion({ onCancel, onSave }: Props) {
    const now = new Date();
    const [cantidad, setCantidad] = useState("");

    const fechaActualTransfer = now.toLocaleDateString("es-PE", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
    });

    const horaActualTransfer = now.toLocaleTimeString("es-PE", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
    });

    // Farmacia Origen (TRANSFERENCIAS INTERNAS)
    const farmOrigen = [
        { id: "FE", codigo: "FE", nombre: "Farmacia Emergencia" },
        { id: "FH", codigo: "FH", nombre: "Farmacia Hospitalización" },
        { id: "FCE", codigo: "FCE", nombre: "Farmacia Consultorios Externos" },
    ]

    return (
        <>
            <div className="space-y-6 ml-6 mt-8">
                <div className="flex items-center gap-3">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={onCancel}
                        className="flex items-center gap-1 bg-blue-600 text-white hover:bg-blue-700"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Regresar
                    </Button>
                    <h2 className="text-xl font-semibold">Registrar Devolución</h2>
                </div>



                {/* ======= TODO tu contenido del DialogContent ======= */}
                {/* (sin Dialog, DialogHeader ni DialogFooter) */}

                <div className="border border-gray-300 rounded-md p-4">
                    {/* formulario completo */}
                    <div className="flex justify-between items-center border border-gray-300 rounded-md p-4 mb-4">
                        <div className="grid grid-cols-3 gap-4">
                            <div className="flex items-center gap-2">
                                <Label htmlFor="id" className="whitespace-nowrap text-sm">ID:</Label>
                                <Input id="id" value="00000004" disabled className="h-8 w-24" />
                            </div>
                            <div className="flex items-center gap-2">
                                <Label htmlFor="fecha" className="whitespace-nowrap text-sm">Fecha:</Label>
                                <Input id="fecha" value={fechaActualTransfer} disabled className="h-9 w-28" />
                            </div>
                            <div className="flex items-center gap-2">
                                <Label htmlFor="hora" className="whitespace-nowrap text-sm">Hora:</Label>
                                <Input id="hora" value={horaActualTransfer} disabled className="h-8 w-28" />
                            </div>
                        </div>
                    </div>

                    <div className="border border-gray-300 rounded-md p-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label>Farmacia Origen:</Label>
                                <Select>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Seleccionar" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {farmOrigen.map((c) => (
                                            <SelectItem key={c.id} value={c.codigo} className="hover:bg-gray-100 focus:bg-gray-100">
                                                {c.nombre}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="space-y-2">
                                <Label>Almacén Destino:</Label>
                                <Input value="Almacén General" disabled />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                            <div className="space-y-2">
                                <Label>Producto:</Label>
                                <Input />
                            </div>

                            <div className="space-y-2">
                                <Label>Cantidad a devolver:</Label>
                                <Input
                                    type="number"
                                    value={cantidad}
                                    min="1"
                                    onChange={(e) => setCantidad(e.target.value)}
                                />
                            </div>
                        </div>

                        {/* BOTÓN AGREGAR */}
                        <div className="mt-4">
                            <Button
                                className="bg-green-600 hover:bg-green-700 text-white"
                            >
                                Agregar Producto
                            </Button>
                        </div>

                        {/* TABLA DE PRODUCTOS */}
                        <div className="mt-4 border rounded-md overflow-x-auto">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Producto</TableHead>
                                        <TableHead>Cantidad a devolver</TableHead>
                                        <TableHead>Precio de Operación</TableHead>
                                        <TableHead>Importe Total</TableHead>
                                        <TableHead>Lote</TableHead>
                                        <TableHead>Registro Sanitario</TableHead>
                                        <TableHead>Fecha de vencimiento</TableHead>
                                        <TableHead>Acciones</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    <TableRow>
                                        <TableCell>Metamizol Sodico 1 G 2 ML</TableCell>
                                        <TableCell>2</TableCell>
                                        <TableCell></TableCell>
                                        <TableCell></TableCell>
                                        <TableCell></TableCell>
                                        <TableCell></TableCell>
                                        <TableCell></TableCell>
                                        <TableCell>
                                            <div className="flex space-x-2">
                                                <Button
                                                    variant="outline"
                                                    title="Asignar Lote"
                                                    className="h-8 px-3 gap-1 border-blue-600 text-blue-600 hover:bg-blue-50"
                                                >
                                                    <PackagePlus className="w-3 h-3" />
                                                </Button>
                                                <Button
                                                    variant="outline"
                                                    title="Editar cantidad solicitada"
                                                    className="h-8 w-10 p-1.5 border-yellow-600 text-yellow-600 hover:bg-yellow-50"
                                                >
                                                    <Edit className="w-3 h-3" />
                                                </Button>
                                                <Button
                                                    variant="outline"
                                                    title="Eliminar"
                                                    className="h-8 w-10 p-1.5 border-red-600 text-red-600 hover:bg-red-50"
                                                >
                                                    <Trash2 className="w-3 h-3" />
                                                </Button>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-1 gap-4 mt-6">
                            <div className="space-y-2">
                                <Label>Observación / Comentario:</Label>
                                <Input id="observacion" />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex justify-end gap-2 pt-4">
                    <Button variant="outline" onClick={onCancel}>
                        Cancelar
                    </Button>

                    <Button onClick={onSave}>
                        Guardar Devolución
                    </Button>
                </div>

            </div>
        </>
    );
}
