import { Injectable } from '@angular/core';
import {BehaviorSubject, of, throwError} from 'rxjs/index';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {

  /**
   * Observable of Errors
   * Contains all the errors received through the handleError function.
   * By subscribing to it, you will be able to manage errors.
   * {BehaviorSubject<any>}
   */
  public errors$: BehaviorSubject<{ operation: string, error?: HttpErrorResponse }[]> = new BehaviorSubject(null);

  /**
   * List of errors.
   * {Array}
   */
  private errors: { operation: string, error?: HttpErrorResponse }[] = [];

  constructor() {
  }

  /**
   * HandleError function.
   * This function updates the and error list (errors) and the
   * errors$ observable with the error received in parameter.
   * It also returns an Observable with the result to return in case of failure.
   * Note that this parameter is optional.
   * Parameters:
   * {HttpErrorResponse} error
   * {string} operation
   * {T} result
   * returns {Observable<T>}
   */
  handleError<T>(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');
  }

  /**
   * ClearErrors function.
   * This function clears the error list and the observable.
   */
  clearErrors() {
    this.errors = [];
    this.errors$.next(null);
  }
}
