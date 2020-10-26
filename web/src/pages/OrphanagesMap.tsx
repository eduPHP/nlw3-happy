import React, {useEffect, useState} from 'react'
import { Link } from 'react-router-dom'
import { FiPlus, FiArrowRight } from 'react-icons/fi'
import { Map, TileLayer, Marker, Popup } from 'react-leaflet'
import mapIcon from "../util/mapIcon";
import api from '../services/api'

import 'leaflet/dist/leaflet.css'
import '../styles/pages/orphanages-map.css'
import Sidebar from "../components/Sidebar";

const tilesUrl = 'https://a.tile.openstreetmap.org/{z}/{x}/{y}.png'

interface Orphanage {
    id: number;
    latitude: number;
    longitude: number;
    name: string;
}

function OrphanagesMap() {
    const [orphanages, setOrphanages] = useState<Orphanage[]>([])
    const [position, setPosition] = useState({latitude: -28.8387213, longitude: -52.4998566})

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(position => {
            setPosition({latitude: position.coords.latitude, longitude: position.coords.longitude})
        })
        api.get('orphanages').then(response => {
            setOrphanages(response.data.orphanages)
        })
    }, [])

    return (
        <div id="page-map">
            <Sidebar expand={true} />
            <Map
                center={[position.latitude, position.longitude]}
                zoom={14}
                style={{ width: '100%', height: '100%' }}
            >
                <TileLayer url={tilesUrl} />

                {orphanages.map(orphanage => (
                    <Marker key={orphanage.id} position={[orphanage.latitude,orphanage.longitude]} icon={mapIcon} >
                        <Popup closeButton={false} minWidth={240} maxWidth={240} className="map-popup">
                            {orphanage.name}
                            <Link to={`/orphanages/${orphanage.id}`}>
                                <FiArrowRight size={20} color="#fff" />
                            </Link>
                        </Popup>
                    </Marker>
                ))}

            </Map>

            <Link to="/orphanages/create" className="create-orphanage">
                <FiPlus size={32} color="rgba(255,255,255,0.6)" />
            </Link>
        </div>
    )
}

export default OrphanagesMap
