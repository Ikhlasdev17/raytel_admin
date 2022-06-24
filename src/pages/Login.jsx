import { Button, Form, Input, message } from 'antd'
import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { baseURL } from '../assets/api/api';

const Login = () => {
    const [user, setUser] = useState({
        email: '',
        password: ''
    });
    const navigate = useNavigate()
    // submit
    const handleSubmit = () => {
        axios.post(`${baseURL}/api/login`, user)
        .then(res => {
            navigate('/', { replace: true })
            message.success("Xush kelibsiz!")
            localStorage.setItem('token', res.data.token)
            window.location.reload()
        })
        .catch(err => {
            message.error("Parol yoki email notog'ri!")
        })
    }

  return (
    <div className='login flex items-center w-full h-screen justify-center'>
        <div className='bg-white rounded-lg shadow-lg p-4 w-30% sm:w-full sm:m-2'>
            <h1 className='text-center text-2xl text-gray-txt-color'>Kirish</h1>
        <Form layout='vertical'>
            <Form.Item label="Email kiriting">
                <Input type={'email'} required placeholder="example@example.com" onChange={(e) => setUser({...user, email: e.target.value})} />
            </Form.Item>
            <Form.Item label="Parol kiriting">
                <Input.Password required placeholder="123456789" onChange={(e) => setUser({...user, password: e.target.value})} />
            </Form.Item>
            <Form.Item>
                <Button type='primary' onClick={handleSubmit} htmlType={'submit'} className="w-full">
                    Kirish
                </Button>
            </Form.Item>
        </Form>
        </div>

    </div>
  )
}

export default Login