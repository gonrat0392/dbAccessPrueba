import { Component, OnInit } from '@angular/core';
import { RestService } from './../../services/rest.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-areas',
  templateUrl: './areas.component.html',
  styleUrls: ['./areas.component.sass']
})
export class AreasComponent implements OnInit {
  public form!: FormGroup
  public areas: Array<any> = []
  public area: Array<any> = []

  constructor(
    private formBuilder: FormBuilder,
    private RestServices: RestService,
  ) { }

  ngOnInit(): void {
    this.getArea()
    this.initFormArea()
  }

  initFormArea(){
    this.form = this.formBuilder.group({
      name: ['', [Validators.required]],
      description: [''],
    });
  }

  getArea(): any {
    this.RestServices.get('areas').subscribe((res: any) => {
      for (const i in res.data) {
        if (Object.prototype.hasOwnProperty.call(res.data, i)) {
          const element = res.data[i];
          this.areas.push(element)
        }
      }
      console.log('respuesta: ' , this.areas)
    })
  }

  addArea(Area: any){
    this.area = [Area]
  }

  listarAreaUpdate(data: any){
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
    this.RestServices.post('areas',this.form.value).subscribe((res: any) => {
      if (res.codStatus == 200) {
        console.log('Si entro al if');
        this.refresh()
      }
    })
  }

  sendUpdate(){
    this.RestServices.put('areas',this.form.value).subscribe((res: any) => {
      if (res.codStatus == 200) {
        console.log('Si entro al if');
        this.refresh()
      }
    })
  }

  sendDelete(){
    this.RestServices.delete('areas',{ documents: "1055987654" }).subscribe((res: any) => {
      if (res.codStatus == 200) {
        console.log('Si entro al if');
        this.refresh()
      }
    })
  }

}
