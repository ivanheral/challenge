import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "environments/environment";

@Injectable({
  providedIn: "root",
})
export class GenericService {
  constructor(private http: HttpClient) {}

  handleError(): Array<unknown> {
    return [];
  }

  async get(path: string): Promise<unknown> {
    return await this.http
      .get<Array<unknown>>(`${environment.apiUrl}/${path}`)
      .toPromise()
      .catch(this.handleError);
  }

  async post(path: string, data: unknown): Promise<void> {
    const headers = { "content-type": "application/json" };
    const body = JSON.stringify(data);

    await this.http
      .post(`${environment.apiUrl}${path}`, body, { headers: headers })
      .toPromise()
      .catch(this.handleError);
  }

  async put(path: string, data: unknown): Promise<void> {
    const headers = { "content-type": "application/json" };
    const body = JSON.stringify(data);

    await this.http
      .put(`${environment.apiUrl}/${path}`, body, { headers: headers })
      .toPromise()
      .catch(this.handleError);
  }

  async delete(path: string): Promise<void> {
    await this.http
      .delete(`${environment.apiUrl}/${path}`)
      .toPromise()
      .catch(this.handleError);
  }
}
