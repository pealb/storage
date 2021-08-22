import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Object } from '../models/object.model';

@Injectable({
  providedIn: 'root'
})
export class ObjectDbService {

  constructor(private http: HttpClient) { }

  list(): Observable<Object[]> {
    return this.http.get<Object[]>(`${environment.api}objects`, { });
  }

  new(object: Object): Promise<Object> {
    object.createdAt = new Date();
    return this.http.post<Object>(`${environment.api}objects`, object).toPromise();
  }

  update(object: Object): Promise<Object> {
    return this.http.put<Object>(`${environment.api}objects/${object.id}`, object).toPromise();
  }

  delete(id: number): Promise<Object> {
    return this.http.delete<Object>(`${environment.api}objects/${id}`).toPromise();
  }

  getParams(): Promise<{ width: number, length: number }> {
    return this.http.get<Object[]>(`${environment.api}objects`).pipe(
      map<Object[], { width: number, length: number }>((objects: Object[]) => {
        let width = 0;
        let length = 0;
        for(let object of objects) {
          width += object.width;
          length += object.length;
        }

        return { width: width, length: length }
      })
    ).toPromise()
  }
}
