import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, map, catchError, of } from 'rxjs';
import { environment } from '../../environments/environment';
import { GeminiResponse } from '../models/gemini-response.model';

@Injectable({
  providedIn: 'root'
})
export class GeminiService {
  private http = inject(HttpClient);

  sendMessage(prompt: string): Observable<string> {
    const url = `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=${environment.geminiApiKey}`;

    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    const body = {
      contents: [{
        parts: [{ text: "test" }]
      }]
    };

    return this.http.post<GeminiResponse>(url, body, { headers }).pipe(
      map(res => res.candidates[0].content.parts[0].text),
      catchError(err => {
        return of("Erreur: " + err.status);
      })
    );
  }
}
