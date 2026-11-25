import { useEffect, useState } from 'react'
import { Link, useOutletContext } from 'react-router'
import { API_URL } from '../constants.js'
import EtatRequete from '../components/EtatRequete.jsx'
import ListeArticles from '../components/ListeArticles.jsx'

export default function Accueil() {
  const { favoris, basculerFavori } = useOutletContext()
  const [articles, setArticles] = useState([])
  const [chargement, setChargement] = useState(true)
  const [erreur, setErreur] = useState(null)

  useEffect(() => {
    const controleur = new AbortController()
    setChargement(true)
    setErreur(null)

    fetch(`${API_URL}/posts?_limit=12`, { signal: controleur.signal })
      .then((reponse) => {
        if (!reponse.ok) {
          throw new Error(`Le serveur a répondu ${reponse.status}.`)
        }
        return reponse.json()
      })
      .then((donnees) => {
        setArticles(donnees)
        setChargement(false)
      })
      .catch((err) => {
        if (err.name === 'AbortError') return
        setErreur(err.message || 'Impossible de charger les articles.')
        setChargement(false)
      })

    return () => controleur.abort()
  }, [])

  return (
    <section>
      <h1>Bienvenue sur Teranga Blog</h1>
      <p className="intro">
        Lis les articles de la communauté Teranga Academy, découvre leurs
        auteurs et garde tes préférés.
      </p>

      <h2>Derniers articles</h2>
      <EtatRequete chargement={chargement} erreur={erreur}>
        <ListeArticles
          articles={articles.slice(0, 3)}
          favoris={favoris}
          onBasculerFavori={basculerFavori}
        />
        <p>
          <Link to="/articles">Voir tous les articles →</Link>
        </p>
      </EtatRequete>
    </section>
  )
}
