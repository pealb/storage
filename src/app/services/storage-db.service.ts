import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { StorageDb } from '../models/storage.model';
import { makeRandom } from '../utils/random';

@Injectable({
  providedIn: 'root'
})
export class StorageDbService {

  constructor(private http: HttpClient) { }

  list(): Observable<StorageDb[]> {
    return this.http.get<StorageDb[]>(`${environment.api}storages`);
  }

  new(storage: StorageDb): Promise<StorageDb> {
    storage.customId = makeRandom(10);
    return this.http.post<StorageDb>(`${environment.api}storages`, storage).toPromise();
  }

  update(storage: StorageDb): Promise<StorageDb> {
    return this.http.put<StorageDb>(`${environment.api}storages/${storage.id}`, storage).toPromise();
  }

  delete(id: number): Promise<StorageDb> {
    return this.http.delete<StorageDb>(`${environment.api}storages/${id}`).toPromise();
  }

  getParams(): Promise<{ width: number, length: number }> {
    return this.http.get<StorageDb[]>(`${environment.api}storages`).pipe(
      map<StorageDb[], { width: number, length: number }>((storages: StorageDb[]) => {
        let width = 0;
        let length = 0;
        for(let storage of storages) {
          width += storage.width;
          length += storage.length;
        }

        return { width: width, length: length }
      })
    ).toPromise();
  }
}
