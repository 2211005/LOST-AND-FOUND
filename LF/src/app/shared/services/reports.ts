// src/app/shared/services/reports.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Report } from '../models/report.model';
import { AuthService } from './auth';

@Injectable({
  providedIn: 'root',
})
export class ReportsService {
  private readonly baseUrl = '/api/reports'; // <-- va al backend vía proxy

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) {}

  private withAuth() {
  const token = this.authService.getToken();
  if (!token) return {};
  return {
    headers: new HttpHeaders().set('Authorization', `Bearer ${token}`),
  };
}

  // GET /api/reports?search=&type=
  getReports(search?: string, type?: 'lost' | 'found'): Observable<Report[]> {
    let params = new HttpParams();

    if (search) {
      params = params.set('search', search);
    }

    if (type) {
      params = params.set('type', type);
    }

    return this.http.get<Report[]>(this.baseUrl, { params });
  }

  // GET /api/reports/:id
  getReport(id: string): Observable<Report> {
    return this.http.get<Report>(`${this.baseUrl}/${id}`);
  }

  // POST /api/reports
  createReport(report: Report): Observable<Report> {
    return this.http.post<Report>(this.baseUrl, report);
  }

  // PATCH /api/reports/:id/status
  
  updateStatus(id: string, status: Report['status']) {
  return this.http.patch<Report>(
    `${this.baseUrl}/${id}/status`,
    { status },
    this.withAuth()   // 👈 importante
  );
}


  // PATCH /api/reports/:id/delivery
  registerDelivery(id: string, payload: { deliveredTo: string; evidencePhotoUrl?: string; notes?: string }) {
  return this.http.patch<Report>(
    `${this.baseUrl}/${id}/delivery`,
    payload,
    this.withAuth()   // 👈 también aquí
  );
}

  // DELETE /api/reports/:id
 deleteReport(id: string) {
  return this.http.delete<{ message: string }>(`/api/reports/${id}`);
}


}
