import { createStore,combineReducers } from "redux";
//import { Reducer} from "./reducer";
import { Dishes } from "./dishes";
import { Promotions } from "./promotions";
import { Comments } from "./comments";
import { Leaders } from "./leaders";


export const ConfigureStore=()=>{
    const store =createStore(
        combineReducers({
           dishes: Dishes,
           comments: Comments,
           promotions: Promotions,
           leaders: Leaders   
        })

    );
    return store;
}










/*
export const ConfigureStore=()=>{
    const store=createStore(
        Reducer,
        initialState
    );
    return store;
}*/