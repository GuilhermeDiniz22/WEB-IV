import React from 'react';
import { Route, Routes } from "react-router-dom";

import FormCliente from './views/cliente/FormCliente';
import FormProduto from './views/produto/FormProduto';
import FormEntregador from './views/entregador/FormEntregador';
import Home from './views/home/Home';
import ListCliente from './views/cliente/ListCliente';
import { Link } from 'react-router-dom';
import ListProduto from './views/produto/ListProduto';
import ListEntregador from './views/entregador/ListEntregador';
import FormConfiguracaoSistema from './views/configuracaoSistema/FormConfiguracaoSistema';
import ListConfiguracaoSistema from './views/configuracaoSistema/ListConfiguracaoSistema';
import ListCategoriaProduto from './views/categoriaProduto/ListCategoriaProduto';
import FormCategoriaProduto from './views/categoriaProduto/FormCategoriaProduto';


function Rotas() {
    return (
        <>
            <Routes>
                <Route path="/" element={ <Home/> } />
                <Route path="form-cliente" element={ <FormCliente/> } />
                <Route path="list-cliente" element={ <ListCliente/> } />
                <Route path="list-produto" element={ <ListProduto/> } />
                <Route path="list-entregador" element={ <ListEntregador/> } />
                <Route path="form-produto" element={ <FormProduto/> } /> 
                <Route path="form-entregador" element={ <FormEntregador/> } />
                <Route path="form-configuracao" element={ <FormConfiguracaoSistema/> } />
                <Route path="list-configuracao" element={ <ListConfiguracaoSistema/> } />
                <Route path="list-categoria-produto" element={ <ListCategoriaProduto/> } />
                <Route path="form-categoria-produto" element={ <FormCategoriaProduto/> } />
            </Routes>
        </>
    )
}

export default Rotas
