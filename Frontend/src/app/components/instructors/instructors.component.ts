import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { RestService } from './../../services/rest.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-instructors',
  templateUrl: './instructors.component.html',
  styleUrls: ['./instructors.component.sass']
})
export class InstructorsComponent implements OnInit {
  public instructors: Array<any> = []
  public instructor: Array<any> = []
  public form!: FormGroup

  constructor(
    private formBuilder: FormBuilder,
    private RestServices: RestService,
  ) { }

  ngOnInit(): void {
    this.getInstructor()
    this.initFormInstructor()
  }

  initFormInstructor(){
    this.form = this.formBuilder.group({
      firtsName: ['', [Validators.required]],
      secondName: [''],
      firtsLastname: ['', [Validators.required]],
      secondLastname: ['', [Validators.required]],
      documents: ['', [Validators.required]],
      gender: ['', [Validators.required]],
      areaIdArea: ['', [Validators.required]],
      course: ['', [Validators.required]],
    });
  }

  getInstructor(): any {
    this.RestServices.get('instructors').subscribe((res: any) => {
      for (const i in res.data) {
        if (Object.prototype.hasOwnProperty.call(res.data, i)) {
          const element = res.data[i];
          this.instructors.push(element)
        }
      }
      console.log('respuesta: ' , this.instructors)
    })
  }

  addInstructor(instructor: any){
    this.instructor = [instructor]
  }

  listarInstructorUpdate(data: any){
    console.log(data);
    this.form = this.formBuilder.group({
      firtsName: [data.firtsName],
      secondName: [data.secondName],
      firtsLastname: [data.firtsLastname],
      secondLastname: [data.secondLastname],
      documents: [data.documents],
      gender: [data.gender],
      areaIdArea: [data.areaIdArea],
      course: [data.course],
    });
  }

  refresh(): void {
    window.location.reload();
  }

  send(){
    this.RestServices.post('instructors',this.form.value).subscribe((res: any) => {
      if (res.codStatus == 200) {
        console.log('Si entro al if');
        this.refresh()
      }
    })
  }

  sendUpdate(){
    this.RestServices.put('instructors',this.form.value).subscribe((res: any) => {
      if (res.codStatus == 200) {
        console.log('Si entro al if');
        this.refresh()
      }
    })
  }

  sendDelete(){
    this.RestServices.delete('instructors',{ documents: "1055987654" }).subscribe((res: any) => {
      if (res.codStatus == 200) {
        console.log('Si entro al if');
        this.refresh()
      }
    })
  }

}
