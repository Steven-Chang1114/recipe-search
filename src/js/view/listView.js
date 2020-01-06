import {DOMstring} from "./base"

export const renderList = item => {
     const html = `
        <li class="shopping__item" data-id=${item.id}>
        <div class="shopping__count">
            <input type="number" value="${item.count}" step="${item.count}" class = 'shopping-value' min ='0'>
            <p>${item.unit}</p>
        </div>
        <p class="shopping__description">${item.ingredient}</p>
        <button class="shopping__delete btn-tiny">
            <svg>
                <use href="img/icons.svg#icon-circle-with-cross"></use>
            </svg>
        </button>
        </li>
     `

    DOMstring.shopping.insertAdjacentHTML('beforeend',html)
}

export const deleteItem = id => {
    const item = document.querySelector(`[data-id = "${id}"]`)
    item.parentElement.removeChild(item)
}