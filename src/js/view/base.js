export const DOMstring = {
    searchInput: document.querySelector('.search__field'),
    searchForm: document.querySelector('.search'),
    resultList: document.querySelector('.results__list'),
    result: document.querySelector('.results'),
    resultPage: document.querySelector('.results__pages'),
    recipePage: document.querySelector('.recipe')
} 

export const loader = parent => {
    const loader = `
        <div class = "loader">
            <svg>
                <use href = "img/icons.svg#icon-cw"></use>
            </svg>
        </div>
    `

    parent.insertAdjacentHTML('afterbegin', loader)
}

export const clearLoader = () => {
    const loader = document.querySelector('.loader')

    if(loader){
        loader.parentNode.removeChild(loader)
    }

}
    