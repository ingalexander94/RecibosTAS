export type descuentos = "Porcentaje" | "Dinero";

export interface Descuento {
    nombre: string;
    tipo: descuentos;
    valor: number;
}