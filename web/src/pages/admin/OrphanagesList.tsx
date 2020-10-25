import React, {useEffect, useState} from "react";

import AdminSidebar from "../../components/admin/Sidebar";
import '../../styles/pages/admin/orphanages-list.css'
import {Map, Marker, TileLayer} from "react-leaflet";
import happyMapIcon from "../../util/mapIcon";
import api from "../../services/api";
import 'leaflet/dist/leaflet.css'
import MessageDelete from "./MessageDelete";
import Toast from "../../components/Toast";

const tilesUrl = 'https://a.tile.openstreetmap.org/{z}/{x}/{y}.png'

interface Orphanage {
    id: number
    name: string
    latitude: number
    longitude: number
}

export default function OrphanagesList() {
    const [orphanages, setOrphanages] = useState<Orphanage[]>([])
    const [hasPending, setHasPending] = useState(false)
    const [remove, setRemove] = useState<Orphanage|null>(null)
    const [toasts, setToasts] = useState<Toast[]>([])

    useEffect(() => {
        api.get('admin/orphanages').then(res => {
            setOrphanages(res.data.orphanages)
            setHasPending(res.data.hasPending)
        })
    }, [remove])

    function handleRemove(removed: boolean) {
        if (removed) {
            setToasts([{
                title: '',
                description: `Orfanato ${remove?.name} removido!`
            }])
            setTimeout(() => setToasts([]), 4000)
        }
        setRemove(null)
    }

    if (remove) {
        return (<MessageDelete orphanage={remove} setRemove={handleRemove} />)
    }

    return (
        <div id="orphanages-list">
            <Toast toastList={toasts} />
            <AdminSidebar page="orphanages" hasPending={hasPending} />
            <div className="container">
                <header>
                    <h1>Orfanatos Cadastrados</h1>
                    <small>{orphanages.length} {orphanages.length === 1 ? 'orfanato' : 'orfanatos'}</small>
                </header>
                {orphanages.length ? (
                    <div className="grid">
                        {orphanages.map(orphanage => (
                            <div key={orphanage.id} className="card">
                                <div className="map">
                                    <Map
                                        center={[orphanage.latitude, orphanage.longitude]}
                                        style={{ width: '100%', height: '100%' }}
                                        zoom={14}
                                        dragging={false}
                                        touchZoom={false}
                                        zoomControl={false}
                                        scrollWheelZoom={false}
                                        doubleClickZoom={false}
                                    >
                                        <TileLayer
                                            url={tilesUrl}
                                        />
                                        <Marker
                                            interactive={false}
                                            icon={happyMapIcon}
                                            position={[orphanage.latitude, orphanage.longitude]}
                                        />
                                    </Map>
                                </div>
                                <div className="content">
                                    <h3>{orphanage.name}</h3>
                                    <div className="actions">
                                        <button>
                                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M12 20H21" stroke="#15C3D6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                                <path d="M16.5 3.50023C16.8978 3.1024 17.4374 2.87891 18 2.87891C18.2786 2.87891 18.5544 2.93378 18.8118 3.04038C19.0692 3.14699 19.303 3.30324 19.5 3.50023C19.697 3.69721 19.8532 3.93106 19.9598 4.18843C20.0665 4.4458 20.1213 4.72165 20.1213 5.00023C20.1213 5.2788 20.0665 5.55465 19.9598 5.81202C19.8532 6.06939 19.697 6.30324 19.5 6.50023L7 19.0002L3 20.0002L4 16.0002L16.5 3.50023Z" stroke="#15C3D6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                            </svg>
                                        </button>
                                        <button type="button" onClick={() => setRemove(orphanage)}>
                                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M3 6H5H21" stroke="#15C3D6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                                <path d="M8 6V4C8 3.46957 8.21071 2.96086 8.58579 2.58579C8.96086 2.21071 9.46957 2 10 2H14C14.5304 2 15.0391 2.21071 15.4142 2.58579C15.7893 2.96086 16 3.46957 16 4V6M19 6V20C19 20.5304 18.7893 21.0391 18.4142 21.4142C18.0391 21.7893 17.5304 22 17 22H7C6.46957 22 5.96086 21.7893 5.58579 21.4142C5.21071 21.0391 5 20.5304 5 20V6H19Z" stroke="#15C3D6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="empty-list">
                        <svg width="79" height="88" viewBox="0 0 79 88" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M78.2222 22.3313V53.4038C78.2222 65.7365 67.9024 75.7351 55.1736 75.7351H52.8424L40.9373 87.2622C40.471 87.7139 39.826 88 39.1111 88C38.4506 88 37.8522 87.7666 37.3937 87.3751L37.1917 87.1793L37.1839 87.1718L25.3799 75.7351H23.0408C10.3198 75.7351 0 65.7365 0 53.4038V22.3313C0 9.99863 10.3198 0 23.0486 0H55.1736C67.9024 0 78.2222 9.99863 78.2222 22.3313Z" fill="#D3E2E5"/>
                            <path d="M30.7304 32.3808H17.0381V25.6901C17.0381 21.9967 20.1049 18.9995 23.8842 18.9995C27.6636 18.9995 30.7304 21.9967 30.7304 25.6901V32.3808Z" fill="white"/>
                            <path d="M59.6479 32.3808H45.9556V25.6901C45.9556 21.9967 49.0224 18.9995 52.8017 18.9995C56.581 18.9995 59.6479 21.9967 59.6479 25.6901V32.3808Z" fill="white"/>
                            <rect x="25.667" y="47.667" width="25.6667" height="11" rx="4" fill="white"/>
                        </svg>
                        <span>Nenhum no momento</span>
                    </div>
                )}

            </div>
        </div>
    )
}
