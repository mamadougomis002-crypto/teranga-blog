import { useEffect, useState } from 'react'
import { Link, useOutletContext, useParams } from 'react-router'
import { API_URL } from '../constants.js'
import EtatRequete from '../components/EtatRequete.jsx'
import CommentaireForm from '../components/CommentaireForm.jsx'
import ListeCommentaires from '../components/ListeCommentaires.jsx'

export default function Article() {
  // useParams renvoie toujours une chaîne de caractères.
  const { id } = useParams()
  const { favoris, basculerFavori } = useOutletContext()

  const [article, setArticle] = useState(null)
  const [commentaires, setCommentaires] = useState([])
  const [chargement, setChargement] = useState(true)
  const [erreur, setErreur] = useState(null)

  useEffect(() => {
    const controleur = new AbortController()
    setChargement(true)
    setErreur(null)
    setArticle(null)
    setCommentaires([])

    Promise.all([
      fetch(`${API_URL}/posts/${id}`, { signal: controleur.signal }),
      fetch(`${API_URL}/posts/${id}/comments`, { signal: controleur.signal }),
    ])
      .then(([repArticle, repCommentaires]) => {
        if (!repArticle.ok) {
          throw new Error(
            repArticle.status === 404
              ? "Cet article n'existe pas."
              : `Le serveur a répondu ${repArticle.status}.`,
          )
        }
        if (!repCommentaires.ok) {
          throw new Error(`Le serveur a répondu ${repCommentaires.status}.`)
        }
        return Promise.all([repArticle.json(), repCommentaires.json()])
      })
      .then(([donneesArticle, donneesCommentaires]) => {
        setArticle(donneesArticle)
        setCommentaires(donneesCommentaires)
        setChargement(false)
      })
      .catch((err) => {
        if (err.name === 'AbortError') return
        setErreur(err.message || "Impossible de charger l'article.")
        setChargement(false)
      })

    return () => controleur.abort()
  }, [id])

  function ajouterCommentaire(nouveau) {
    // Ajout local uniquement : rien n'est envoyé à l'API.
    setCommentaires([...commentaires, { ...nouveau, id: `local-${Date.now()}` }])
  }

  const estFavori = article !== null && favoris.some((f) => f.id === article.id)

  return (
    <section>
      <p>
        <Link to="/articles">← Retour aux articles</Link>
      </p>
      <EtatRequete chargement={chargement} erreur={erreur}>
        {article && (
          <>
            <h1>{article.title}</h1>
            <p className="meta">
              Par <Link to={`/auteurs/${article.userId}`}>l'auteur n°{article.userId}</Link>
            </p>
            <p className="texte-article">{article.body}</p>
            <button
              type="button"
              className={estFavori ? 'btn-favori actif' : 'btn-favori'}
              onClick={() => basculerFavori(article)}
              aria-pressed={estFavori}
            >
              {estFavori ? '★ Retirer des favoris' : '☆ Ajouter aux favoris'}
            </button>

            <h2>Commentaires ({commentaires.length})</h2>
            <ListeCommentaires commentaires={commentaires} />
            <CommentaireForm onAjouter={ajouterCommentaire} />
          </>
        )}
      </EtatRequete>
    </section>
  )
}
