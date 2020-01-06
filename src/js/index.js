// Global app controller
import searchModel from "./model/Search"
import recipeModel from "./model/Recipe"
import listModel from "./model/List"
import {DOMstring, loader, clearLoader} from "./view/base"
import * as searchView from "./view/searchView"
import * as recipeView from './view/recipeView'
import List from "./model/List"


const state  = {
    //Search object
    //Shopping list
    //Current page
    //Current recipe
    //Like 
    //Serving
}


//Search controller

const ctrlSearch = async () => {

    const searchRes = searchView.getInput()

    if (searchRes){

        console.log(`Searching ${searchRes}`)
        state.search = new searchModel(searchRes)

        //Clear the previous result
        searchView.clearResult();
        searchView.clear()

        //Show the loading state
        loader(DOMstring.result)

        //Search the recipe
        await state.search.getResult();

        //Display the result
        clearLoader()
        searchView.getList(state.search.result)

        console.log(state.search.result)
        console.log("Search finish")
     
    }
}

DOMstring.resultPage.addEventListener('click', e => {

    const btn = e.target.closest('.btn-inline')

    if(btn){
        const forward = parseInt(btn.dataset.forward)
        searchView.clearResult()
        searchView.getList(state.search.result, forward)
    }
    
})

/**
document.querySelector('.search__btn').addEventListener('click', e => {
    e.preventDefault();
    ctrlSearch();
    console.log(e)
})

OR
 */

DOMstring.searchForm.addEventListener('submit', e => {
    e.preventDefault();
    ctrlSearch();
})


//Recipe Controller

const controlRecipe = async () => {
    const id = window.location.hash.replace('#', '')
    
    if(id) {
        //Clear old recipe
        recipeView.clearRecipe();

        loader(DOMstring.recipePage)

        if(state.search){
            searchView.highlight(id) 
        }

        state.recipe = new recipeModel(id)

        try{

            await state.recipe.getRecipe();
            console.log(state.recipe.ingredients)

            state.recipe.calcTime()
            state.recipe.calcServing()
            state.recipe.parseIngredients()

            clearLoader()
            recipeView.showRecipe(state.recipe)

        }catch (error ){
            alert(error)
        }
    }
    
}

//window.addEventListener('hashchange', controlRecipe)
//window.addEventListener('load', controlRecipe)
['load', 'hashchange'].forEach(event => window.addEventListener(event, controlRecipe))

DOMstring.recipePage.addEventListener('click', e => {
    if(e.target.matches('.btn-dec, .btn-dec *') && state.recipe.serving > 1){
        console.log('dec')
        state.recipe.updateServing('dec')
        recipeView.updateRecipe(state.recipe)

    }else if(e.target.matches('.btn-inc, .btn-inc *')){
         
        state.recipe.updateServing('inc')
        recipeView.updateRecipe(state.recipe)

    }
    console.log(state.recipe)
})

//List Controller

const l = new List()
window.l = l