import React, {useEffect, useState} from 'react'
import {useParams} from 'react-router-dom'
import {FiClock, FiInfo} from "react-icons/fi";
import {Map, Marker, TileLayer} from "react-leaflet";
import happyMapIcon from "../util/mapIcon";
import api from '../services/api'
import 'leaflet/dist/leaflet.css'

import '../styles/pages/orphanage.css';
import Sidebar from "../components/Sidebar";

const tilesUrl = 'https://a.tile.openstreetmap.org/{z}/{x}/{y}.png'

interface Orphanage {
    latitude: number
    longitude: number
    name: string
    about: string
    instructions: string
    opening_hours: string
    open_on_weekends: boolean
    images: [
        {
            id: number
            url: string
        }
    ]
}
interface RouteParams {
    id: string;
}

export default function Orphanage() {
    const params = useParams<RouteParams>()
    const [orphanage, setOrphanage] = useState<Orphanage>()
    const [activeImageIndex, setActiveImageIndex] = useState(0)

    useEffect(() => {
        api.get(`orphanages/${params.id}`).then(resposne => {
            setOrphanage(resposne.data.orphanage)
        })
    }, [params.id, activeImageIndex])

    if (!orphanage) {
        return <p>Carregando...</p>
    }

    return (
        <div id="page-orphanage">
            <Sidebar />
            <main>
                <div className="orphanage-details">
                    <img src={orphanage.images[activeImageIndex].url} alt={orphanage.name}/>

                    <div className="images">
                        {orphanage.images.map((image, index) => (
                            <button key={image.id} onClick={() => {setActiveImageIndex(index)}} className={activeImageIndex === index ? 'active' : ''} type="button">
                                <img src={image.url} alt={orphanage.name}/>
                            </button>
                        ))}
                    </div>

                    <div className="orphanage-details-content">
                        <h1>{orphanage.name}</h1>
                        <p>{orphanage.about}</p>

                        <div className="map-container">
                            <Map
                                center={[orphanage.latitude, orphanage.longitude]}
                                zoom={16}
                                style={{width: '100%', height: 280}}
                                dragging={false}
                                touchZoom={false}
                                zoomControl={false}
                                scrollWheelZoom={false}
                                doubleClickZoom={false}
                            >
                                <TileLayer
                                    url={tilesUrl}
                                />
                                <Marker interactive={false} icon={happyMapIcon} position={[orphanage.latitude, orphanage.longitude]}/>
                            </Map>

                            <footer>
                                <a target="_blank" rel="noopener noreferrer" href={`https://www.google.com/maps/dir/?api=1&destination=${orphanage.latitude},${orphanage.longitude}`}>Ver rotas no Google Maps</a>
                            </footer>
                        </div>

                        <hr/>

                        <h2>Instruções para visita</h2>
                        <p>{orphanage.instructions}</p>

                        <div className="open-details">
                            <div className="hour">
                                <FiClock size={32} color="#15B6D6"/>
                                Segunda à Sexta <br/>
                                {orphanage.opening_hours}
                            </div>
                            { orphanage.open_on_weekends ? (
                                <div className="open-on-weekends">
                                    <FiInfo size={32} color="#39CC83"/>
                                    Atendemos <br/>
                                    fim de semana
                                </div>
                            ) : (
                                <div className="open-on-weekends not-open">
                                    <FiInfo size={32} color="#ff669d"/>
                                    Não atendemos <br/>
                                    fim de semana
                                </div>
                            ) }
                        </div>

                        {/*<button type="button" className="contact-button">*/}
                        {/*    <FaWhatsapp size={20} color="#FFF"/>*/}
                        {/*    Entrar em contato*/}
                        {/*</button>*/}
                    </div>
                </div>
            </main>
        </div>
    );
}
