import React from 'react'

const BuscadorProductos = ({ searchValue, setSearchValue, onClick }) => {

    const onSerchValueChange = (event) => {
        setSearchValue(event.target.value);
    }

    return (
        <input
            className='border w-96 ml-1 rounded-sm py-1 px-1'
            placeholder='Busca un producto'
            value={searchValue}
            onChange={onSerchValueChange}
            onClick={onClick}
            type={'text'}
        />
    )
}

export { BuscadorProductos }