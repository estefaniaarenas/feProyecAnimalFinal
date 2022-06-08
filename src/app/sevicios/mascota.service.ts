import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';

const base_url = environment.url;

@Injectable({
  providedIn: 'root',
})
export class MascotaService {
  constructor(private http: HttpClient) {}

  crearMascota(data: any) {
    return this.http
      .post<any>(base_url + 'mascotas/crearMascota', data, {
        headers: {
          'Content-Type': 'application/json',
          autorizacion: localStorage.getItem('token') || '',
        },
      })
      .pipe(
        map((res: any) => {
          return res;
        })
      );
  }
  listarMascotas() {
    return this.http.get<any>(base_url + 'mascotas/listarMascotas').pipe(
      map((res: any) => {
        return res;
      })
    );
  }
  obtenerPorEspecie(especie: any) {
    return this.http
      .get<any>(base_url + 'mascotas/buscarPorCoincidencia' + especie)
      .pipe(
        map((res: any) => {
          return res;
        })
      );
  }
  actualizarMascota(data: any, id: number) {
    return this.http
      .put<any>(base_url + 'mascotas/actualizarMascota' + id, data)
      .pipe(
        map((res: any) => {
          return res;
        })
      );
  }
  eliminarMascota(_id: string) {
    return this.http.delete(base_url + 'mascotas/eliminarMascota/' + _id);
  }
}
