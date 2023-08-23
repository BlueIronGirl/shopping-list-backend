import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {Observable, throwError} from "rxjs";
import {User} from "../entities/user";
import {catchError, map, tap} from "rxjs/operators";
import {Store} from "@ngrx/store";
import {EinkaufszettelActions} from "../store/einkaufszettel/einkaufszettel.actions";
import jwtDecode, {JwtPayload} from 'jwt-decode';
import {selectLogin} from "../store/einkaufszettel/einkaufszettel.selectors";

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private api = 'http://localhost:8080';

  constructor(private httpClient: HttpClient, private store: Store) {
  }

  private static errorHandler(error: HttpErrorResponse): Observable<never> {
    console.error('Fehler aufgetreten!' + error);
    return throwError(() => error);
  }

  login(user: User) {
    return this.httpClient.post<User>(`${this.api}/auth/login`, user).pipe(
      catchError(LoginService.errorHandler)
    );
  }

  register(user: User) {
    return this.httpClient.post<User>(`${this.api}/auth/register`, user).pipe(
      catchError(LoginService.errorHandler)
    );
  }

  saveLoginStateToLocalStorage(user: User | null) {
    localStorage.setItem('user', JSON.stringify(user));
  }

  getActiveLoginToken(): string {
    let token = '';

    this.store.select(selectLogin).subscribe(user => token = user?.token ? user.token : '');

    return token;
  }

  isLoginStateValid() {
    const userString = localStorage.getItem('user');

    if (userString) {
      const user: User = JSON.parse(userString);

      if (user && user.token) {
        this.store.dispatch(EinkaufszettelActions.loginSuccess({data: user}));
        return this.isTokenNotExpired(this.getExpire(user.token));
      }
    }

    return false;
  }

  private getExpire(token: string): Date {
    const params: JwtPayload = jwtDecode(token);
    if (params.exp) {
      return new Date(params.exp * 1000);
    } else {
      return new Date();
    }
  }

  private isTokenNotExpired(expire: Date | string | undefined): boolean {
    const date: Date | undefined = this.getDateOrStringAsDate(expire);
    return date !== undefined && date.getTime() > new Date().getTime();
  }

  private getDateOrStringAsDate(dateOrString: string | Date | undefined): Date | undefined {
    if (typeof dateOrString === 'string') {
      return new Date(dateOrString);
    } else if (dateOrString) {
      return dateOrString;
    } else {
      return undefined;
    }
  }
}
