--criação da tabela de atelie
CREATE TABLE if NOT EXISTS atelie (
  atelie_id UUID PRIMARY KEY,
  nome VARCHAR (100)
);

--criação da tabela de usuario
CREATE TABLE if NOT EXISTS usuario (
usuario_id UUID PRIMARY KEY,
nome VARCHAR(100),
sobrenome VARCHAR(100),
email VARCHAR (100),
atelie_id UUID,
FOREIGN KEY (atelie_id) REFERENCES atelie(atelie_id)
);

--criação da tabela de sala
CREATE TABLE if NOT EXISTS salas (
  sala_id UUID PRIMARY KEY,
  categoria VARCHAR(100),
  status VARCHAR(100),
  nome VARCHAR(100)
);


--criação da tabela de grupo
CREATE TABLE if NOT EXISTS grupo (
  grupo_id UUID PRIMARY KEY,
  numero VARCHAR (100),
  atelie VARCHAR (100),
  usuario VARCHAR (100)
);

--criação da tabela de reservas
CREATE TABLE if NOT EXISTS reservas (
  reservas_id UUID PRIMARY KEY,
  hora_inicio TIME,
  data DATE,
  status VARCHAR (100),
  hora_final TIME,
  sala_id UUID,
  FOREIGN KEY (sala_id) REFERENCES salas(sala_id),
  usuario_id UUID,
  FOREIGN KEY (usuario_id) REFERENCES usuario (usuario_id),
  grupo_id UUID,
  FOREIGN KEY(grupo_id) REFERENCES grupo(grupo_id)
);

-- criação da tabela de grupo-usuario
CREATE TABLE if NOT EXISTS grupo_usuario (
  grupo_usuario_id UUID PRIMARY KEY,
  grupo_id UUID,
  FOREIGN KEY (grupo_id) REFERENCES grupo (grupo_id),
  usuario_id UUID,
  FOREIGN KEY (usuario_id) REFERENCES usuario (usuario_id)
);

