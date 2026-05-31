# La Meduse / Trottipieces

Storefront Next.js pour Trottipieces, une boutique de pieces detachees pour
trottinettes electriques connectee a un backend Medusa.

Le projet couvre le parcours vitrine, catalogue, fiche produit, panier, recherche,
formulaires de contact et pages legales. L'interface est orientee pieces de
trottinettes, avec filtres par marque, modele, type de piece, compatibilite et prix.

## Stack

- Next.js 15 avec App Router
- React 19
- TypeScript
- CSS global maison
- `lucide-react` pour les icones
- Medusa Store API
- Proxy API Next pour les appels Medusa depuis le navigateur

## Demarrage

```bash
npm install
cp .env.example .env.local
npm run dev
```

Par defaut, Next demarre sur `http://localhost:3000`. Si le port est deja occupe:

```bash
npm run dev -- -p 3005
```

Dans Codespaces, ouvrir l'URL exposee du port correspondant, par exemple:

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

Ne pas mettre de secrets dans `.env.example`. Les vraies valeurs doivent rester
dans `.env.local`, qui est ignore par Git.

## Fonctionnalites

- Accueil Trottipieces avec hero, marques populaires, categories et produits.
- Boutique `/boutique` avec recherche, filtres, tri et version mobile des filtres.
- Recherche rapide via `/api/search-products`.
- Fiche produit dynamique `/products/[handle]`.
- Prix affiches depuis `variants[0].calculated_price`.
- Ajout au panier et suppression de lignes panier.
- Page panier `/cart`.
- Formulaire de demande de piece `/demander-une-piece`.
- Formulaire de contact `/contact`.
- Pages compte, connexion, espace pro et page pro.
- Pages legales: mentions legales, confidentialite, CGV.
- Header responsive, barre d'actions mobile et footer de site.
- Pages d'etat 404, erreur locale et erreur globale.
- Logos Trottipieces, favicon et icon Apple integres.

## Routes principales

```text
/                         Accueil
/boutique                 Catalogue filtre
/products/[handle]        Fiche produit
/cart                     Panier
/demander-une-piece       Formulaire de demande de piece
/contact                  Formulaire de contact
/compte                   Compte client
/connexion                Connexion
/espace-pro               Acces professionnel
/pro                      Informations professionnelles
/mentions-legales         Mentions legales
/confidentialite          Politique de confidentialite
/cgv                      Conditions generales de vente
/not-found                Etat 404 gere par Next.js
/api/medusa/[...path]     Proxy Store API Medusa
/api/search-products      Recherche produit courte
```

## Architecture

```text
app/
  page.tsx                         Accueil
  boutique/page.tsx                Catalogue avec filtres
  products/[handle]/page.tsx       Fiche produit
  cart/page.tsx                    Panier client
  error.tsx                        Etat d'erreur de route
  global-error.tsx                 Etat d'erreur global
  not-found.tsx                    Etat 404
  api/medusa/[...path]/route.ts    Proxy API vers Medusa
  api/search-products/route.ts     Recherche produit

components/
  site-header.tsx                  Navigation desktop/mobile
  site-footer.tsx                  Pied de page
  product-grid.tsx                 Grille catalogue
  product-card.tsx                 Carte produit
  filter-sidebar.tsx               Filtres desktop
  mobile-filter-drawer.tsx         Filtres mobile
  add-to-cart-button.tsx           Bouton d'ajout panier
  contact-form.tsx                 Formulaire contact
  request-part-form.tsx            Formulaire demande de piece
  api-notice.tsx                   Alerte catalogue indisponible
  http-state.tsx                   UI 404/erreur

data/
  catalog.ts                       Marques, categories et modeles

lib/
  medusa.ts                        Fetch catalogue cote serveur
  medusa-client.ts                 Appels panier cote navigateur

public/
  images/brand/                    Logos Trottipieces
```

## Integration Medusa

Pour voir les produits dans le storefront:

- les produits doivent etre publies;
- les variantes doivent avoir des prix;
- les produits doivent etre rattaches au Sales Channel de la publishable key;
- la region doit exister et correspondre aux prix configures;
- `NEXT_PUBLIC_MEDUSA_REGION_ID` doit etre renseigne pour recuperer `calculated_price`.

Endpoints utilises:

```text
GET  /store/products?limit=24&region_id=<region_id>
GET  /store/products?q=<query>&limit=6&region_id=<region_id>
POST /store/carts
GET  /store/carts/:id
POST /store/carts/:id/line-items
DELETE /store/carts/:id/line-items/:line_id
```

Depuis le navigateur, les appels panier passent par:

```text
/api/medusa/carts
/api/medusa/carts/:id
/api/medusa/carts/:id/line-items
```

Le proxy ajoute `/store` et la publishable key avant d'appeler Medusa. Cela evite
les blocages CORS, notamment dans Codespaces.

## Limites connues

- Les formulaires contact et demande de piece valident les champs cote interface,
  puis affichent un etat de succes local. Il reste a brancher l'envoi vers un
  backend, un CRM ou un service email.
- Les pages compte, connexion et espace pro sont des pages d'interface. Le flux
  d'authentification client/pro reste a connecter.
- Les filtres boutique s'appuient sur les champs produit Medusa disponibles:
  titre, description, collection, categories, tags et metadata.
- Le fichier `trottipieces_logo_variantes.zip` contient les variantes source des
  logos. Les versions servies par l'application sont dans `public/images/brand/`.

## Scripts

```bash
npm run dev        # serveur de developpement
npm run build      # build production
npm run start      # serveur production apres build
npm run lint       # ESLint
npm run typecheck  # TypeScript
```

## Verification rapide

Tester la page d'accueil:

```bash
curl -s http://localhost:3005 | head
```

Tester la boutique:

```bash
curl -s -I http://localhost:3005/boutique
```

Tester une fiche produit:

```bash
curl -s -I http://localhost:3005/products/veste
```

Tester la recherche:

```bash
curl -s "http://localhost:3005/api/search-products?q=pneu"
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

Si `products` est vide, le probleme est cote Medusa: publication, Sales Channel,
publishable key, catalogue ou region.

### Les prix ne s'affichent pas

Ajouter `region_id` aux requetes produits. Le projet le fait automatiquement avec
`NEXT_PUBLIC_MEDUSA_REGION_ID`.

Sans region, Medusa peut renvoyer les variantes sans `calculated_price`.

### Impossible d'ajouter au panier

Verifier que le navigateur appelle:

```text
POST /api/medusa/carts
POST /api/medusa/carts/:id/line-items
```

Il ne doit pas appeler `/api/medusa/store/carts`.

Si le panier a ete cree avec une ancienne version du code, vider le `localStorage`
du site puis reessayer.

### ChunkLoadError ou module `.next` manquant

Cela arrive quand `next build` est lance pendant que `next dev` tourne, ou quand
le navigateur garde une ancienne build.

Procedure:

```bash
# arreter le serveur dev
find .next -mindepth 1 -delete
npm run dev -- -p 3005
```

Puis fermer les anciens onglets Codespaces et ouvrir uniquement le port courant.
