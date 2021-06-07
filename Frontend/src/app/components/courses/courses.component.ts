import { Component, OnInit } from '@angular/core';
import { RestService } from './../../services/rest.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.sass']
})
export class CoursesComponent implements OnInit {
  public form!: FormGroup
  public courses: Array<any> = []
  public course: Array<any> = []

  constructor(
    private formBuilder: FormBuilder,
    private RestServices: RestService,
  ) { }

  ngOnInit(): void {
    this.getCourse()
    this.initFormCourse()
  }

  initFormCourse(){
    this.form = this.formBuilder.group({
      name: ['', [Validators.required]],
      numeroEstudiantes: ['', [Validators.required]]
    });
  }

  getCourse(): any {
    this.RestServices.get('Courses').subscribe((res: any) => {
      for (const i in res.data) {
        if (Object.prototype.hasOwnProperty.call(res.data, i)) {
          const element = res.data[i];
          this.courses.push(element)
        }
      }
      console.log('respuesta: ' , this.courses)
    })
  }

  addCourse(Course: any){
    this.course = [Course]
  }

  listarCourseUpdate(data: any){
    console.log(data);
    this.form = this.formBuilder.group({
      name: [data.name],
      numeroEstudiantes: [data.numeroEstudiantes]
    });
  }

  refresh(): void {
    window.location.reload();
  }

  send(){
    this.RestServices.post('Courses',this.form.value).subscribe((res: any) => {
      if (res.codStatus == 200) {
        console.log('Si entro al if');
        this.refresh()
      }
    })
  }

  sendUpdate(){
    this.RestServices.put('Courses',this.form.value).subscribe((res: any) => {
      if (res.codStatus == 200) {
        console.log('Si entro al if');
        this.refresh()
      }
    })
  }

  sendDelete(){
    this.RestServices.delete('Courses',{ documents: "1055987654" }).subscribe((res: any) => {
      if (res.codStatus == 200) {
        console.log('Si entro al if');
        this.refresh()
      }
    })
  }

}
