import React, { useState, useEffect } from "react";
import axios from "axios";
import InputMask from 'react-input-mask';
import { Button, Container, Divider, Form, Icon } from 'semantic-ui-react';
import MenuSistema from "../../MenuSistema";
import { Link, useLocation } from "react-router-dom";

export default function FormProduto () {

   const [codigo, setCodigo] = useState();
   const [titulo, setTitulo] = useState();
   const [descricao, setDescricao] = useState();
   const [valorUnitario, setvalorUnitario] = useState();
   const [tempoEntregaMinimo, settempoEntregaMinimo] = useState();
   const [tempoEntregaMaximo, settempoEntregaMaximo] = useState();

   const { state } = useLocation();
   const [idProduto, setIdProduto] = useState();

   useEffect(() => {
    if (state != null && state.id != null) {
        axios.get("http://localhost:8080/api/produto/" + state.id)
    .then((response) => {
                   setIdProduto(response.data.id)
                   setCodigo(response.data.codigo)
                   setTitulo(response.data.titulo)
                   setDescricao(response.data.descricao)
                   setvalorUnitario(response.data.valorUnitario)
                   settempoEntregaMinimo(response.data.tempoEntregaMinimo)
                   settempoEntregaMaximo(response.data.tempoEntregaMaximo)
    })
}
}, [state])

   function salvar() {

    let produtoRequest = {
        codigo: codigo,
         titulo: titulo,
         descricao: descricao,
         valorUnitario: valorUnitario,
         tempoEntregaMinimo: tempoEntregaMinimo,
         tempoEntregaMaximo : tempoEntregaMaximo
    }

    if (idProduto !== null) { //Alteração:
        axios.put("http://localhost:8080/api/produto/" + idProduto, produtoRequest)
        .then((response) => { console.log('Produto alterado com sucesso.') })
        .catch((error) => { console.log('Erro ao alter um cliente.') })
    } else { //Cadastro:
        axios.post("http://localhost:8080/api/produto", produtoRequest)
        .then((response) => { console.log('Produto cadastrado com sucesso.') })
        .catch((error) => { console.log('Erro ao incluir o cliente.') })
    }

}

    return (

        <div>

        <MenuSistema tela={'produto'} />

            <div style={{marginTop: '3%'}}>

            <Container textAlign='justified' >

            { idProduto === undefined &&
                <h2> <span style={{color: 'darkgray'}}> Produto &nbsp;<Icon name='angle double right' size="small" /> </span> Cadastro</h2>
            }
            { idProduto != undefined &&
                <h2> <span style={{color: 'darkgray'}}> Produto &nbsp;<Icon name='angle double right' size="small" /> </span> Alteração</h2>
            }

            <Divider />
                    <div style={{marginTop: '4%'}}>

                        <Form>

                            <Form.Group widths='equal'>

                                <Form.Input
                                    required
                                    fluid
                                    label='Codigo'
                                    maxLength="100"
                                    value={codigo}
			                        onChange={e => setCodigo(e.target.value)}

                                />

                                <Form.Input
                                    required
                                    fluid
                                    label='Titulo'
                                    value={titulo}
				                    onChange={e => setTitulo(e.target.value)}>
                                </Form.Input>

                            </Form.Group>
                            
                            <Form.Group>

                                <Form.Input
                                    fluid
                                    label='Descrição'
                                    width={6}
                                    value={descricao}
				                    onChange={e => setDescricao(e.target.value)}>  
                                </Form.Input>

                                <Form.Input
                                    fluid
                                    label='Valor Unitário'
                                    width={6}
                                    value={valorUnitario}
				                    onChange={e => setvalorUnitario(e.target.value)}>
                                </Form.Input>

                                <Form.Input
                                    fluid
                                    label='Tempo de Entrega Mínimo'
                                    type="number"
                                    width={4}
                                    value={tempoEntregaMinimo}
				                    onChange={e => settempoEntregaMinimo(e.target.value)}
                                >
                                 
                                </Form.Input>

                                <Form.Input
                                    fluid
                                    label='Tempo de Entrega Máximo'
                                    type="number"
                                    width={4}
                                    value={tempoEntregaMaximo}
				                    onChange={e => settempoEntregaMaximo(e.target.value)}
                                >
                                
                                </Form.Input>

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
                                <Link to={'/list-produto'}>Voltar</Link>
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

