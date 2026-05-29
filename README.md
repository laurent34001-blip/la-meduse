# La Meduse

Storefront Next.js connecte a un backend Medusa.

Le projet affiche un catalogue Medusa, des fiches produit, les prix calcules par region et un panier cree via l'API Store.

## Stack

- Next.js 15 avec App Router
- React 19
- TypeScript
- CSS global maison
- Medusa Store API
- Proxy API Next pour les appels panier depuis le navigateur

## Demarrage

```bash
npm install
cp .env.example .env.local
npm run dev
```

Par defaut, Next demarre sur `http://localhost:3000`. Dans Codespaces, si le port est deja occupe, lance un port fixe:

```bash
npm run dev -- -p 3005
```

URL Codespaces typique:

```text
https://<nom-du-codespace>-3005.app.github.dev
```

## Variables d'environnement

Configurer `.env.local` a partir de `.env.example`.

```bash
NEXT_PUBLIC_MEDUSA_BACKEND_URL=http://localhost:9000
NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY=
NEXT_PUBLIC_MEDUSA_REGION_ID=
```

- `NEXT_PUBLIC_MEDUSA_BACKEND_URL`: URL du backend Medusa.
- `NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY`: cle publishable Store API liee au bon Sales Channel.
- `NEXT_PUBLIC_MEDUSA_REGION_ID`: region utilisee pour calculer les prix et creer les paniers.

Ne pas mettre de secrets dans `.env.example`. Ce fichier sert uniquement de modele. Les vraies valeurs doivent rester dans `.env.local`.

## Cote Medusa

Pour voir les produits dans le storefront:

- les produits doivent etre publies;
- les variantes doivent avoir des prix;
- les produits doivent etre rattaches au Sales Channel de la publishable key;
- la region doit exister et correspondre aux prix configures;
- `NEXT_PUBLIC_MEDUSA_REGION_ID` doit etre renseigne pour recuperer `calculated_price`.

Endpoint catalogue utilise:

```text
GET /store/products?limit=24&region_id=<region_id>
```

## Fonctionnalites

- Page d'accueil avec hero et catalogue produit.
- Page produit dynamique: `/products/[handle]`.
- Prix affiches depuis `variants[0].calculated_price`.
- Ajout au panier depuis la fiche produit.
- Page panier: `/cart`.
- Suppression d'une ligne panier.

## Architecture

```text
app/
  page.tsx                         Page d'accueil et catalogue
  products/[handle]/page.tsx       Fiche produit
  cart/page.tsx                    Panier client
  api/medusa/[...path]/route.ts    Proxy API vers Medusa

components/
  add-to-cart-button.tsx           Bouton d'ajout panier
  product-grid.tsx                 Grille catalogue

lib/
  medusa.ts                        Fetch catalogue cote serveur
  medusa-client.ts                 Appels panier cote navigateur
```

## Proxy Medusa

Les appels panier passent par Next:

```text
/api/medusa/carts
/api/medusa/carts/:id
/api/medusa/carts/:id/line-items
```

Le proxy ajoute ensuite `/store` et la publishable key avant d'appeler Medusa. Cela evite les blocages CORS depuis le navigateur Codespaces.

## Scripts

```bash
npm run dev        # serveur de developpement
npm run build      # build production
npm run start      # serveur production apres build
npm run lint       # ESLint
npm run typecheck  # TypeScript
```

## Verification rapide

Tester le catalogue:

```bash
curl -s http://localhost:3005 | head
```

Tester une fiche produit:

```bash
curl -s -I http://localhost:3005/products/veste
```

Tester le proxy panier:

```bash
curl -s -X POST http://localhost:3005/api/medusa/carts \
  -H "content-type: application/json" \
  -d '{"region_id":"<region_id>"}'
```

## Depannage

### Les produits ne s'affichent pas

Verifier que l'API renvoie des produits:

```bash
curl -s "$NEXT_PUBLIC_MEDUSA_BACKEND_URL/store/products?limit=10" \
  -H "x-publishable-api-key: $NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY"
```

Si `products` est vide, le probleme est cote Medusa: publication, Sales Channel, publishable key ou catalogue.

### Les prix ne s'affichent pas

Ajouter `region_id` aux requetes produits. Le projet le fait automatiquement avec `NEXT_PUBLIC_MEDUSA_REGION_ID`.

Sans region, Medusa peut renvoyer les variantes sans `calculated_price`.

### Impossible d'ajouter au panier

Verifier que le navigateur appelle:

```text
POST /api/medusa/carts
POST /api/medusa/carts/:id/line-items
```

Il ne doit pas appeler `/api/medusa/store/carts`.

Si le panier a ete cree avec une ancienne version du code, vider le `localStorage` du site puis reessayer.

### ChunkLoadError ou module `.next` manquant

Cela arrive quand `next build` est lance pendant que `next dev` tourne, ou quand le navigateur garde une ancienne build.

Procedure:

```bash
# arreter le serveur dev
find .next -mindepth 1 -delete
npm run dev -- -p 3005
```

Puis fermer les anciens onglets Codespaces et ouvrir uniquement le port courant.

## Notes

- L'image hero locale est dans `public/images/hero-commerce.png`.
- `.env.local` est ignore par Git.
- Ne pas lancer `npm run build` pendant qu'un serveur `npm run dev` est actif sur le meme dossier.
