import React from "react";
import '../../styles/pages/message.css'
import imgDelete from '../../images/delete.svg'
import {useHistory} from "react-router-dom";

export default function MessageDelete() {
    const history = useHistory()

    function handleDone() {
        history.push('/app')
    }

    return (
        <div id="message" className="red">
            <div className="container">
                <div className="text">
                    <h1>Excluir!</h1>
                    <p>
                        <span>Você tem certeza que quer</span>
                        <span>excluir Orf. Esperança?</span>
                    </p>
                    <button type="button" onClick={handleDone}>Voltar para o mapa</button>
                </div>
                <img src={imgDelete} alt="Remove!"/>
            </div>
        </div>
    )
}
