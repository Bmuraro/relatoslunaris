import React, {useState, useEffect, ChangeEvent} from 'react';
import './Login.css';
import {Grid, Box, Typography, TextField, Button} from '@material-ui/core';
import {Link, useHistory} from 'react-router-dom';
import UserLogin from '../../models/UserLogin';
import {login} from '../../services/Service';
import { useDispatch } from 'react-redux';
import { addToken } from '../../store/user/actions';
import { toast } from 'react-toastify';

function Login() {

    let history = useHistory();
    const dispatch = useDispatch();
    const [token, setToken] =  useState('');
    const [userLogin, setUserLogin] = useState<UserLogin>(
        {
            id: 0,
            usuario: '',
            senha: '',
            token: ''
        })

        function updatedModel(e: ChangeEvent <HTMLInputElement>){

            setUserLogin({
                ...userLogin,
                [e.target.name]: e.target.value
            })
        }
            useEffect(()=>{
                if(token!=''){
                    dispatch(addToken(token))
                    history.push('/home')
                }
            },[token])
        async function onSubmit(e: ChangeEvent <HTMLFormElement>){
            e.preventDefault();
            try{
                await login(`/usuarios/logar`, userLogin, setToken)

                toast.success('Usuário logado com sucesso', {
                    position: "top-right",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: false,
                    theme:"colored",
                    progress: undefined,
                })
            } catch(error){
                toast.error('Dados do usuario inconsistentes. Erro ao logar!', {
                    position: "top-right",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: false,
                    theme:"colored",
                    progress: undefined,
                })

            }

        }

    return(
        <Grid container direction='row' justifyContent='center' alignItems='center'>
            <Grid xs={6}>  
                <Box paddingX={20}>
                    <form onSubmit={onSubmit}>
                        <Typography variant='h3' gutterBottom color='textPrimary' component='h3' align='center' className='texto1'>
                            Entrar
                        </Typography>
                        <TextField
                            value={userLogin.usuario} 
                            onChange={(e: ChangeEvent<HTMLInputElement>)=> updatedModel(e)} 
                          id="usuario"
                          label="usuário"
                          variant='outlined'
                          name='usuario'
                          margin='normal'
                          fullWidth
                        />
                        <TextField
                            value={userLogin.senha} 
                            onChange={(e: ChangeEvent<HTMLInputElement>)=> updatedModel(e)} 
                          id="senha"
                          label="senha"
                          variant='outlined'
                          name='senha'
                          margin='normal'
                          type='password'
                          fullWidth
                        />
                        <Box marginTop={2} textAlign='center'>
                            <Button type='submit' variant='contained' color='secondary'>
                                Logar
                            </Button>
                        </Box>
                    </form>
                    <Box display='flex' justifyContent='center' marginTop={2}>
                        <Box marginRight={1}>
                            <Typography variant='subtitle1' gutterBottom align='center'> 
                                Não tem uma conta?
                            </Typography>
                        </Box>
                        <Link to='/cadastrar' className='text-decorator-none'>
                        <Typography variant='subtitle1' gutterBottom align='center' className='texto1'>
                            Cadastre-se
                        </Typography>
                        </Link>
                    </Box>
                </Box>
             </Grid>
             <Grid xs={6} className='imagem'>

             </Grid>
        </Grid>
    );
}

export default Login;