import { Component, Inject } from '@angular/core';
import { MatDialogRef, MatDialog, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { UserSchema } from '../Models/userSchema';
import { DataService } from '../services/data.service';
import { ToastrService } from 'ngx-toastr';

// export interface DialogData {
//   animal: 'panda' | 'unicorn' | 'lion';
// }

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrl: './add-user.component.scss'
})
export class AddUserComponent {
  // constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData) {}
  user: UserSchema = {}

  constructor(private api: DataService, private toaster: ToastrService,public dialogRef: MatDialogRef<AddUserComponent>) {

  }

  addUser() {
    this.api.addUserAPI(this.user).subscribe({
      next: (res: any) => {
        this.toaster.success("New User Added  successfully!!!!!")
        this.dialogRef.close(true);
        // this.cancel()
      }, error: (reason: any) => {
        console.log(reason);
        

      }
    })
  }

  // cancel() {
  //   this.user.empId = ""
  //   this.user.username = ""
  //   this.user.email = ""
  //   this.user.status = ""
  // }

  cancel(): void {
    this.dialogRef.close();
  }

  
}
