import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface Recipe {
  id: string;
  title: string;
  publisher: string;
  image_url: string;
}

interface ApiResponse {
  recipes: Recipe[];
}

@Injectable({
  providedIn: 'root',
})
export class NutritionService {
  private apiUrl = 'https://forkify-api.herokuapp.com/api/search';

  constructor(private http: HttpClient) {}

  searchRecipes(query: string): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(`${this.apiUrl}?q=${query}`);
  }
}
