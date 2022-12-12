import './App.css';
import React from 'react';
import { Button } from './Boton';
import { LabelGroup } from './Label';


const Usuario = {

  nombre: "admin",
  tipo: "administrador",
  correo: "correo",
  contraseña: "contraseña",
  dni: "754470089"

}

/**
 * Informacion Puesto
**/

let objfecha = new Date();
let fecha = objfecha.toLocaleDateString();
let puesto = '123.29.90.02';

const InformacionPuesto = {

  fecha: fecha,
  puesto: puesto

}


function App() {
  
  const [caja , setMoneyCaja] = React.useState( { value: 0 } );

  const [money, setMoney] = React.useState( { value: 0 } );


  const handleChange = (event) => {
    
    let money = event.target.value;
    setMoney({ value: money });
  
  }

  const sendingMoneyDay = () => {
    
    setMoneyCaja({ value : money.value});

    console.log(caja);
  }



  return (
    <React.Fragment>

      <div className='card mb-1'>

        <h3
          className='
        text-xl
        my-3 
        ml-3 
        w-40 
        font-bold
        font-sans
        '>

          Apertura Caja


        </h3>

      </div>

      <div className='
        
        card  
        mx-9 
        mt-2 
        h-full 
        flex-row-reverse
        
        '>

        <div className='w-1/2 mx-10 mt-20 my-20'>
          <img src="https://cdn-icons-png.flaticon.com/512/4223/4223429.png" class="img-fluid rounded-top " alt="logo farmacia" />
        </div>

        <form className='w-1/2 mx-8 mt-10 mb-10  flex-col'>

          <fieldset>

            <LabelGroup value={Usuario.dni} text={"DNI"} />

            <LabelGroup value={Usuario.nombre} text={"Usuario"} />

            <LabelGroup value={InformacionPuesto.puesto} text={"IP Maquina"} />

            <LabelGroup value={InformacionPuesto.fecha} text={"Fecha"} />

            <LabelGroup text={"Efectivo"} onChange={handleChange} />

          </fieldset>

          <div className='mt-2 p-8'>

            <Button text="Aperturar Caja" onClick={sendingMoneyDay} />

          </div>

        </form>



      </div>
    </React.Fragment>
  );
}

export default App;
