import axios from "axios";
import InputMask from 'react-input-mask';
import { Button, Container, Divider, Form, Icon } from 'semantic-ui-react';
import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import MenuSistema from "../../MenuSistema";
import { notifyError, notifySuccess } from '../../views/util/Util';

export default function FormCliente () {
 
    const [nome, setNome] = useState('');
    const [cpf, setCpf] = useState('');
    const [dataNascimento, setDataNascimento] = useState('');
    const [foneCelular, setFoneCelular] = useState('');
    const [foneFixo, setFoneFixo] = useState('');

    const [rua, setRua] = useState('');
    const [numero, setNumero] = useState('');
    const [bairro, setBairro] = useState('');
    const [cidade, setCidade] = useState('');
    const [estado, setEstado] = useState('');
    const [cep, setCep] = useState('');
    const [complemento, setComplemento] = useState('');


    const { state } = useLocation();
    const [idCliente, setIdCliente] = useState(null);

    useEffect(() => {
        if (state != null && state.id != null) {
            axios.get("http://localhost:8080/api/cliente/" + state.id)
            .then((response) => {
                const cliente = response.data;
                setIdCliente(cliente.id);
                setNome(cliente.nome);
                setCpf(cliente.cpf);
                setDataNascimento(formatarData(cliente.dataNascimento));
                setFoneCelular(cliente.foneCelular);
                setFoneFixo(cliente.foneFixo);

                
                if (cliente.enderecos && cliente.enderecos[0]) {
                    const endereco = cliente.enderecos[0];  
                    setRua(endereco.rua);
                    setNumero(endereco.numero);
                    setBairro(endereco.bairro);
                    setCidade(endereco.cidade);
                    setEstado(endereco.estado);
                    setCep(endereco.cep);
                    setComplemento(endereco.complemento);
                }
            })
        }
    }, [state]);

   
    function salvar() {
        const enderecoRequest = {
            rua: rua,
            numero: numero,
            bairro: bairro,
            cidade: cidade,
            estado: estado,
            cep: cep,
            complemento: complemento
        };

        const clienteRequest = {
            nome: nome,
            cpf: cpf,
            dataNascimento: dataNascimento,
            foneCelular: foneCelular,
            foneFixo: foneFixo,
            enderecos: [enderecoRequest]  
        };

        if (idCliente != null) { 
            axios.put("http://localhost:8080/api/cliente/" + idCliente, clienteRequest)
            .then((response) => { notifySuccess('Cliente alterado com sucesso.') })
            .catch((error) => { if (error.response.data.errors != undefined) {
                for (let i = 0; i < error.response.data.errors.length; i++) {
                    notifyError(error.response.data.errors[i].defaultMessage)
             }
     } else {
         notifyError(error.response.data.message)
     }
        })
        } else { 
            axios.post("http://localhost:8080/api/cliente", clienteRequest)
            .then((response) => { notifySuccess('Cliente cadastrado com sucesso.') })
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
            return '';
        }
        let arrayData = dataParam.split('-');
        return arrayData[2] + '/' + arrayData[1] + '/' + arrayData[0];
    }

    return (
        <div>
            <MenuSistema tela={'cliente'} />
            <div style={{ marginTop: '3%' }}>
                <Container textAlign='justified'>
                    {idCliente === undefined ? 
                        <h2><span style={{ color: 'darkgray' }}>Cliente <Icon name='angle double right' size="small" /> Cadastro</span></h2> :
                        <h2><span style={{ color: 'darkgray' }}>Cliente <Icon name='angle double right' size="small" /> Alteração</span></h2>
                    }
                    <Divider />
                    <div style={{ marginTop: '4%' }}>
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
                                        mask="999.999.999-99"
                                        value={cpf}
                                        onChange={e => setCpf(e.target.value)}
                                    />
                                </Form.Input>
                            </Form.Group>

                            <Form.Group>
                                <Form.Input
                                    fluid
                                    label='Fone Celular'
                                    width={6}>
                                    <InputMask 
                                        mask="(99) 9999.9999"
                                        value={foneCelular}
                                        onChange={e => setFoneCelular(e.target.value)}
                                    />
                                </Form.Input>

                                <Form.Input
                                    fluid
                                    label='Fone Fixo'
                                    width={6}>
                                    <InputMask 
                                        mask="(99) 9999.9999"
                                        value={foneFixo}
                                        onChange={e => setFoneFixo(e.target.value)}
                                    />
                                </Form.Input>

                                <Form.Input
                                    fluid
                                    label='Data Nascimento'
                                    width={6}>
                                    <InputMask 
                                        mask="99/99/9999"
                                        maskChar={null}
                                        placeholder="Ex: 20/03/1985"
                                        value={dataNascimento}
                                        onChange={e => setDataNascimento(e.target.value)}
                                    />
                                </Form.Input>
                            </Form.Group>

                            <Form.Group widths='equal'>
                                <Form.Input
                                    fluid
                                    label='Rua'
                                    value={rua}
                                    onChange={e => setRua(e.target.value)}
                                />
                                <Form.Input
                                    fluid
                                    label='Número'
                                    value={numero}
                                    onChange={e => setNumero(e.target.value)}
                                />
                            </Form.Group>

                            <Form.Group widths='equal'>
                                <Form.Input
                                    fluid
                                    label='Bairro'
                                    value={bairro}
                                    onChange={e => setBairro(e.target.value)}
                                />
                                <Form.Input
                                    fluid
                                    label='Cidade'
                                    value={cidade}
                                    onChange={e => setCidade(e.target.value)}
                                />
                            </Form.Group>

                            <Form.Group widths='equal'>
                                <Form.Input
                                    fluid
                                    label='Estado'
                                    value={estado}
                                    onChange={e => setEstado(e.target.value)}
                                />
                                <Form.Input
                                    fluid
                                    label='CEP'
                                    value={cep}
                                    onChange={e => setCep(e.target.value)}
                                />
                            </Form.Group>

                            <Form.Input
                                fluid
                                label='Complemento'
                                value={complemento}
                                onChange={e => setComplemento(e.target.value)}
                            />
                        </Form>

                        <div style={{ marginTop: '4%' }}>
                            <Button
                                type="button"
                                inverted
                                circular
                                icon
                                labelPosition='left'
                                color='orange'
                            >
                                <Icon name='reply' />
                                <Link to={'/list-cliente'}>Voltar</Link>
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
