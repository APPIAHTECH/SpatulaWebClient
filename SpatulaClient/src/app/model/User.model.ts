import { UserDataService } from './../shared/UserData.service';
import { Injectable } from '@angular/core';

@Injectable()
export class User{

  public userID:string;
  public email:string;
  public username:string;
  public password:string;
  public passwordTwo:string;
  public registrationType:string;
  public description:string;
  public profileImg:string;
  public validatedAccount:boolean;
  public createdAt:Date;
  public updatedAt:Date;
  public restorPasswordToken : string;

  private userAuthUrlSingup = 'http://localhost:3000/api/auth/singup';
  private userAuthUrlLogin = 'http://localhost:3000/api/auth/login';
  private userAuthUrlResetPassword:string = "http://localhost:3000/api/auth/resetPassword";
  private userAuthUrlRestorPassword:string = "http://localhost:3000/api/auth/restorPassword";
  private userDataUrl:string = "http://localhost:3000/api/user/data";

  constructor(private request:UserDataService){
    this.setEmail("");
    this.setUsername("");
    this.setPassword("");
    this.setPasswordTwo("");
  }

  public setUserID(id:string){this.userID = id}
  public setEmail(email:string){this.email = email}
  public setUsername(username:string){this.username = username}
  public setProfileImg(img:string){this.profileImg = img}
  public setPassword(pass:string){this.password = pass}
  public setPasswordTwo(pass:string){this.passwordTwo = pass}

  public setRestorPasswordToken(token:string){this.restorPasswordToken = token}

  public getUserID(){return this.userID}
  public getEmail(){return this.email}
  public getUsername(){return this.username}
  public getProfileImg(){return this.profileImg}
  public getPassword(){return this.password}
  public getPasswordTwo(){return this.passwordTwo}
  public getValidatedAccount(){return this.validatedAccount}
  public getCreatedAt(){return this.createdAt}
  public getUpdatedAt(){return this.updatedAt}

  public login(user:this , callback):void{

    this.request.post(user.userAuthUrlLogin , user)
      .subscribe(
        response => callback(response),
        error => callback(error)
      );
  }

  public singup(user:this , callback):void{

    this.request.post(user.userAuthUrlSingup , user)
      .subscribe( (response) => {callback(response , null)} , (error)=> {callback(null , error)});
  }

  public resetPassword(user:this , callback):void{
    this.request.post(user.userAuthUrlResetPassword , user)
      .subscribe( (response) => {callback(response , null)} , (error)=> {callback(null , error)});
  }

  public restorPassword(user:this , callback):void{
    this.request.post(user.userAuthUrlRestorPassword , user)
      .subscribe( (response) => {callback(response , null)} , (error)=> {callback(null , error)});
  }

  public getData(token){
    this.request.get(this.userDataUrl , true)
      .subscribe(response =>{
        this.setEmail(response.userData.email);
        this.setUserID(response.userData._id);
        this.setUsername(response.userData.username);
      }, error =>{console.error(error)});
  }

}
