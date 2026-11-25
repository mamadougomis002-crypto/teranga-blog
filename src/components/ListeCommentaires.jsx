export default function ListeCommentaires({ commentaires }) {
  if (commentaires.length === 0) {
    return <p className="vide">Aucun commentaire pour le moment.</p>
  }

  return (
    <ul className="commentaires">
      {commentaires.map((c) => (
        <li key={c.id} className="commentaire">
          <strong>{c.name}</strong>
          {c.email && <span className="email"> — {c.email}</span>}
          <p>{c.body}</p>
        </li>
      ))}
    </ul>
  )
}
