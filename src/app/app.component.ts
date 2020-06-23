import { Component } from '@angular/core';
import html2Canvas from 'html2Canvas';
import { Cliente } from './Cliente.interface';
import { Item } from './Item.nterface';
import { Descuento } from './Descuento.interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  cargando: boolean = false;
  accion: string = 'Recibo';
  cliente: Cliente = {
    nombre: 'Nombre Cliente',
    celular: '3',
    fecha: new Date(),
    banco: 'Bancolombia',
  };
  ocultarDescuento:boolean = true;
  compra: Item[] = [];
  promocion: Descuento[] = [];

  nuevoItem: Item = {
    nombre: 'Nombre Producto',
    cantidad: 1,
    precio: 5000,
  };

  nuevoDescuento: Descuento = {
    nombre: 'Nombre Descuento',
    tipo: 'Dinero',
    valor: 5000
  };

  constructor() {
 
  }

  descargar = () => {
    var elemento: any = document.getElementById("link");
    if(elemento.download === `Factura-${this.cliente.nombre}-${this.cliente.fecha.getDate()}/${(this.cliente.fecha.getMonth()+1)}/${this.cliente.fecha.getFullYear()}.png`){
      this.cargando = false;
      this.accion = "Recibo";
      location.reload();
    }else{
      this.cargando = true;
    }
    var esto = document.getElementById("recibo");
    html2Canvas(esto).then(canvas => {
      this.cargando = false;
      if(elemento.download !== `Factura-${this.cliente.nombre}-${this.cliente.fecha.getDate()}/${(this.cliente.fecha.getMonth()+1)}/${this.cliente.fecha.getFullYear()}.png`){
        this.accion = "Descargar";
      }
    var image = canvas.toDataURL("image/png");
    elemento.href =  image;
    elemento.download = `Factura-${this.cliente.nombre}-${this.cliente.fecha.getDate()}/${(this.cliente.fecha.getMonth()+1)}/${this.cliente.fecha.getFullYear()}.png`;
    });
  };

  agregarItem = () => {
    this.compra = [...this.compra, this.nuevoItem];
    this.nuevoItem = {
      nombre: 'Nombre Producto',
      cantidad: 1,
      precio: 5000,
    };
  };

  agregarDescuento = () => {
    this.promocion = [...this.promocion, this.nuevoDescuento];
    this.nuevoDescuento = {
      nombre: 'Nombre Descuento',
      tipo: 'Dinero',
      valor: 5000
    }
    console.log(this.promocion);
  };

  calcularTotal = (): number => {
    let total = 0;
    let totalCompras: number = 0;
    let sumaPorcentajes: number = 0;
    let sumaDinero: number = 0;

    for (const itemCom of this.compra) {
      totalCompras += itemCom.precio * itemCom.cantidad;
    }

    for (const itemProm of this.promocion) {
      if(itemProm.tipo === "Porcentaje"){
        sumaPorcentajes += itemProm.valor;
      }else{
        sumaDinero += itemProm.valor;
      }
    }

    total = (totalCompras - sumaDinero);
    
    if(sumaPorcentajes>0){
      total = total - ((total * sumaPorcentajes)/100);
    }

    return total;
  };

  eliminarProducto = (indice)=>{
    this.compra.splice(indice, 1);
  }

  eliminarDescuento = (indice)=>{
    this.promocion.splice(indice, 1);
  }
  
}
