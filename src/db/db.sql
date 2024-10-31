CREATE DATABASE payroll;

\c payroll;

CREATE TABLE users (
    id VARCHAR(255) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT NOW()
);


CREATE TABLE companies (
    id SERIAL PRIMARY KEY,
    user_id VARCHAR(255) REFERENCES users(id) ON DELETE CASCADE,
    name VARCHAR(200) NOT NULL,
    rut VARCHAR(50) NOT NULL,
    address VARCHAR(255),
    phone VARCHAR(20),
    created_at TIMESTAMP DEFAULT NOW()
);


CREATE TABLE workers (
    id SERIAL PRIMARY KEY,
    company_id INT REFERENCES companies(id) ON DELETE CASCADE,
    name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    rut VARCHAR(20) NOT NULL,
    sex CHAR(1) NOT NULL,
    home_address VARCHAR(200),
    phone VARCHAR(15),
    position VARCHAR(100),
    department VARCHAR(100),
    base_salary INT NOT NULL,
    email VARCHAR(100),
    created_at TIMESTAMP DEFAULT NOW()
);


CREATE TABLE payrolls (
    id SERIAL PRIMARY KEY,
    worker_id INT REFERENCES workers(id) ON DELETE CASCADE,
    calculation_date DATE NOT NULL,
    days_worked INT NOT NULL,
    overtime_hours INT DEFAULT 0,
    base_salary INT NOT NULL,
    overtime_pay INT DEFAULT 0,
    total_salary INT NOT NULL,
    email_sent BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT NOW()
);

-- PROCEDURE PARA CREAR EMPLEADOS
CREATE OR REPLACE PROCEDURE add_worker(
    p_company_id INT,
    p_name VARCHAR,
    p_last_name VARCHAR,
    p_rut VARCHAR,
    p_sex CHAR(1),
    p_home_address VARCHAR,
    p_phone VARCHAR,
    p_position VARCHAR,
    p_department VARCHAR,
    p_base_salary INT,
    p_email VARCHAR
)
-- PROCEDURE PARA CREAR EMPLEADOS
LANGUAGE plpgsql
AS $$
BEGIN
    INSERT INTO workers(
        company_id, name, last_name, rut, sex, home_address, phone, position, department, base_salary, email
    )
    VALUES (
        p_company_id, p_name, p_last_name, p_rut, p_sex, p_home_address, p_phone, p_position, p_department, p_base_salary, p_email
    );
END;
$$;

-- PROCEDURE PARA CREAR EMPRESAS
CREATE OR REPLACE PROCEDURE create_company(p_user_id INT, p_name VARCHAR, p_address VARCHAR, p_rut VARCHAR, p_phone VARCHAR)
LANGUAGE plpgsql
AS $$
BEGIN
    INSERT INTO companies (user_id, name, address, rut, phone)
    VALUES (p_user_id, p_name, p_address, p_rut, p_phone);
END;
$$;



INSERT INTO users (id, name, email) VALUES ('1', 'Admin', 'admin@mail.com');

INSERT INTO companies (user_id, name, rut) VALUES ('user_id', 'Empresa 1', '12345678-9');
INSERT INTO companies (user_id, name, rut) VALUES ('user_id', 'Empresa 2', '98765432-1');

INSERT INTO workers (company_id, name, last_name, rut, sex, home_address, phone, position, base_salary, email, created_at) VALUES
(1, 'John', 'Doe', '12345678-9', 'M', '123 Main St', '123456789', 'Software Engineer', 1000000, 'john.doe@example.com', NOW()),
(1, 'Jane', 'Smith', '98765432-1', 'F', '456 Elm St', '987654321', 'Product Manager', 1200000, 'jane.smith@example.com', NOW()),
(1, 'Carlos', 'Gonzalez', '11223344-5', 'M', '789 Oak St', '112233445', 'Data Scientist', 1100000, 'carlos.gonzalez@example.com', NOW()),
(2, 'Maria', 'Lopez', '55667788-0', 'F', '321 Pine St', '556677880', 'UX Designer', 900000, 'maria.lopez@example.com', NOW()),
(2, 'Luis', 'Martinez', '99887766-3', 'M', '654 Cedar St', '998877663', 'DevOps Engineer', 1050000, 'luis.martinez@example.com', NOW());

SELECT w.*
FROM workers w
JOIN companies c ON w.company_id = c.id
WHERE c.user_id = 'user_id' AND w.company_id = 1;

ALTER TABLE workers DROP COLUMN department;





