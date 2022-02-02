import { BrowserModule,  } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { routingModule } from './app.routing';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { APP_BASE_HREF } from '@angular/common';

import { AppComponent } from './app.component';
import { UiModule } from './_shared/ui/ui.module';
import { FakeBackendInterceptor } from './_shared/fakebackend';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthGuard } from './_auth/guards/auth.guard';
import { TokenIntercept } from './_auth/tokenintercept';

import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';

import { ItemsModule } from './items/items.module';

import { ItemsService } from './items/_services/items.service';
import { AuthService } from './_auth/services/auth.service';
import { ToastrModule } from 'ngx-toastr';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SharedModule } from './shared/shared.module';
import { SignupComponent } from './signup/signup.component';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    LogoutComponent,
    SignupComponent,
  ],
  imports: [
    BrowserModule,
    UiModule,
    HttpClientModule,
    RouterModule,
    routingModule,
    ReactiveFormsModule,
    FormsModule,
    ItemsModule,
    SharedModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      "closeButton": true,
      "newestOnTop": false,
      "progressBar": false,
      "positionClass": "toast-top-center",
      "preventDuplicates": false,
      "timeOut": 5000,
      "extendedTimeOut": 1000,
    }
    ),
    NgbModule,
  ],
  providers: [
    { provide: APP_BASE_HREF, useValue: '/'},
    AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenIntercept,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: FakeBackendInterceptor,
      multi: true
    },
    AuthService,
    ItemsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
