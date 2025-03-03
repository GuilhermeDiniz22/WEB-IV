import React from "react";
import { Link } from "react-router-dom";
import { Menu } from "semantic-ui-react";

export default function MenuSistema (props) {

   return(
       <>
           <Menu inverted>
              
               <Menu.Item
                   name='home'
                   active={props.tela === 'home'}
                   as={Link}
                   to='/'
               />

               <Menu.Item
                   name='clientes'
                   active={props.tela === 'cliente'}
                   as={Link}
                   to='/list-cliente'
               />

                <Menu.Item
                   name='novo cliente'
                   active={props.tela === 'cliente'}
                   as={Link}
                   to='/form-cliente'
               />

                <Menu.Item
                   name='produtos'
                   active={props.tela === 'produto'}
                   as={Link}
                   to='/list-produto'
               />

                <Menu.Item
                   name='novo produto'
                   active={props.tela === 'produto'}
                   as={Link}
                   to='/form-produto'
               />

               <Menu.Item
                   name='novo entregador'
                   active={props.tela === 'entregador'}
                   as={Link}
                   to='/form-entregador'
               />

                <Menu.Item
                   name='entregadores'
                   active={props.tela === 'entregador'}
                   as={Link}
                   to='/list-entregador'
               />

                <Menu.Item
                   name='nova configuração'
                   active={props.tela === 'configuracao'}
                   as={Link}
                   to='/form-configuracao'
               />

                <Menu.Item
                   name='configurações'
                   active={props.tela === 'configuracao'}
                   as={Link}
                   to='/list-configuracao'
               />

                <Menu.Item
                   name='novo categoria produto'
                   active={props.tela === 'categoria'}
                   as={Link}
                   to='/form-categoria-produto'
               />

                <Menu.Item
                   name='categorias produto'
                   active={props.tela === 'categoria'}
                   as={Link}
                   to='/list-categoria-produto'
               />

           </Menu>
       </>
   )
}
