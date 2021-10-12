import * as ActionTypes from './ActionTypes';


export const Dishes = (state= {isLoading : true , errmess : null, dishes :[]} ,action) =>{
    switch(action.type){
        case ActionTypes.ADD_DISHES:
            return {...state, isLoading : false ,errmess: null, dishes:action.payload};      

        case ActionTypes.DISHES_LOADING:                //if i receive the dishes loading action => set loading to true
            return {...state, isLoading : true ,errmess: null, dishes:[]}; 

        case ActionTypes.DISHES_FAILED:
            return {...state, isLoading : false ,errmess: action.payload, dishes:[]}; 

        default:
            return state;
    }
}