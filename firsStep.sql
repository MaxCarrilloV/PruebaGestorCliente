CREATE database gestorclientes
CREATE TABLE cliente (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    telefono VARCHAR(15),
    direccion TEXT,
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE users (
    id Integer PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
 	ciudad VARCHAR(100),
	role VARCHAR(100)
);

CREATE INDEX idx_usuarios_username ON users(username);
CREATE INDEX idx_clientes_nombre ON cliente(nombre);

INSERT INTO cliente (nombre, email, telefono, direccion) VALUES
('Juan Pérez', 'juan.perez@example.com', '123456789', '123 Calle Principal, Ciudad'),
('Ana Gómez', 'ana.gomez@example.com', '987654321', '456 Avenida Secundaria, Ciudad');
