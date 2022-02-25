import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { CrackPasswordComponent } from './home/crack-password/crack-password.component';
import { EncryptionComponent } from './home/encryption/encryption.component';
import { MatCardModule } from '@angular/material/card'
import { MatGridListModule } from '@angular/material/grid-list';
import { CrackPasswordDetailsComponent } from './crack-password-details/crack-password-details.component';
import { EncryptionDetailsComponent } from './encryption-details/encryption-details.component';
import { InfoComponent } from './info/info.component';
import { MatMenuModule } from '@angular/material/menu';
import { MatTabsModule } from '@angular/material/tabs';
import { MatIconModule } from '@angular/material/icon';
import { DatabaseComponent } from './home/database/database.component';
import { DatabaseDetailsComponent } from './database-details/database-details.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable, of, Subject } from 'rxjs';
// import { AuthInterceptor } from './auth.interceptor';
// import { JwtInterceptor, ErrorInterceptor, appInitializer } from './_helpers';
// import { AngularFireDatabase } from '@angular/fire/database';
import { environment } from '../environments/environment';


//Firebase
  // import { initializeApp } from 'firebase/app';
  // import { getFirestore } from 'firebase/firestore';
  // import { getDatabase } from 'firebase/database';
  // import { getStorage } from 'firebase/storage';
  // import { getAuth } from 'firebase/auth';
  // import { applicationDefault, initializeApp } from "firebase-admin/app";
  // import { AngularFireModule } from '@angular/fire';

import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAnalyticsModule } from '@angular/fire/compat/analytics';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';


import { provideFirebaseApp, getApp, initializeApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { provideAuth,getAuth } from '@angular/fire/auth';
import { provideAnalytics,getAnalytics,ScreenTrackingService,UserTrackingService } from '@angular/fire/analytics';
import { provideDatabase,getDatabase } from '@angular/fire/database';
import { provideFunctions,getFunctions } from '@angular/fire/functions';
import { provideMessaging,getMessaging } from '@angular/fire/messaging';
import { providePerformance,getPerformance } from '@angular/fire/performance';
import { provideRemoteConfig,getRemoteConfig } from '@angular/fire/remote-config';
import { provideStorage,getStorage } from '@angular/fire/storage';
import * as firebase from 'firebase/compat';


const config = {
    apiKey: "AIzaSyC9HDvYsLV11Zdnl85UKPEL9gfKGGsHsUQ",
    authDomain: "python-application-results.firebaseapp.com",
    databaseURL: "https://python-application-results-default-rtdb.firebaseio.com",
    projectId: "python-application-results",
    storageBucket: "python-application-results.appspot.com",
    messagingSenderId: "666087379078",
    appId: "1:666087379078:web:bdcdddf1f4b14a01aac107",
    measurementId: "G-ND5SH6SFM3"
    // Last two lines may not be completely necessary
}

AngularFireModule.initializeApp(environment.firebase);
// if (!firebase.apps.length) {
//   firebase.initializeApp(config);
// }
// const admin: require("firebase_admin");

// initializeApp({
//     credential: applicationDefault(),
//     databaseURL: "https://python-application-results-default-rtdb.firebaseio.com"
// });



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    PageNotFoundComponent,
    CrackPasswordComponent,
    EncryptionComponent,
    CrackPasswordDetailsComponent,
    EncryptionDetailsComponent,
    InfoComponent,
    DatabaseComponent,
    DatabaseDetailsComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatButtonModule,
    MatExpansionModule,
    MatCardModule,
    MatGridListModule,
    MatMenuModule,
    MatTabsModule,
    MatIconModule,
    HttpClientModule,

    // AngularFireModule.initializeApp(environment.firebase),
    // AngularFireAnalyticsModule,
    // AngularFirestoreModule,

    // provideFirebaseApp(() => initializeApp({})),
    // provideFirestore(() => getFirestore()),
    // provideAnalytics(() => getAnalytics()),
    // provideAuth(() => getAuth()),
    // provideDatabase(() => getDatabase()),
    // provideFunctions(() => getFunctions()),
    // provideMessaging(() => getMessaging()),
    // providePerformance(() => getPerformance()),
    // provideRemoteConfig(() => getRemoteConfig()),
    // provideStorage(() => getStorage()),


  ],
  providers: [


    ScreenTrackingService,UserTrackingService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }


