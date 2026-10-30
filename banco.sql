
CREATE DATABASE IF NOT EXISTS ordens_servico;

USE ordens_servico;

CREATE TABLE ordens_servico (

    id INT AUTO_INCREMENT PRIMARY KEY,

    cliente VARCHAR(100) NOT NULL,
    equipamento VARCHAR(100) NOT NULL,
    descricao VARCHAR(500) NOT NULL,
    
    prioridade VARCHAR(20) NOT NULL DEFAULT 'media',

    status VARCHAR(20) NOT NULL DEFAULT 'aberta',

    data_abertura DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP

);
