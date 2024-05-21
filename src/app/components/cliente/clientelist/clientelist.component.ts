import { Component, TemplateRef, ViewChild, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { MdbModalModule, MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { MdbAccordionModule } from 'mdb-angular-ui-kit/accordion';
import { ClientedetailsComponent } from '../clientedetails/clientedetails.component';
import { Cliente } from '../../../models/cliente';
import { ClienteService } from '../../../services/cliente.service';
import Swal, { SweetAlertResult } from 'sweetalert2';

@Component({
  selector: 'app-clientelist',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterLink,
    MdbModalModule,
    ClientedetailsComponent,
    MdbAccordionModule
  ],
  templateUrl: './clientelist.component.html',
  styleUrls: ['./clientelist.component.scss'],  // Corrigido para styleUrls
})
export class ClientelistComponent {
  modalService = inject(MdbModalService);
  service = inject(ClienteService);

  @ViewChild('modalDetalhe') modalDetalhe!: TemplateRef<any>;

  modalRef!: MdbModalRef<any>;

  lista: Cliente[] = [];
  objEdit!: Cliente;

  constructor() {
    this.listAll();
  }

  listAll() {
    this.service.listAll().subscribe({
      next: lista => {
        this.lista = lista;
      },
      error: erro => {
        alert('Erro ao carregar listagem de registros!');
      }
    });
  }

  deleteById(obj: Cliente) {
    Swal.fire({
      title: 'Tem certeza que deseja deletar este registro?',
      icon: 'warning',
      showConfirmButton: true,
      showDenyButton: true,
      confirmButtonText: 'Sim',
      cancelButtonText: 'Não',
    }).then((result: SweetAlertResult) => {
      if (result.isConfirmed) {
        this.service.delete(obj.id).subscribe({
          next: retorno => {
            Swal.fire({
              title: 'Deletado com sucesso!',
              icon: 'success',
              confirmButtonText: 'Ok'
            });
            this.listAll();
          },
          error: erro => {
            alert(erro.status);
            console.log(erro);
            Swal.fire({
              title: 'ERRO!',
              icon: 'error',
              confirmButtonText: 'Ok'
            });
          }
        });
      }
    });
  }

  new() {
    this.objEdit = new Cliente(0,"",0,"");
    this.modalRef = this.modalService.open(this.modalDetalhe);
  }

  edit(obj: Cliente) {
    this.objEdit = Object.assign({}, obj);
    this.modalRef = this.modalService.open(this.modalDetalhe) ;
  }

  retornoDetalhe(obj: Cliente) {
    this.listAll();
    this.modalRef.close();
  }


  
}
