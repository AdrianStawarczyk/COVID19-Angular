import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Ng2GoogleChartsModule } from 'ng2-google-charts';
import { GoogleChartsModule } from 'angular-google-charts';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';
import { CountriesComponent } from './components/countries/countries.component';
import { HttpClientModule } from '@angular/common/http';
import {Compiler, COMPILER_OPTIONS, CompilerFactory} from '@angular/core';
import {JitCompilerFactory} from '@angular/platform-browser-dynamic';
import { DashboardCardComponent } from './components/dashboard-card/dashboard-card.component';
export function createCompiler(compilerFactory: CompilerFactory) {
  return compilerFactory.createCompiler();
}

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    CountriesComponent,
    DashboardCardComponent

  ],
  imports: [
    RouterModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    Ng2GoogleChartsModule,


  ],
  providers: [
    {provide: COMPILER_OPTIONS, useValue: {}, multi: true},
    {provide: CompilerFactory, useClass: JitCompilerFactory, deps: [COMPILER_OPTIONS]},
    {provide: Compiler, useFactory: createCompiler, deps: [CompilerFactory]}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
