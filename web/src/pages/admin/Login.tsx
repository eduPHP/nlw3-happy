import React, {useState} from "react";
import logoAlt from '../../images/logo-alt.svg'
import eye from '../../images/eye-icon.svg'
import closeEye from '../../images/eye-icon-close.svg'
import {FiArrowLeft} from 'react-icons/fi'
import CustomCheckbox from '../../components/Checkbox'
import '../../styles/pages/admin/login.css'

export default function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [remember, setRemember] = useState(false)
    const [showPassword, setShowPassword] = useState(false)

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
                <form className="login-form">
                    <h2>Fazer login</h2>

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

                    <div className="aditionals">
                        <label>
                            <CustomCheckbox checked={remember} value={remember ? 1 : 0} onChange={(event: any) => setRemember(event.target.checked)} type="checkbox" /> Lembrar-me
                        </label>

                        <a href="#hold">Esqueci minha senha</a>
                    </div>

                    <button className="submit" type="submit">Entrar</button>
                </form>
            </div>
        </div>
    )
}
