import { useState } from 'react'
import { Link, NavLink, Outlet } from 'react-router'

function classeLien({ isActive }) {
  return isActive ? 'nav-lien actif' : 'nav-lien'
}

export default function LayoutPrincipal() {
  // On retient l'article entier (et pas seulement son id) pour pouvoir
  // l'afficher dans la page Favoris sans refaire de requête.
  const [favoris, setFavoris] = useState([])
  const [connecte, setConnecte] = useState(false)

  function basculerFavori(article) {
    const dejaFavori = favoris.some((f) => f.id === article.id)
    if (dejaFavori) {
      setFavoris(favoris.filter((f) => f.id !== article.id))
    } else {
      setFavoris([...favoris, article])
    }
  }

  return (
    <div className="app">
      <header className="barre-nav">
        <Link to="/" className="logo-lien">
          <img
            src="/logo-teranga-blog.png"
            alt="Teranga Blog : retour à l'accueil"
            className="logo"
          />
        </Link>
        <nav className="nav-liens">
          <NavLink to="/" end className={classeLien}>
            Accueil
          </NavLink>
          <NavLink to="/articles" className={classeLien}>
            Articles
          </NavLink>
          <NavLink to="/auteurs" className={classeLien}>
            Auteurs
          </NavLink>
          <NavLink to="/favoris" className={classeLien}>
            Favoris <span className="compteur">{favoris.length}</span>
          </NavLink>
          <NavLink to="/mon-espace" className={classeLien}>
            {connecte ? 'Mon espace' : 'Connexion'}
          </NavLink>
        </nav>
      </header>

      <main className="contenu">
        <Outlet context={{ favoris, basculerFavori, connecte, setConnecte }} />
      </main>

      <footer className="pied">Teranga Blog — projet du cours React</footer>
    </div>
  )
}
