import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { UserItem } from './UserItem';

@Injectable({ providedIn: 'root' })
export class CrudServiceService {
  constructor(private http: HttpClient) { }


  getAllUsers(): Observable<UserItem[]> {
    return this.http.get<UserItem[]>('http://localhost:3000/user/api/');
  }

  insertUser(newUser: UserItem): Observable<UserItem> {
    return this.http.post<UserItem>('http://localhost:3000/user/api/', newUser);
  }

  // since we don't need to wait for the delete to happen, not using observable
  deleteUser(_id: Number) {
    return this.http.delete('http://localhost:3000/user/api/' + _id);
  }

  updateUser(_id: Number, updatedUser: UserItem): Observable<void> {
    return this.http.put<void>('http://localhost:3000/user/api/' + _id, updatedUser);
  }

}

