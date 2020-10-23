import React, {useState} from "react";
import logoAlt from '../../images/logo-alt.svg'
import {FiArrowLeft} from 'react-icons/fi'
import '../../styles/pages/admin/login.css'

export default function ForgotPassword() {
    const [email, setEmail] = useState('')

    return (
        <div id="login">
            <div className="logo-wrapper">
                <img src={logoAlt} alt="ForgotPassword Page"/>
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
                    <h2>Esqueci a senha</h2>
                    <p>
                        <span>Sua redefinição de senha será enviada</span>
                        <span>para o e-mail cadastrado.</span>
                    </p>

                    <label>
                        <span>E-mail</span>
                        <input className="form-input" name="email"  type="email"
                               value={email}
                               onChange={event => setEmail(event.target.value)}
                        />
                    </label>

                    <button className="submit" type="submit">Enviar</button>
                </form>
            </div>
        </div>
    )
}
