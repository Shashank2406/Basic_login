import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { FacebookModule } from 'ngx-facebook';
import { LocalStorageModule } from 'angular-2-local-storage';
import { AppComponent } from './app.component';
import { FacebookComponent } from './facebook/facebook.component';
import { RouterModule,Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { PassService } from './pass.service';
import { LocalStorageService } from 'angular-2-local-storage';

const rou: Routes=[
{path:'' ,component:LoginComponent},
{path:'facebook' ,component:FacebookComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    FacebookComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(rou),
    FacebookModule.forRoot(),
    LocalStorageModule.withConfig({
            prefix: 'my-app',
         //  storageType: 'localStorage'
          storageType: 'sessionStorage'
        })
  ],
  providers: [PassService,LocalStorageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
