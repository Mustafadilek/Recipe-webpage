import { EventEmitter, Injectable } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Recipe } from './recipe.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  recipeChanged= new Subject<Recipe[]>();
 
  private recipes:Recipe[]=[
    new Recipe('A Test Recipe','This is simply a test','https://images.immediate.co.uk/production/volatile/sites/30/2020/08/chorizo-mozarella-gnocchi-bake-cropped-9ab73a3.jpg',
    [new Ingredient('Meat',1),new Ingredient('French Fries',20)]),
    new Recipe('Another Test Recipe','This is simply a test','https://images.immediate.co.uk/production/volatile/sites/30/2020/08/chorizo-mozarella-gnocchi-bake-cropped-9ab73a3.jpg',
    [new Ingredient('Buns',2), new Ingredient('Meat',1)])
  ];

  constructor(private slService:ShoppingListService) { }

   getRecipes(){
    return this.recipes.slice();
   }
   getRecipe(index:number){
    return this.recipes[index];
   }
   addIngredientsToShoppingList(ingredients:Ingredient[]){
         this.slService.addIngredients(ingredients);
   }
   addRecipe(recipe:Recipe){
     this.recipes.push(recipe);
     this.recipeChanged.next(this.recipes.slice())
   }
   updateRecipe(index: number, newRecipe:Recipe){
    this.recipes[index]= newRecipe;
    this.recipeChanged.next(this.recipes.slice())

   }
   deleteRecipe(index:number){
    this.recipes.slice(index,1);
    this.recipeChanged.next(this.recipes.slice());

   }


}
