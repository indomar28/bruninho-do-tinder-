import React from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { FaTrash, FaEdit } from 'react-icons/fa';
import { toast } from 'react-toastify';
import moment from "moment";

const Table = styled.table`
    width: 100%;
    background-color: #ffffff;
    padding: 20px;
    box-shadow: 0 0 5px #ccc;
    border-radius: 5px;
    max-width: 800px;
    margin: 20px auto;
    word-break: break-all;
`
const Thead = styled.thead``;
const Tbody = styled.tbody``
const Tr = styled.tr``;
const Td = styled.td`
    padding-top: 15px;
    text-align: ${(props) => (props.alignCenter ? "center" : "start")};
    width: ${(props) => (props.width ? props.width : "auto")};

    @media(max-widht: 500px) {
        ${(props) => props.onlyweb && "display: none"}
    }
`;
export const Th = styled.th`
    text-align: start;
    border-bottom: inset;
    padding-bottom: 5px;

    @media(max-widht: 500px) {
        ${(props) => props.onlyweb && "display: none"}
    }
`;
const Grid = ({ users, setUsers, setOnEdit }) => {
    const handleEdit = (item) => {
        setOnEdit(item)
    }
    const handleDelete = async (tar_id) => {
        console.log(tar_id)
        await axios.delete("http://localhost:8800/" + tar_id)
            .then(({ data }) => {
                const newArray = users.filter((user) => user.id !== tar_id)

                setUsers(newArray)
                toast.success(data)
            })
            .catch(({ data }) => toast.error(data))
        setOnEdit(null)
    }
    moment.locale("pt-br")
    const formatadata = (date) => {
        return moment (date).format("DD/MM/YY")
    }
    return (
        <Table>
            <Thead>
                <Tr>
                    <Th>Responsavel</Th>
                    <Th>Tarefa</Th>
                    <Th>Data de finalizacao</Th>
                    <Th></Th>
                    <Th></Th>
                </Tr>
            </Thead>
            <Tbody>
                {users.map((item, i) => (
                    <Tr key={i}>
                        <Td>{item.tar_resp}</Td>
                        <Td>{item.tar_tarefa}</Td>
                        <Td>{formatadata(item.tar_datafinal)}</Td>
                        <Td width="5%"><FaEdit onClick={() => handleEdit(item)} /></Td>
                        <Td width="5%"><FaTrash onClick={() => handleDelete(item.tar_id)} /></Td>
                    </Tr>
                ))}
            </Tbody>
        </Table>
    )
}
export default Grid