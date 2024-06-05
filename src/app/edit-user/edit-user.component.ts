import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../services/data.service';
import { UserSchema } from '../Models/userSchema';
import { ToastrService } from 'ngx-toastr';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrl: './edit-user.component.scss'
})
export class EditUserComponent implements OnInit {
  user: UserSchema = {};

  constructor(
    private route: ActivatedRoute,
    private api: DataService,
    private toaster: ToastrService,
    public dialogRef: MatDialogRef<EditUserComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    this.getUserDetails(this.data.id);
    // console.log(this.data.id);
    
  }

  getUserDetails(userId: string): void {
    this.api.getSingleUserAPI(userId).subscribe((res: any) => {
      this.user = res;
      console.log(this.user);
    });
  }

  cancel(): void {
    this.dialogRef.close();
  }

  updateUser(): void {
    this.api.updateUserAPI(this.data.id, this.user).subscribe({
      next: (res: any) => {
        console.log(res);
        this.toaster.success('User details updated successfully!');
        this.dialogRef.close(true);
      },
      error: (reason: any) => {
        this.toaster.warning(reason.message);
      }
    });
  }
}
