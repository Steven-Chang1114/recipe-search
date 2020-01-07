import {DOMstring} from "./base"
import {formatString} from './searchView'

export const toggleLike = isLiked => {
    const icon = isLiked ? 'icon-heart' : 'icon-heart-outlined'
    document.querySelector('.recipe__love use').setAttribute('href', `img/icons.svg#${icon}`)
}

export const likeMenu = num => {
    DOMstring.like.style.visibility = num > 0 ? 'visible' : 'hidden'
}

export const renderLike = recipe => {
    const html = `
        <li>
        <a class="likes__link" href="#${recipe.id}">
            <figure class="likes__fig">
                <img src="${recipe.img}" alt="${recipe.title}">
            </figure>
            <div class="likes__data">
                <h4 class="likes__name">${formatString(recipe.title)}</h4>
                <p class="likes__author">${recipe.publisher}</p>
            </div>
        </a>
        </li>
    `

    DOMstring.likeList.insertAdjacentHTML('beforeend', html)
}

export const deleteRenderLike = id => {
    const el = document.querySelector(`.likes__link[href = '#${id}']`).parentNode
    el.parentNode.removeChild(el)
}