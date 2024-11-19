import axios from 'axios';
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button, Container, Divider, Icon, Table, Modal, Header } from 'semantic-ui-react';
import MenuSistema from '../../MenuSistema';

export default function ListConfiguracaoSistema () {

   const [lista, setLista] = useState([]);
   const [openModal, setOpenModal] = useState(false);
   const [idRemover, setIdRemover] = useState();
   const [mostrarTodosCampos, setMostrarTodosCampos] = useState(false); 

   function confirmaRemover(id) {
       setOpenModal(true)
       setIdRemover(id)
   }

   useEffect(() => {
       carregarLista();
   }, [])

   function carregarLista() {
       axios.get("http://localhost:8080/api/configuracaosistema")
       .then((response) => {
           setLista(response.data)
       })
   }

   function formatarData(dataParam) {
       if (dataParam === null || dataParam === '' || dataParam === undefined) {
           return ''
       }

       let arrayData = dataParam.split('-');
       return arrayData[2] + '/' + arrayData[1] + '/' + arrayData[0];
   }

   async function remover() {
       await axios.delete('http://localhost:8080/api/configuracaosistema/' + idRemover)
       .then((response) => {
           console.log('Cliente removido com sucesso.')

           axios.get("http://localhost:8080/api/configuracaosistema")
           .then((response) => {
               setLista(response.data)
           })
       })
       .catch((error) => {
           console.log('Erro ao remover uma configuração.')
       })
       setOpenModal(false)
   }

   return(
       <div>
           <MenuSistema tela={'configuracao'} />
           <div style={{marginTop: '3%'}}>

               <Container textAlign='justified' >
                   <h2> Configurações </h2>
                   <Divider />

                   <div style={{marginTop: '4%'}}>
                       <Button
                           label='Novo'
                           circular
                           color='orange'
                           icon='clipboard outline'
                           floated='right'
                           as={Link}
                           to='/form-configuracao'
                       />
                       <br/><br/><br/>
                       <Button
                           color='red'
                           onClick={() => setMostrarTodosCampos(!mostrarTodosCampos)}
                       >
                           {mostrarTodosCampos ? 'Ocultar' : 'Mostrar Tudo'}
                       </Button>
                       <br/><br/>

                       <Table color='orange' sortable celled>
                           <Table.Header>
                               <Table.Row>
                                   <Table.HeaderCell>Empresa</Table.HeaderCell>
                                   <Table.HeaderCell>CNPJ</Table.HeaderCell>
                                   <Table.HeaderCell>Email</Table.HeaderCell>
                                   {mostrarTodosCampos && (
                                       <>
                                           <Table.HeaderCell>Site</Table.HeaderCell>
                                           <Table.HeaderCell>Tempo Mínimo Agendamento</Table.HeaderCell>
                                           <Table.HeaderCell>Data de Entrada no Sistema</Table.HeaderCell>
                                       </>
                                   )}
                                   <Table.HeaderCell textAlign='center'>Ações</Table.HeaderCell>
                               </Table.Row>
                           </Table.Header>

                           <Table.Body>
                               { lista.map(configuracao => (
                                   <Table.Row key={configuracao.id}>
                                       <Table.Cell>{configuracao.nomeEmpresa}</Table.Cell>
                                       <Table.Cell>{configuracao.cnpj}</Table.Cell>
                                       <Table.Cell>{configuracao.emailContato}</Table.Cell>
                                       
                                       {mostrarTodosCampos && (
                                           <>
                                               <Table.Cell>{configuracao.site}</Table.Cell>
                                               <Table.Cell>{configuracao.tempoMinimoAgendamentoPedidos}</Table.Cell>
                                               <Table.Cell>{formatarData(configuracao.dataEntradaSistema)}</Table.Cell>
                                           </>
                                       )}
                                       <Table.Cell textAlign='center'>
                                           <Button
                                               inverted
                                               circular
                                               color='green'
                                               title='Clique aqui para editar os dados desta configuração'
                                               icon>
                                               <Link to="/form-configuracao" state={{id: configuracao.id}} style={{color: 'green'}}> 
                                                   <Icon name='edit' /> 
                                               </Link>
                                           </Button>
                                           &nbsp;
                                           <Button
                                               inverted
                                               circular
                                               color='red'
                                               title='Clique aqui para remover este cliente'
                                               icon
                                               onClick={e => confirmaRemover(configuracao.id)}>
                                               <Icon name='trash' />
                                           </Button>
                                       </Table.Cell>
                                   </Table.Row>
                               ))}
                           </Table.Body>
                       </Table>
                   </div>
               </Container>
           </div>

           <Modal
               basic
               onClose={() => setOpenModal(false)}
               onOpen={() => setOpenModal(true)}
               open={openModal}
           >
               <Header icon>
                   <Icon name='trash' />
                   <div style={{marginTop: '5%'}}> Tem certeza que deseja remover esse registro? </div>
               </Header>
               <Modal.Actions>
                   <Button basic color='red' inverted onClick={() => setOpenModal(false)}>
                       <Icon name='remove' /> Não
                   </Button>
                   <Button color='green' inverted onClick={() => remover()}>
                       <Icon name='checkmark' /> Sim
                   </Button>
               </Modal.Actions>
           </Modal>

       </div>
   )
}
