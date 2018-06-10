import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { environment } from '../../environments/environment';

@Injectable()
export class RestService {

  private host: String = environment.apiHost;

  constructor(private http: HttpClient) { }

  getTemplates<T>(): Observable<T> {
    return this.http.get<T>(this.host + '/getAllTemplates');
  }

  getRecipientsFields<T>(templateId: any): Observable<T> {
    return this.http.get<T>(this.host + '/getRecipients/' + templateId);
  }

  createAndSendEnvelope<T>(payload: any, templateId: any): Observable<T> {
    return this.http.post<T>(this.host + '/envelope/' + templateId, JSON.stringify(payload),
      { headers: {'Content-Type' : 'application/json'} });
  }

  getHistory<T>(): Observable<T> {
    return this.http.get<T>(this.host + '/getAllEnvelopes');
  }

  getEnvelopeEvents<T>(envelopeId: any): Observable<T> {
    return this.http.get<T>(this.host + '/listAuditEvents/' + envelopeId);
  }

}
