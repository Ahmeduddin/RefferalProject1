import { Component, OnInit } from '@angular/core';
import { UserService } from '../../Services/user.service';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';


@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  name: string;
  email: string;
  password: string;
  isRefferal: Boolean = false;
  refferal: string;

  constructor(private userService: UserService) { }

  ngOnInit() {
  }

 generateRandomNumber() {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  
    for (var i = 0; i < 5; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));
  
    return text;
  }

  AddRefferal() {
    this.isRefferal = !this.isRefferal;
  }

  AddUser() {
    const payload = {
      name: this.name,
      email: this.email,
      password: this.password,
      refferal_id: this.generateRandomNumber(),
      isRefferal: false
    }
    if(this.isRefferal) {
      console.log('already contained refferal id')
      payload.refferal_id = this.refferal;
      payload.isRefferal = true;
    }
    this.userService.SignUp(payload);
  }

}
