import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Empleado } from '../models/empleado';

@Injectable({
  providedIn: 'root'
})
export class EmpleadoService {
  URL_API = 'http://localhost:3000/api/empleados';

  empleados: Empleado[] = [];

  selectedEmpleado: Empleado = {
    nombre: '',
    cargo: '',
    departamento: '',
    sueldo: 0
  };

  constructor(private http: HttpClient) {}

  getEmpleados() {
    return this.http.get<Empleado[]>(this.URL_API);
  }

  createEmpleado(empleado: Empleado) {
    return this.http.post(this.URL_API + '/registro', empleado);
  }

  deleteEmpleado(id: string) {
    return this.http.delete(this.URL_API + '/' + id);
  }

  updateEmpleado(id: string, empleado: Empleado) {
    return this.http.put(this.URL_API + '/' + id, empleado);
  }

  getEmpleado(id: string) {
    return this.http.get<Empleado>(this.URL_API + '/' + id);
  }
}

