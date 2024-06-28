import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { SlidesComponent } from './components/slides/slides.component';
import { BodyComponent } from './components/body/body.component';
import { FormComponent } from './components/form/form.component';
import { FooterComponent } from './components/footer/footer.component';
import { WhatsappComponent } from './components/whatsapp/whatsapp.component';
import { NotfoundComponent } from './components/notfound/notfound.component';

import { DataService } from './services/data.service';
import { ShareModule } from "./share/share.module";


@NgModule({
    declarations: [
        AppComponent,
        HeaderComponent,
        SlidesComponent,
        BodyComponent,
        FormComponent,
        FooterComponent,
        WhatsappComponent,
        NotfoundComponent
    ],
    providers: [DataService],
    bootstrap: [AppComponent],
    imports: [
        BrowserModule,
        HttpClientModule,
        AppRoutingModule,
        CommonModule,
        ShareModule
    ]
})
export class AppModule { }
