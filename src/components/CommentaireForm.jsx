import { useState } from 'react'

export default function CommentaireForm({ onAjouter }) {
  const [nom, setNom] = useState('')
  const [message, setMessage] = useState('')
  const [erreur, setErreur] = useState('')

  function soumettre(e) {
    e.preventDefault()

    if (nom.trim() === '') {
      setErreur('Le nom est obligatoire.')
      return
    }
    if (message.trim().length < 10) {
      setErreur('Le message doit contenir au moins 10 caractères.')
      return
    }

    onAjouter({ name: nom.trim(), body: message.trim() })
    setNom('')
    setMessage('')
    setErreur('')
  }

  return (
    <form className="formulaire" onSubmit={soumettre} noValidate>
      <h3>Laisser un commentaire</h3>

      <label htmlFor="commentaire-nom">Nom</label>
      <input
        id="commentaire-nom"
        type="text"
        value={nom}
        onChange={(e) => setNom(e.target.value)}
      />

      <label htmlFor="commentaire-message">Message</label>
      <textarea
        id="commentaire-message"
        rows="4"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />

      {erreur && (
        <p className="message erreur" role="alert">
          {erreur}
        </p>
      )}

      <button type="submit" className="btn">
        Publier
      </button>
    </form>
  )
}
