import React, {FormEvent, useState} from "react";
import logoAlt from '../../images/logo-alt.svg'
import {FiArrowLeft} from 'react-icons/fi'
import '../../styles/pages/admin/login.css'
import Errors from "../../util/errors";
import {setStateValue} from "../../util/form";
import api from "../../services/api";

export default function ForgotPassword() {
    const [email, setEmail] = useState('')
    const [requested, setRequested] = useState(false)
    const errors = new Errors([])

    function setValue(e: React.ChangeEvent<HTMLInputElement>) {
        const {value, name} = e.currentTarget

        errors.remove(name)
        setEmail(value)
    }

    function requestReset(e: FormEvent) {
        e.preventDefault()

        api.post('/auth/recover', {email}).then(response => {
            setRequested(response.data.sent)
        }).catch(err => errors.record(err.response.data.errors))
    }

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
                {requested ? (
                    <div className="login-form">
                        <h2>E-mail enviado</h2>
                        <p>
                            <span>Um e-mail foi enviado</span>
                            <span>com um link para cadastrar uma nova senha!</span>
                            <span>Acesse seu email e abra o link.</span>
                        </p>
                    </div>
                ) : (
                    <form className="login-form" onSubmit={requestReset}>
                        <h2>Esqueci a senha</h2>
                        <p>
                            <span>Sua redefinição de senha será enviada</span>
                            <span>para o e-mail cadastrado.</span>
                        </p>

                        <label>
                            <span>E-mail</span>
                            <input className="form-input" name="email"  type="email"
                                   value={email}
                                   onChange={setValue}
                            />
                            {errors.print('email')}
                        </label>

                        <button className="submit" type="submit">Enviar</button>
                    </form>
                )}

            </div>
        </div>
    )
}
