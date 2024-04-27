import { NgModule } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSortModule} from '@angular/material/sort';
import { MatSlideToggleModule } from '@angular/material/slide-toggle'
import {MatCheckboxModule} from '@angular/material/checkbox';
import {ClipboardModule} from '@angular/cdk/clipboard';
@NgModule({
    exports:[
        MatTableModule,MatPaginatorModule,MatSortModule,MatSlideToggleModule,MatCheckboxModule,ClipboardModule
    ]
})
export class MaterialModule{

}