import {DOMstring} from "./base"

export const getInput = () => DOMstring.searchInput.value

export const clear = () => {
    DOMstring.searchInput.value = ""
}

export const clearResult = () => {
    DOMstring.resultList.innerHTML = ""
}

export const getList = recipes => {

    for (let element of recipes) {
        toSingleList(element);
    }    

}

const toSingleList = recipe => {

    const html = `
        <li>
            <a class="results__link" href="#${recipe.recipe_id}">
                <figure class="results__fig">
                    <img src="${recipe.image_url}" alt="${recipe.title}">
                </figure>
                <div class="results__data">
                    <h4 class="results__name">${recipe.title}</h4>
                    <p class="results__author">${recipe.publisher}</p>
                </div>
            </a>
        </li>
    `

    DOMstring.resultList.insertAdjacentHTML('beforeend', html)
}