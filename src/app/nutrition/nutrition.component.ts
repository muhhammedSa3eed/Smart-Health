import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';

interface Recipe {
  recipe_id: string;
  title: string;
  publisher: string;
  image_url: string;
  ingredients?: string[];
}

interface ApiResponse {
  recipes: Recipe[];
}

interface RecipeDetailsResponse {
  recipe: {
    ingredients: string[];
  };
}

@Component({
  selector: 'app-nutrition',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './nutrition.component.html',
  styleUrls: ['./nutrition.component.css'],
})
export class NutritionComponent {
  searchQuery: string = '';
  recipes: Recipe[] = [];
  isLoading: boolean = false;
  error: string | null = null;
  private apiUrl = 'https://forkify-api.herokuapp.com/api/search';
  private recipeDetailsUrl = 'https://forkify-api.herokuapp.com/api/get';

  constructor(private http: HttpClient) {}

  searchRecipes(): void {
    if (!this.searchQuery.trim()) {
      this.error = 'Please enter a search term';
      return;
    }

    this.isLoading = true;
    this.error = null;
    this.recipes = [];

    this.http
      .get<ApiResponse>(`${this.apiUrl}?q=${this.searchQuery}`)
      .subscribe({
        next: (response) => {
          if (response.recipes && response.recipes.length > 0) {
            this.recipes = response.recipes;
            this.fetchIngredientsForRecipes();
          } else {
            this.isLoading = false;
            this.error = 'No recipes found. Try a different search term.';
          }
        },
        error: (err) => {
          this.error = 'Failed to fetch recipes. Please try again.';
          this.isLoading = false;
          console.error('Error fetching recipes:', err);
        },
      });
  }

  private fetchIngredientsForRecipes(): void {
    const promises = this.recipes.map((recipe) =>
      this.http
        .get<RecipeDetailsResponse>(
          `${this.recipeDetailsUrl}?rId=${recipe.recipe_id}`
        )
        .toPromise()
        .then((details) => {
          recipe.ingredients = details?.recipe?.ingredients || [];
          return recipe;
        })
        .catch((err) => {
          console.error('Error fetching recipe details:', err);
          recipe.ingredients = [];
          return recipe;
        })
    );

    Promise.all(promises)
      .then(() => {
        this.isLoading = false;
      })
      .catch((err) => {
        this.isLoading = false;
        console.error('Error fetching ingredients:', err);
      });
  }
}
