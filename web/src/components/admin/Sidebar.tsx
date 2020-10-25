import React from 'react'
import mapMarkerImg from "../../images/map-marker.svg";
import {useHistory} from "react-router-dom";
import '../../styles/components/sidebar.css'
import marker from "../../images/map-marker.svg";
import exitIcon from "../../images/exit-icon.svg";

interface SidebarProps {
    expand?: boolean
    // children?: JSX.Element[] | JSX.Element
    page: string
    hasPending: boolean
}

export default function AdminSidebar(props: SidebarProps) {
    const history = useHistory()
    function handleLogout() {
        sessionStorage.removeItem('@Happy.user')
        sessionStorage.removeItem('@Happy.token')
        history.push('/admin/login')
    }
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
            <div className="sidebar-actions">
                <button type="button" onClick={() => history.push('/admin/orphanages')} className={'sidebar-button ' + (props.page === 'orphanages' && 'active')}>
                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M21 10C21 17 12 23 12 23C12 23 3 17 3 10C3 7.61305 3.94821 5.32387 5.63604 3.63604C7.32387 1.94821 9.61305 1 12 1C14.3869 1 16.6761 1.94821 18.364 3.63604C20.0518 5.32387 21 7.61305 21 10Z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M12 13C13.6569 13 15 11.6569 15 10C15 8.34315 13.6569 7 12 7C10.3431 7 9 8.34315 9 10C9 11.6569 10.3431 13 12 13Z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                </button>
                <button type="button" onClick={() => history.push('/admin/orphanages/pending')} className={'sidebar-button ' + (props.page === 'pending' && 'active')}>
                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M12 8V12" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M12 16H12.01" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    {props.hasPending && (<span className="dot" />)}
                </button>
            </div>
            {props.expand ? (
                <footer>
                    <strong>Soledade</strong>
                    <span>Rio Grande do Sul</span>
                </footer>
            ) : (
                <footer>
                    <button type="button" onClick={handleLogout}>
                        <img src={exitIcon} width={25} height={25} alt="Sair"/>
                    </button>
                </footer>
            )}
        </aside>
    )
}
