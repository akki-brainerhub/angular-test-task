import { HttpClient, HttpEventType, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ContactService } from 'src/app/api-services/contact.service';
import { SharedService } from 'src/app/shared/shared.service';

@Component({
  selector: 'app-image-upload',
  templateUrl: './image-upload.component.html',
  styleUrls: ['./image-upload.component.scss']
})
export class ImageUploadComponent implements OnInit {
  percentDone!: number;
  uploadSuccess!: boolean;

  constructor(public modal: NgbActiveModal, public contacts: ContactService, public sharedservice: SharedService, private http: HttpClient,) { }

  ngOnInit(): void {

  }

  upload(files: File[]) {
    //pick from one of the 4 styles of file uploads below
    this.uploadAndProgress(files);
  }

  basicUpload(files: File[]) {
    var formData = new FormData();
    Array.from(files).forEach(f => formData.append('file', f))
    this.http.post('https://file.io', formData)
      .subscribe(event => {
        console.log('done')
      })
  }

  //this will fail since file.io dosen't accept this type of upload
  //but it is still possible to upload a file with this style
  basicUploadSingle(file: File) {
    this.http.post('https://file.io', file)
      .subscribe(event => {
        console.log('done')
      })
  }


  uploadAndProgress(files: File[]) {
    console.log(files)
    var formData = new FormData();
    Array.from(files).forEach(f => formData.append('file', f))

    this.http.post('https://file.io', formData, { reportProgress: true, observe: 'events' })
      .subscribe(event => {
        if (event.type === HttpEventType.UploadProgress) {
          if (event?.loaded && event?.total) {
            this.percentDone = Math.round(100 * event.loaded / event.total)
          }
        } else if (event instanceof HttpResponse) {
          this.uploadSuccess = true;
          this.sharedservice.swalSuccess("Image Upload succssfully!");
          this.modal.close();
        }
      });
  }

  //this will fail since file.io dosen't accept this type of upload
  //but it is still possible to upload a file with this style
  uploadAndProgressSingle(file: File) {
    this.http.post('https://file.io', file, { reportProgress: true, observe: 'events' })
      .subscribe(event => {
        if (event.type === HttpEventType.UploadProgress) {
          // this.percentDone = Math.round(100 * event.loaded / event.total);
          if (event?.loaded && event?.total) {
            this.percentDone = Math.round(100 * event.loaded / event.total)
          }
        } else if (event instanceof HttpResponse) {
          this.uploadSuccess = true;
          this.sharedservice.swalSuccess("Image Upload succssfully!");
          this.modal.close();
        }
      });
  }
  //Close model
  cancel() {
    this.modal.close();
  }

}
