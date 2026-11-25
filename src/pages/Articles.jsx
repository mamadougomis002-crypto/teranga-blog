import { useEffect, useState } from 'react'
import { useOutletContext } from 'react-router'
import { API_URL } from '../constants.js'
import EtatRequete from '../components/EtatRequete.jsx'
import BarreRecherche from '../components/BarreRecherche.jsx'
import ListeArticles from '../components/ListeArticles.jsx'

export default function Articles() {
  const { favoris, basculerFavori } = useOutletContext()
  const [articles, setArticles] = useState([])
  const [chargement, setChargement] = useState(true)
  const [erreur, setErreur] = useState(null)
  const [recherche, setRecherche] = useState('')

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

  // Le tableau d'origine reste intact : on calcule une copie filtrée.
  const articlesFiltres = articles.filter((a) =>
    a.title.toLowerCase().includes(recherche.trim().toLowerCase()),
  )

  return (
    <section>
      <h1>Articles</h1>
      <BarreRecherche valeur={recherche} onChange={setRecherche} />
      <EtatRequete chargement={chargement} erreur={erreur}>
        <ListeArticles
          articles={articlesFiltres}
          favoris={favoris}
          onBasculerFavori={basculerFavori}
        />
      </EtatRequete>
    </section>
  )
}
