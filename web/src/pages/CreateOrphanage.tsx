import React, {ChangeEvent, FormEvent, useState} from "react";
import { Map, Marker, TileLayer } from 'react-leaflet';
import {LeafletMouseEvent} from "leaflet";
import { FiPlus } from "react-icons/fi";

import api from "../services/api";
import happyMapIcon from "../util/mapIcon";
import Sidebar from "../components/Sidebar";
import '../styles/pages/create-orphanage.css';
import MessageDone from './MessageDone'

const tilesUrl = 'https://a.tile.openstreetmap.org/{z}/{x}/{y}.png'

export default function CreateOrphanage() {
  const [position, setPosition] = useState({latitude: 0, longitude: 0})
  const [name, setName] = useState('')
  const [about, setAbout] = useState('')
  const [instructions, setInstructions] = useState('')
  const [opening_hours, setOpeningHours] = useState('')
  const [open_on_weekends, setOpenOnWeekends] = useState(true)
  const [images, setImages] = useState<File[]>([])
  const [previewImages, setPreviewImages] = useState<string[]>([])
  const [done, setDone] = useState(false)

  function handleMapClick(event: LeafletMouseEvent) {
    const {lat: latitude, lng: longitude} = event.latlng
    setPosition({latitude, longitude})
  }

  function handleSelectImages(event: ChangeEvent<HTMLInputElement>) {
    if (!event.target.files) {
      return
    }

    let selectedImages = Array.from(event.target.files);
    setImages(selectedImages)

    const selectedImagesPreview = selectedImages.map(image => {
      return URL.createObjectURL(image)
    })

    setPreviewImages([...previewImages, ...selectedImagesPreview])
  }

  async function handleImageRemove(index: number) {
    previewImages.splice(index, 1)

    setPreviewImages([...previewImages])
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault()
    const data = new FormData()
    data.append('latitude', String(position.latitude))
    data.append('longitude', String(position.longitude))
    data.append('name', name)
    data.append('about', about)
    data.append('instructions', instructions)
    data.append('opening_hours', opening_hours)
    data.append('open_on_weekends', String(open_on_weekends))
    images.forEach(image => data.append('images', image))

    await api.post('orphanages', data).then(response => {
      setDone(true)
    })
  }

  if (done) {
    return (<MessageDone />)
  }

  return (
    <div id="page-create-orphanage">
      <Sidebar />

      <main>
        <form className="create-orphanage-form" onSubmit={handleSubmit}>
          <fieldset>
            <legend>Dados</legend>

            <Map
                center={[-28.8387213, -52.4998566]}
                style={{ width: '100%', height: 280 }}
                zoom={15}
                onClick={handleMapClick}
            >
              <TileLayer
                url={tilesUrl}
              />
              {position.latitude !== 0 && (
                  <Marker
                      interactive={false}
                      icon={happyMapIcon}
                      position={[position.latitude,position.longitude]}
                  />
              )}
            </Map>

            <div className="input-block">
              <label htmlFor="name">Nome</label>
              <input id="name" value={name} onChange={event => setName(event.target.value)} />
            </div>

            <div className="input-block">
              <label htmlFor="about">Sobre <span>Máximo de 300 caracteres</span></label>
              <textarea id="about" maxLength={300} value={about} onChange={event => setAbout(event.target.value)} />
            </div>

            <div className="input-block">
              <label htmlFor="images">Fotos</label>

              <div className="images-container">
                {previewImages.map((image, i) => (
                    <div key={i} className="image-wrapper">
                      <button type="button" className="image-remove" onClick={() => handleImageRemove(i)}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M18 6L6 18" stroke="#FF669D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          <path d="M6 6L18 18" stroke="#FF669D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </button>
                      <img src={image} alt={name || 'image'}/>
                    </div>
                ))}

                <label htmlFor="image[]" className="new-image">
                  <FiPlus size={24} color="#15b6d6" />
                </label>

                <input type="file" multiple onChange={handleSelectImages} id="image[]"/>
              </div>
            </div>
          </fieldset>

          <fieldset>
            <legend>Visitação</legend>

            <div className="input-block">
              <label htmlFor="instructions">Instruções</label>
              <textarea id="instructions" value={instructions} onChange={event => setInstructions(event.target.value)} />
            </div>

            <div className="input-block">
              <label htmlFor="opening_hours">Horário de funcionamento</label>
              <input id="opening_hours" value={opening_hours} onChange={event => setOpeningHours(event.target.value)} />
            </div>

            <div className="input-block">
              <label htmlFor="open_on_weekends">Atende fim de semana</label>

              <div className="button-select">
                <button type="button" onClick={() => setOpenOnWeekends(true)} className={open_on_weekends ? 'active' : ''}>Sim</button>
                <button type="button" onClick={() => setOpenOnWeekends(false)} className={!open_on_weekends ? 'active' : ''}>Não</button>
              </div>
            </div>
          </fieldset>

          <button className="confirm-button" type="submit">
            Confirmar
          </button>
        </form>
      </main>
    </div>
  );
}
