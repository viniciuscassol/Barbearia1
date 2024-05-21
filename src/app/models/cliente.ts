export class Cliente {
  id!: number;
  nome!: string;
  valor!: number;
  horario!: string;

  constructor(id: number, nome: string, valor: number, horario: string) {
      this.id = id;
      this.nome = nome;
      this.valor = valor;
      this.horario = horario;
 
  }
}
