import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { FooterComponent } from './components/footer.component';
import { GhButtonModule } from '@ctrl/ngx-github-buttons';
import { ResourcesComponent } from './components/resources.component';
import { HeaderComponent } from './components/header.component';

@NgModule({
  declarations: [AppComponent, FooterComponent, ResourcesComponent, HeaderComponent],
  imports: [BrowserModule, GhButtonModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
