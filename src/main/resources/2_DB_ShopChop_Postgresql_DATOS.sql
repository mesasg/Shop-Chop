-- Insertar usuarios
INSERT INTO Usuario (nombre, documento, celular, direccion, correo, contraseña) VALUES
('Ana Pérez', '1234567890', '3001234567', 'Calle 10 #20-30', 'ana@example.com', 'clave123'),
('Luis Gómez', '9876543210', '3019876543', 'Carrera 45 #12-50', 'luis@example.com', 'segura456'),
('María Torres', '1122334455', '3021122334', 'Avenida 80 #30-10', 'maria@example.com', 'torres789');

-- Insertar productos
INSERT INTO Producto (ID, nombre, precio) VALUES
(1, 'Harina', 2500),
(2, 'Azúcar', 1800),
(3, 'Huevos', 500),
(4, 'Leche', 2200),
(5, 'Vainilla', 1500);

-- Insertar recetas
INSERT INTO Receta (ID, nombre, descripcion, foto, documentoUsuario) VALUES
(1, 'Torta de Vainilla', 'Torta casera con sabor a vainilla', decode('FFD8FFE000104A464946', 'hex'), '1234567890'),
(2, 'Pan Casero', 'Pan suave y esponjoso hecho en casa', decode('FFD8FFE000104A464946', 'hex'), '9876543210');

-- Insertar críticas
INSERT INTO Critica (ID, comentario, documentoUsuario, IDReceta) VALUES
(1, 'Muy buena receta, fácil de hacer.', '1234567890', 1),
(2, 'El pan quedó perfecto, lo recomiendo.', '9876543210', 2);

-- Insertar pedidos
INSERT INTO Pedido (ID, estado, documentoUsuario) VALUES
(1, 'pendiente', '1234567890'),
(2, 'entregado', '1122334455');

-- Relacionar productos con recetas
INSERT INTO ProductoEnReceta (IDProducto, IDReceta, cantidad) VALUES
(1, 1, 500),  -- Harina para torta
(2, 1, 200),  -- Azúcar para torta
(3, 1, 3),    -- Huevos para torta
(5, 1, 1),    -- Vainilla para torta
(1, 2, 400),  -- Harina para pan
(4, 2, 300),  -- Leche para pan
(3, 2, 2);    -- Huevos para pan

-- Relacionar productos con pedidos
INSERT INTO ProductoEnPedido (IDProducto, IDPedido, cantidad) VALUES
(1, 1, 1),  -- Harina en pedido 1
(2, 1, 2),  -- Azúcar en pedido 1
(3, 2, 6),  -- Huevos en pedido 2
(4, 2, 1);  -- Leche en pedido 2