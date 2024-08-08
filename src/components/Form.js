import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { toast } from 'react-toastify';

const FormCantainer = styled.form`
    display: flex;
    align-itens: flex-end;
    gap: 10px;
    flex-wrap: wrap;
    background-color: #ffffff;
    padding: 20px;
    box-shadow: 0 0 5px #ccc;
    border-radius: 5px;
`;
const InputArea = styled.div`
    display: flex;
    flex-direction: column;
`;
const Input = styled.input`
    width: 120px;
    padding: 0 10px;
    border: 1px solid #bbb;
    border-radius: 5px;
    height: 40px;
`;
const Label = styled.label`
`;
const Button = styled.button`
    padding: 10px;
    cursor: pointer;
    border-radius: 5px;
    border: none;
    background-color: #2c73d2;
    color: #ffffff;
    heigth: 42px;
`;
const Form = ({ getUsers, onEdit, setOnEdit }) => {
    const ref = useRef()

    useEffect(() => {
        if (onEdit) {
            const user = ref.current
            user.tar_resp.value = onEdit.tar_resp
            user.tar_tarefa.value = onEdit.tar_tarefa
            // const formater = onEdit.tar_datafinal.split('T')[0]
            user.tar_datafinal.value = onEdit.tar_datafinal
        }
    }, [onEdit]);

    const handleSubmit = async (e) => {
        e.preventDefault()
        const user = ref.current
        if (!user.tar_resp.value || !user.tar_tarefa.value) {
            return toast.warn("Preencha")
        }
        try {
            if (onEdit) {
                console.log(onEdit)
                const { data } = await axios.put("http://localhost:8800/" + onEdit.tar_id, {
                    tar_resp: user.tar_resp.value,
                    tar_tarefa: user.tar_tarefa.value,
                    datafinal: user.resp.datafinalalue
                })
                console.log(data)
                toast.success(data)
            } else {
                const { data } = await axios.post("http://localhost:8800", {
                    tar_resp: user.tar_resp.value,
                    tar_tarefa: user.tar_tarefa.value,
                    tar_datafinal: user.tar_resp.datafinalalue
                })
                toast.success(data)
            }
        } catch (erro) {
            toast.error('erro insert')
        }
        user.tar_resp.value = ""
        user.tar_tarefa.value = ""
        user.tar_datafinal.value = ""
        setOnEdit(null)
        getUsers()
    }
    return (
        <FormCantainer ref={ref} onSubmit={handleSubmit}>
            <InputArea>
                <Label>Responsavel</Label>
                <Input name="tar_resp" />
            </InputArea>
            <InputArea>
                <Label>Tarefa</Label>
                <Input name="tar_tarefa" />
            </InputArea>
            <InputArea>
                <Label>Data Final</Label>
                <Input name="tar_datafinal" type="date" />
            </InputArea>
            <Button type="submit">Salvar</Button>
        </FormCantainer>
    );
}

export default Form 