import * as ActionTypes from './ActionTypes';
import { DISHES } from '../shared/dishes';

export const addComment =(dishId, rating, author, comment)=>({
    type: ActionTypes.ADD_COMMENT,
    payload:{
        dishId: dishId,
        rating: rating,
        author: author,
        comment: comment
    }
});


export const fetchDishes=()=>(dispatch) =>{                                 /*fetchdishes is a thunk which returns a function which when called will try to fetch the dishes first by setting the isLoading to "True", 
                                                                                 and so that the spinner can be displayed and after a period of time the dishes are fetched and
                                                                                 then added into the application. So, that is what this fetchDishes is going to show for us.*/
    dispatch(dishesLoading(true));
    setTimeout(()=>{
        dispatch(addDishes(DISHES))
    },2000);
}


export const dishesLoading = () =>({
    type : ActionTypes.DISHES_LOADING
});

export const dishesFailed = (errmess) => ({
    type: ActionTypes.DISHES_FAILED,
    payload: errmess
})

export const addDishes=(dishes)=>({
    type: ActionTypes.ADD_DISHES,
    payload : dishes
})

