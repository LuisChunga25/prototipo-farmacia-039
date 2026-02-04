"use client";

import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, } from "../ui/table";
import { Trash2, Edit, PackagePlus, ArrowLeft, CheckCircle, Plus } from "lucide-react";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "../ui/dialog";
import { useState, useEffect, Fragment } from "react";
import { Textarea } from "../ui/textarea";

interface Props {
    solicitud: any;
    detallesPrerreq: any[];
    transaccDistrib: string;
    onCancel: () => void;
    onConfirm: () => void;
}

interface LoteAsignado {
    id: number;
    lote: string;
    cantidad: number;
    precio: number;
    regSanitario: string;
    fechaVcto: string;
}

interface DetalleProducto {
    id: number;
    nombre: string;
    cantidad: number;
    cantidadAsignada?: number;
    precio: number;
    importe: number;
    lote?: string;
    regSanitario?: string;
    fecha_vcto?: string;
    lotesAsignados?: LoteAsignado[];
}


export function DespachoPrerrequerimiento({
    solicitud,
    detallesPrerreq,
    transaccDistrib,
    onCancel,
    onConfirm,
}: Props) {
    const almacenOrigen = detallesPrerreq?.[0]?.aAlmacen ?? "";
    const areaDestino = detallesPrerreq?.[0]?.deAlmacen ?? "";
    const [openDeleteModal, setOpenDeleteModal] = useState(false);
    const [detalleAEliminar, setDetalleAEliminar] = useState<any | null>(null);
    const [openSuccessModal, setOpenSuccessModal] = useState(false);
    const [detalles, setDetalles] = useState<DetalleProducto[]>(detallesPrerreq);
    const [openEditModal, setOpenEditModal] = useState(false);
    const [motivoEliminacion, setMotivoEliminacion] = useState("");
    const [detalleAEditar, setDetalleAEditar] = useState<any | null>(null);
    const [cantidadEditada, setCantidadEditada] = useState<number>(0);
    const [openEditSuccessModal, setOpenEditSuccessModal] = useState(false);

    const [openAsignarLoteModal, setOpenAsignarLoteModal] = useState(false);
    const [openConfirmLoteModal, setOpenConfirmLoteModal] = useState(false);
    const [openSuccessLoteModal, setOpenSuccessLoteModal] = useState(false);

    const [productoSeleccionado, setProductoSeleccionado] = useState<any>(null);
    const [loteSeleccionado, setLoteSeleccionado] = useState<any>(null);
    const [lotesAsignados, setLotesAsignados] = useState<any[]>([]);
    const [ordenAsignacion, setOrdenAsignacion] = useState<number>(1);
    const [sumaStockAsignado, setSumaStockAsignado] = useState<number>(0);

    const [openAgregarProducto, setOpenAgregarProducto] = useState(false);
    const [openExitoAgregarProducto, setOpenExitoAgregarProducto] = useState(false);

    const [nuevoProducto, setNuevoProducto] = useState({
        producto: "",
        cantidad: "",
        motivo: "",
    });

    const resetNuevoProducto = () => {
        setNuevoProducto({
            producto: "",
            cantidad: "",
            motivo: "",
        });
    };


    const lotesMock = [
        {
            id: 1,
            cantidad: 40,
            precio: 1.5,
            regSanitario: "RS-001",
            fechaVcto: "31-01-2026",
            lote: "L001",
            fechaRegistro: "10-01-2025",
        },
        {
            id: 2,
            cantidad: 30,
            precio: 2,
            regSanitario: "RS-002",
            fechaVcto: "15-03-2026",
            lote: "L002",
            fechaRegistro: "10-01-2025",
        },
        {
            id: 3,
            cantidad: 30,
            precio: 2.5,
            regSanitario: "RS-003",
            fechaVcto: "30-06-2026",
            lote: "L003",
            fechaRegistro: "20-02-2025",
        },
    ];

    useEffect(() => {
        setDetalles([
            {
                id: 1,
                nombre: "Paracetamol 500mg",
                cantidad: 80,
                cantidadAsignada: 70,
                precio: 1.5,
                importe: 120,
                lote: "",
                regSanitario: "",
                fecha_vcto: "",
                lotesAsignados: [
                    {
                        id: 101,
                        lote: "L003",
                        cantidad: 10,
                        precio: 2.5,
                        regSanitario: "RS-003",
                        fechaVcto: "31-01-2026",
                    },
                    {
                        id: 102,
                        lote: "L002",
                        cantidad: 30,
                        precio: 2,
                        regSanitario: "RS-002",
                        fechaVcto: "15-03-2026",
                    },
                    {
                        id: 103,
                        lote: "L001",
                        cantidad: 40,
                        precio: 1.5,
                        regSanitario: "RS-001",
                        fechaVcto: "30-06-2026",
                    },
                ],
            },
            {
                id: 2,
                nombre: "Ibuprofeno 400mg",
                cantidad: 50,
                cantidadAsignada: 50,
                precio: 2,
                importe: 100,
                lote: "",
                regSanitario: "",
                fecha_vcto: "",
                lotesAsignados: [
                    {
                        id: 201,
                        lote: "L010",
                        cantidad: 50,
                        precio: 2,
                        regSanitario: "RS-010",
                        fechaVcto: "20-05-2026",
                    },
                ],
            },
            {
                id: 3,
                nombre: "Amoxicilina 200mg",
                cantidad: 10,
                cantidadAsignada: 50,
                precio: 5,
                importe: 50,
                lote: "",
                regSanitario: "",
                fecha_vcto: "",
                lotesAsignados: [
                    {
                        id: 301,
                        lote: "L020",
                        cantidad: 10,
                        precio: 2,
                        regSanitario: "RS-020",
                        fechaVcto: "31-07-2026",
                    },
                ],
            },
        ]);
    }, []);

    const seleccionarLote = (lote: any) => {
        // Evitar duplicados
        if (lotesAsignados.some(l => l.id === lote.id)) return;

        const nuevoOrden = ordenAsignacion;

        const nuevoLote = {
            ...lote,
            orden: nuevoOrden,
        };

        const nuevosLotes = [...lotesAsignados, nuevoLote];

        const nuevaSuma = nuevosLotes.reduce(
            (acc, l) => acc + l.cantidad,
            0
        );

        setLotesAsignados(nuevosLotes);
        setOrdenAsignacion(nuevoOrden + 1);
        setSumaStockAsignado(nuevaSuma);

        // Mostrar confirmación SOLO si se cubre la cantidad solicitada
        if (nuevaSuma >= productoSeleccionado?.cantidad) {
            setOpenConfirmLoteModal(true);
        }
    };

    const resetAsignacionLotes = () => {
        setLotesAsignados([]);
        setOrdenAsignacion(1);
        setSumaStockAsignado(0);
        setLoteSeleccionado(null);
    };

    const isGuardarHabilitado =
        nuevoProducto.producto.trim() !== "" &&
        nuevoProducto.cantidad !== "" &&
        Number(nuevoProducto.cantidad) > 0 &&
        nuevoProducto.motivo.trim().length >= 10;

    const isEliminarHabilitado =
        motivoEliminacion.trim().length >= 10;

    const isGuardarCantidadHabilitado = cantidadEditada >= 1;


    return (
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
                <h2 className="text-xl font-semibold">Atención del prerrequerimiento: {solicitud?.prerrequerimientoId}</h2>
            </div>

            {/* DATOS GENERALES */}
            <div className="grid grid-cols-4 gap-4">
                <div className="space-y-2">
                    <Label>Almacén Origen:</Label>
                    <Input value={almacenOrigen} disabled />
                </div>

                <div className="space-y-2">
                    <Label>Área Destino:</Label>
                    <Input value={areaDestino} disabled />
                </div>
                <div className="space-y-2">
                    <Label>Tipo de Transacción:</Label>
                    <Input value={transaccDistrib} disabled />
                </div>

                <div className="space-y-2">
                    <Label>Tipo de prerrequerimiento:</Label>
                    <Input value={solicitud?.tipoRequerimiento || ""} disabled />
                </div>
            </div>

            <div className="flex justify-end mb-4">
                <Button
                    className="bg-green-600 hover:bg-green-700 text-white gap-2 font-semibold"
                    onClick={() => setOpenAgregarProducto(true)}
                >
                    <Plus className="h-4 w-4" strokeWidth={3} />
                    Agregar Producto
                </Button>
            </div>

            {/* TABLA */}
            <div className="border rounded-md overflow-x-auto w-full">
                <Table className="min-w-[1200px]">
                    <TableHeader>
                        <TableRow>
                            <TableHead>Producto</TableHead>
                            <TableHead>Cantidad Solicitada</TableHead>
                            <TableHead>Cantidad Asignada</TableHead>
                            <TableHead>Precio</TableHead>
                            <TableHead>Importe</TableHead>
                            <TableHead>Lote</TableHead>
                            <TableHead>Registro Sanitario</TableHead>
                            <TableHead>Fecha de Vencimiento</TableHead>
                            <TableHead>Acciones</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {detalles.map((detalle) => (
                            <Fragment key={detalle.id}>
                                {/* FILA PRINCIPAL */}
                                <TableRow>
                                    {/* PRODUCTO */}
                                    <TableCell>{detalle.nombre}</TableCell>

                                    {/* CANTIDAD SOLICITADA */}
                                    <TableCell>{detalle.cantidad}</TableCell>

                                    {/* CANTIDAD ASIGNADA (múltiples lotes) */}
                                    <TableCell>
                                        {detalle.lotesAsignados?.length ? (
                                            detalle.lotesAsignados.map((lote) => (
                                                <div key={lote.id} className="text-sm border-b last:border-b-0 py-1">
                                                    {lote.cantidad}
                                                </div>
                                            ))
                                        ) : (
                                            "-"
                                        )}
                                    </TableCell>

                                    {/* PRECIO */}
                                    <TableCell>
                                        {detalle.lotesAsignados && detalle.lotesAsignados.length > 0 ? (
                                            detalle.lotesAsignados.map((lote) => (
                                                <div
                                                    key={lote.id}
                                                    className="text-sm border-b last:border-b-0 py-1"
                                                >
                                                    {lote.precio}
                                                </div>
                                            ))
                                        ) : (
                                            "-"
                                        )}
                                    </TableCell>

                                    {/* IMPORTE */}
                                    <TableCell>
                                        {detalle.lotesAsignados && detalle.lotesAsignados.length > 0 ? (
                                            detalle.lotesAsignados.map((lote) => (
                                                <div
                                                    key={lote.id}
                                                    className="text-sm border-b last:border-b-0 py-1"
                                                >
                                                    {lote.cantidad * lote.precio}
                                                </div>
                                            ))
                                        ) : (
                                            "-"
                                        )}
                                    </TableCell>

                                    {/* LOTE */}
                                    <TableCell>
                                        {detalle.lotesAsignados?.length ? (
                                            detalle.lotesAsignados.map((lote) => (
                                                <div key={lote.id} className="text-sm border-b last:border-b-0 py-1">
                                                    {lote.lote}
                                                </div>
                                            ))
                                        ) : (
                                            "-"
                                        )}
                                    </TableCell>

                                    {/* REGISTRO SANITARIO */}
                                    <TableCell>
                                        {detalle.lotesAsignados?.length ? (
                                            detalle.lotesAsignados.map((lote) => (
                                                <div key={lote.id} className="text-sm border-b last:border-b-0 py-1">
                                                    {lote.regSanitario}
                                                </div>
                                            ))
                                        ) : (
                                            "-"
                                        )}
                                    </TableCell>

                                    {/* FECHA VENCIMIENTO */}
                                    <TableCell>
                                        {detalle.lotesAsignados?.length ? (
                                            detalle.lotesAsignados.map((lote) => (
                                                <div key={lote.id} className="text-sm border-b last:border-b-0 py-1">
                                                    {lote.fechaVcto}
                                                </div>
                                            ))
                                        ) : (
                                            "-"
                                        )}
                                    </TableCell>

                                    <TableCell>
                                        <div className="flex space-x-2">
                                            <Button
                                                variant="outline"
                                                title="Asignar Lote"
                                                className="h-8 px-3 gap-1 border-blue-600 text-blue-600 hover:bg-blue-50"
                                                onClick={() => {
                                                    setProductoSeleccionado(detalle);
                                                    setOpenAsignarLoteModal(true);
                                                }}
                                            >
                                                <PackagePlus className="w-3 h-3" />
                                            </Button>
                                            <Button
                                                variant="outline"
                                                title="Editar cantidad solicitada"
                                                className="h-8 w-10 p-1.5 border-yellow-600 text-yellow-600 hover:bg-yellow-50"
                                                onClick={() => {
                                                    setDetalleAEditar(detalle);
                                                    setCantidadEditada(detalle.cantidad);
                                                    setOpenEditModal(true);
                                                }}
                                            >
                                                <Edit className="w-3 h-3" />
                                            </Button>
                                            <Button
                                                variant="outline"
                                                title="Eliminar"
                                                className="h-8 w-10 p-1.5 border-red-600 text-red-600 hover:bg-red-50"
                                                onClick={() => {
                                                    setDetalleAEliminar(detalle);
                                                    setMotivoEliminacion("");
                                                    setOpenDeleteModal(true);
                                                }}
                                            >
                                                <Trash2 className="w-3 h-3" />
                                            </Button>
                                        </div>
                                    </TableCell>
                                </TableRow>

                            </Fragment>
                        ))}
                    </TableBody>

                    <Dialog open={openDeleteModal} onOpenChange={setOpenDeleteModal}>
                        <DialogContent className="max-w-sm" onInteractOutside={(e) => e.preventDefault()}>
                            <DialogHeader>
                                <DialogTitle className="text-red-600">
                                    Eliminar producto
                                </DialogTitle>
                            </DialogHeader>

                            <p className="text-sm text-gray-700">
                                ¿Estás seguro de eliminar el producto{" "}
                                <span className="font-semibold">
                                    {detalleAEliminar?.nombre}
                                </span>
                                ?
                                <br />
                                <span className="text-red-500 font-medium">
                                    Esta acción no se puede deshacer.
                                </span>
                            </p>

                            <div className="space-y-2 mt-3">
                                <Label>Motivo de eliminación: <span className="text-red-500">*</span></Label>
                                <Input
                                    placeholder="Ingrese mínimo 10 caracteres"
                                    value={motivoEliminacion}
                                    onChange={(e) => setMotivoEliminacion(e.target.value)}
                                />
                            </div>

                            <DialogFooter className="mt-4">
                                <Button
                                    variant="outline"
                                    onClick={() => {
                                        setOpenDeleteModal(false);
                                        setDetalleAEliminar(null);
                                        setMotivoEliminacion("");
                                    }}
                                >
                                    Cancelar
                                </Button>

                                <Button
                                    className="bg-red-600 hover:bg-red-700 text-white"
                                    disabled={!isEliminarHabilitado}
                                    onClick={() => {
                                        console.log("Eliminar:", {
                                            producto: detalleAEliminar,
                                            motivo: motivoEliminacion,
                                        });

                                        setOpenDeleteModal(false);
                                        setDetalleAEliminar(null);
                                        setMotivoEliminacion("");
                                        setOpenSuccessModal(true);
                                    }}
                                >
                                    Eliminar
                                </Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>

                    <Dialog open={openSuccessModal} onOpenChange={setOpenSuccessModal}>
                        <DialogContent className="max-w-sm" onInteractOutside={(e) => e.preventDefault()}>
                            <DialogHeader>
                                <DialogTitle className="flex flex-col items-center gap-3 text-green-600">
                                    <CheckCircle className="w-14 h-14" />
                                    Producto eliminado
                                </DialogTitle>
                            </DialogHeader>

                            <p className="text-center text-gray-700">
                                El producto ha sido eliminado correctamente.
                            </p>

                            <DialogFooter className="mt-4">
                                <Button
                                    className="bg-green-600 hover:bg-green-700 text-white"
                                    onClick={() => setOpenSuccessModal(false)}
                                >
                                    Aceptar
                                </Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>

                    <Dialog open={openEditModal} onOpenChange={setOpenEditModal}>
                        <DialogContent className="max-w-sm" onInteractOutside={(e) => e.preventDefault()}>
                            <DialogHeader>
                                <DialogTitle>Editar cantidad solicitada</DialogTitle>
                            </DialogHeader>

                            <p className="text-sm text-yellow-700 bg-yellow-50 border border-yellow-300 rounded p-2">
                                Al editar la cantidad solicitada, los lotes asignados se resetearán automáticamente
                                y deberá volver a seleccionar los lotes para el producto <span className="font-semibold">{detalleAEditar?.nombre}</span>.
                            </p>


                            <div className="space-y-3">
                                <Label>Cantidad solicitada:</Label>
                                <Input
                                    type="number"
                                    min={1}
                                    value={cantidadEditada}
                                    onChange={(e) => setCantidadEditada(Number(e.target.value))}
                                />
                            </div>

                            <DialogFooter className="mt-4">
                                <Button
                                    variant="outline"
                                    onClick={() => {
                                        setOpenEditModal(false);
                                        setDetalleAEditar(null);
                                    }}
                                >
                                    Cancelar
                                </Button>

                                <Button
                                    disabled={!isGuardarCantidadHabilitado}
                                    className="disabled:opacity-50"
                                    onClick={() => {
                                        setDetalles((prev) =>
                                            prev.map((d) =>
                                                d.id === detalleAEditar.id
                                                    ? {
                                                        ...d,
                                                        cantidad: cantidadEditada,
                                                        importe: cantidadEditada * d.precio,
                                                        lotesAsignados: [], // 🔄 reset de lotes
                                                    }
                                                    : d
                                            )
                                        );

                                        setOpenEditModal(false);
                                        setDetalleAEditar(null);
                                        setOpenEditSuccessModal(true);
                                    }}
                                >
                                    Guardar
                                </Button>

                            </DialogFooter>
                        </DialogContent>
                    </Dialog>

                    <Dialog open={openEditSuccessModal} onOpenChange={setOpenEditSuccessModal}>
                        <DialogContent className="max-w-sm" onInteractOutside={(e) => e.preventDefault()}>
                            <DialogHeader>
                                <DialogTitle className="flex flex-col items-center gap-3 text-green-600">
                                    <CheckCircle className="w-14 h-14" />
                                    Cantidad actualizada
                                </DialogTitle>
                            </DialogHeader>

                            <p className="text-center text-gray-700">
                                La cantidad del producto se actualizó correctamente.
                            </p>

                            <DialogFooter className="mt-4">
                                <Button
                                    className="bg-green-600 hover:bg-green-700 text-white"
                                    onClick={() => setOpenEditSuccessModal(false)}
                                >
                                    Aceptar
                                </Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>

                    <Dialog
                        open={openAsignarLoteModal}
                        onOpenChange={(open) => {
                            setOpenAsignarLoteModal(open);
                            if (!open) {
                                resetAsignacionLotes();
                            }
                        }}
                    >
                        <DialogContent className="max-w-4xl" onInteractOutside={(e) => e.preventDefault()}>
                            <DialogHeader>
                                <DialogTitle>Asignar lote</DialogTitle>
                            </DialogHeader>

                            {/* CABECERA */}
                            <div className="flex justify-between items-center">
                                <p className="font-semibold">
                                    Producto: {productoSeleccionado?.nombre}
                                </p>
                                <p className="text-sm text-gray-700">
                                    Cantidad Solicitada: <span className="font-bold">{productoSeleccionado?.cantidad ?? 0}</span>
                                </p>
                                <p className="text-sm text-gray-700">
                                    Stock disponible: <span className="font-bold">100</span>
                                </p>
                            </div>

                            {/* TABLA DE LOTES */}
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Stock</TableHead>
                                        <TableHead>Precio</TableHead>
                                        <TableHead>Registro Sanitario</TableHead>
                                        <TableHead>Fecha Venc.</TableHead>
                                        <TableHead>Lote</TableHead>
                                        <TableHead>Fecha Recepción (Almacén)</TableHead>
                                        <TableHead>Acción</TableHead>
                                    </TableRow>
                                </TableHeader>

                                <TableBody>
                                    {lotesMock.map((lote) => (
                                        <TableRow key={lote.id}>
                                            <TableCell>{lote.cantidad}</TableCell>
                                            <TableCell>{lote.precio}</TableCell>
                                            <TableCell>{lote.regSanitario}</TableCell>
                                            <TableCell>{lote.fechaVcto}</TableCell>
                                            <TableCell>{lote.lote}</TableCell>
                                            <TableCell>{lote.fechaRegistro}</TableCell>
                                            <TableCell>
                                                {lotesAsignados.find(l => l.id === lote.id) ? (
                                                    <span className="px-2 py-1 rounded bg-blue-600 text-white text-xs font-bold">
                                                        #{lotesAsignados.find(l => l.id === lote.id)?.orden}
                                                    </span>
                                                ) : (
                                                    <Button
                                                        size="sm"
                                                        onClick={() => seleccionarLote(lote)}
                                                    >
                                                        Seleccionar
                                                    </Button>
                                                )}
                                            </TableCell>

                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>

                            <DialogFooter className="mt-4">
                                <Button
                                    variant="outline"
                                    onClick={() => {
                                        resetAsignacionLotes();
                                        setOpenAsignarLoteModal(false);
                                    }}
                                >
                                    Cerrar
                                </Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>

                    <Dialog open={openConfirmLoteModal} onOpenChange={setOpenConfirmLoteModal}>
                        <DialogContent className="max-w-sm" onInteractOutside={(e) => e.preventDefault()}>
                            <DialogHeader>
                                <DialogTitle>Confirmar asignación</DialogTitle>
                            </DialogHeader>

                            <p className="text-gray-700 space-y-2">
                                Se asignarán los siguientes lotes al producto{" "}
                                <span className="font-semibold">{productoSeleccionado?.nombre}</span>:
                            </p>

                            <ul className="mt-2 list-disc list-inside text-sm text-gray-700">
                                {lotesAsignados.map(l => (
                                    <li key={l.id}>
                                        Lote {l.lote} – Stock {l.cantidad} (Orden #{l.orden})
                                    </li>
                                ))}
                            </ul>

                            <p className="mt-2 text-sm font-semibold">
                                Total asignado: {sumaStockAsignado}
                            </p>

                            <DialogFooter className="mt-4">
                                <Button
                                    variant="outline"
                                    onClick={() => {
                                        setOpenConfirmLoteModal(false);

                                        // 🔄 RESET TOTAL de la selección
                                        setLotesAsignados([]);
                                        setOrdenAsignacion(1);
                                        setSumaStockAsignado(0);
                                        setLoteSeleccionado(null);
                                    }}
                                >
                                    Cancelar
                                </Button>

                                <Button
                                    className="bg-green-600 hover:bg-green-700 text-white"
                                    onClick={() => {
                                        console.log("Lotes asignados:", lotesAsignados);

                                        setOpenConfirmLoteModal(false);
                                        setOpenAsignarLoteModal(false);
                                        setOpenSuccessLoteModal(true);

                                        // Reset
                                        setLotesAsignados([]);
                                        setOrdenAsignacion(1);
                                        setSumaStockAsignado(0);
                                    }}
                                >
                                    Confirmar
                                </Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>

                    <Dialog open={openSuccessLoteModal} onOpenChange={setOpenSuccessLoteModal}>
                        <DialogContent className="max-w-sm" onInteractOutside={(e) => e.preventDefault()}>
                            <DialogHeader>
                                <DialogTitle className="flex flex-col items-center gap-3 text-green-600">
                                    <CheckCircle className="w-14 h-14" />
                                    Lote asignado
                                </DialogTitle>
                            </DialogHeader>

                            <p className="text-center text-gray-700">
                                El lote fue asignado correctamente al producto.
                            </p>

                            <DialogFooter className="mt-4">
                                <Button
                                    className="bg-green-600 hover:bg-green-700 text-white"
                                    onClick={() => {
                                        setOpenSuccessLoteModal(false);
                                        setLoteSeleccionado(null);
                                    }}
                                >
                                    Finalizar
                                </Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>

                    <Dialog
                        open={openAgregarProducto}
                        onOpenChange={(open) => {
                            setOpenAgregarProducto(open);
                            if (!open) {
                                resetNuevoProducto();
                            }
                        }}
                    >
                        <DialogContent className="max-w-md" onInteractOutside={(e) => e.preventDefault()}>
                            <DialogHeader>
                                <DialogTitle>Agregar producto</DialogTitle>
                            </DialogHeader>

                            <div className="space-y-4">
                                {/* Producto */}
                                <div>
                                    <label className="text-sm font-medium">Producto: <span className="text-red-500">*</span></label>
                                    <Input
                                        placeholder="Ej. Paracetamol 500mg"
                                        value={nuevoProducto.producto}
                                        onChange={(e) =>
                                            setNuevoProducto({ ...nuevoProducto, producto: e.target.value })
                                        }
                                    />
                                </div>

                                {/* Cantidad */}
                                <div>
                                    <label className="text-sm font-medium">Cantidad: <span className="text-red-500">*</span></label>
                                    <Input
                                        type="number"
                                        min={1}
                                        value={nuevoProducto.cantidad}
                                        onChange={(e) =>
                                            setNuevoProducto({ ...nuevoProducto, cantidad: e.target.value })
                                        }
                                    />
                                </div>

                                {/* Motivo */}
                                <div>
                                    <label className="text-sm font-medium">Motivo: <span className="text-red-500">*</span></label>
                                    <Input
                                        placeholder="Ingrese mínimo 10 caracteres"
                                        value={nuevoProducto.motivo}
                                        onChange={(e) =>
                                            setNuevoProducto({ ...nuevoProducto, motivo: e.target.value })
                                        }
                                    />
                                </div>
                            </div>

                            <DialogFooter className="mt-4">
                                <Button
                                    variant="outline"
                                    onClick={() => {
                                        setOpenAgregarProducto(false);
                                        resetNuevoProducto();
                                    }}
                                >
                                    Cancelar
                                </Button>

                                <Button
                                    className="bg-green-600 hover:bg-green-700 text-white"
                                    disabled={!isGuardarHabilitado}
                                    onClick={() => {
                                        console.log("Producto agregado:", nuevoProducto);

                                        setOpenAgregarProducto(false);
                                        setOpenExitoAgregarProducto(true);

                                        setNuevoProducto({ producto: "", cantidad: "", motivo: "" });
                                    }}
                                >
                                    Guardar
                                </Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>

                    <Dialog open={openExitoAgregarProducto} onOpenChange={setOpenExitoAgregarProducto}>
                        <DialogContent className="max-w-sm" onInteractOutside={(e) => e.preventDefault()}>
                            <DialogHeader>
                                <DialogTitle className="flex flex-col items-center gap-3">
                                    <CheckCircle className="h-14 w-14 text-green-600" />
                                    <span>Producto agregado</span>
                                </DialogTitle>
                            </DialogHeader>

                            <p className="text-center text-gray-700">
                                El producto se registró exitosamente en la tabla.
                            </p>

                            <DialogFooter className="mt-4">
                                <Button
                                    className="bg-blue-600 hover:bg-blue-700 text-white w-full"
                                    onClick={() => setOpenExitoAgregarProducto(false)}
                                >
                                    Finalizar
                                </Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>

                </Table>
            </div>

            {/* OBSERVACIÓN */}
            <div className="space-y-2">
                <Label>Observación / Comentario</Label>
                <Input className="border border-gray-700" />
            </div>

            {/* BOTONES */}
            <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={onCancel}>
                    Cancelar
                </Button>

                <Button onClick={onConfirm}>
                    Despachar
                </Button>
            </div>
        </div>
    )
}