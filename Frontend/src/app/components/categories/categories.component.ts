import { Component, OnInit } from '@angular/core';
import { RestService } from './../../services/rest.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.sass']
})
export class CategoriesComponent implements OnInit {
  public form!: FormGroup
  public categories: Array<any> = []
  public category: Array<any> = []  

  constructor(
    private formBuilder: FormBuilder,
    private RestServices: RestService,
  ) { }

  ngOnInit(): void {
    this.getCategory()
    this.initFormCategory()
  }

  initFormCategory(){
    this.form = this.formBuilder.group({
      name: ['', [Validators.required]],
      description: [''],
    });
  }

  getCategory(): any {
    this.RestServices.get('categories').subscribe((res: any) => {
      for (const i in res.data) {
        if (Object.prototype.hasOwnProperty.call(res.data, i)) {
          const element = res.data[i];
          this.categories.push(element)
        }
      }
      console.log('respuesta: ' , this.categories)
    })
  }

  addCategory(Category: any){
    this.category = [Category]
  }

  listarCategoryUpdate(data: any){
    console.log(data);
    this.form = this.formBuilder.group({
      name: [data.name],
      description: [data.description]
    });
  }

  refresh(): void {
    window.location.reload();
  }

  send(){
    this.RestServices.post('categories',this.form.value).subscribe((res: any) => {
      if (res.codStatus == 200) {
        console.log('Si entro al if');
        this.refresh()
      }
    })
  }

  sendUpdate(){
    this.RestServices.put('categories',this.form.value).subscribe((res: any) => {
      if (res.codStatus == 200) {
        console.log('Si entro al if');
        this.refresh()
      }
    })
  }

  sendDelete(){
    this.RestServices.delete('categories',{ documents: "1055987654" }).subscribe((res: any) => {
      if (res.codStatus == 200) {
        console.log('Si entro al if');
        this.refresh()
      }
    })
  }

}
