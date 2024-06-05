// import {Component, OnInit,AfterViewInit,ViewChild} from '@angular/core';
// import {MatDialog, MAT_DIALOG_DATA, MatDialogModule} from '@angular/material/dialog'
// import { AddUserComponent } from '../add-user/add-user.component';
// import { EditUserComponent } from '../edit-user/edit-user.component';
// import { DataService } from '../services/data.service';
// import { ToastrService } from 'ngx-toastr';
// // 
// import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
// import {MatTableDataSource, MatTableModule} from '@angular/material/table';

// export interface PeriodicElement {
//   id:string;
//   empId: number;
//   username: string;
//   email: string;
//   status: string;
//   action: any;
// }

// // export interface PeriodicElement {
// //   empId: number;
// //   username: string;
// //   email: any;
// //   status:string
// //   action: any;
// // }

// // const ELEMENT_DATA: PeriodicElement[] = [
// //   {empId: 1, username: 'Max', email: 'max123', status: 'Active', action: ''},
// //   {empId: 2, username: 'Peter', email: 'pete123', status: 'Inactive', action: ''}
// // ];

// /**
//  * @title Basic use of `<table mat-table>`
//  */

// @Component({
//   selector: 'app-users-list',
//   templateUrl: './users-list.component.html',
//   styleUrl: './users-list.component.scss',
//   // standalone: true,
//   // imports: [MatTableModule, MatPaginatorModule],
  
// })

// export class UsersListComponent implements OnInit,AfterViewInit{
//   displayedColumns: string[] = ['empId','username', 'email','status', 'action'];
//   // dataSource: PeriodicElement[] = [];
//   dataSource = new MatTableDataSource<PeriodicElement>();
//   editDialogRef:any
  
// // 
// @ViewChild(MatPaginator) paginator!: MatPaginator;

//   constructor(public dialog: MatDialog,private api:DataService, private toaster: ToastrService) {}

//   ngOnInit(): void {
//     this.getAllUsersList()
//   }

//   // 
//   ngAfterViewInit() {
//     this.dataSource.paginator = this.paginator;
//   }

//   getAllUsersList():void {
//       // next: (result: any) => {
//       //   // this.allusers = result
//       //   // console.log(this.allusers);

//       // },
//       // error: (reason: any) => {
//       //   console.log(reason);

//       // }
//       this.api.getAllUserAPI().subscribe({
//         next: (result: any) => { // Typing result as any and casting it to PeriodicElement[]
//           this.dataSource.data = result as PeriodicElement[]; // Assign the fetched data to the dataSource
//         },
//         error: (reason: any) => {
//           console.error(reason);
//         }
//       });
//   }

  
 

//   openDialog() {
//     const addDialogRef = this.dialog.open(AddUserComponent, {
//       height:'600px',
//       width:'600px',
//       // data: {
//       //   animal: 'panda',
//       // },
//     });
//     addDialogRef.afterClosed().subscribe((res:any)=>{
//       console.log(res)
//       if (res) {
//         this.getAllUsersList()
//       }
//     })
//   }
  
//   openEdit(user:any): void{
//    this.editDialogRef =  this.dialog.open(EditUserComponent,{
//       height:'600px',
//       width:'600px',
//       data: { id: user.id },
//     });
// this.editDialogRef.afterClosed().subscribe((res:any)=>{
//   console.log(res)
//   if(res){
//     this.getAllUsersList()

//   }
// })
//   }

//   deleteUser(id: any) {
//     this.api.removeUserAPI(id).subscribe((res: any) => {
//       this.toaster.success("User Removed!!!")
//       this.getAllUsersList()
//     })
//   }
// }

import { Component, OnInit, AfterViewInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { AddUserComponent } from '../add-user/add-user.component';
import { EditUserComponent } from '../edit-user/edit-user.component';
import { DataService } from '../services/data.service';
import { ToastrService } from 'ngx-toastr';
import { SearchPipe } from '../pipes/search.pipe';

export interface PeriodicElement {
  id: string;
  empId: number;
  username: string;
  email: string;
  status: string;
  action: any;
}

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss'],
  providers: [SearchPipe],
})
export class UsersListComponent implements OnInit, AfterViewInit {

  searchKey:string=""


  displayedColumns: string[] = ['empId', 'username', 'email', 'status', 'action'];
  dataSource = new MatTableDataSource<PeriodicElement>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(public dialog: MatDialog, private api: DataService, private toaster: ToastrService,private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.getAllUsersList();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  getAllUsersList(): void {
    this.api.getAllUserAPI().subscribe({
      next: (result: any) => {
        this.dataSource.data = result as PeriodicElement[];
      },
      error: (reason: any) => {
        console.error(reason);
      }
    });
  }

  applyFilter(): void {
    this.dataSource.filter = this.searchKey.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }



  // sortByName() {
  //   console.log('Before sorting:', this.dataSource.data);
  
  //   // Sort the data source by username
  //   this.dataSource.data.sort((a: any, b: any) => a.username.localeCompare(b.username));
  
  //   console.log('After sorting:', this.dataSource.data);
  // }
  
  sortByName() {
    this.dataSource.data = this.dataSource.data.sort((a: any, b: any) => a.username.localeCompare(b.username));
    this.cdr.detectChanges(); // Trigger change detection
  }

  

  openDialog() {
    const addDialogRef = this.dialog.open(AddUserComponent, {
      height: '600px',
      width: '600px',
    });
    addDialogRef.afterClosed().subscribe((res: any) => {
      if (res) {
        this.getAllUsersList();
      }
    });
  }

  openEdit(user: any): void {
    const editDialogRef = this.dialog.open(EditUserComponent, {
      height: '600px',
      width: '600px',
      data: { id: user.id },
    });
    editDialogRef.afterClosed().subscribe((res: any) => {
      if (res) {
        this.getAllUsersList();
      }
    });
  }

  deleteUser(id: any) {
    this.api.removeUserAPI(id).subscribe((res: any) => {
      this.toaster.success("User Removed!!!");
      this.getAllUsersList();
    });
  }
}

