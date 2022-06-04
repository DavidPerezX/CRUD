import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ToastrService } from 'ngx-toastr';
import {Observable } from 'rxjs';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-list-employees',
  templateUrl: './list-employees.component.html',
  styleUrls: ['./list-employees.component.css']
})
export class ListEmployeesComponent implements OnInit {
  empleados: any[]=[];
  constructor(private _employeeService: EmployeeService,
              private toastr: ToastrService) { 

  }
    

  
  ngOnInit(): void {
    this.getEmpleados();
  }

  getEmpleados(){
    this._employeeService.getEmpleados().subscribe(data => {
      this.empleados = [];
      data.forEach((element:any) => {
      this.empleados.push({
        id: element.payload.doc.id,
        ...element.payload.doc.data()
      })
    });
    console.log(this.empleados);
  });
  }
  eliminarEmpleado(id: string){
    this._employeeService.eliminarEmpleado(id).then(() => {
      console.log('Empleado eliminado');
      this.toastr.error('El empleado fue eliminado','Registro eliminado',{
        positionClass: 'toast-center-center',
      });
    }).catch(error => {
      console.log('Error al eliminar el empleado');
    })

  }
}
