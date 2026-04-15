CREATE DATABASE IF NOT EXISTS etec_cronograma;
USE etec_cronograma;
 CREATE TABLE usuarios (
   id_usuarios INT AUTO_INCREMENT PRIMARY KEY,
   nome VARCHAR(100) NOT NULL,
   email VARCHAR(100) NOT NULL UNIQUE,
   senha VARCHAR(255) NOT NULL,
   tipo ENUM('administrador','coordenador','professor') NOT NULL,
   foto VARCHAR(255),
   criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
 CREATE TABLE periodos (
   id_periodo INT AUTO_INCREMENT PRIMARY KEY,
   periodo ENUM('manha','tarde','noite') NOT NULL
);
CREATE TABLE curso (
   id_curso INT AUTO_INCREMENT PRIMARY KEY,
   nome_curso VARCHAR(60) NOT NULL,
   id_periodo INT NOT NULL,
   FOREIGN KEY (id_periodo) REFERENCES periodos(id_periodo)
);
 CREATE TABLE disciplina (
   id_disciplina INT AUTO_INCREMENT PRIMARY KEY,
   nome_disciplina VARCHAR(45) NOT NULL,
   id_curso INT NOT NULL,
   carga_horaria INT,
   FOREIGN KEY (id_curso) REFERENCES curso(id_curso)
);
 CREATE TABLE sala (
   id_sala INT AUTO_INCREMENT PRIMARY KEY,
   tipo_sala ENUM('sala_de_aula','laboratorio') NOT NULL,
   capacidade INT
);
CREATE TABLE grupo (
   id_grupo INT AUTO_INCREMENT PRIMARY KEY,
   nome_grupo ENUM('A','B','A_B') NOT NULL
);
 CREATE TABLE turmas (
   id_turma INT AUTO_INCREMENT PRIMARY KEY,
   id_curso INT NOT NULL,
   id_grupo INT NOT NULL,
   id_sala INT NOT NULL,
   FOREIGN KEY (id_curso) REFERENCES curso(id_curso),
   FOREIGN KEY (id_grupo) REFERENCES grupo(id_grupo),
   FOREIGN KEY (id_sala) REFERENCES sala(id_sala)
);
 CREATE TABLE disciplina_turmas (
   id_disciplina_turmas INT AUTO_INCREMENT PRIMARY KEY,
   id_turma INT NOT NULL,
   id_disciplina INT NOT NULL,
   FOREIGN KEY (id_turma) REFERENCES turmas(id_turma),
   FOREIGN KEY (id_disciplina) REFERENCES disciplina(id_disciplina)
);
 CREATE TABLE professores (
   id_professores INT AUTO_INCREMENT PRIMARY KEY,
   id_usuarios INT NOT NULL,
   titulacao VARCHAR(100),
   carga_horaria INT,
   FOREIGN KEY (id_usuarios) REFERENCES usuarios (id_usuarios)
);
 CREATE TABLE disciplina_professor (
   id_disciplina_professor INT AUTO_INCREMENT PRIMARY KEY,
   id_professores INT NOT NULL,
   id_disciplina INT NOT NULL,
   FOREIGN KEY (id_professores) REFERENCES professores(id_professores),
   FOREIGN KEY (id_disciplina) REFERENCES disciplina(id_disciplina)
);
 CREATE TABLE horario (
   id_horario INT AUTO_INCREMENT PRIMARY KEY,
   id_turma INT NOT NULL,
   id_disciplina INT NOT NULL,
   id_professores INT NOT NULL,
   id_sala INT NOT NULL,
   id_periodo INT NOT NULL,
   dia_semana ENUM('segunda','terca','quarta','quinta','sexta') NOT NULL,
   horario_inicio TIME NOT NULL,
   horario_fim TIME NOT NULL,
   FOREIGN KEY (id_turma) REFERENCES turmas(id_turma),
   FOREIGN KEY (id_disciplina) REFERENCES disciplina(id_disciplina),
   FOREIGN KEY (id_professores) REFERENCES professores(id_professores),
   FOREIGN KEY (id_sala) REFERENCES sala(id_sala),
   FOREIGN KEY (id_periodo) REFERENCES periodos(id_periodo)
);
 CREATE TABLE agenda_indisponibilidade (
   id INT AUTO_INCREMENT PRIMARY KEY,
   id_usuarios INT NOT NULL,
   data DATE NOT NULL,
   horario_inicio TIME NOT NULL,
   horario_fim TIME NOT NULL,
   motivo VARCHAR(255),
   criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
   FOREIGN KEY (id_usuarios) REFERENCES usuarios (id_usuarios)
);
CREATE TABLE conversas (
   id INT AUTO_INCREMENT PRIMARY KEY,
   tipo ENUM('individual','grupo') NOT NULL,
   criada_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE mensagens (
   id INT AUTO_INCREMENT PRIMARY KEY,
   conversa_id INT NOT NULL,
   id_usuarios INT NOT NULL,
   mensagem TEXT NOT NULL,
   enviada_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
   FOREIGN KEY (conversa_id) REFERENCES conversas(id),
   FOREIGN KEY (id_usuarios) REFERENCES usuarios (id_usuarios)
);
 CREATE TABLE logs (
   id INT AUTO_INCREMENT PRIMARY KEY,
   id_usuarios INT NOT NULL,
   acao VARCHAR(255) NOT NULL,
   data_hora TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
   FOREIGN KEY (id_usuarios) REFERENCES usuarios (id_usuarios)
);
 INSERT INTO usuarios (nome, email, senha, tipo)
VALUES ('Administrador Geral', 'admin@profetime.com', 'admin123', 'administrador');

 INSERT INTO usuarios (nome, email, senha, tipo)
VALUES ('Coordenador Geral', 'coord@profetime.com', 'coord123', 'coordenador');

 INSERT INTO usuarios (nome, email, senha, tipo)
VALUES ('Professor Geral', 'profe@profetime.com', 'profe123', 'professor');