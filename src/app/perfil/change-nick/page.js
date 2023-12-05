'use client'

import {useState} from 'react'
import {useForm} from 'react-hook-form'
import axios, * as others from 'axios'
import * as yup from 'yup'
import {yupResolver} from '@hookform/resolvers/yup'
import styles from './page.module.css'

export default function LostAccount () {
    const schema = yup.object({
        nickname: yup.string().required('O apelido precisa ser informado.'),
    });

    const [msg, setMsg] = useState('');
    const [ok, setOk] = useState(false);

    const form = useForm({
        resolver: yupResolver(schema)
    });

    const {register, handleSubmit, formState} = form;

    const {errors} = formState;

    const submit = async (data) => {
        try {
            const response = await axios.post('http://localhost:3001/change-nick', data);

            if(response.status === 200){
                setMsg(response.data);
                
                setOk(true);
            }
        } catch (error) {
            setMsg(error.response.data);

            setOk(false);
        }
    }
    
    return (
        <main className={styles['outro']}>
            <form onSubmit={handleSubmit(submit)} noValidate className={styles['remover-conta']}>
                <h2 className={styles['info']}>Escolha um novo apelido!</h2>

                <label htmlFor='nickname'>Apelido</label>
                <input type='text' id='nickname' {...register('nickname')} />
                <p className={styles['erro']}>{errors.nickname?.message}</p>

                <button className={styles['botao']}>Enviar</button>
            </form>

            <p className={styles['sucesso']} style={{display : ok ? '' : 'none' }}>{msg}</p>

            <p className={styles['erro']} style={{display : ok ? 'none' : '' }}>{msg}</p>
        </main>
    )
}