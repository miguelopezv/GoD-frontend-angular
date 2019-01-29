import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { PaginationComponent } from './pagination/pagination.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';


@NgModule({
  imports: [
    CommonModule,
    FontAwesomeModule
  ],
  declarations: [
    FooterComponent,
    HeaderComponent,
    PaginationComponent
  ],
  exports: [FooterComponent,
    HeaderComponent,
    PaginationComponent
  ]
})
export class SharedModule {}
