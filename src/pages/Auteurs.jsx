import { useEffect, useState } from 'react'
import { Link } from 'react-router'
import { API_URL } from '../constants.js'
import EtatRequete from '../components/EtatRequete.jsx'

export default function Auteurs() {
  const [auteurs, setAuteurs] = useState([])
  const [chargement, setChargement] = useState(true)
  const [erreur, setErreur] = useState(null)

  useEffect(() => {
    const controleur = new AbortController()
    setChargement(true)
    setErreur(null)

    fetch(`${API_URL}/users`, { signal: controleur.signal })
      .then((reponse) => {
        if (!reponse.ok) {
          throw new Error(`Le serveur a répondu ${reponse.status}.`)
        }
        return reponse.json()
      })
      .then((donnees) => {
        setAuteurs(donnees)
        setChargement(false)
      })
      .catch((err) => {
        if (err.name === 'AbortError') return
        setErreur(err.message || 'Impossible de charger les auteurs.')
        setChargement(false)
      })

    return () => controleur.abort()
  }, [])

  return (
    <section>
      <h1>Auteurs</h1>
      <EtatRequete chargement={chargement} erreur={erreur}>
        <ul className="liste-auteurs">
          {auteurs.map((a) => (
            <li key={a.id} className="carte">
              <h3 className="carte-titre">
                <Link to={`/auteurs/${a.id}`}>{a.name}</Link>
              </h3>
              <p className="carte-extrait">@{a.username}</p>
              <p className="carte-extrait">{a.company.name}</p>
            </li>
          ))}
        </ul>
      </EtatRequete>
    </section>
  )
}
