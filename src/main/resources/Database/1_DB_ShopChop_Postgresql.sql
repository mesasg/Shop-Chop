-- Tabla Usuario
CREATE TABLE Usuario(
    nombre VARCHAR(50) NOT NULL,
    documento VARCHAR(10) NOT NULL,
    celular VARCHAR(10) NOT NULL,
    direccion VARCHAR(50) NOT NULL,
    correo VARCHAR(50),
    contraseña VARCHAR(20),
    PRIMARY KEY (documento)
);

-- Tabla Receta
CREATE TABLE Receta(
    ID SMALLINT NOT NULL,
    nombre VARCHAR(40),
    descripcion TEXT NOT NULL,
    foto BYTEA NOT NULL,
    documentoUsuario VARCHAR(10) NOT NULL,
    PRIMARY KEY (ID),
    FOREIGN KEY (documentoUsuario) REFERENCES Usuario(documento)
);

-- Tabla Producto
CREATE TABLE Producto(
    ID SMALLINT NOT NULL,
    nombre VARCHAR(20) NOT NULL,
    precio REAL NOT NULL,
    PRIMARY KEY (ID)
);

-- Tabla Critica
CREATE TABLE Critica(
    ID SMALLINT NOT NULL,
    comentario TEXT NOT NULL,
    documentoUsuario VARCHAR(10) NOT NULL,
    IDReceta SMALLINT NOT NULL,
    PRIMARY KEY (ID),
    FOREIGN KEY (documentoUsuario) REFERENCES Usuario(documento),
    FOREIGN KEY (IDReceta) REFERENCES Receta(ID)
);


-- Tabla Pedido
CREATE TABLE Pedido(
    ID SMALLINT NOT NULL,
    estado VARCHAR(10) NOT NULL,
    documentoUsuario VARCHAR(10) NOT NULL,
    PRIMARY KEY (ID),
    FOREIGN KEY (documentoUsuario) REFERENCES Usuario(documento)
);

-- Tabla relacion Productos En Recetas
CREATE TABLE ProductoEnReceta(
    IDProducto SMALLINT NOT NULL,
    IDReceta SMALLINT NOT NULL,
    cantidad INTEGER NOT NULL,
    PRIMARY KEY (IDProducto, IDReceta),
    FOREIGN KEY (IDProducto) REFERENCES Producto(ID),
    FOREIGN KEY (IDReceta) REFERENCES Receta(ID)
);

-- Tabla relacion Productos En Pedido
CREATE TABLE PedidoProducto(
    IDProducto SMALLINT NOT NULL,
    IDPedido SMALLINT NOT NULL,
    cantidad INTEGER NOT NULL,
    PRIMARY KEY (IDProducto, IDPedido),
    FOREIGN KEY (IDProducto) REFERENCES Producto(ID),
    FOREIGN KEY (IDPedido) REFERENCES Pedido(ID)
);