import { Link, useOutletContext } from 'react-router'
import ListeArticles from '../components/ListeArticles.jsx'

export default function Favoris() {
  const { favoris, basculerFavori } = useOutletContext()

  return (
    <section>
      <h1>Mes favoris</h1>
      {favoris.length === 0 ? (
        <p className="vide">
          Aucun favori pour l'instant. <Link to="/articles">Parcourir les articles</Link>
        </p>
      ) : (
        <ListeArticles
          articles={favoris}
          favoris={favoris}
          onBasculerFavori={basculerFavori}
        />
      )}
    </section>
  )
}
