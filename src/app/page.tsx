import { TechnicalTranslation } from '@/components/TechnicalTranslation'
import { Accolades } from '@/components/Accolades'
import { DossierHero, LiteratureNote, Opportunity } from '@/components/ResearchDossier'
import './dossier.css'

export default function Home() {
  return <main className="talent-dossier">
    <DossierHero />
    <TechnicalTranslation />
    <LiteratureNote />
    <Accolades curated />
    <Opportunity />
  </main>
}
