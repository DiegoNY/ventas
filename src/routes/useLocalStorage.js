import React from 'react';

/**
 * @function useLocalStorage esta funcion crear en memoria del cliente el item que se inserte 
 * @param {*} itemName nombre del item 
 * @param {*} initialValue 
 * @returns 
 */

function useLocalStorage(itemName, initialValue) {

    /**
     * Local storage cuenta con 3 estados  @error : seae  @loading @item 
     */

    const [error, setError] = React.useState(false);
    const [loading, setLoading] = React.useState(true);
    const [item, setItem] = React.useState(initialValue);


    React.useEffect(() => {

        try {

            const localStorageItem = localStorage.getItem(itemName);

            let parseItem;

            if (!localStorageItem) {

                localStorageItem.setItem(itemName, JSON.stringify(initialValue));

                parseItem = initialValue

            } else {

                parseItem = JSON.parse(localStorageItem);

            }

            setItem(parseItem);
            setLoading(false);

        } catch (error) {

            setError(error);

        }

    }, [])


    const saveItem = (newItem) => {

        try {

            const stringifyItem = JSON.stringify(newItem);
            localStorage.setItem(itemName, stringifyItem);
            
            setItem(newItem);


        } catch (error) {
            setError(error);
        }

    }


    return {

        item,
        saveItem,   
        loading,
        error
    
    }

}

export {useLocalStorage};