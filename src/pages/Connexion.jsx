import { Navigate, useOutletContext } from 'react-router'

export default function Connexion() {
  const { connecte, setConnecte } = useOutletContext()

  if (connecte) {
    return <Navigate to="/mon-espace" replace />
  }

  return (
    <section>
      <h1>Connexion</h1>
      <p>Connexion simulée : un clic suffit, aucun mot de passe n'est demandé.</p>
      <button type="button" className="btn" onClick={() => setConnecte(true)}>
        Se connecter
      </button>
    </section>
  )
}
