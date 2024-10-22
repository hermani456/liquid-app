CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    clerk_user_id VARCHAR(255) UNIQUE NOT NULL,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT NOW()
);


CREATE TABLE companies (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(id) ON DELETE CASCADE,
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
    generated_by INT REFERENCES users(id),
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
CREATE OR REPLACE PROCEDURE create_user(p_clerk_user_id VARCHAR, p_name VARCHAR, p_email VARCHAR)
LANGUAGE plpgsql
AS $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM users WHERE clerk_user_id = p_clerk_user_id) THEN
        INSERT INTO users (clerk_user_id, name, email)
        VALUES (p_clerk_user_id, p_name, p_email);
    END IF;
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



