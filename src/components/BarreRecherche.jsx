export default function BarreRecherche({ valeur, onChange }) {
  return (
    <div className="recherche">
      <label htmlFor="recherche-titre">Rechercher un article par titre</label>
      <input
        id="recherche-titre"
        type="search"
        value={valeur}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Tape un mot du titre…"
      />
    </div>
  )
}
