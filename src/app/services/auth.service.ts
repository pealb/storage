import { Injectable } from '@angular/core';
import { HttpClient  } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Role, User } from '../models/user.model';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import { makeRandom } from '../utils/random';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private error$: BehaviorSubject<string>;
  private authState$: BehaviorSubject<boolean>;
  private admin$: BehaviorSubject<boolean>;

  constructor(private http: HttpClient, private router: Router) {
    this.error$ = new BehaviorSubject<string>(null);
    this.authState$ = new BehaviorSubject<boolean>(false);
    this.admin$ = new BehaviorSubject<boolean>(false);
    if(localStorage.getItem("user")) {
      const user: User = JSON.parse(localStorage.getItem("user"));
      this.authState$.next(true);
      this.admin$.next(+user.role == Role.ADMIN);
    }
  }
  
  auth(email: string, password: string) {
    this.http.get(environment.api + "users").subscribe((users: User[]) => {
      for(let user of users) {
        if(email == user.email && password == user.password) {
          localStorage.setItem("user", JSON.stringify(user));
          localStorage.setItem("token", makeRandom(20));
          this.authState$.next(true);
          this.admin$.next(user.role == Role.ADMIN);
          this.error$.next(null);
          this.router.navigate(['']);
          return;
        }
      }
      this.error$.next("Hibás email vagy jelszó");
    });
  }
  
  logout() {
    this.authState$.next(false);
    localStorage.clear();
    location.reload();
  }

  get error() {
    return this.error$.asObservable();
  }

  get authState() {
    return this.authState$.asObservable();
  }

  get admin() {
    return this.admin$.asObservable();
  }
}
