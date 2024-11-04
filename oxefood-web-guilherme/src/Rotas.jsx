import React from 'react';
import { Route, Routes } from "react-router-dom";

import FormCliente from './views/cliente/FormCliente';
import Home from './views/home/Home';
import ListCliente from './views/cliente/ListCliente';


function Rotas() {
    return (
        <>
            <Routes>
                <Route path="/" element={ <Home/> } />
                <Route path="form-cliente" element={ <FormCliente/> } />
                <Route path="list-cliente" element={ <ListCliente/> } />
                {/* <Route path="form-produto" element={ <FormProduto/> } /> */}
                {/* <Route path="form-entregador" element={ <FormEntregador/> } /> */}
            </Routes>
        </>
    )
}

export default Rotas
