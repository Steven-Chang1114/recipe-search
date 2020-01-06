import axios from "axios"

export default class Recipe{
    constructor(id){
        this.id = id
    }

    async getRecipe(){
        try{
            const res = await axios(`https://forkify-api.herokuapp.com/api/get?rId=${this.id}`);
            this.title = res.data.recipe.title;
            this.publisher = res.data.recipe.publisher;
            this.img = res.data.recipe.image_url;
            this.url = res.data.recipe.source_url;
            this.ingredients = res.data.recipe.ingredients;
        } catch(error){
            console.log(error)
            alert('Went wrong')
        }  
    } 

    calcTime(){
        this.time = this.ingredients.length * 5
    }

    calcServing(){
        this.serving = 4
    }

    parseIngredients(){
        const unitLong = ['tablespoons', 'tablespoon', 'ounces', 'ounce', 'teaspoons', 'teaspoon', 'cups', 'pounds']
        const unitShort = ['tbsp', 'tbsp', 'oz', 'oz', 'tsp', 'tsp', 'cup', 'pound']
        const units = [...unitShort, 'kg', 'g ']

        const newIngredients = this.ingredients.map(el => {

            let ingredient = el.toLowerCase()

            unitLong.forEach((cur, i) => {
                ingredient = ingredient.replace(cur, unitShort[i])
            })

            ingredient = ingredient.replace(/ *\([^)]*\) */g, " ")

            const array = ingredient.split(' ')

            //For each of the element in an array, find the index of that element that includes in unitShort
            const unitIndex = array.findIndex(el => units.includes(el))

            let finalObj
            if(unitIndex > -1){
                //There is a unit
                const arrCount = array.slice(0, unitIndex) 
                
                let count;
                if (arrCount.length == 1){
                    count = eval(arrCount[0].replace('-', '+'))
                }else{
                    count = eval(arrCount.join('+'))
                }

                finalObj = {
                    count,
                    unit: array[unitIndex],
                    ingredient: array.slice(unitIndex + 1).join(" ")
                }

            }else if(parseInt(array[0], 10)){
                //There is no unit but a number
                finalObj = {
                    count: parseInt(array[0], 10),
                    unit: '',
                    ingredient: array.slice(1).join(' ')
                }
            }else{
                //No number or unit
                finalObj = {
                    count: 1,
                    unit: '',
                    ingredient
                }
            }

            return finalObj
        })

        this.ingredients = newIngredients
    }
} 