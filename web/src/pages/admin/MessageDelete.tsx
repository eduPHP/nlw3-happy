import React, {SetStateAction} from 'react'

import imgDelete from '../../images/delete.svg'
import '../../styles/pages/message.css'
import api from '../../services/api'

interface ComponentProps {
    orphanage: {
        id: number
        name: string
    }
    setRemove: SetStateAction<any>
}

export default function MessageDelete(props: ComponentProps) {
    function handleConfirm() {
        api.delete(`admin/orphanages/${props.orphanage.id}`).then(() => {
            props.setRemove(true)
        })
    }

    return (
        <div id="message" className="red">
            <div className="container">
                <div className="text">
                    <h1>Excluir!</h1>
                    <p>
                        <span>Você tem certeza que quer</span>
                        <span>excluir {props.orphanage.name}?</span>
                    </p>
                    <div className="buttons">
                        <button type="button" className="cancel" onClick={() => props.setRemove(false)}>Cancelar</button>
                        <button type="button" className="remove" onClick={handleConfirm}>Continuar</button>
                    </div>
                </div>
                <img src={imgDelete} alt="Remove!"/>
            </div>
        </div>
    )
}
