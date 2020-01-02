import axios from "axios"

export default class Search{
    constructor(search){
        this.search = search
    }

    async getResult(){
        try{
            const res = await axios(`https://forkify-api.herokuapp.com/api/search?&q=${this.search}`);
            this.result = res.data.recipes;
            //console.log(this.result);
        } catch(error){
            console.log(error)
        }  
    } 
} 