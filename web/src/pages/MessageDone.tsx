import React from "react";
import '../styles/pages/message.css'
import done from '../images/done.svg'
import history from "../routes/history";

export default function MessageDone() {

    function handleDone() {
        history.push('/app')
    }

    return (
        <div id="message" className="green">
            <div className="container">
                <div className="text">
                    <h1>Ebaaa!</h1>
                    <p>
                        <span>O cadastro deu certo e foi enviado</span>
                        <span>ao administrador para ser aprovado.</span>
                        <span>Agora é só esperar :)</span>
                    </p>
                    <button type="button" onClick={handleDone}>Voltar para o mapa</button>
                </div>
                <img src={done} alt="Feito!"/>
            </div>
        </div>
    )
}
