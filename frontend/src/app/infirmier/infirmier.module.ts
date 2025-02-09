import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms'; 
import { MatTableModule } from '@angular/material/table';  
import { AddSoinDailogComponent } from './add-soin-dailog/add-soin-dailog.component'; 
import { InfirmierRoutingModule } from './infirmier-routing.module';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    InfirmierRoutingModule,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,  
    MatTableModule,  
    AddSoinDailogComponent,  
  ]
})
export class InfirmierModule { }