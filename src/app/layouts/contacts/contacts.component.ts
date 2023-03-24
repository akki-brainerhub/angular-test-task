import { HttpClient, HttpEventType, HttpResponse } from '@angular/common/http';
import { Component, OnInit, VERSION } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { ContactService, Todo } from 'src/app/api-services/contact.service';
import { AppConst } from 'src/app/app.constant';
import { SharedService } from 'src/app/shared/shared.service';
import { AddContactsComponent } from './add-contacts/add-contacts.component';
import { ImageUploadComponent } from './image-upload/image-upload.component';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss']
})
export class ContactsComponent implements OnInit {
  page: any = 1;
  limit: number = AppConst.pageSize;;
  length: number = 0;
  index: number | undefined;
  modelFunctionality = AppConst.modelOpenFunctionality;
  contactsList: any = [];
  percentDone!: number;
  uploadSuccess!: boolean;

  todos$!: Observable<Todo[]>;
  constructor(private http: HttpClient, private modalService: NgbModal, public sharedservice: SharedService, public contacts: ContactService) { }

  ngOnInit(): void {
    this.getAllContacts();
  }

  //Fetch all contacts
  getAllContacts() {
    this.contacts.todos$.subscribe((res: any) => {
      this.contactsList = res;
      this.length = res.length;
    })
  }

  create() {
    const modalRef = this.modalService.open(AddContactsComponent, this.modelFunctionality);
  }

  edit() {
    const modalRef = this.modalService.open(ImageUploadComponent, {
      size: 'md',
      backdrop: 'static',
      centered: true,
      keyboard: false
    });
  }

  /**
* for pagination
* // TODO: receiveMessage
* @param event
*/
  receiveMessage(event: any) {
    this.limit = event.pageSize;
    this.page = event.pageIndex + 1;
    this.getAllContacts();
  }
}
