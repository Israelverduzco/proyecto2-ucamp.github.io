//Evento para crear un Inventario
document.getElementById("inventario").addEventListener("submit", crear);

//Función Crear

function crear(e){
    proveedor = document.getElementById("proveedor").value
    productCode = document.getElementById("productCode").value
    descripcion = document.getElementById("descripcion").value
    precio = document.getElementById("precio").value
    
    let producto = {
        proveedor,
        productCode,
        descripcion,
        precio
    }

    if(localStorage.getItem("Productos") === null){
        let productos = []
        productos.push(producto)
        localStorage.setItem("Productos", JSON.stringify(productos))
    }else{
        let productos = JSON.parse(localStorage.getItem("Productos"))
        productos.push(producto)
        localStorage.setItem("Productos", JSON.stringify(productos))
    }

    leer();
    document.getElementById("inventario").reset();
    console.log("Producto guardado correctamente")
    e.preventDefault()
}

//Funcion "Leer"

function leer(){
    let productos = JSON.parse(localStorage.getItem("Productos"));
    document.getElementById("tbody").innerHTML = ""
    for(let i=0; i < productos.length; i++){
        let proveedor = productos[i].proveedor
        let productCode = productos[i].productCode
        let descripcion = productos[i].descripcion
        let precio = productos[i].precio

        document.getElementById("tbody").innerHTML +=
        `<tr>
          <td>${proveedor}</td>
          <td>${productCode}</td>
          <td>${descripcion}</td>
          <td>${precio}</td>
          <td><button onclick="eliminar('${proveedor}')" class="btn btn-danger">Eliminar</button></td>
          <td><button onclick="editar('${proveedor}')" class="btn btn-success">Editar</button></td>
         </tr>
        `
    }
}

//funcion "Editar"
function editar(proveedor){
     let productos = JSON.parse(localStorage.getItem("Productos"));
     for (let i=0; i<productos.length; i++){
         if(productos[i].proveedor === proveedor){
             document.getElementById("body").innerHTML = `         <div class="row">
             <div class="col-md-5">
                 <div class="card">
                     <div class="card-header">
                         <h2>Mofificar Producto</h2>
                     </div>
                     <div class="card-body">
                         <form>
                             <div class="form-group">
                                 <input type="text" id="newproveedor" class="form-control my-3" placeholder="${productos[i].proveedor}
                                 ">
                             </div>
                             <div class="form-group">
                                 <input type="number" id="newproductCode" class="form-control my-3" placeholder="${productos[i].productCode}">
                             </div>
                             <div class="form-group">
                                 <input type="text" id="newdescripcion" class="form-control my-3" placeholder="${productos[i].descripcion}">
                             </div>
                             <div class="form-group">
                                 <input type="number" id="newprecio" class="form-control my-3" placeholder="${productos[i].precio}">
                             </div>
                         </form>
                         <button class="btn btn-success" onclick="actualizar('${i}')">Actualizar</button>
                         <button class="btn btn-success" onclick="vistaPrincipal()">Cancelar</button>
                         
                     </div>
                 </div>
             `



         }
     }
}

//Función actualizar
function actualizar(i){
    let productos = JSON.parse(localStorage.getItem("Productos"));
    productos[i].proveedor = document.getElementById("newproveedor").value;
    productos[i].productCode = document.getElementById("newproductCode").value;
    productos[i].descripcion = document.getElementById("newdescripcion").value;
    productos[i].precio = document.getElementById("newprecio").value;

        localStorage.setItem("Productos", JSON.stringify(productos));
        vistaPrincipal()
}

//funcion Eliminar
function eliminar(proveedor){
    let productos = JSON.parse(localStorage.getItem("Productos"));

    for(let i=0; i<productos.length; i++){
        if(productos[i].proveedor === proveedor){
            productos.splice(i,1);

        }
    }

    localStorage.setItem("Productos", JSON.stringify(productos));
    leer();
}

//Función para mostrar la interfaz principal

function vistaPrincipal(){
    document.getElementById("body").innerHTML = `<div class="row">
    <div class="col-md-5">
        <div class="card">
            <div class="card-header">
                <h2>Agregar a inventario</h2>
            </div>
            <div class="card-body">
                <form id="inventario">
                <div class="form-group">
                        <input type="text" id="proveedor" class="form-control my-3" placeholder="Ingresar Proveedor">
                    </div>
                    <div class="form-group">
                        <input type="number" id="productCode" class="form-control my-3" placeholder="Ingresar Codigo de barras">
                    </div>
                    <div class="form-group">
                        <input input="text" id="descripcion" class="form-control my-3" placeholder="Ingresar descripción del producto">
                    </div>
                    <div class="form-group">
                        <input type="number" id="precio" class="form-control my-3" placeholder="Ingresar precio">
                    </div>
                    <button type="submit" class="btn btn-primary">Agregar</button>
                </form>

            </div>
        </div>
    </div>
    <div class="col-md-6">
        <table class="table caption-top bg-light">
            <thead>
              <tr>
                <th scope="col">Proveedor</th>
                <th scope="col">Codigo de barras</th>
                <th scope="col">Descripción</th>
                <th scope="col">Precio</th>
              </tr>
            </thead>
            <tbody id="tbody">
              <tr>
                <td>Nadro</td>
                <td>750134567812</td>
                <td>Redoxon Infantil 10 Tab</td>
                <td>102</td>
              </tr>
            </tbody>
          </table>
    </div>
</div>`
leer();
}
leer();