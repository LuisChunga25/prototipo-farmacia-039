import { DespachoPrerrequerimiento } from "@/components/transferencias/despacho-prerrequerimiento";

export default function Page({ params }: any) {
    return (
        <div className="p-6">
            <DespachoPrerrequerimiento
                solicitud={{ prerrequerimientoId: params.id }}
                detallesPrerreq={[]}
                transaccDistrib="Distribución"
                onCancel={() => {}}
                onConfirm={() => {}}
            />
        </div>

    );
}