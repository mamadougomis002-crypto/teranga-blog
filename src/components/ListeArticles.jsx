import ArticleCard from './ArticleCard.jsx'

export default function ListeArticles({ articles, favoris, onBasculerFavori }) {
  if (articles.length === 0) {
    return <p className="vide">Aucun article à afficher.</p>
  }

  return (
    <div className="grille">
      {articles.map((article) => (
        <ArticleCard
          key={article.id}
          article={article}
          estFavori={favoris.some((f) => f.id === article.id)}
          onBasculerFavori={onBasculerFavori}
        />
      ))}
    </div>
  )
}
