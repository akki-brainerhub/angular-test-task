import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { ContactService, Todo } from 'src/app/api-services/contact.service';
import { SharedService } from 'src/app/shared/shared.service';

@Component({
  selector: 'app-add-contacts',
  templateUrl: './add-contacts.component.html',
  styleUrls: ['./add-contacts.component.scss']
})
export class AddContactsComponent implements OnInit {

  isLoading: boolean = false;
  editable = false;
  formGroup!: FormGroup;
  todos$!: Observable<Todo[]>;
  constructor(private fb: FormBuilder, public modal: NgbActiveModal, public contacts: ContactService, public sharedservice: SharedService) { }

  ngOnInit(): void {
    this.loadForm();
  }

  //Load Form
  loadForm() {
    this.setFormGroup();
  }

  //Set Form Group
  setFormGroup() {
    this.formGroup = this.fb.group({
      userid: ['', Validators.compose([Validators.required, Validators.min(100), Validators.max(1000000)])],
      name: ['', Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(50)])],
      address: ['', Validators.compose([Validators.required, Validators.minLength(5), Validators.maxLength(50)])],
      city: ['', Validators.compose([Validators.required, Validators.minLength(5), Validators.maxLength(15)])],
      race: ['', Validators.compose([Validators.required, Validators.minLength(5), Validators.maxLength(50)])],
      drivenlicence: ['', Validators.compose([Validators.required, Validators.minLength(10), Validators.maxLength(50)])],
      genere: ['', Validators.compose([Validators.required, Validators.minLength(5), Validators.maxLength(50)])],
      bloodtype: ['', Validators.compose([Validators.required, Validators.minLength(5), Validators.maxLength(50)])],
    });
  }

  //Final save
  save() {
    this.create();
  }

  //Add Create
  create() {
    if (this.formGroup.invalid) {
      return
    }

    this.contacts.create(this.formGroup.value);
    this.sharedservice.swalSuccess("Contact data added!");
    this.modal.close();
    this.formGroup.reset();

  }

  //Close model
  cancel() {
    this.modal.close();
  }

  // helpers for View
  isControlValid(controlName: string): boolean {
    const control = this.formGroup.controls[controlName];
    return control.valid && (control.dirty || control.touched);
  }

  isControlInvalid(controlName: string): boolean {
    const control = this.formGroup.controls[controlName];
    return control.invalid && (control.dirty || control.touched);
  }

  controlHasError(validation: string, controlName: string | number): boolean {
    const control = this.formGroup.controls[controlName];
    return control.hasError(validation) && (control.dirty || control.touched);
  }

  isControlTouched(controlName: string | number): boolean {
    const control = this.formGroup.controls[controlName];
    return control.dirty || control.touched;
  }

  get f() { return this.formGroup.controls; }

}
