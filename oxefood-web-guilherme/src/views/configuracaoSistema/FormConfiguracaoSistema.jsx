import React, { useState, useEffect } from "react";
import axios from "axios";
import InputMask from 'react-input-mask';
import { Button, Container, Divider, Form, Icon } from 'semantic-ui-react';
import MenuSistema from "../../MenuSistema";
import { Link, useLocation } from "react-router-dom";
import { notifyError, notifySuccess } from '../../views/util/Util';

export default function FormConfiguracaoSistema() {
    const [nomeEmpresa, setNomeEmpresa] = useState('');
    const [cnpj, setCnpj] = useState('');
    const [site, setSite] = useState('');
    const [emailContato, setEmailContato] = useState('');
    const [tempoMinimoAgendamentoPedidos, setTempoMinimoAgendamentoPedidos] = useState('');
    const [dataEntradaSistema, setDataEntradaSistema] = useState('');
    const { state } = useLocation();
    const [idConfiguracaoSistema, setIdConfiguracaoSistema] = useState(null);

    useEffect(() => {
        if (state?.id) {
            axios.get(`http://localhost:8080/api/configuracaosistema/${state.id}`)
                .then((response) => {
                    const data = response.data;
                    setIdConfiguracaoSistema(data.id);
                    setNomeEmpresa(data.nomeEmpresa);
                    setCnpj(data.cnpj);
                    setSite(data.site);
                    setEmailContato(data.emailContato);
                    setTempoMinimoAgendamentoPedidos(data.tempoMinimoAgendamentoPedidos);
                    setDataEntradaSistema(formatarData(data.dataEntradaSistema));
                })
                .catch((error) => {
                    console.error("Erro ao buscar configuração do sistema:", error);
                });
        }
    }, [state]);

    const salvar = () => {
        const configuracaoSistemaRequest = {
            nomeEmpresa : nomeEmpresa,
            cnpj : cnpj,
            site : site,
            emailContato : emailContato,
            tempoMinimoAgendamentoPedidos : tempoMinimoAgendamentoPedidos,
            dataEntradaSistema : dataEntradaSistema
        };

        if (idConfiguracaoSistema != null) { 
            axios.put("http://localhost:8080/api/configuracaosistema" + idConfiguracaoSistema, configuracaoSistemaRequest)
            .then((response) => { notifySuccess('Configuração alterada com sucesso.') })
            .catch((error) => { if (error.response.data.errors != undefined) {
                for (let i = 0; i < error.response.data.errors.length; i++) {
                    notifyError(error.response.data.errors[i].defaultMessage)
             }
     } else {
         notifyError(error.response.data.message)
     }
        })
        } else { 
            axios.post("http://localhost:8080/api/configuracaosistema", configuracaoSistemaRequest)
            .then((response) => { notifySuccess('Configuração cadastrada com sucesso.') })
            .catch((error) => {if (error.response.data.errors != undefined) {
                for (let i = 0; i < error.response.data.errors.length; i++) {
                    notifyError(error.response.data.errors[i].defaultMessage)
             }
     } else {
         notifyError(error.response.data.message)
     }
  })
        }
    };

    

    function formatarData(dataParam) {
        if (dataParam === null || dataParam === '' || dataParam === undefined) {
            return '';
        }
        let arrayData = dataParam.split('-');
        return arrayData[2] + '/' + arrayData[1] + '/' + arrayData[0];
    };

    return (
        <div>
            <MenuSistema tela="configuracao" />
            <div style={{ marginTop: '3%' }}>
                <Container textAlign="justified">
                    <h2>
                        <span style={{ color: 'darkgray' }}>
                            Configuração&nbsp;
                            <Icon name="angle double right" size="small" />
                        </span>
                        {idConfiguracaoSistema ? "Alteração" : "Cadastro"}
                    </h2>
                    <Divider />
                    <div style={{ marginTop: '4%' }}>
                        <Form>
                            <Form.Group widths="equal">
                                <Form.Input
                                    required
                                    fluid
                                    label="Nome da Empresa"
                                    maxLength="100"
                                    value={nomeEmpresa}
                                    onChange={e => setNomeEmpresa(e.target.value)}
                                />
                                <Form.Input required fluid label="CNPJ">
                                    <InputMask
                                        required
                                        value={cnpj}
                                        mask="99.999.999/9999-99"
                                        onChange={e => setCnpj(e.target.value)}
                                    />
                                </Form.Input>
                            </Form.Group>
                            <Form.Group>
                                <Form.Input fluid label="Data Entrada Sistema" width={4}>
                                    <InputMask
                                        mask="99/99/9999"
                                        maskChar={null}
                                        placeholder="Ex: 20/03/1985"
                                        value={dataEntradaSistema}
                                        onChange={e => setDataEntradaSistema(e.target.value)}
                                    />
                                </Form.Input>
                                <Form.Input
                                    fluid
                                    label="Site"
                                    width={4}
                                    value={site}
                                    onChange={e => setSite(e.target.value)}
                                />
                                <Form.Input
                                    fluid
                                    label="Tempo Mínimo Agendamento"
                                    width={4}
                                    type="number"
                                    value={tempoMinimoAgendamentoPedidos}
                                    onChange={e => setTempoMinimoAgendamentoPedidos(e.target.value)}
                                />
                                <Form.Input
                                    fluid
                                    label="Email"
                                    width={4}
                                    value={emailContato}
                                    onChange={e => setEmailContato(e.target.value)}
                                />
                            </Form.Group>
                        </Form>
                        <div style={{ marginTop: '4%' }}>
                            <Button
                                type="button"
                                inverted
                                circular
                                icon
                                labelPosition="left"
                                color="orange"
                            >
                                <Icon name="reply" />
                                <Link to="/list-configuracao">Voltar</Link>
                            </Button>
                            <Button
                                inverted
                                circular
                                icon
                                labelPosition="left"
                                color="blue"
                                floated="right"
                                onClick={salvar}
                            >
                                <Icon name="save" />
                                Salvar
                            </Button>
                        </div>
                    </div>
                </Container>
            </div>
        </div>
    );
}
