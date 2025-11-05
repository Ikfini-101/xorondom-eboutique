# Carnet de Prompts — Xorondom · E‑Boutique (Windsurf)
_Date_: 2025-11-04 · _Niveau_: EL10 · _Sans argent_

## 0) Contexte global (copier-coller dans la section “Context” de Windsurf)
Projet **E‑Boutique**. Objectif: partir du **TDR** → produire un **PRD unique** → générer **contrats minimum** (OpenAPI/AsyncAPI) → implémenter des **micro‑fonctionnalités** avec **tests** jusqu’à une **fonctionnalité active, documentée, fonctionnelle**.
Périmètre prioritaire (**P0**): **Checkout**, **Paiements** (Mobile Money & Cartes/3DS), **Notifications**, **i18n/RTL**, **Accessibilité AA**, **SEO/PWA**.

**Documents de référence dans ce projet** (versions locales):
- `PRD_Xorondom_B.yml` (capabilités + stories Gherkin)
- `Xorondom_Contracts_and_MicroFunctions.yml` (OpenAPI, AsyncAPI, Micro‑fonctions)

**Contraintes générales** (à respecter dans toutes les tâches):
- Langage: **EL10** (français simple), FR‑SN, commentaires pédagogiques.
- **Aucun** détail d’argent (pas de budgets, pas de montants, pas d’indicateurs monétaires).
- **Sécurité**: TLS 1.3, **HMAC** pour webhooks, **3D Secure** pour cartes, respect **RGPD/Loi SN**.
- **Accessibilité**: **WCAG 2.1 AA** (contrastes, clavier, ALT, structure).
- **i18n**: **FR/AR/EN**, support **RTL** correct.
- **Tests**: unitaires (≥ cibles locales), + **E2E** minimal (parcours Mobile Money).
- **Aucune** clé secrète, **aucun** appel externe non simulé; utiliser des **mocks**.

**Stack cible (concrète, actionnable)**:
- **TypeScript + Node.js (Express)**, **Jest** pour unit tests, **Playwright** pour E2E, **Zod** pour validation d’entrées.
- Arborescence cible:
  ```text
  /src/
    controllers/
    services/
    domain/
    utils/
  /tests/
    /unit/
    /e2e/
  /seeds/
  ```

---

## 1) Prompt — Scaffolding du repo + dépendances minimales
```text
RÔLE: Tu es “Lead Dev TS” + “Architecte C4” + “Test Engineer” (EL10).
OBJECTIF: Initialiser le repo TypeScript/Express avec la structure suivante et scripts NPM.
CONTRAINTES: Pas d’appels externes; commentaires EL10; inclure config Jest + Playwright.
SORTIE ATTENDUE: Liste des fichiers créés/modifiés + contenu complet de chaque fichier.

Actions:
1. Crée package.json (scripts: build, dev, test:unit, test:e2e, lint).
2. Configure tsconfig.json, jest.config.ts, .eslintrc.json, .prettierrc.
3. Ajoute base Express: src/index.ts + src/app.ts (routes squelettes).
4. Ajoute utils/validations.ts (Zod) + utils/hmac.ts (signature/verify HMAC).
5. Ajoute seeds/seed.json (jeu minimal: 1 produit, 1 panier de test).
6. Ajoute tests/unit d’exemple (un test qui passe).
7. Ajoute tests/e2e/setup.ts et un test Playwright “sanity”.
8. Documente dans README.md: comment lancer dev, tests unit, tests e2e.

Rappels qualité: EL10, commentaires clairs, aucune clé secrète, mocks si besoin.
```

## 2) Prompt — Contrôleurs REST à partir d’OpenAPI
```text
RÔLE: “Designer d’API” + “Dev Express TS” + “Validator (Zod)”.
ENTRÉE: Le bloc OpenAPI dans `Xorondom_Contracts_and_MicroFunctions.yml`.
OBJECTIF: Générer des contrôleurs Express et des validateurs Zod correspondant aux routes:
- POST /checkout/validate
- POST /orders
- GET /orders/{id}
- POST /orders/{id}/status
- POST /payments
- POST /webhooks/payments
- POST /notify/email
- POST /notify/sms

CONTRAINTES: pas d’appels externes; structure Express standard; validation I/O avec Zod; réponses JSON EL10.
SORTIE: fichiers complets dans src/controllers/ + wiring dans src/app.ts.
Inclure stubs d’appels vers services (src/services/*.ts) que tu crées.
```

