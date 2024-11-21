import { createContext, useReducer } from "react";
import { DUMMY_PRODUCTS } from "../dummy-products";
export const CardContext = createContext({
    items: [],
    addItemToCart: () => { },
    onUpdateCartItemQuantity: () => { },
});

function shoppingCartReducer(state, action) {
    if (action.type === 'ADD_ITEM') {
        const updatedItems = [...state.items];

        const existingCartItemIndex = updatedItems.findIndex(
            (cartItem) => cartItem.id === action.payload
        );
        const existingCartItem = updatedItems[existingCartItemIndex];

        if (existingCartItem) {
            const updatedItem = {
                ...existingCartItem,
                quantity: existingCartItem.quantity + 1,
            };
            updatedItems[existingCartItemIndex] = updatedItem;
        } else {
            const product = DUMMY_PRODUCTS.find((product) => product.id === action.payload);
            updatedItems.push({
                id: action.payload,
                name: product.title,
                price: product.price,
                quantity: 1,
            });
        }

        return {
            ...state,
            items: updatedItems,
        };
    }
    else if (action.type === 'UPDATE_ITEM') {
        const updatedItems = [...state.items];
        const updatedItemIndex = updatedItems.findIndex(
            (item) => item.id === action.payload.productId
        );

        const updatedItem = {
            ...updatedItems[updatedItemIndex],
        };

        updatedItem.quantity += action.payload.amount;

        if (updatedItem.quantity <= 0) {
            updatedItems.splice(updatedItemIndex, 1);
        } else {
            updatedItems[updatedItemIndex] = updatedItem;
        }

        return {
            ...state,
            items: updatedItems,
        };

    }

    return state;
}

export default function CardContextProvider({ children }) {
    const [shoppingCartState, shoppingCartDispatch] = useReducer(shoppingCartReducer, { items: [] });

    function handleAddItemToCart(id) {
        shoppingCartDispatch({
            type: 'ADD_ITEM',
            payload: id
        });


    }

    function handleUpdateCartItemQuantity(productId, amount) {
        shoppingCartDispatch({
            type: 'UPDATE_ITEM',
            payload: {
                productId,
                amount,
            },
        });
    }

    const cartContextValue = {
        items: shoppingCartState.items,
        addItemToCart: handleAddItemToCart,
        onUpdateCartItemQuantity: handleUpdateCartItemQuantity,
    };
    return <CardContext.Provider value={cartContextValue}>
        {children}
    </CardContext.Provider>;
}


/*
useReducer Hook code example:

import { useReducer } from 'react';

const initialState = { 
    count: 0
}
const [state, dispatch] = useReducer(reducer, initialState);

const reducer = (state, action) => {
    switch(action.type) {
        case 'increment':
            return { count: state.count + 1 }
        case 'decrement':
            return { count: state.count - 1 }
        default:
            return state
    }
}

dispatch({ type: 'increment' });

Explanation:

useReducer is similar to useState, but it is used for more complex state management and it allows use your own update state logic.
In the above code, useReducer is a hook that is used to manage the state of the application. 
It takes two arguments, the first argument is the reducer function and the second argument is the initial state of the application. 
The reducer function takes two arguments, the current state of the application and the action that is dispatched to the reducer. 
The reducer function returns the new state of the application based on the action that is dispatched to the reducer.

state : contains the current state of the application

dispatch : function to dispatch an action to the reducer. To sum up,a function that is used to update the state of the application. 
when u want to update the state, you call dispatch function with an action object as an argument.
dispatch genellikle type veya identifier gibi object içinde bir key ile birlikte kullanılır(çağrılırkende bu propertye atama yapılır yukarıda örnekteki gibi).
Bu prop yanında da genellikle payload veya id adında bir key ile birlikte veri taşır.

reducer: a callback function that takes the current state and an action as arguments and returns the new state of the application.

*/