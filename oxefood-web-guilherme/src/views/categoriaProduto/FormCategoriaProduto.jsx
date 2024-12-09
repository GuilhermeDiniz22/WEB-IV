import axios from "axios";
import InputMask from 'react-input-mask';
import { Button, Container, Divider, Form, Icon } from 'semantic-ui-react';
import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import MenuSistema from "../../MenuSistema";
import { notifyError, notifySuccess } from '../../views/util/Util';

export default function FormCategoriaProduto () {

   const [descricao, setDescricao] = useState();

   const { state } = useLocation();
   const [idCategoria, setIdCategoria] = useState();

        useEffect(() => {
                    if (state != null && state.id != null) {

                        axios.get("http://localhost:8080/api/categoria-produto/" + state.id)
                        .then((response) => {
                                                    setIdCategoria(response.data.id)
                                                    setDescricao(response.data.descricao)
                                        })
                                    }
                            }, [state])



   function salvar() {

    let catProdutoRequest = {
        descricao : descricao
    }
    console.log(catProdutoRequest)

    if (idCategoria != null) { 
        axios.put("http://localhost:8080/api/categoria-produto" + idCategoria, catProdutoRequest)
        .then((response) => { notifySuccess('Categoria alterada com sucesso.') })
        .catch((error) => { if (error.response.data.errors != undefined) {
            for (let i = 0; i < error.response.data.errors.length; i++) {
                notifyError(error.response.data.errors[i].defaultMessage)
         }
 } else {
     notifyError(error.response.data.message)
 }
    })
    } else { 
        axios.post("http://localhost:8080/api/categoria-produto", catProdutoRequest)
        .then((response) => { notifySuccess('Categoria cadastrada com sucesso.') })
        .catch((error) => {if (error.response.data.errors != undefined) {
            for (let i = 0; i < error.response.data.errors.length; i++) {
                notifyError(error.response.data.errors[i].defaultMessage)
         }
 } else {
     notifyError(error.response.data.message)
 }
})
    }
}

function formatarData(dataParam) {

    if (dataParam === null || dataParam === '' || dataParam === undefined) {
        return ''
    }

    let arrayData = dataParam.split('-');
    return arrayData[2] + '/' + arrayData[1] + '/' + arrayData[0];
}



    return (

        <div>

        <MenuSistema tela={'categoria'} />

            <div style={{marginTop: '3%'}}>

            <Container textAlign='justified' >

                { idCategoria === undefined &&
                    <h2> <span style={{color: 'darkgray'}}> Categoria &nbsp;<Icon name='angle double right' size="small" /> </span> Cadastro</h2>
                }
                { idCategoria != undefined &&
                    <h2> <span style={{color: 'darkgray'}}> Categoria &nbsp;<Icon name='angle double right' size="small" /> </span> Alteração</h2>
                }

            <Divider />


                    <div style={{marginTop: '4%'}}>

                        <Form>

                            <Form.Group widths='equal'>

                                <Form.Input
                                    required
                                    fluid
                                    label='Descrição'
                                    maxLength="100"
                                    value={descricao}
			                        onChange={e => setDescricao(e.target.value)}

                                />
                                </Form.Group>
                        
                        </Form>
                        
                        <div style={{marginTop: '4%'}}>

                            <Button
                                type="button"
                                inverted
                                circular
                                icon
                                labelPosition='left'
                                color='orange'
                            >
                            <Icon name='reply' />
                                <Link to={'/list-categoria-produto'}>Voltar</Link>
                            </Button>
                                
                            <Button
                                inverted
                                circular
                                icon
                                labelPosition='left'
                                color='blue'
                                floated='right'
                                onClick={() => salvar()}
                            >
                                <Icon name='save' />
                                Salvar
                            </Button>

                        </div>

                    </div>
                    
                </Container>
            </div>
        </div>

    );

}
