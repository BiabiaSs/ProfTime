create database etec_cronograma;
use etec_cronograma;

create table usuario (
   id_usuario int primary key auto_increment,
   nome_usuario varchar(100),
   email varchar(100),
   senhar char(10),
   tipo_usuario enum('coordenado', 'professor','adm')
);

create table periodos(
  id_periodo int primary key auto_increment,
  periodo enum('manha','tarde','noite')
);

create table curso(
   id_curso int primary key auto_increment,
   nome_curso varchar(60),
   id_periodo  int,
   foreign key ( id_periodo) references periodos ( id_periodo )
);

create table disciplina(
  id_disciplina int primary key auto_increment,
  nome_disciplina varchar(45),
  id_curso int,
  foreign key (id_curso) references curso(id_curso)
);

create table sala (
  id_sala int primary key auto_increment,
  sala enum ('sala de aula', 'laboratorio')
);

create table grupo(
 id_grupo int primary key auto_increment,
 grupo enum ('grupo a', 'grupo b', 'Grupo A e B')
);

create table turmas(
 id_turma int primary key auto_increment,
 nome_curso varchar(45),
 id_grupo int, 
 id_sala int,
  foreign key (id_sala) references sala( id_sala),
  foreign key (id_grupo) references grupo(id_grupo)
);

create table disciplina_turmas(
id_disciplina_turmas int primary key auto_increment,
id_turma int,
id_disciplina int,
foreign key (id_disciplina) references disciplina(id_disciplina),
foreign key (id_turma) references turmas(id_turma)
);


create table professores (
  id_professores int primary key auto_increment,
  nome_professores varchar(100)
);

create table disciplina_professor (
id_disciplina_professor int primary key auto_increment,
id_professores int,
id_disciplina int,
foreign key (id_professores) references professores(id_professores),
foreign key (id_disciplina) references disciplina(id_disciplina)
);


create table horario (
  id_horario int primary key auto_increment,
  dia_semana enum('segunda','terça','quarta','quinta','sexta'),
  horario_inico time,
  horario_fim time,
  id_curso int,
  foreign key (id_curso) references curso(id_curso)
);
drop database etec_cronograma
