import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Password } from './password.interface';

@Injectable({
  providedIn: 'root'
})
export class PasswordService {
  getPassword(id: number) {
    throw new Error('Method not implemented.');
  }
  private apiUrl = 'http://localhost:3000/passwords'; // Represents the API endpoint for passwords

  constructor(private http: HttpClient) { }

  getAllPasswords(): Observable<Password[]> {
    return this.http.get<Password[]>(this.apiUrl); // Retrieves all passwords from the API
  }

  getPasswordById(id: number): Observable<Password> {
    const url = `${this.apiUrl}/${id}`; // Constructs the URL for retrieving a password by ID
    return this.http.get<Password>(url); // Retrieves a password by ID from the API
  }

  addPassword(password: Password): Observable<any> {
    return this.http.post(this.apiUrl, password); // Adds a new password to the API
  }

  updatePassword(id: number, password: Password): Observable<any> {
    const url = `${this.apiUrl}/${id}`; // Constructs the URL for updating a password by ID
    return this.http.put(url, password); // Updates a password by ID in the API
  }

  deletePassword(id: number): Observable<any> {
    const url = `${this.apiUrl}/${id}`; // Constructs the URL for deleting a password by ID
    return this.http.delete(url); // Deletes a password by ID from the API
  }
}
// Comment explanations:
// The code represents a service for managing passwords.
// It imports necessary dependencies from Angular core, including HttpClient and Observable.
// The @Injectable decorator allows the service to be injected as a dependency.
// The apiUrl variable represents the base URL for the passwords API endpoint.
// The constructor injects the HttpClient service for making HTTP requests.
// The getAllPasswords() method retrieves all passwords from the API.
// The getPasswordById() method retrieves a password by its ID from the API.
// The addPassword() method adds a new password to the API.
// The updatePassword() method updates an existing password in the API.
// The deletePassword() method deletes a password by its ID from the API.
// The getPassword() method is not implemented and throws an error.
// Overall, this code provides methods to interact with the passwords API for CRUD operations.