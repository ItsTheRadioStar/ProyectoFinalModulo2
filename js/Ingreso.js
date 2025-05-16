class Dato {
    constructor(_descripcion, _valor) {
        this._descripcion = _descripcion;
        this._valor = _valor;
    }

    getDescripcion() {
        return this._descripcion;
    }

    setDescripcion(descripcion) {
        this._descripcion = descripcion;
    }

    getValor() {
        return this._valor;
    }

    setValor(valor) {
        this._valor = valor;
    }

}


class ingreso extends Dato {
    constructor(descripcion, valor) {
        super(descripcion, valor);
    }
    
    static _id = 0;
    static getId() {
        return this._id++;
    }
}
