import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Navigate, useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { signin } from '../redux/apiCalls'


const SignIn = () => {

    const dispatch = useDispatch()
    const message = useSelector(state => state.auth.message)
    const initPath = useSelector(state => state.auth.initPath)
    const [isLoading, setIsLoading] = useState(false)
    const [userInput, setUserInput] = useState()

    const handleSignIn = () => {
        setIsLoading(true)
        signin(dispatch, userInput).then(() => setIsLoading(false))
    }
    


    return (
        localStorage.getItem("user") ? <Navigate to={initPath} /> :
            <Wrapper>
                <div className="sign-in">
                    <h1>ĐĂNG NHẬP</h1>
                    <input placeholder="Tên đăng nhập" onKeyPress={(event) => {
                        if (event.key === 'Enter') {
                            handleSignIn()
                        }
                    }} onChange={(e) => setUserInput({ ...userInput, username: e.target.value })} />
                    <input placeholder="Mật khẩu" type="password" onChange={(e) => setUserInput({ ...userInput, password: e.target.value })} />
                    {
                        message !== "" && <p>Tên đăng nhập hoặc mật khẩu không chính xác!</p>
                    }
                    <button onClick={handleSignIn} disabled={isLoading}>Đăng nhập</button>
                </div>
            </Wrapper>

    )
}

export default SignIn

const Wrapper = styled.div`
    background-color: var(--secondary-bg);
    width: 100% ;
    height: 100vh ;
    display: flex;
    justify-content: center;
    align-items: center;
    
    .sign-in{
        width: 600px;
        height:450px;
        background: #fff;
        border-radius: 8px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        padding: 40px;
    }

    h1{
        margin-bottom: 60px;
    }

    input{
        width:100%;
        padding: 14px 16px;
        border: var(--primary-bg) 1px solid;
        border-radius: 12px;
        margin-bottom: 24px;
    }
    p{
        width: 100% ;
        margin-bottom: 24px;
        float: left;
        color: red;
    }
    button{
        border: none;
        background: var(--primary-color);
        color:#fff;
        width: 100% ;
        border-radius: 12px;
        padding: 14px 16px;
        text-transform: uppercase;
        font-weight: 700;
        cursor: pointer;

        :disabled{
            opacity: 0.8;
            cursor: not-allowed;
        }
    }
`