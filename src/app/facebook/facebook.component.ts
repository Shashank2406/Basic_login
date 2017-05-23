import { Component, OnInit } from '@angular/core';
import { CanActivate ,Router} from '@angular/router';
import { PassService } from '../pass.service'
import { FacebookService} from 'ngx-facebook';
import { LocalStorageService } from 'angular-2-local-storage';


@Component({
  selector: 'app-facebook',
  templateUrl: './facebook.component.html',
  styleUrls: ['./facebook.component.css']
})
export class FacebookComponent implements OnInit {

  constructor(private getter:PassService,private fb: FacebookService,private router1:Router,private localStorageService: LocalStorageService) { }
  data={gender: "", first_name: "", last_name: "", email: "", id: "",friends:"",post:""};
  postdata="";
  ngOnInit() {
   this.data =this.getter.get();
  }
  post(postdata)
  {
   console.log(postdata)
   this.fb.api("/me/feed","post",{"message": postdata})
   .then((res)=>{
     console.log(res);
     alert("Post Successfull")
   })    
  }
  logout()
  {
    this.fb.logout();
    this.localStorageService.clearAll();
    this.router1.navigate(['']);
  }

}
