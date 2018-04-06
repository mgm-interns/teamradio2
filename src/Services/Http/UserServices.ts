import { Observable } from "rxjs/Observable";
import { HttpServices } from "./HttpServices";

export class UserServices {
  private _httpServices: HttpServices;

  constructor() {
    this._httpServices = new HttpServices();
  }

  public getCurrentUserProfile() {
    return this._httpServices.get('users/me');
  }

  register(user: any): Observable<any> {
    return this._httpServices.post('users/register', user);
  }
}
