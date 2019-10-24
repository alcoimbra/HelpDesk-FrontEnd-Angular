import { User } from './../../model/user.model';
import { ResponseApi } from './../../model/response-api';
import { ActivatedRoute, Event } from '@angular/router';
import { SharedService } from './../../services/shared.service';
import { NgForm } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ViewChild } from '@angular/core';
import { Ticket } from '../../model/ticket.model';
import { TicketService } from '../../services/ticket.service';

@Component({
  selector: 'app-ticket-new',
  templateUrl: './ticket-new.component.html',
  styleUrls: ['./ticket-new.component.css']
})
export class TicketNewComponent implements OnInit {
  
  form: NgForm;
  ticket = new Ticket('',0,'','','','',null,null,'',null,'');
  shared: SharedService;
  message: {};
  classCss: {};

  constructor(
    private ticketService: TicketService,
    private route: ActivatedRoute
  ) { 
    this.shared = SharedService.getInstance();
  }

  ngOnInit() {
    let id: string = this.route.snapshot.params['id'];

    if(id != undefined){
      this.findById(id);
    }
  }

  findById(id: string){
    this.ticketService.findById(id).subscribe((responseApi: ResponseApi) => {
      this.ticket = responseApi.data;
    }, err => {
      this.showMessage({
        type: 'error',
        text: err['error']['errors'][0]
      });
    });
  }

  register(){
    this.message = {};
    this.ticketService.createOrUpdate(this.ticket).subscribe((responseApi: ResponseApi) => {
      this.ticket = new Ticket('',0,'','','','',null,null,'',null,'');

      let ticket: Ticket = responseApi.data;

      this.form.resetForm();
      this.showMessage({
        type: 'success',
        text: `Registered ${ticket.title} Succesfully`
      });
    }, err => {
      this.showMessage({
        type: 'error',
        text: err['error']['errors'][0]
      });
    });
  }

  onFileChange(event: any): void{
    if(event.target.files[0] > 2000000){
      this.showMessage({
        type: 'error',
        text: 'Maximum Image Size is 2MG'
      })
    }else{
      this.ticket.imagens = '';

      var reader = new FileReader();

      reader.onloadend = (e: Event) => {
        this.ticket.imagens = <string> reader.result;
      }

      reader.readAsDataURL(event.target.files[0]);
    }
  }

  private showMessage(message: {type: string, text: string} ): void{
    this.message = message;
    this.buildClass(message.type);

    setTimeout(() => {
      this.message = undefined;
    }, 3000);
  }

  private buildClass(type: string): void{
    this.classCss = {
      'alert': true
    }

    this.classCss['alert='+type] = true;
  }

  getFromGroupClass(isInvalid: boolean, isDirty): {}{
    return {
      'from-group': true,
      'has-error': isInvalid && isDirty,
      'has-success': !isInvalid && isDirty
    }
  }
}