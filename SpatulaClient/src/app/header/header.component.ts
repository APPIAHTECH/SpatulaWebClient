import { Component, OnInit } from '@angular/core';
import {User} from './../model/User.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  private showLateral : boolean;
  private viewContainer : any;
  constructor(private user : User) {
    this.showLateral = false;
  }

  ngOnInit() {
    window.onload = ()=>
      this.viewContainer = document.querySelector('.view-container');
  }

  triggerLateralNav(){
    if(this.showLateral){

      this.viewContainer.style.width = "100%";
      this.viewContainer.style.height = "100%";
      this.viewContainer.style.position = "static";
      this.showLateral = false;
    }else{

      this.viewContainer.style.width = "80%";
      this.viewContainer.style.height = "100%";
      this.viewContainer.style.position = "absolute";
      this.viewContainer.style.right = "0";

      this.showLateral = true;
    }

  }

}
