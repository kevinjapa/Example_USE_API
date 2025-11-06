import { Component, OnInit, inject } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { EmpleadoService } from '../../services/empleado';
import { Empleado as EmpleadoModel } from '../../models/empleado';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-empleado',
  imports: [FormsModule, HttpClientModule, CommonModule],
  templateUrl: './empleado.html',
  styleUrl: './empleado.css'
})
export class EmpleadoComponent implements OnInit {
  
  // Inyección de dependencias moderna (Angular v14+)
  public empleadoService = inject(EmpleadoService);

  constructor() {}

  ngOnInit(): void {
    this.getEmpleados();
  }

  getEmpleados() {
    this.empleadoService.getEmpleados().subscribe({
      next: (res) => { 
        this.empleadoService.empleados = res; 
      },
      error: (err) => console.error(err)
    });
  }

  addEmpleado(form: NgForm) {
    this.empleadoService.createEmpleado(form.value).subscribe({
      next: (res) => {
        this.getEmpleados();
        form.reset();
      },
      error: (err) => console.error(err)
    });
  }

  deleteEmpleado(id: string) {
    if (confirm('¿Estás seguro de que quieres eliminar este empleado?')) {
      this.empleadoService.deleteEmpleado(id).subscribe({
        next: (res) => {
          this.getEmpleados();
          console.log('Empleado eliminado exitosamente');
        },
        error: (err) => console.error(err)
      });
    }
  }

  editEmpleado(empleado: EmpleadoModel) {
    this.empleadoService.selectedEmpleado = empleado;
  }

  updateEmpleado(form: NgForm) {
    if (this.empleadoService.selectedEmpleado._id) {
      this.empleadoService.updateEmpleado(this.empleadoService.selectedEmpleado._id, form.value).subscribe({
        next: (res) => {
          this.getEmpleados();
          this.resetForm();
        },
        error: (err) => console.error(err)
      });
    }
  }

  resetForm() {
    this.empleadoService.selectedEmpleado = {
      nombre: '',
      cargo: '',
      departamento: '',
      sueldo: 0
    };
  }
}
