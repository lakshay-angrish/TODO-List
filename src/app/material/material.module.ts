import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatTooltipModule } from '@angular/material/tooltip';
import {MatSelectModule} from '@angular/material/select'; 
import {MatMenuModule} from '@angular/material/menu'; 
import { MatDialogModule } from '@angular/material/dialog';
import {MatDatepickerModule} from '@angular/material/datepicker'; 
import { MatNativeDateModule } from '@angular/material/core';
const material = [
  MatIconModule,
  MatButtonModule,
  MatInputModule,
  MatTooltipModule,
  MatSelectModule,
  MatMenuModule,
  MatDialogModule,
  MatDialogModule,
  MatDatepickerModule,
  MatNativeDateModule
]

@NgModule({
  declarations: [],
  imports: [
    material
  ],
  exports: [
    material
  ]
})
export class MaterialModule { }
