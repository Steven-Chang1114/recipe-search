// Global app controller
import searchModel from "./model/Search"
import {DOMstring, loader, clearLoader} from "./view/base"
import * as searchView from "./view/searchView"

const state  = {
    //Search object
    //Shopping list
    //Current page
    //Current recipe
    //Like 
    //Serving
}

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

DOMstring.searchForm.addEventListener('submit', e => {
    e.preventDefault();
    ctrlSearch();
})

/**
OR

document.querySelector('.search__btn').addEventListener('click', e => {
    e.preventDefault();
    ctrlSearch();
    console.log(e)
})
 */