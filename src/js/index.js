// Global app controller
import searchModel from "./model/Search"
import recipeModel from "./model/Recipe"
import {DOMstring, loader, clearLoader} from "./view/base"
import * as searchView from "./view/searchView"
import * as recipeView from './view/recipeView'


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

        state.recipe = new recipeModel(id)

        try{

            await state.recipe.getRecipe();

            state.recipe.calcTime()
            state.recipe.calcServing()

            console.log(state.recipe)

            recipeView.showRecipe(state.recipe)

        }catch (error ){
            alert("Please input right")
        }
    }
    
}

//window.addEventListener('hashchange', controlRecipe)
//window.addEventListener('load', controlRecipe)
['load', 'hashchange'].forEach(event => window.addEventListener(event, controlRecipe))