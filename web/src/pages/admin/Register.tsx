import React, {FormEvent, useState} from "react";
import logoAlt from '../../images/logo-alt.svg'
import eye from '../../images/eye-icon.svg'
import closeEye from '../../images/eye-icon-close.svg'
import {FiArrowLeft} from 'react-icons/fi'
import '../../styles/pages/admin/login.css'
import api from "../../services/api";

export default function Register() {
    const [email, setEmail] = useState('')
    const [name, setName] = useState('')
    const [password, setPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false)

    function handleRegistration(event: FormEvent) {
        event.preventDefault()

        const user = {
            name,
            email,
            password
        }

        api.post('auth/register', user).then(res => {
            console.log(res.data)
        })
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
                               value={name}
                               onChange={event => setName(event.target.value)}
                        />
                    </label>
                    <label>
                        <span>E-mail</span>
                        <input className="form-input" name="email"  type="email"
                               value={email}
                               onChange={event => setEmail(event.target.value)}
                        />
                    </label>
                    <label>
                        <span>Senha</span>
                        <input className="form-input" name="password"
                               type={showPassword ? 'text' : 'password'}
                               value={password}
                               onChange={event => setPassword(event.target.value)}
                        />
                        <img className="see-password"  alt="Mostrar Senha"
                             src={showPassword ? closeEye : eye}
                             onClick={() => setShowPassword(!showPassword)}
                        />
                    </label>

                    <button className="submit" type="submit">Cadastrar</button>
                </form>
            </div>
        </div>
    )
}
