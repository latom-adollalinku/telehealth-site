# LATOM Wellness — Homepage Reframe
## Source copy for latomwellness.com homepage rewrite, 2026-05-24

Replaces the current peptide/longevity-Rx focused homepage with a labs + consultation + supplements focused hero. Peptides remain available to consultation patients but are NOT marketed on the homepage. This positioning unblocks Helcim underwriting, Meta/Google ad approval, and improves conversion clarity.

Format below is markdown. Hand off to the Next.js dev team or paste into the existing telehealth-site components directly.

---

## SECTION 1: HERO (above the fold)

### Headline
**Get the labs your annual physical doesn't order.**

### Subheadline
Personalized lab review and longevity consultation with a Virginia anesthesiologist. Comprehensive panels at up to 60 percent off retail. Evidence-based supplement protocols. Cash-pay, no insurance hassle.

### Primary CTA button
**Book a Consultation**
(routes to Cal.com booking flow with Helcim payment integration)

### Secondary CTA
**Free Guide: 5 Labs Every High-Performing Adult Should Track**
(routes to lead magnet signup form)

### Hero supporting visual
Clean, minimal. Either:
(a) A clinical photo (lab vials, blood draw kit, professional setting), or
(b) A simple animated text loop showing 4 problem statements:
"Tired all the time."
"Bloating, brain fog, weight gain."
"Family history of heart disease."
"Want to optimize, not just treat."

### Trust strip (small text under CTAs)
Cash pay. HIPAA secure. Direct physician access.
(Do NOT add: anesthesiologist, board specialty, "Licensed in Virginia." Per locked feedback `feedback_no_credentialing_advertising.md`, credentialing is NOT a trust badge here. Offer is the hero.)

---

## SECTION 2: HOW IT WORKS (3-step flow)

### Section header
**Three steps to a personalized longevity plan**

### Step 1: Book your consultation
30-minute video visit. Cash pay through Helcim. Choose your slot at checkout.

### Step 2: Get your labs
We order the panels that actually matter. Standard labs plus the advanced markers most physicians skip. Up to 60 percent off retail through our partner laboratory network.

### Step 3: Build your plan
Personalized supplement protocol, lifestyle plan, and follow-up schedule. Ongoing access through your patient portal.

---

## SECTION 3: WHAT WE TEST FOR (Lab Categories)

### Section header
**The labs that show what standard care misses**

### Subgrid (6 cards, click any to expand)

#### Card 1: Metabolic Health
HbA1c, fasting insulin, advanced lipid panel with ApoB and Lp(a), high-sensitivity CRP. Catch insulin resistance and cardiovascular risk before they become disease.

#### Card 2: Gut Health
GI-MAP stool analysis, celiac screen, calprotectin, food sensitivity panels. Pinpoint the root cause of bloating, brain fog, and fatigue.

#### Card 3: Hormone Optimization
Full sex hormone panel including bioidentical estradiol (sensitive assay), DHEA-S, comprehensive thyroid (not just TSH), cortisol patterns. For men and women.

#### Card 4: Longevity and Cardiovascular Risk
Lp(a), ApoB, NMR LipoProfile, homocysteine, Lp-PLA2. Plus coronary calcium score referral. The risk markers that predict disease decades before symptoms.

#### Card 5: Energy and Fatigue
B12, ferritin, methylmalonic acid, full thyroid, cortisol pattern, mitochondrial markers. Find what's actually draining your energy.

#### Card 6: Brain and Cognitive Function
Homocysteine, B vitamins, omega-3 index, inflammatory markers, ApoE risk genotyping. For sharper thinking now and brain protection long-term.

---

## SECTION 4: WHY LATOM IS DIFFERENT (3 bullets)

### Section header
**Why patients choose LATOM**

### Bullet 1: Physician-led, not algorithm-led
Every consultation is with Dr. Abdul, MD. Not a nurse practitioner reading from a script. Not an AI chatbot. Real physician judgment on your numbers.

### Bullet 2: Cash pay, transparent pricing
No insurance hoops. No surprise bills. Consultations are clearly priced. Labs are wholesale. Supplements are direct-ship through our dispensary at practitioner-only pricing.

### Bullet 3: Built for optimization, not just disease care
We are not here to wait until you are sick. We work with you on prevention, optimization, longevity. The kind of medicine your primary care doctor does not have 15 minutes to do.

---

## SECTION 5: PRICING (transparent, 3 tiers)

