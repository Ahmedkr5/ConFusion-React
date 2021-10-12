import { createStore,combineReducers,applyMiddleware } from "redux";
//import { Reducer} from "./reducer";
import { Dishes } from "./dishes";
import { Promotions } from "./promotions";
import { Comments } from "./comments";
import { Leaders } from "./leaders";
import thunk from "redux-thunk";
import logger from "redux-logger";






export const ConfigureStore=()=>{
    const store =createStore(
        combineReducers({
           dishes: Dishes,
           comments: Comments,
           promotions: Promotions,
           leaders: Leaders   
        }),
        applyMiddleware(thunk,logger)  // enhancers of the store
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