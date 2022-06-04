import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { EmployeeService } from 'src/app/services/employee.service';
import{ActivatedRoute, Router} from '@angular/router';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.css']
})
export class CreateEmployeeComponent implements OnInit {
  crearEmpleado: FormGroup;
  submitted = false;
  titulo = 'Agregar Empleado';
  loading = false;
  id: string | null;
  
  
  constructor(private fb: FormBuilder,
              private _employeeService: EmployeeService,
              private router: Router,
              private toastr: ToastrService,
              private aRoute:ActivatedRoute) {
    this.crearEmpleado = this.fb.group({ 
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      documento: ['', Validators.required],
      salario: ['', Validators.required],
    })
    this.id = this.aRoute.snapshot.paramMap.get('id');
    console.log(this.id);
  }

  ngOnInit(): void {
    this.Editar();
  }

  agregarEditarEmpleado(){
    this.submitted = true;
    if (this.crearEmpleado.invalid) {
      return;
    }
    if(this.id===null){ 
      
      this.agregarEmpleado();
    }else{
      this.editarEmpleado(this.id);
    }
  }

  agregarEmpleado(){
    
    const empleado: any ={
      nombre: this.crearEmpleado.value.nombre,
      apellido: this.crearEmpleado.value.apellido,
      documento: this.crearEmpleado.value.documento,
      salario: this.crearEmpleado.value.salario,
      fechaCreacion: new Date(),
      fechaActualizacion: new Date(),
    }
    this.loading = true;
    this._employeeService.agregarEmpleado(empleado).then(() => {
      this.toastr.success('Empleado agregado correctamente', 'Registro exitoso',{
        positionClass:'toast-center-center'
      });
      this.loading = false;
      this.router.navigate(['/lista-empleados']);
    }).catch(error => {
      console.log(error);
      this.loading = false;
    })
  }

  editarEmpleado(id:string){
    const empleado: any ={
      nombre: this.crearEmpleado.value.nombre,
      apellido: this.crearEmpleado.value.apellido,
      documento: this.crearEmpleado.value.documento,
      salario: this.crearEmpleado.value.salario,
      fechaActualizacion: new Date()
    }
    this.loading = true;
    this._employeeService.actualizarEmpleado(id, empleado).then(()=>{
      this.loading = false;
      this.toastr.info('Empleado actualizado correctamente', 'Actualización exitosa',{
        positionClass:'toast-center-center'
      })
      this.router.navigate(['/lista-empleados']);
    })
  }

  Editar(){
    if(this.id!=null){
      this.loading = true;
      this._employeeService.getEmpleado(this.id).subscribe(data => {
        this.titulo = 'Actualizar Datos';
        this.loading = false;
        console.log(data.payload.data()['nombre']);
        this.crearEmpleado.setValue({
          nombre: data.payload.data()['nombre'],
          apellido: data.payload.data()['apellido'],
          documento: data.payload.data()['documento'],
          salario: data.payload.data()['salario'],
        })
    })
  }
}}
