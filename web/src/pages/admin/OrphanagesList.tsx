import React from "react";
import AdminSidebar from "../../components/admin/Sidebar";
import '../../styles/pages/admin/orphanages-list.css'
import {Map, Marker, TileLayer} from "react-leaflet";
import happyMapIcon from "../../util/mapIcon";
import 'leaflet/dist/leaflet.css'

const tilesUrl = 'https://a.tile.openstreetmap.org/{z}/{x}/{y}.png'

export default function OrphanagesList() {
    return (
        <div id="orphanages-list">
            <AdminSidebar page="orphanages" hasPending={true} />
            <div className="container">
                <header>
                    <h1>Orfanatos Cadastrados</h1>
                    <small>2 orfanatos</small>
                </header>
                <div className="grid">
                    {[1,2,3,4,5].map(i => (
                        <div key={i} className="card">
                            <div className="map">
                                <Map
                                    center={[-28.8387213, -52.4998566]}
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
                                        position={[-28.8387213,-52.4998566]}
                                    />
                                </Map>
                            </div>
                            <div className="content">
                                <h3>Orf. Esperança</h3>
                                <div className="actions">
                                    <button>
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M12 20H21" stroke="#15C3D6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                            <path d="M16.5 3.50023C16.8978 3.1024 17.4374 2.87891 18 2.87891C18.2786 2.87891 18.5544 2.93378 18.8118 3.04038C19.0692 3.14699 19.303 3.30324 19.5 3.50023C19.697 3.69721 19.8532 3.93106 19.9598 4.18843C20.0665 4.4458 20.1213 4.72165 20.1213 5.00023C20.1213 5.2788 20.0665 5.55465 19.9598 5.81202C19.8532 6.06939 19.697 6.30324 19.5 6.50023L7 19.0002L3 20.0002L4 16.0002L16.5 3.50023Z" stroke="#15C3D6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                        </svg>
                                    </button>
                                    <button>
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
            </div>
        </div>
    )
}
