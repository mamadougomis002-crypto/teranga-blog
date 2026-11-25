# Teranga BlogSite en ligne : [https://teranga-blog-oyi2.netlify.app](https://teranga-blog-oyi2.netlify.app)
Code : [https://github.com/mamadougomis002-crypto/teranga-blog](https://github.com/mamadougomis002-crypto/teranga-blog)

Mini-blog multipage réalisé pour le cours React (Prof. Diouf). L'application lit des articles, des auteurs et des commentaires depuis l'API publique JSONPlaceholder, avec navigation sans rechargement, recherche, commentaires validés et favoris partagés entre les pages.

## Lancer le projet

```bash
npm install
npm run dev      # serveur de développement
npm run build    # version de production dans dist/
npm run preview  # tester la version de production
```

## Pages

| Adresse | Page |
| --- | --- |
| `/` | Accueil : derniers articles |
| `/articles` | Liste + recherche par titre |
| `/articles/:id` | Détail + commentaires |
| `/auteurs`, `/auteurs/:id` | Liste des auteurs, fiche + ses articles |
| `/favoris` | Articles mis en favori |
| `/connexion`, `/mon-espace` | Connexion simulée et route protégée (niveau Or) |
| `*` | Page 404 |

## Organisation

- `src/layouts/LayoutPrincipal.jsx` : barre de navigation, `Outlet`, état des favoris.
- `src/pages/` : une page par fichier, elles chargent les données et les passent en props.
- `src/components/` : composants réutilisables, qui ne connaissent pas l'API.
- `src/router.jsx` : table des routes.

## Déploiement

Le routeur utilise l'historique du navigateur : le serveur doit renvoyer `index.html` pour toute adresse. Les fichiers `public/_redirects` (Netlify) et `vercel.json` (Vercel) le configurent déjà.

## Trois choses apprises

> À compléter avec tes propres mots avant le rendu (exemples de pistes : pourquoi l'état des favoris vit dans le layout, à quoi sert le nettoyage de `useEffect`, pourquoi `useParams` renvoie une chaîne).

1.
2.
3.
