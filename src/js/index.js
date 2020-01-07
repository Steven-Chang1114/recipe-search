// Global app controller
import searchModel from "./model/Search"
import recipeModel from "./model/Recipe"
import listModel from "./model/List"
import likeModel from "./model/Like"
import {DOMstring, loader, clearLoader} from "./view/base"
import * as searchView from "./view/searchView"
import * as recipeView from './view/recipeView'
import * as listView from './view/listView'
import * as likeView from './view/likeView'



const state  = {
    //Search object
    //Shopping list
    //Current page
    //Current recipe
    //Like 
    //Serving
}
window.state = state


//Search controller

const ctrlSearch = async () => {

    const searchRes = searchView.getInput()

    if (searchRes){

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
     
    }
}

DOMstring.resultPage.addEventListener('click', e => {

    const btn = e.target.closest('.btn-inline')
    console.log(btn)

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

            state.recipe.calcTime()
            state.recipe.calcServing()
            state.recipe.parseIngredients()

            clearLoader()
            recipeView.showRecipe(state.recipe, state.likes.isLiked(id))

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
        state.recipe.updateServing('dec')
        recipeView.updateRecipe(state.recipe)

    }else if(e.target.matches('.btn-inc, .btn-inc *')){
         
        state.recipe.updateServing('inc')
        recipeView.updateRecipe(state.recipe)

    }else if(e.target.matches('.toShop, .toShop *')){
        controlList()
    }else if(e.target.matches('.recipe__love, .recipe__love *')){
        controlLike()
    }
})

//List Controller
DOMstring.shopping.addEventListener('click', e => {
    const id = e.target.closest('.shopping__item').dataset.id

    if(e.target.matches('.shopping__delete, .shopping__delete *')) {
        state.list.deleteItem();

        listView.deleteItem(id)
    }else if (e.target.matches('.shopping-value') && e.target.value > 0) {

        const val = parseFloat(e.target.value) 
        state.list.updateCount(id, val)
        
    }
})

const controlList = () => {

    if(!state.list) state.list = new listModel();

    state.recipe.ingredients.forEach(cur => {
        
        const item = state.list.addItem(cur.count, cur.unit, cur.ingredient)
        
        listView.renderList(item)
    })
}

//Likes Controller
window.addEventListener('load', () => {
    state.likes = new likeModel()

    state.likes.readData();
     
    likeView.likeMenu(state.likes.getNumOfLikes())

    state.likes.likes.forEach(el => {
        likeView.renderLike(el)
    })
         
    
})

const controlLike = () => {
    if (!state.likes) state.likes = new likeModel();
    const id = state.recipe.id

    if (!state.likes.isLiked(id)){
        //Change CSS
        likeView.toggleLike(true)
        //Add to list
        const newLike = state.likes.addLike(id, state.recipe.title, state.recipe.publisher, state.recipe.img)
        //Render
        likeView.renderLike(newLike)
        console.log(state.likes)

    }else{
        //Change CSS
        likeView.toggleLike(false)
        //Remove from list
        state.likes.deleteLike(id)
        //Remove from view List
        likeView.deleteRenderLike(id)
        console.log(state.likes)
    }
    likeView.likeMenu(state.likes.getNumOfLikes())
}
