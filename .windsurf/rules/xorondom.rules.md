# Contexte global — Xorondom · E‑Boutique (EL10)
Date: 2025-11-04

But: partir du **TDR** → produire un **PRD unique** → générer **contrats minimum** (OpenAPI/AsyncAPI) → implémenter des **micro‑fonctionnalités** avec **tests** jusqu’à une **fonctionnalité active, documentée, fonctionnelle**.

Périmètre **P0**: Checkout · Paiements (Mobile Money & Cartes/3DS) · Notifications · i18n/RTL · Accessibilité **WCAG 2.1 AA** · **SEO/PWA**.

Références locales:
- `PRD_Xorondom_B.yml`
- `Xorondom_Contracts_and_MicroFunctions.yml`

Règles générales (à appliquer dans toutes les tâches):
- **EL10** (français simple), FR‑SN; commentaires pédagogiques.
- **Aucun** détail d’argent (pas de budgets, pas de montants, pas de KPI monétaires).
- **Sécurité**: TLS 1.3, Webhooks **HMAC**, **3D Secure** pour cartes, **RGPD/Loi SN**.
- **Accessibilité**: contrastes, navigation clavier, ALT images, structure sémantique.
- **i18n**: FR/AR/EN, support **RTL** correct.
- **Tests**: unitaires + **E2E** minimal (parcours Mobile Money).
- **Pas de clés** ni d’appels externes non simulés; utiliser des **mocks**.
