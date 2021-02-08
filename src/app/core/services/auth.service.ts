import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';
import { LoginInfo } from '../../store/models/login-info';
import { LoginResult } from '../../store/models/login-result';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private apiUrl = environment.apiUrl;
  constructor(private httpClient: HttpClient) {}

  login(loginInfo: LoginInfo): Observable<LoginResult> {
    return this.httpClient.get<LoginResult>(
      `${this.apiUrl}/user?cpf=${loginInfo.userName}&password=${loginInfo.password}`
    );
  }
}
