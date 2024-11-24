import { catchError } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { config } from '../constant/baseApiUrl';
import { ApiResponse } from '../interfaces/auth';
import { handleError } from '../utils/ErrorHandler';
import { Inventory, Recipe } from '../interfaces/recipe';

@Injectable({
  providedIn: 'root',
})
export class RecipeService {
  constructor(private http: HttpClient) {}

  getAllRecipes() {
    return this.http
      .get<ApiResponse<Inventory>>(`${config.baseUrl}/inventory/recipe`)
      .pipe(catchError((error) => handleError(error)));
  }

  updateRecipe(recipeName: string) {
    return this.http
      .get<
        ApiResponse<Recipe>
      >(`${config.baseUrl}/inventory/recipe/${recipeName}`)
      .pipe(catchError((error) => handleError(error)));
  }
}
