class Dato {
    constructor(_descripcion, _value) {
        this._descripcion = _descripcion;
        this._value = _value;
    }

    setDescripcion(descripcion) {
        this._descripcion = descripcion;
    }

    getDescripcion() {
        return this._descripcion;
    }

    setvalue(value) {
        this._value = value;
    }

    getvalue() {
        return this._value;
    }


}

class ingreso extends Dato {

    static contadorIngresos = 0;

    constructor(descripcion, value) {
        super(descripcion, value);
        this._id = ingreso.contadorIngresos++; 
    }
    
    getId() {
        return this._id;
    }
}

class egreso extends Dato {

    static contadorEgresos = 0;

    constructor(descripcion, value) {
        super(descripcion, value);
        this._id = egreso.contadorEgresos++; 
    }

    getId() {
        return this._id;
    }
}

let ingresos = [
    new ingreso('Salario', 2000),
    new ingreso('Venta Coche', 1500),
    new ingreso('Venta de Switch', 3400),
]

let egresos = [
    new egreso('Renta Departamento', 400),
    new egreso('Ropa', 900),
    new egreso('Despensa', 1000),
]

let cargarApp = () => {
    cargarCabecero();
    cargarIngresos();
    cargarEgresos();
}

let cargarCabecero = () => {
    let presupuesto = totalIngresos() - totalEgresos();
    let porcentajeEgreso = totalEgresos() / totalIngresos();
    console.log(formatoMoneda(presupuesto));
    document.getElementById('presupuesto').innerHTML = formatoMoneda(presupuesto);
    console.log(formatoPorcentaje(porcentajeEgreso));
    document.getElementById('porcentaje').innerHTML = formatoPorcentaje(porcentajeEgreso);
    console.log(formatoMoneda(totalIngresos()));
    document.getElementById('ingresos').innerHTML = formatoMoneda(totalIngresos());
    console.log(formatoMoneda(totalEgresos()));
    document.getElementById('egresos').innerHTML = formatoMoneda(totalEgresos());
}


let totalIngresos = () => {
    let totalIngresos = 0
    for (let ingreso of ingresos) {
        totalIngresos += ingreso.getvalue();
    }
    return totalIngresos;
}

let totalEgresos = () => {
    let totalEgresos = 0
    for (let egreso of egresos) {
        totalEgresos += egreso.getvalue();
    }
    return totalEgresos;
}

let formatoMoneda = (value) => {
    return value.toLocaleString('es-MX', { style: 'currency', currency: 'MXN' });
}

let formatoPorcentaje = (value) => {
    return value.toLocaleString('es-MX', { style: 'percent', minimumFractionDigits: 2 });
}

let cargarIngresos = () => {
    ingresosHTML = '';
    for (let ingreso of ingresos) {
        ingresosHTML += crearIngresoHTML(ingreso);
        document.getElementById('lista-ingresos').innerHTML = ingresosHTML;
    }
}

let crearIngresoHTML = (ingreso) => {
    let ingresoHTML = `
        <div class="elemento limpiarEstilos">
            <div class="elemento_descripcion">${ingreso.getDescripcion()}</div>
            <div class="derecha limpiarEstilos">
                <div class="elemento_valor">${formatoMoneda(ingreso.getvalue())}</div>
                <div class="elemento_eliminar">
                    <button class="elemento_eliminar--btn" id="${ingreso.getId()}" onclick="eliminarIngreso(id)">
                        <ion-icon name="close-circle-outline"></ion-icon>
                    </button>
                </div>
            </div>
        </div>
    `;
    return ingresoHTML;
}

let eliminarIngreso = (id) => {
    let indiceEliminar = ingresos.findIndex(ingreso => ingreso.getId() == id);
    ingresos.splice(indiceEliminar, 1);
    cargarCabecero();
    cargarIngresos();
}

let cargarEgresos = () => {
    egresosHTML = '';
    for (let egreso of egresos) {
        egresosHTML += crearEgresoHTML(egreso);
        document.getElementById('lista-egresos').innerHTML = egresosHTML;
    }
}   

let crearEgresoHTML = (egreso) => {
    let egresoHTML = `
        <div class="elemento limpiarEstilos">
            <div class="elemento_descripcion">${egreso.getDescripcion()}</div>
            <div class="derecha limpiarEstilos">
                <div class="elemento_valor">${formatoMoneda(egreso.getvalue())}</div>
                <div class="elemento_porcentaje">${formatoPorcentaje(egreso.getvalue() / totalIngresos())}</div>
                <div class="elemento_eliminar">
                    <button class="elemento_eliminar--btn" id="${egreso.getId()}" onclick="eliminarEgreso(id)">
                        <ion-icon name="close-circle-outline"></ion-icon>
                    </button>
                </div>
            </div>
        </div>
    `;
    return egresoHTML;
}

let eliminarEgreso = (id) => {
    let indiceEliminar = egresos.findIndex(egreso => egreso.getId() == id);
    egresos.splice(indiceEliminar, 1);
    cargarCabecero();
    cargarEgresos();
}

let agregarDato = () => {
    tipo = document.getElementById('tipo').value;
    descripcion = document.getElementById('descripcion').value;
    valor = document.getElementById('valorElemento').value;
    if (descripcion !== '' && valor !== '') {
        if (tipo === 'ingreso') {
            ingresos.push(new ingreso(descripcion, Number(valor)));
            cargarCabecero();
            cargarEgresos();
            cargarIngresos();
        } else if (tipo === 'egreso') {
            egresos.push(new egreso(descripcion, Number(valor)));
            cargarCabecero();
            cargarEgresos();
            cargarIngresos();
        }
    } else {
        alert('Por favor ingrese una descripción y/o un valor apropiados.');
    }
}
