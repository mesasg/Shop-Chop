--Tabla usario
CREATE TABLE Usuario(
    nombre VARCHAR(50) NOT NULL,
    documento VARCHAR(10) NOT NULL,
    celular VARCHAR(10) NOT NULL,
    direccion VARCHAR(50) NOT NULL,
    correo VARCHAR(50)
);

--Tabla receta
CREATE TABLE Receta(
    ID SMALLINT NOT NULL,
    nombre VARCHAR(40),
    descripcion TEXT NOT NUll,
    foto BYTEA NOT NULL
);

--Tabla producto 
CREATE TABLE Producto(
    ID SMALLINT NOT NULL,
    nombre VARCHAR(20) NOT NULL,
    precio REAL NOT NULL
);

--Tabla critica 
CREATE TABLE Critica(
    ID SMALLINT NOT NULL,
    comentario TEXT NOT NULL
);

--Tabla pedido
CREATE TABLE Pedido(
    ID SMALLINT NOT NULL,
    estado VARCHAR(10) NOT NULL
);