import React, { useState, useEffect } from "react";
import axios from "axios";
import InputMask from 'react-input-mask';
import { Button, Container, Divider, Form, Icon } from 'semantic-ui-react';
import MenuSistema from "../../MenuSistema";
import { Link, useLocation } from "react-router-dom";

export default function FormEntregador () {

   const [nome, setNome] = useState();
   const [cpf, setCpf] = useState();
   const [rg, setRg] = useState();
   const [dataNascimento, setdataNascimento] = useState();
   const [foneCelular, setfoneCelular] = useState();
   const [qtdEntregasRealizadas, setqtdEntregasRealizadas] = useState();
   const [valorFrete, setvalorFrente] = useState();
   const [enderecoNumero, setenderecoNumero] = useState();
   const [enderecoBairro, setenderecoBairro] = useState();
   const [enderecoCidade, setenderecoCidade] = useState();
   const [enderecoCep, setenderecoCep] = useState();
   const [enderecoUf, setenderecoUf] = useState();
   const { state } = useLocation();
   const [idEntregador, setIdEntregador] = useState();

   useEffect(() => {
    if (state != null && state.id != null) {
        axios.get("http://localhost:8080/api/entregador/" + state.id)
    .then((response) => {
                   setIdEntregador(response.data.id)
                   setNome(response.data.nome)
                   setCpf(response.data.cpf)
                   setRg(response.data.rg)
                   setfoneCelular(response.data.foneCelular)
                   setqtdEntregasRealizadas(response.data.qtdEntregasRealizadas)
                   setdataNascimento(formatarData(response.data.dataNascimento))
                   setvalorFrente(response.data.valorFrete)
                   setenderecoBairro(response.data.enderecoBairro)
                   setenderecoCep(response.data.enderecoCep)
                   setenderecoCidade(response.data.enderecoCidade)
                   setenderecoNumero(response.data.enderecoNumero)
                   setenderecoUf(response.data.enderecoUf)
    })
}
}, [state])


   function salvar() {

    let entregadorRequest = {
        nome: nome,
         cpf: cpf,
         rg: rg,
         dataNascimento: dataNascimento,
         foneCelular: foneCelular,
         qtdEntregasRealizadas : qtdEntregasRealizadas,
         valorFrete : valorFrete,
         enderecoNumero : enderecoNumero,
         enderecoBairro : enderecoBairro,
         enderecoCidade : enderecoCidade,
         enderecoCep : enderecoCep,
         enderecoUf : enderecoUf
    }

    if (idEntregador != null) { //Alteração:
        axios.put("http://localhost:8080/api/entregador/" + idEntregador, entregadorRequest)
        .then((response) => { console.log('Entregador alterado com sucesso.') })
        .catch((error) => { console.log('Erro ao alter um Entregador.') })
    } else { //Cadastro:
        axios.post("http://localhost:8080/api/entregador", entregadorRequest)
        .then((response) => { console.log('Entregador cadastrado com sucesso.') })
        .catch((error) => { console.log('Erro ao incluir o Entregador.') })
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

        <MenuSistema tela={'produto'} />

            <div style={{marginTop: '3%'}}>

            <Container textAlign='justified' >

                { idEntregador === undefined &&
                    <h2> <span style={{color: 'darkgray'}}> Entregador &nbsp;<Icon name='angle double right' size="small" /> </span> Cadastro</h2>
                }
                { idEntregador != undefined &&
                    <h2> <span style={{color: 'darkgray'}}> Entregador &nbsp;<Icon name='angle double right' size="small" /> </span> Alteração</h2>
                }

            <Divider />

                    <div style={{marginTop: '4%'}}>

                        <Form>

                            <Form.Group widths='equal'>

                                <Form.Input
                                    required
                                    fluid
                                    label='Nome'
                                    maxLength="100"
                                    value={nome}
			                        onChange={e => setNome(e.target.value)}

                                />

                                <Form.Input
                                    required
                                    fluid
                                    label='CPF'>
                                    <InputMask
                                        required
                                        value={cpf}
                                        mask="999.999.999-99"
				                        onChange={e => setCpf(e.target.value)}
                                    /> 
                                </Form.Input>

                            </Form.Group>
                            
                            <Form.Group>

                                <Form.Input
                                    fluid
                                    label='RG'
                                    mask="9.999.999"
                                    width={4}>
                                    <InputMask 
                                        value={rg}
				                        onChange={e => setRg(e.target.value)}
                                    /> 
                                </Form.Input>

                                <Form.Input
                                    fluid
                                    label='Data Nascimento'
                                    width={4}>
                                    <InputMask 
                                        mask="99/99/9999" 
                                        maskChar={null}
                                        placeholder="Ex: 20/03/1985"
                                        value={dataNascimento}
				                        onChange={e => setdataNascimento(e.target.value)}
                                    /> 
                                </Form.Input>

                                <Form.Input
                                    fluid
                                    label='Fone Celular'
                                    width={4}
                                >
                                    <InputMask 
                                        mask="(99) 9999.9999"
                                        value={foneCelular}
				                        onChange={e => setfoneCelular(e.target.value)}
                                    /> 
                                </Form.Input>

                                <Form.Input
                                    fluid
                                    label='Quantidade Entregas'
                                    width={4}
                                    type="number"
                                    value={qtdEntregasRealizadas}
				                    onChange={e => setqtdEntregasRealizadas(e.target.value)}
                                >
                            
                                    
                                </Form.Input>

                                <Form.Input
                                    fluid
                                    label='Valor Frete'
                                    width={4}
                                >
                                    <InputMask 
                                        value={valorFrete}
				                        onChange={e => setvalorFrente(e.target.value)}
                                    /> 
                                </Form.Input>

                                <Form.Input
                                    fluid
                                    label='Endereço Numero'
                                    width={4}
                                >
                                    <InputMask 
                                        value={enderecoNumero}
				                        onChange={e => setenderecoNumero(e.target.value)}
                                    /> 
                                </Form.Input>

                                <Form.Input
                                    fluid
                                    label='Endereço Bairro'
                                    width={4}
                                >
                                    <InputMask 
                                        value={enderecoBairro}
				                        onChange={e => setenderecoBairro(e.target.value)}
                                    /> 
                                </Form.Input>

                                <Form.Input
                                    fluid
                                    label='Endereço Cidade'
                                    width={6}
                                >
                                    <InputMask 
                                        value={enderecoCidade}
				                        onChange={e => setenderecoCidade(e.target.value)}
                                    /> 
                                </Form.Input>

                                <Form.Input
                                    fluid
                                    label='Endereço CEP'
                                    width={6}
                                >
                                    <InputMask 
                                        value={enderecoCep}
				                        onChange={e => setenderecoCep(e.target.value)}
                                    /> 
                                </Form.Input>

                                <Form.Input
                                    fluid
                                    label='Endereço UF'
                                    width={6}
                                >
                                    <InputMask 
                                        value={enderecoUf}
				                        onChange={e => setenderecoUf(e.target.value)}
                                    /> 
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
                                <Link to={'/list-entregador'}>Voltar</Link>
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
