CREATE TABLE productos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100),
    descripcion TEXT,
    precio DECIMAL(10, 2),
    stock INT,
    estado TINYINT(1) DEFAULT 1
);

/************************************************************************/

INSERT INTO productos (nombre, descripcion, precio, stock, estado) 
VALUES 
('Camisa de algodón', 'Camisa de manga larga de algodón suave y transpirable', 29.99, 50, 1),
('Pantalones vaqueros', 'Pantalones vaqueros clásicos de mezclilla azul', 49.99, 100, 1),
('Zapatillas deportivas', 'Zapatillas deportivas para correr con suela de goma antideslizante', 79.99, 75, 1),
('Sudadera con capucha', 'Sudadera con capucha de algodón con bolsillo canguro', 39.99, 30, 1);


/************************************************************************/

DELIMITER //

CREATE PROCEDURE fnProductoCrud(
    in_id INT, 
    in_nombre VARCHAR(100), 
    in_descripcion TEXT, 
    in_precio DECIMAL(10, 2), 
    in_stock INT, 
    in_accion CHAR(1)
)
BEGIN
    DECLARE resultado INT;
    DECLARE mensaje VARCHAR(100);

    START TRANSACTION;

    IF in_accion = 'I' THEN
        -- Insertar nuevo producto
        INSERT INTO productos (nombre, descripcion, precio, stock)
        VALUES (in_nombre, in_descripcion, in_precio, in_stock);

        -- Obtener el ID del nuevo producto insertado
        SET resultado = LAST_INSERT_ID();
        SET mensaje = 'Producto insertado correctamente.';
    ELSEIF in_accion = 'U' THEN
        -- Actualizar producto existente
        UPDATE productos
        SET nombre = in_nombre,
            descripcion = in_descripcion,
            precio = in_precio,
            stock = in_stock
        WHERE id = in_id;

        -- Verificar si la actualización afectó a alguna fila
        IF ROW_COUNT() > 0 THEN
            SET resultado = 0;
            SET mensaje = 'Producto modificado correctamente.';
        ELSE
            SET resultado = -1;
            SET mensaje = 'No se encontró ningún producto para actualizar.';
        END IF;
    ELSEIF in_accion = 'D' THEN
        -- Eliminar producto (marcar como inactivo)
        UPDATE productos
        SET estado = 0
        WHERE id = in_id;

        -- Verificar si la eliminación afectó a alguna fila
        IF ROW_COUNT() > 0 THEN
            SET resultado = 0;
            SET mensaje = 'Producto eliminado correctamente.';
        ELSE
            SET resultado = -1;
            SET mensaje = 'No se encontró ningún producto para eliminar.';
        END IF;
    ELSE
        -- Acción no válida
        SET resultado = -1;
        SET mensaje = 'Acción no válida';
    END IF;

    COMMIT;

    -- Devolver el resultado y el mensaje
    SELECT resultado AS resultado, mensaje AS mensaje;
END //

DELIMITER ; 

/************************************************************************/


DELIMITER //

CREATE PROCEDURE fnProductoListar()
BEGIN
    SELECT id, nombre, descripcion, precio, stock
    FROM productos where estado=1;
END //

DELIMITER ;