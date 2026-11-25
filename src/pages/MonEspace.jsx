import { Navigate, useOutletContext } from 'react-router'

export default function MonEspace() {
  const { connecte, setConnecte, favoris } = useOutletContext()

  if (!connecte) {
    return <Navigate to="/connexion" replace />
  }

  return (
    <section>
      <h1>Mon espace</h1>
      <p>Tu es connecté. Tu as {favoris.length} article(s) en favori.</p>
      <button type="button" className="btn" onClick={() => setConnecte(false)}>
        Se déconnecter
      </button>
    </section>
  )
}
