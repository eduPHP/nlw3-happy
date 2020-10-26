import React from 'react'
import mapMarkerImg from "../images/map-marker.svg";
import {FiArrowLeft} from "react-icons/fi";
import '../styles/components/sidebar.css'
import marker from "../images/map-marker.svg";
import history from "../routes/history";
interface SidebarProps {
    expand?: boolean
}

export default function Sidebar(props: SidebarProps) {
    const {goBack} = history;

    return (
        <aside className={props.expand ? 'app-sidebar expanded' : 'app-sidebar'}>
            {props.expand ? (
                <header>
                    <img src={marker} alt="Happy"/>
                    <h2>Escolha um orfanato no mapa</h2>
                    <p>Muitas crianças estão esperando a sua visita :)</p>
                </header>
            ) : (
                <img src={mapMarkerImg} alt="Happy"/>
            )}
            {props.expand ? (
                <footer>
                    <strong>Soledade</strong>
                    <span>Rio Grande do Sul</span>
                </footer>
            ) : (
                <footer>
                    <button type="button" onClick={goBack}>
                        <FiArrowLeft size={24} color="#FFF"/>
                    </button>
                </footer>
            )}
        </aside>
    )
}