## 3) Prompt — Service “Create Order” (MF‑001) + tests unitaires
```text
RÔLE: “Domain Engineer” + “Test‑First”.
ENTRÉE: Spécification MF‑001 dans `Xorondom_Contracts_and_MicroFunctions.yml`.
OBJECTIF: Implémenter src/services/order.service.ts – fonction createOrder(inputs) respectant invariants.
INVARIANTS: total >= 0 ; status ∈ {'cree','payee'} ; pas de persistance externe (in‑memory ok).
TESTS: Crée tests/unit/order.service.spec.ts couvrant cas nominal + cas d’erreur (EL10).
SORTIE: fichiers complets + explication EL10 brève en commentaires.
```

## 4) Prompt — Service “Create Payment Intent” (MF‑002) + tests unitaires
```text
RÔLE: “Dev Paiements” + “Sécurité (3DS)” + “Test‑First”.
ENTRÉE: MF‑002 (inputs/outputs/invariants) + OpenAPI /payments.
OBJECTIF: Implémenter src/services/payment.service.ts – createPaymentIntent(order_id, method).
CONTRAINTES: method ∈ {'mobile_money','card'} ; simuler gateway (mock); pas de clés/externes.
TESTS: tests/unit/payment.service.spec.ts ; couvrir mobile_money et card (3DS simulé).
SORTIE: fichiers + mocks + commentaires EL10.
```

## 5) Prompt — Vérif Webhook HMAC + Idempotence (MF‑003) + tests
```text
RÔLE: “Security Engineer” + “Reliability”.
ENTRÉE: MF‑003 + route /webhooks/payments.
OBJECTIF: Implémenter src/services/webhook.service.ts – verifyWebhook(headers, body) + handlePaymentEvent.
CONTRAINTES: Rejeter signature invalide; éviter le double traitement (idempotence mémoire).
TESTS: tests/unit/webhook.service.spec.ts (signature valide/invalide, double livraison).
SORTIE: code complet + commentaires EL10 (HMAC expliqué simplement).
```

## 6) Prompt — Update Order Status + Receipt (MF‑004) + tests
```text
RÔLE: “Order Lifecycle” + “Doc EL10”.
ENTRÉE: MF‑004 ; événement payment.succeeded (AsyncAPI).
OBJECTIF: Implémenter src/services/order-status.service.ts – updateOrderOnPayment + generateReceipt.
CONTRAINTES: si payment_status='succeeded' => order_status='payee' ; reçu = objet JSON simple.
TESTS: tests/unit/order-status.service.spec.ts (succès/erreur).
SORTIE: fichiers complets + exemples EL10.
```

## 7) Prompt — Notifications Email/SMS (MF‑005) + tests
```text
RÔLE: “Messaging Engineer” + “Test‑First”.
ENTRÉE: MF‑005 ; routes /notify/email et /notify/sms.
OBJECTIF: Implémenter src/services/notify.service.ts – sendNotifications(order_id, channels).
CONTRAINTES: channels ⊆ {'email','sms'} ; simuler en file d’attente mémoire (log structuré).
TESTS: tests/unit/notify.service.spec.ts (email seul, sms seul, les deux, erreur).
SORTIE: code + tests + mocks + commentaires EL10.
```

## 8) Prompt — Test E2E scénario Mobile Money (Playwright)
```text
RÔLE: “QA E2E” + “Anti‑régression”.
OBJECTIF: Écrire un test Playwright simulant: checkout → create order → create payment intent (mobile_money) → webhook HMAC → statut 'payee' → notification envoyée.
CONTRAINTES: pas d’appels externes; mocks; assertions EL10.
SORTIE: tests/e2e/payment.mobilemoney.spec.ts complet + script npm 'test:e2e'.
```

## 9) Prompt — Seeds + Données de démonstration
```text
RÔLE: “Data Seeding”.
OBJECTIF: Remplir seeds/seed.json (1 produit, 1 panier, 1 commande) + script d’initialisation 'npm run seed'.
SORTIE: code du script (Node TS) + mise à jour README.md (EL10).
```

## 10) Prompt — A11Y AA + i18n/RTL + Docs (Formation & Runbook)
```text
RÔLE: “Accessibilité” + “i18n/RTL” + “Rédacteur EL10”.
OBJECTIF: 
1) Générer a11y_checklist.md (WCAG 2.1 AA basique) adaptée aux écrans checkout/paiement/confirmation.
2) Ajouter un audit rapide du clavier + focus visible + ALT images.
3) Générer FORMATION_EL10.md (1 page pas-à-pas) et RUNBOOKS.md (procédures: démarrer, logs, redémarrer).

CONTRAINTES: EL10, pas d’argent, exemples concrets.
SORTIE: 3 fichiers complets.
```

---

### Conseils d’utilisation (Windsurf)
- Colle le **Contexte global** dans la zone “Context”.
- Choisis une carte (1→10), colle le prompt dans “Message” et exécute.
- Vérifie que la sortie contient **les fichiers complets**, pas seulement des diffs.
- Avance **carte par carte** jusqu’à obtenir le parcours E2E vert.
