import React, {FormEvent, useState} from "react";

import logoAlt from '../../images/logo-alt.svg'
import {FiArrowLeft} from 'react-icons/fi'
import eye from "../../images/eye-icon.svg";
import closeEye from '../../images/eye-icon-close.svg'
import '../../styles/pages/admin/login.css'
import {useHistory, useParams} from "react-router-dom";
import api from "../../services/api";
import Errors from "../../util/errors";

interface RouteParams {
    token: string;
}

export default function RedefinePassword() {
    const history = useHistory()
    const params = useParams<RouteParams>()
    const [password, setPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const errors = new Errors([])

    function handlePasswordReset(e: FormEvent) {
        e.preventDefault()

        api.put('auth/recover', {password, token: params.token}).then(res => {
            sessionStorage.setItem('@Happy.user', JSON.stringify(res.data.user))
            sessionStorage.setItem('@Happy.token', res.data.token)
            setPassword('')
            history.push('/orphanages')
        }).catch(err => errors.record(err.response.data.errors))
    }

    return (
        <div id="login">
            <div className="logo-wrapper">
                <img src={logoAlt} alt="Redefine Password Page"/>
                <div className="place">
                    <span className="city">Soledade</span>
                    <span>Rio Grande do Sul</span>
                </div>
            </div>
            <div className="form-wrapper">
                <button className="return" type="button">
                    <FiArrowLeft size={26} color="#15C3D6" />
                </button>
                <form className="login-form" onSubmit={handlePasswordReset}>
                    <h2>Redefinição de senha</h2>
                    <p>
                        <span>Escolha uma nova senha para você</span>
                        <span>acessar o dashboard do Happy.</span>
                    </p>

                    <label>
                        <span>Nova Senha</span>
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

                    <button className="submit" type="submit">Redefinir</button>
                </form>
            </div>
        </div>
    )
}