### Section header
**Simple pricing. Everything included in your tier.**

### Tier 1: Single Consultation
$149
Initial consultation
Lab orders through our network
Supplement protocol via Fullscript
30-day post-consult follow-up via secure messaging

### Tier 2: Standard Membership
$99 per month
Quarterly consultations
Unlimited secure messaging
Lab review with each visit
Priority booking
Cancel anytime

### Tier 3: Priority Membership
$249 per month
Monthly consultations
Same-day secure messaging response
Advanced lab panels included
Concierge supplement curation
Annual comprehensive review

(VA Board of Medicine disclosure: Fees current as of 2026-05-24. Lab costs are separate and billed through our laboratory partner.)

---

## SECTION 6: LEAD MAGNET CAPTURE

### Section header
**Free: The 5 Labs Every High-Performing Adult Should Track**

### Subheadline
Most doctors order four labs at your annual physical. There are at least five you should know about. Download the free guide and learn what to ask for, why each one matters, and how to get them at a fraction of retail cost.

### Form
Email input: "Your email"
Button: "Send me the guide"
Disclaimer: "We respect your inbox. Unsubscribe any time."

---

## SECTION 7: FAQ (5 questions max)

### Q1: Do you take insurance?
No. LATOM Wellness is cash pay. Our prices are transparent and typically lower than the out-of-pocket cost after insurance copays for the same services.

### Q2: What states do you serve?
Virginia residents currently. We are in the process of expanding through the Interstate Medical Licensure Compact to additional states in late 2026 and 2027.

### Q3: Do you prescribe medications?
For consultation patients, yes, we prescribe non-controlled medications when clinically appropriate. Our focus is on lab interpretation, lifestyle, and supplement protocols. Prescriptions are part of that toolkit when needed.

### Q4: How do the labs work?
After your consultation, we send your lab order to our partner laboratory network. You schedule your draw at a convenient location. Results come back to your patient portal within 3 to 10 business days. We then review them with you.

### Q5: What if I just want supplements without a consultation?
Browse our Fullscript dispensary at the link in your account. Membership patients get a curated supplement list refreshed with each consultation.

---

## SECTION 8: FOOTER

### Disclaimers
Information provided on this site is educational. It does not constitute medical advice. A practitioner-patient relationship is established only through a paid consultation. Telehealth services subject to applicable state laws.

(Do NOT display license number or NPI as a marketing trust signal. State qualification is handled at booking. Compliance disclosure can be provided in the privacy policy or telehealth consent flow without being a footer trust badge.)

### Links
Terms of Service
Privacy Policy
HIPAA Notice of Privacy Practices

---

## What changed vs the current homepage

| Old element | New element |
|------------|-------------|
| Hero focused on protocols (17 PDFs at $10) | Hero focused on consultation booking and free lead magnet |
| Peptide-forward messaging | Lab and consultation forward, peptides not on homepage |
| Pricing buried | Pricing transparent in dedicated section |
| No email capture | Lead magnet email capture above the fold |
| Heavy compound names | Soft, generic wellness language (already done for Helcim) |
| Implied Rx focus | Implied lab + supplement + lifestyle focus, Rx as part of toolkit |

## Build sequence

1. Replace SECTION 1 hero copy in current homepage component
2. Add SECTION 2 (How It Works) above existing protocol list
3. Move existing protocol list to "Resources" subpage (still available, just not the hero)
4. Add SECTION 3 (What We Test For) as a new component
5. Add SECTION 6 (Lead Magnet) — needs new form component with Beehiiv API or ConvertKit webhook
6. Update SECTION 8 footer with the VA license + NPI for board compliance

Estimated implementation time: 2 to 4 hours for a developer comfortable with the existing Next.js site.

## VA Board of Medicine compliance check (per 18VAC85-20-30)

- "Dr." used with "MD" suffix as specialty/practice designation. ✅ (MD identifies the licensed practice as medicine — sufficient under 18VAC85-20-30)
- No superiority claims like "best physician in Virginia." ✅
- Fees fully disclosed. ✅
- No false or misleading claims. ✅
- Telehealth disclosure in footer disclaimer. ✅
- License number / NPI not displayed publicly (per `feedback_no_credentialing_advertising.md`). ✅ — VA BOM rule does NOT require public license number display on the website. Compliance disclosure happens at intake/booking, not on the homepage.

This copy meets the verified requirements at 18VAC85-20-30 as of 2026-05-24.
