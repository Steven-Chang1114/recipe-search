import {DOMstring} from "./base"

export const getInput = () => DOMstring.searchInput.value

export const clear = () => {
    DOMstring.searchInput.value = ""
}

export const clearResult = () => {
    DOMstring.resultList.innerHTML = ""
    DOMstring.resultPage.innerHTML = ''
}

export const getList = (recipes, page = 1, resPerPage = 10) => {
    const start = (page - 1) * resPerPage
    const end = resPerPage * page

    for (let element of recipes.slice(start, end)) {
        toSingleList(element);
    }
    
    renderBtn(page, resPerPage, recipes.length)

}

//Private Function

const createBtn = (page, type) => `

<button class="btn-inline results__btn--${type}" data-forward = ${type == 'prev' ? page - 1 : page + 1}>
    <span>Page ${type == 'prev' ? page - 1 : page + 1}</span>
    <svg class="search__icon">
        <use href="img/icons.svg#icon-triangle-${type == 'prev' ? 'left' : 'right'}"></use>
    </svg>
</button>

`

const renderBtn = (page, resPerPage, totalRes) => {
    const totalPage = Math.ceil(totalRes / resPerPage) 
    let btn;

    if (page == 1 && totalPage > 1) {

        btn = createBtn(page, 'next')

    }else if (page < totalPage){

        btn = `
            ${createBtn(page, 'prev')}
            ${createBtn(page, 'next')}
        `

    }else if (page == totalPage && totalPage > 1){

        btn = createBtn(page, 'prev')

    }

    DOMstring.resultPage.insertAdjacentHTML('afterbegin', btn);

}

const formatString = (string, limit = 20) => {
    let temp = 0
    let newTitle = ''
    let arr = []

    if (string.length > limit){
        arr = string.split(" ")

        arr.forEach(cur => {
            temp += cur.length
            if (temp > limit){
                return newTitle
            }
            newTitle += `${cur} `
            
        })

        return `${newTitle} ...`
    }
    return string

}

const toSingleList = recipe => {

    const html = `
        <li>
            <a class="results__link" href="#${recipe.recipe_id}">
                <figure class="results__fig">
                    <img src="${recipe.image_url}" alt="${recipe.title}">
                </figure>
                <div class="results__data">
                    <h4 class="results__name">${formatString(recipe.title)}</h4>
                    <p class="results__author">${recipe.publisher}</p>
                </div>
            </a>
        </li>
    `

    DOMstring.resultList.insertAdjacentHTML('beforeend', html)
}