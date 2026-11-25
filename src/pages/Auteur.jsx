import { useEffect, useState } from 'react'
import { Link, useOutletContext, useParams } from 'react-router'
import { API_URL } from '../constants.js'
import EtatRequete from '../components/EtatRequete.jsx'
import ListeArticles from '../components/ListeArticles.jsx'

export default function Auteur() {
  const { id } = useParams()
  const { favoris, basculerFavori } = useOutletContext()

  const [auteur, setAuteur] = useState(null)
  const [articles, setArticles] = useState([])
  const [chargement, setChargement] = useState(true)
  const [erreur, setErreur] = useState(null)

  useEffect(() => {
    const controleur = new AbortController()
    setChargement(true)
    setErreur(null)
    setAuteur(null)
    setArticles([])

    Promise.all([
      fetch(`${API_URL}/users/${id}`, { signal: controleur.signal }),
      fetch(`${API_URL}/posts?userId=${id}`, { signal: controleur.signal }),
    ])
      .then(([repAuteur, repArticles]) => {
        if (!repAuteur.ok) {
          throw new Error(
            repAuteur.status === 404
              ? "Cet auteur n'existe pas."
              : `Le serveur a répondu ${repAuteur.status}.`,
          )
        }
        if (!repArticles.ok) {
          throw new Error(`Le serveur a répondu ${repArticles.status}.`)
        }
        return Promise.all([repAuteur.json(), repArticles.json()])
      })
      .then(([donneesAuteur, donneesArticles]) => {
        setAuteur(donneesAuteur)
        setArticles(donneesArticles)
        setChargement(false)
      })
      .catch((err) => {
        if (err.name === 'AbortError') return
        setErreur(err.message || "Impossible de charger l'auteur.")
        setChargement(false)
      })

    return () => controleur.abort()
  }, [id])

  return (
    <section>
      <p>
        <Link to="/auteurs">← Retour aux auteurs</Link>
      </p>
      <EtatRequete chargement={chargement} erreur={erreur}>
        {auteur && (
          <>
            <h1>{auteur.name}</h1>
            <ul className="fiche">
              <li>Pseudo : @{auteur.username}</li>
              <li>E-mail : {auteur.email}</li>
              <li>Téléphone : {auteur.phone}</li>
              <li>Entreprise : {auteur.company.name}</li>
            </ul>

            <h2>Ses articles</h2>
            <ListeArticles
              articles={articles}
              favoris={favoris}
              onBasculerFavori={basculerFavori}
            />
          </>
        )}
      </EtatRequete>
    </section>
  )
}
