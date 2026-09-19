# Edwyn Tech — Design System 🚀

Bibliothèque officielle de **Web Components** et de **Design Tokens** pour **Edwyn Tech** ([https://www.edwyn.tech/](https://www.edwyn.tech/)).

Conçue selon les standards du **Software Craftsmanship** :
- **100% Web Standards & Pure TypeScript** : Custom Elements autonomes basés sur le Shadow DOM, zéro dépendance à un framework UI applicatif.
- **Lit 3.x** : Bibliothèque légère et ultra-performante pour le rendu réactif et l'encapsulation de styles scoped.
- **Design Tokens W3C** : Variables CSS standardisées (couleurs, surfaces Dark Slate `#292e30` & Light, typographie *Syne* & *Inter*, élévations, espacements).
- **Storybook 10 (Vite)** : Environnement dédié de développement, documentation interactive des composants et validation d'accessibilité (a11y).
- **Tests Unitaires Co-localisés (Vitest + Happy-DOM)** : Suite de tests ultra-rapide où chaque composant est testé dans son propre dossier.
- **Outillage IDE First-Class** : Autocomplétion native WebStorm, IntelliJ, VS Code et Cursor via le Custom Elements Manifest (`custom-elements.json`) et JetBrains Web-Types (`web-types.json`).

---

## 🛠️ Commandes Disponibles

```bash
# Lancer Storybook en local pour visualiser et développer les composants (port 6006)
npm run dev
# ou
npm run storybook

# Lancer la suite de tests unitaires (tests co-localisés + intégration)
npm test

# Lancer les tests en mode interactif (TDD)
npm run test:watch

# Vérifier la couverture de code
npm run test:coverage

# Vérifier la validité des types TypeScript
npm run typecheck

# Générer les manifests IDE (custom-elements.json & web-types.json)
npm run manifest

# Compiler la bibliothèque pour distribution (dist/index.js, dist/tokens/index.js, dist/index.css, dist/**/*.d.ts)
npm run build

# Compiler la documentation Storybook en assets statiques (storybook-static/)
npm run build-storybook
```

---

## 🧩 Composants Inclus

| Composant | Balise | Description |
|---|---|---|
| **Button** | `<edwyn-button>` | Boutons interactifs avec variantes (`primary`, `secondary`, `outline`, `ghost`, `simulator`), tailles, formes et slots d'icônes |
| **Badge** | `<edwyn-badge>` | Tags et statuts pill avec variantes (`primary`, `subtle`, `glass`, `outline`) et indicateur d'état (`dot`) |
| **Card** | `<edwyn-card>` | Cartes glassmorphism interactives avec lueurs orangées signatures Edwyn Tech |
| **Icon** | `<edwyn-icon>` | Icônes vectorielles SVG intégrées (fusée, étoiles, validation, chevrons, burger, etc.) |
| **Input** | `<edwyn-input>` | Champs de formulaire accessibles avec gestion d'erreurs, aides contextuelles, états et slots d'icônes |
| **Slider** | `<edwyn-slider>` | Curseur de plage sur-mesure avec jauge dégradée, retour visuel et indicateur d'avertissement |
| **Stat Item** | `<edwyn-stat-item>` | Métriques clés et indicateurs de performance (CA, missions, redistribution) |
| **Navbar** | `<edwyn-navbar>` | En-tête fixe glassmorphism, responsive avec drawer mobile accessible au clavier |
| **Hero** | `<edwyn-hero>` | Section d'en-tête d'accueil avec fond d'équipe, logo duotone, typographie Syne et chevron animé |
| **Footer** | `<edwyn-footer>` | Pied de page institutionnel 4 colonnes |
| **Simulator** | `<edwyn-simulator>` | Simulateur de package salarial et redistribution de marge avec moteur métier pur |

---

## 📦 Utilisation de la Bibliothèque

### 1. Installation

```bash
npm install @edwyn-tech/design-system lit
```

### 2. Import des Tokens et Styles

Dans votre fichier d'entrée principal (ou point d'entrée CSS / JS) :

```ts
import '@edwyn-tech/design-system/tokens.css';
import '@edwyn-tech/design-system/typography.css';
```

### 3. Utilisation dans du HTML standard

```html
<script type="module">
  import '@edwyn-tech/design-system';
</script>

<edwyn-navbar active-href="/"></edwyn-navbar>

<edwyn-hero
  title="L'ESN"
  highlight="Alternative"
  subtitle="Une approche centrée sur l'humain, la transparence et l'excellence technique."
>
  <edwyn-badge slot="badge" variant="subtle" dot>
    Transparence totale &amp; Excellence technique
  </edwyn-badge>

  <div slot="actions">
    <edwyn-button variant="simulator" href="/simulateur" rounded>
      <edwyn-icon slot="prefix" name="sparkles" size="18"></edwyn-icon>
      Simulateur 🚀
    </edwyn-button>
    <edwyn-button variant="primary" href="/contact" rounded>
      Nous Rejoindre
      <edwyn-icon slot="suffix" name="arrow-right" size="18"></edwyn-icon>
    </edwyn-button>
  </div>
</edwyn-hero>

<edwyn-footer></edwyn-footer>
```

### 4. Utilisation avec Lit (Templates réactifs)

```ts
import { html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';
import '@edwyn-tech/design-system';

@customElement('my-feature')
export class MyFeature extends LitElement {
  override render() {
    return html`
      <edwyn-card>
        <h3 slot="title">Excellence Technique</h3>
        <p slot="description">Une culture craft au service de vos défis.</p>
        <edwyn-button
          slot="footer"
          variant="primary"
          @click=${() => console.log('Action')}
        >
          Découvrir
        </edwyn-button>
      </edwyn-card>
    `;
  }
}
```

### 5. Utilisation avec React, Vue ou Angular

Les composants étant des Web Components natifs standards, ils fonctionnent dans n'importe quel framework moderne sans adaptateur particulier :

```tsx
// React (React 19 supporte nativement les Web Components)
import '@edwyn-tech/design-system';

export function Header() {
  return <edwyn-navbar active-href="/" brand-name="EDWYN TECH" />;
}
```

---

## 🏛️ Architecture et Bonnes Pratiques

1. **Tokens CSS** :
   - Utilisez toujours les variables CSS standardisées `--edwyn-*` exposées dans `tokens.css`.
   - Fournissez toujours un fallback générique (`sans-serif`, `monospace`) pour les polices.

2. **Co-localisation des tests** :
   - Chaque composant dispose de sa suite de tests unitaire dédiée dans son répertoire (`src/components/<nom>/edwyn-<nom>.test.ts`).

3. **Génération des Manifestes IDE** :
   - La commande `npm run manifest` ou `npm run build` rafraîchit automatiquement `custom-elements.json` et `web-types.json` pour la complétion dans vos éditeurs.
