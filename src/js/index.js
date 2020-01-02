// Global app controller
import searchModel from "./model/Search"

const state  = {
    //Search object
    //Shopping list
    //Current page
    //Current recipe
    //Like 
    //Serving
}

const ctrlSearch = async () => {
    const searchRes = 'pizza' //Placeholder

    if (searchRes){

        state.search = new searchModel(searchRes)
        console.log(state);

        //Clear the previous result

        //Show the loading state

        //Search the recipe
        await state.search.getResult();

        //Display the result
        console.log(state.search.result)

    }
}

document.querySelector('.search').addEventListener('submit', e => {
    e.preventDefault();
    ctrlSearch();
    console.log(e)
})

/**
OR

document.querySelector('.search__btn').addEventListener('click', e => {
    e.preventDefault();
    ctrlSearch();
    console.log(e)
})
 */