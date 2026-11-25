import { createBrowserRouter } from 'react-router'
import LayoutPrincipal from './layouts/LayoutPrincipal.jsx'
import Accueil from './pages/Accueil.jsx'
import Articles from './pages/Articles.jsx'
import Article from './pages/Article.jsx'
import Auteurs from './pages/Auteurs.jsx'
import Auteur from './pages/Auteur.jsx'
import Favoris from './pages/Favoris.jsx'
import Connexion from './pages/Connexion.jsx'
import MonEspace from './pages/MonEspace.jsx'
import Introuvable from './pages/Introuvable.jsx'

export const router = createBrowserRouter([
  {
    path: '/',
    Component: LayoutPrincipal,
    children: [
      { index: true, Component: Accueil },
      { path: 'articles', Component: Articles },
      { path: 'articles/:id', Component: Article },
      { path: 'auteurs', Component: Auteurs },
      { path: 'auteurs/:id', Component: Auteur },
      { path: 'favoris', Component: Favoris },
      { path: 'connexion', Component: Connexion },
      { path: 'mon-espace', Component: MonEspace },
      { path: '*', Component: Introuvable },
    ],
  },
])
