import { Link } from 'react-router'

export default function Introuvable() {
  return (
    <section className="page-404">
      <h1>404</h1>
      <p>Cette page n'existe pas.</p>
      <Link to="/" className="btn">
        Retour à l'accueil
      </Link>
    </section>
  )
}
