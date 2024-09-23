import { Injectable } from '@angular/core';

interface User {
  userName: string;
  password: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor() {}

  authUser(user: User): User | undefined {
    const users = localStorage.getItem('Users');
    const userList: User[] = users ? JSON.parse(users) : [];

    return userList.find(
      (u) => u.userName === user.userName && u.password === user.password
    );
  }
}
