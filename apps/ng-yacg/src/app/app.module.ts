import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { GhButtonModule } from '@ctrl/ngx-github-buttons';
import { CodemirrorModule } from '@ctrl/ngx-codemirror';

import { AppComponent } from './app.component';
import { FooterComponent } from './components/misc/footer.component';
import { ResourcesComponent } from './components/misc/resources.component';
import { HeaderComponent } from './components/misc/header.component';
import { InputComponent } from './components/input/input.component';
import { OutputComponent } from './components/output/output.component';

@NgModule({
  declarations: [AppComponent, FooterComponent, ResourcesComponent, HeaderComponent, InputComponent, OutputComponent],
  imports: [BrowserModule, FormsModule, GhButtonModule, CodemirrorModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
