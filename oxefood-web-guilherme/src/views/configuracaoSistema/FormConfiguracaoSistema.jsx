import React, { useState, useEffect } from "react";
import axios from "axios";
import InputMask from 'react-input-mask';
import { Button, Container, Divider, Form, Icon } from 'semantic-ui-react';
import MenuSistema from "../../MenuSistema";
import { Link, useLocation } from "react-router-dom";

export default function FormConfiguracaoSistema () {

   const [nomeEmpresa, setnomeEmpresa] = useState();
   const [cnpj, setCnpj] = useState();
   const [site, setSite] = useState();
   const [emailContato, setemailContato] = useState();
   const [tempoMinimoAgendamentoPedidos, settempoMinimoAgendamentoPedidos] = useState();
   const [dataEntradaSistema, setdataEntradaSistema] = useState();
   const { state } = useLocation();
   const [idConfiguracaoSistema, setidConfiguracaoSistema] = useState();

   useEffect(() => {
    if (state != null && state.id != null) {
        axios.get("http://localhost:8080/api/configuracaosistema/" + state.id)
    .then((response) => {
                   setidConfiguracaoSistema(response.data.id)
                   setnomeEmpresa(response.data.nomeEmpresa)
                   setCnpj(response.data.cnpj)
                   setSite(response.data.site)
                   setemailContato(response.data.emailContato)
                   settempoMinimoAgendamentoPedidos(response.data.tempoMinimoAgendamentoPedidos)
                   setdataEntradaSistema(formatarData(response.data.dataEntradaSistema))
    })
}
}, [state])


   function salvar() {

    let configuracaoSistemaRequest = {
         nomeEmpresa: nomeEmpresa,
         cnpj : cnpj,
         site: site,
         emailContato: emailContato,
         tempoMinimoAgendamentoPedidos: tempoMinimoAgendamentoPedidos,
         dataEntradaSistema : dataEntradaSistema
    }

    if (idConfiguracaoSistema != null) { //Alteração:
        axios.put("http://localhost:8080/api/configuracaosistema/" + idConfiguracaoSistema, configuracaoSistemaRequest)
        .then((response) => { console.log('Configuração alterada com sucesso.') })
        .catch((error) => { console.log('Erro ao alter uma Configuração.') })
    } else { //Cadastro:
        axios.post("http://localhost:8080/api/configuracaosistema", configuracaoSistemaRequest)
        .then((response) => { console.log('Configuração cadastrada com sucesso.') })
        .catch((error) => { console.log('Erro ao incluir a Configuração.') })
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

        <MenuSistema tela={'configuracao'} />

            <div style={{marginTop: '3%'}}>

            <Container textAlign='justified' >

                { idConfiguracaoSistema === undefined &&
                    <h2> <span style={{color: 'darkgray'}}> Configuração &nbsp;<Icon name='angle double right' size="small" /> </span> Cadastro</h2>
                }
                { idConfiguracaoSistema != undefined &&
                    <h2> <span style={{color: 'darkgray'}}> Configuração &nbsp;<Icon name='angle double right' size="small" /> </span> Alteração</h2>
                }

            <Divider />

                    <div style={{marginTop: '4%'}}>

                        <Form>

                            <Form.Group widths='equal'>

                                <Form.Input
                                    required
                                    fluid
                                    label='Nome da Empresa'
                                    maxLength="100"
                                    value={nomeEmpresa}
			                        onChange={e => setnomeEmpresa(e.target.value)}

                                />

                                <Form.Input
                                    required
                                    fluid
                                    label='CNPJ'>
                                    <InputMask
                                        required
                                        value={cnpj}
                                        mask="99.999.999/9999-99"
				                        onChange={e => setCnpj(e.target.value)}
                                    /> 
                                </Form.Input>

                            </Form.Group>
                            
                            <Form.Group>


                                <Form.Input
                                    fluid
                                    label='Data Entrada Sistema'
                                    width={4}>
                                    <InputMask 
                                        mask="99/99/9999" 
                                        maskChar={null}
                                        placeholder="Ex: 20/03/1985"
                                        value={dataEntradaSistema}
				                        onChange={e => setdataEntradaSistema(e.target.value)}
                                    /> 
                                </Form.Input>

                                <Form.Input
                                    fluid
                                    label='Site'
                                    width={4}
                                    value={site}
				                    onChange={e => setSite(e.target.value)}
                                >
                                </Form.Input>

                                <Form.Input
                                    fluid
                                    label='Tempo Minimo Agendamento'
                                    width={4}
                                    type="number"
                                    value={tempoMinimoAgendamentoPedidos}
				                    onChange={e => settempoMinimoAgendamentoPedidos(e.target.value)}
                                >
                            
                                </Form.Input>

                                <Form.Input
                                    fluid
                                    label='Email'
                                    width={4}
                                    value={emailContato}
				                    onChange={e => setemailContato(e.target.value)}>
                                    
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
                                <Link to={'/list-configuracao'}>Voltar</Link>
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
