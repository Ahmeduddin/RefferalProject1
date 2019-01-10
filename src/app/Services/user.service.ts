import { Injectable } from '@angular/core';
import {Http} from '@angular/http';
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(public http: Http, public router: Router) { }

  SignUp(payload: any) {
    console.log('payload is ', payload);
    this.http.post('http://localhost:3000/signUp', payload).subscribe((res: any) => {
      console.log('res is  ', res);
      if(res.status == 200){
        this.router.navigate(['/Home'])
      }
      
    })
  }
  
  SignIn(payload) {
    this.http.post('http://localhost:3000/signIn', payload).subscribe((res) => {
      console.log('res is  ', res);
      if(res.status == 200) {
        this.router.navigate(['/Home'])
      }
    })
  }

  Logout() {

  }

}
