import React, {useEffect, useState} from "react";
import AdminSidebar from "../../components/admin/Sidebar";
import '../../styles/pages/admin/orphanages-list.css'
import {Map, Marker, TileLayer} from "react-leaflet";
import happyMapIcon from "../../util/mapIcon";
import 'leaflet/dist/leaflet.css'
import api from "../../services/api";
import {useHistory} from "react-router-dom";

const tilesUrl = 'https://a.tile.openstreetmap.org/{z}/{x}/{y}.png'

interface Orphanage {
    id: number
    name: string
    latitude: number
    longitude: number
}

export default function OrphanagesPending() {
    const history = useHistory()
    const [orphanages, setOrphanages] = useState<Orphanage[]>([])

    function getOrphanages() {
        api.get('admin/orphanages?status=pending').then(res => {
            setOrphanages(res.data.orphanages)
        })
    }
    useEffect(() => {
        getOrphanages()
    }, [orphanages])

    function handleApprove(orphanage: Orphanage) {
        api.put(`admin/orphanages/${orphanage.id}/approve`).then(res => {
            getOrphanages()
        })
    }

    return (
        <div id="orphanages-list">
            <AdminSidebar page="pending" hasPending={false} />
            <div className="container">
                <header>
                    <h1>Cadastros pendentes</h1>
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
                                        <button type="button" onClick={() => handleApprove(orphanage)}>
                                            <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M5.17188 12.9897L19.1719 12.9897" stroke="url(#paint0_linear)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                                                <path d="M12.1719 5.98975L19.1719 12.9897L12.1719 19.9897" stroke="url(#paint1_linear)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                                                <defs>
                                                    <linearGradient id="paint0_linear" x1="5.17187" y1="11.9897" x2="5.23847" y2="13.575" gradientUnits="userSpaceOnUse">
                                                        <stop stopColor="#29B6D1"/>
                                                        <stop offset="1" stopColor="#00C7C7"/>
                                                    </linearGradient>
                                                    <linearGradient id="paint1_linear" x1="12.1719" y1="5.98975" x2="23.1438" y2="15.3181" gradientUnits="userSpaceOnUse">
                                                        <stop stopColor="#29B6D1"/>
                                                        <stop offset="1" stopColor="#00C7C7"/>
                                                    </linearGradient>
                                                </defs>
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
