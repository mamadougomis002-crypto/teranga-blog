import { Link } from 'react-router'

export default function ArticleCard({ article, estFavori, onBasculerFavori }) {
  const extrait =
    article.body.length > 90 ? article.body.slice(0, 90) + '…' : article.body

  return (
    <article className="carte">
      <h3 className="carte-titre">
        <Link to={`/articles/${article.id}`}>{article.title}</Link>
      </h3>
      <p className="carte-extrait">{extrait}</p>
      <button
        type="button"
        className={estFavori ? 'btn-favori actif' : 'btn-favori'}
        onClick={() => onBasculerFavori(article)}
        aria-pressed={estFavori}
      >
        {estFavori ? '★ Retirer des favoris' : '☆ Ajouter aux favoris'}
      </button>
    </article>
  )
}
