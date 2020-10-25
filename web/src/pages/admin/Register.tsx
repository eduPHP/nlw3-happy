import React, {FormEvent, SyntheticEvent, useCallback, useState} from "react";
import logoAlt from '../../images/logo-alt.svg'
import eye from '../../images/eye-icon.svg'
import closeEye from '../../images/eye-icon-close.svg'
import {FiArrowLeft} from 'react-icons/fi'
import '../../styles/pages/admin/login.css'
import api from "../../services/api";
import Errors from '../../util/errors'

interface RefisterForm {
    name: string
    email: string
    password: string
}

export default function Register() {
    const [form, setForm] = useState<RefisterForm>({
        email: '',
        name: '',
        password: '',
    })
    const [showPassword, setShowPassword] = useState(false)
    const errors = new Errors([])

    function setValue(e: React.ChangeEvent<HTMLInputElement>) {
        const {value, name} = e.currentTarget
        errors.remove(name)
        setForm({
            ...form,
            [name]: value
        })
    }

    function handleRegistration(event: FormEvent) {
        event.preventDefault()

        api.post('auth/register', form).then(res => {
            console.log(res.data)
        }).catch(err => errors.record(err.response.data.errors))
    }

    return (
        <div id="login">
            <div className="logo-wrapper">
                <img src={logoAlt} alt="Login Page"/>
                <div className="place">
                    <span className="city">Soledade</span>
                    <span>Rio Grande do Sul</span>
                </div>
            </div>
            <div className="form-wrapper">
                <button className="return" type="button">
                    <FiArrowLeft size={26} color="#15C3D6" />
                </button>
                <form className="login-form" method="POST" onSubmit={handleRegistration}>
                    <h2>Cadastrar</h2>

                    <label>
                        <span>Nome</span>
                        <input className="form-input" name="name"  type="text"
                               value={form.name}
                               onChange={setValue}
                        />
                        {errors.print('name')}
                    </label>
                    <label>
                        <span>E-mail</span>
                        <input className="form-input" name="email"  type="email"
                               value={form.email}
                               onChange={setValue}
                        />
                        {errors.print('email')}
                    </label>
                    <label>
                        <span>Senha</span>
                        <input className="form-input" name="password"
                               type={showPassword ? 'text' : 'password'}
                               value={form.password}
                               onChange={setValue}
                        />
                        <img className="see-password"  alt="Mostrar Senha"
                             src={showPassword ? closeEye : eye}
                             onClick={() => setShowPassword(!showPassword)}
                        />
                        {errors.print('password')}
                    </label>

                    <button className="submit" type="submit">Cadastrar</button>
                </form>
            </div>
        </div>
    )
}
