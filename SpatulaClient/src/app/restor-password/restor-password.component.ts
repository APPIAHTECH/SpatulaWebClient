import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {User} from './../model/User.model';
import { HelperService} from './../shared/helper.service';

@Component({
  selector: 'app-restor-password',
  templateUrl: './restor-password.component.html',
  styleUrls: ['./restor-password.component.css']
})
export class RestorPasswordComponent implements OnInit {

  private token : string;
  private showAlertPassword : boolean;
  private showAlertPassword2 : boolean;
  private passwordNotMathed : boolean;
  private html :string = "";
  private alertMessage : string;
  private expiredToken:boolean;

  constructor(private route: ActivatedRoute , private user:User , private helperService : HelperService) {
    this.showAlertPassword = false;
    this.showAlertPassword2 = false;
    this.passwordNotMathed = false;
    this.expiredToken = false;
    this.alertMessage = "This Filed Is Required";
  }

  ngOnInit() {
    this.route.params.subscribe(params => this.token = params['token']);
  }

  restorPassword(event:any){
    event.preventDefault();
    if(this.valid()){
      this.user.setRestorPasswordToken(this.token);
      this.user.restorPassword(this.user ,(response , error)=>{
        if(error)
          this.html = this.helperService.notify("danger" , "Someting went wrong with the proces , please try it again");

        if(response.invalidToken)
          this.html = this.helperService.notify("danger" , "invalidToken");
        else if(response.tokenExpire){
          this.expiredToken = true;
          this.html = this.helperService.notify("warning" , "Token has expired");
        }else if(response.passwordChanged)
          this.html = this.helperService.notify("success" , "Your password has been successfuly changed");
        else
          this.html = this.helperService.notify("info" , "Your password couldnt change , please try it again");
      });
    }
  }

  valid(){
    if(this.user.getPassword().length <= 0 || this.user.getPassword() === ""){
      this.showAlertPassword = true;
      this.alertMessage = "This Filed Is Required";
      return false;
    }if(this.user.getPasswordTwo().length <= 0 || this.user.getPasswordTwo() === ""){
      this.showAlertPassword2 = true;
      this.alertMessage = "This Filed Is Required";
      return false;
    }else{
      if(this.user.getPassword() === this.user.getPasswordTwo())
        return true;
      else{
        this.passwordNotMathed = true;
        this.alertMessage = "Password dosen't match";
        return false;
      }

    }

  }

}
