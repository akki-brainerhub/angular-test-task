import { Injectable } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import Swal from 'sweetalert2';
@Injectable({
  providedIn: 'root'
})
export class SharedService {

  constructor(private spinner: NgxSpinnerService, private modalService: NgbModal) { }

  // for show loader
  showLoader() {
    this.spinner.show();
  }

  // for hide loader
  hideLoader() {
    this.spinner.hide();
  }
  // for success message of swal
  swalSuccess(successMessage: any) {
    Swal.fire('', successMessage, 'success')
  }
  // for error message of swal
  swalError(errorMessage: any) {
    Swal.fire('', errorMessage, 'error')
  }
}
