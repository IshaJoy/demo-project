import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserSchema } from '../Models/userSchema';
import { Observable } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class DataService {

  loginUsername:string=""

   SERVER_URL:string='http://localhost:3000'

  constructor(private http:HttpClient) { }

  addUserAPI(user:UserSchema){
    return this.http.post(`${this.SERVER_URL}/users`,user)
   }

   getAllUserAPI(){
    return this.http.get(`${this.SERVER_URL}/users`)
   }

  //  getSingleUserAPI(id: string): Observable<any> {
  //   return this.http.get(`${this.SERVER_URL}/users/${id}`);
  // }

  // updateUserAPI(id: string, user: any): Observable<any> {
  //   return this.http.put(`${this.SERVER_URL}/users/${id}`, user);
  // }

  // getSingleUserAPI(id: string): Observable<UserSchema> {
  //   return this.http.get<UserSchema>(`${this.SERVER_URL}/users/${id}`);
  // }

   getSingleUserAPI(id:string){
    return this.http.get(`${this.SERVER_URL}/users/${id}`)

   }
   
   updateUserAPI(userId:string,userDetails:UserSchema){
    return this.http.put(`${this.SERVER_URL}/users/${userId}`,userDetails)

   }
   removeUserAPI(userId:string){
    return this.http.delete(`${this.SERVER_URL}/users/${userId}`)
   }

   


  }