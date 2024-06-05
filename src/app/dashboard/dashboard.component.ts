import { Component } from '@angular/core';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  hobbies:string=""
  allEmployee:any=[
    {
      empId:100,empName:"Max Miller",empSalary:40000
    },
    {
      empId:101,empName:"Nix Tom",empSalary:43000
    },
    {
      empId:102,empName:"Gop Tims",empSalary:50000
    },
    {
      empId:103,empName:"Mill Samson",empSalary:55000
    }
  ]
  user:string=""

  constructor(private ds:DataService){
    this.user = this.ds.loginUsername
  }
}
