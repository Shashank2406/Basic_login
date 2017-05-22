import { Component, OnInit } from '@angular/core';
import { FacebookService, InitParams,LoginResponse, LoginOptions} from 'ngx-facebook';
import { LocalStorageService } from 'angular-2-local-storage';
import { PassService } from '../pass.service'
import { Router } from '@angular/router'

declare var cb:any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  title = 'Angular Login Page';
  ap;
  img={gender: "", first_name: "", last_name: "", email: "", id: "",friends: ""};
  frnd;
  result;
  auth;
  tweet=[];
  pa;
  constructor(private router1:Router,private sender:PassService,private fb: FacebookService,private localStorageService: LocalStorageService) {
 
    let initParams: InitParams = {
      appId: '1411172165617274',
      version: 'v2.9'
    };
    fb.init(initParams);
  }
  ngOnInit(){
    //   cb.setConsumerKey("s9P3RckFoHSiTBur0p0ToGgIE", "pvTUIc9L7wlqTGK93n62OAw0cSYZH8oOCt8mAmIUbMwVy5euJO");
    //   cb.__call(
    
    //    "oauth_requestToken",
    //   {oauth_callback: "oob"}//Redirects to enter the pin generated
    // ,(res)=>{
    //   //console.log(res.oauth_token+"I am twitter");
    //   cb.setToken(res.oauth_token, res.oauth_token_secret);
    //   console.log(cb)
    // })
  }
  login() {
    const loginOptions: LoginOptions = {
      enable_profile_selector: true,
      return_scopes: true,
      scope: 'public_profile,user_friends,email,pages_show_list'
    };
    this.fb.login(loginOptions)
      .then((res: LoginResponse) => {
        console.log('Logged in', res);
       // this.data=res.authResponse.userID
        this.localStorageService.set('userID',res.authResponse.userID);
       // this.token=res.authResponse.accessToken;
        this.localStorageService.set('token',res.authResponse.accessToken);
        
      })
      .catch(this.handleError);
     // this.getLoginStatus();

  }
  private handleError(error) {
    console.error('Error processing action', error);
  }
  getLoginStatus() {
    console.log(this.localStorageService.get('userID'));
    console.log(this.localStorageService.get('token'));
    var ID=this.localStorageService.get('userID');
    console.log(ID)
    var oauth=this.localStorageService.get('token');
    this.ap='/'+ID+'/friends'+'/?access_token='+oauth;
    //console.log(oauth)
    console.log(this.ap+"I am API")
    this.fb.api(this.ap).then((response)=>{
        //console.log(response+"second")
        this.frnd=response.summary.total_count; 
        this.img.friends=this.frnd;  
    })
    //API to get more fields 
    this.fb.api('/me?fields=gender,first_name,last_name,email')
      .then((res: any) => {
        //console.log('Got the users profile', res);
        this.img=res;
        console.log(this.img)
        this.sender.set(this.img);
        this.router1.navigate(["/facebook"]);
      })
      .catch(this.handleError);
    // this.fb.api('/me'+'/?access_token='+oauth)
    //   .then((res: any) => {
    //     // console.log('Got the users profile', res);
    //     this.img=res.name;
    //   })
    //   .catch(this.handleError);
    // this.router1.navigate['/facebook'];    
  }

}
