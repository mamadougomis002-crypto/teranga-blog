export default function EtatRequete({ chargement, erreur, children }) {
  if (chargement) {
    return <p className="message chargement">Chargement en cours…</p>
  }

  if (erreur) {
    return (
      <p className="message erreur" role="alert">
        Oups : {erreur}
      </p>
    )
  }

  return children
}
