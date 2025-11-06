import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api'
import { createEvent, fetchEvents, rsvpEvent } from '../features/events/eventSlice'

const mapContainerStyle = {
  width: '100%',
  height: '400px'
}

const EventsPage = () => {
  const dispatch = useDispatch()
  const { list, status } = useSelector((state) => state.events)
  const [form, setForm] = useState({ title: '', description: '', date: '', location: '', lat: '', lng: '', capacity: 10 })
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY
  })

  useEffect(() => {
    dispatch(fetchEvents())
  }, [dispatch])

  const handleSubmit = async (e) => {
    e.preventDefault()
    await dispatch(createEvent(form))
    setForm({ title: '', description: '', date: '', location: '', lat: '', lng: '', capacity: 10 })
  }

  const handleRsvp = (eventId) => {
    dispatch(rsvpEvent({ eventId }))
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Discover events & meetups</h1>
      <section className="bg-surface/80 p-6 rounded-3xl space-y-4">
        <h2 className="text-xl font-semibold">Create a meetup</h2>
        <form className="grid md:grid-cols-2 gap-4" onSubmit={handleSubmit}>
          <input
            className="px-4 py-2 rounded-2xl text-black"
            placeholder="Title"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            required
          />
          <input
            className="px-4 py-2 rounded-2xl text-black"
            placeholder="Location"
            value={form.location}
            onChange={(e) => setForm({ ...form, location: e.target.value })}
            required
          />
          <textarea
            className="px-4 py-2 rounded-2xl text-black md:col-span-2"
            placeholder="Description"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
          />
          <input
            type="datetime-local"
            className="px-4 py-2 rounded-2xl text-black"
            value={form.date}
            onChange={(e) => setForm({ ...form, date: e.target.value })}
            required
          />
          <input
            type="number"
            className="px-4 py-2 rounded-2xl text-black"
            placeholder="Capacity"
            value={form.capacity}
            onChange={(e) => setForm({ ...form, capacity: Number(e.target.value) })}
          />
          <input
            type="text"
            className="px-4 py-2 rounded-2xl text-black"
            placeholder="Latitude"
            value={form.lat}
            onChange={(e) => setForm({ ...form, lat: e.target.value })}
          />
          <input
            type="text"
            className="px-4 py-2 rounded-2xl text-black"
            placeholder="Longitude"
            value={form.lng}
            onChange={(e) => setForm({ ...form, lng: e.target.value })}
          />
          <button type="submit" className="md:col-span-2">
            Publish event
          </button>
        </form>
      </section>
      <section className="bg-surface/80 p-6 rounded-3xl space-y-4">
        <h2 className="text-xl font-semibold">Events near you</h2>
        <div className="grid md:grid-cols-2 gap-4">
          {list.map((event) => (
            <div key={event.id} className="p-4 rounded-2xl bg-background/60 border border-electric/20 space-y-2">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-lg font-semibold">{event.title}</p>
                  <p className="text-sm text-electric/80">{event.date}</p>
                </div>
                <button onClick={() => handleRsvp(event.id)}>RSVP</button>
              </div>
              <p className="text-sm">{event.description}</p>
              <p className="text-sm text-electric/60">Hosted by {event.host.name}</p>
            </div>
          ))}
        </div>
        {status === 'loading' && <p>Loading events...</p>}
      </section>
      {isLoaded && (
        <section className="bg-surface/80 p-6 rounded-3xl space-y-4">
          <h2 className="text-xl font-semibold">PodiumX locations</h2>
          <GoogleMap
            mapContainerStyle={mapContainerStyle}
            center={{ lat: 40.7128, lng: -74.006 }}
            zoom={10}
          >
            {list
              .filter((event) => event.lat && event.lng)
              .map((event) => (
                <Marker key={event.id} position={{ lat: Number(event.lat), lng: Number(event.lng) }} title={event.title} />
              ))}
          </GoogleMap>
        </section>
      )}
    </div>
  )
}

export default EventsPage
