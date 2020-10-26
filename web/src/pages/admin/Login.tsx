import React, {FormEvent, useContext, useEffect, useState} from "react";
import logoAlt from '../../images/logo-alt.svg'
import eye from '../../images/eye-icon.svg'
import closeEye from '../../images/eye-icon-close.svg'
import {FiArrowLeft} from 'react-icons/fi'
import CustomCheckbox from '../../components/Checkbox'
import '../../styles/pages/admin/login.css'
import {setStateValue} from "../../util/form";
import {Link} from "react-router-dom";
import {AppContext} from "../../contexts/app";
import {LoginForm} from "../../contexts/hooks/useAuth";
import history from "../../routes/history";

let initialState = {
    email: '',
    password: '',
    remember: false
};

export default function Login() {
    const {handleLogin, auth, errors} = useContext(AppContext)
    const [form, setForm] = useState<LoginForm>(initialState)
    const [showPassword, setShowPassword] = useState(false)

    useEffect(() => {
        if (auth) history.push('/admin/orphanages')
    }, [])

    function setValue(e: React.ChangeEvent<HTMLInputElement>) {
        setStateValue(e, form, setForm, errors)
    }

    async function login(event: FormEvent) {
        event.preventDefault()

        const result = await handleLogin(form)

        if (result === true) {
            setForm(initialState)
            history.push('/admin/orphanages')
        } else {
            errors.record(result)
        }
    }

    function handleBack() {
        history.push('/')
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
                <button className="return" onClick={handleBack}>
                    <FiArrowLeft size={26} color="#15C3D6" />
                </button>
                <form className="login-form" onSubmit={login}>
                    <h2>Fazer login</h2>

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

                    <div className="aditionals">
                        <label>
                            <CustomCheckbox
                                name="remember"
                                checked={form.remember}
                                onChange={setValue}
                            /> Lembrar-me
                        </label>

                        <Link to="/admin/forgot">Esqueci minha senha</Link>
                    </div>

                    <button className="submit" type="submit">Entrar</button>
                </form>
            </div>
        </div>
    )
}
