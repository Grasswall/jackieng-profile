import { TechnicalTranslation } from '@/components/TechnicalTranslation'
import { Accolades } from '@/components/Accolades'
import { DossierHero, LiteratureNote, Opportunity } from '@/components/ResearchDossier'
import './dossier.css'
import './protein-benchmark.css'
import { ProteinStudyLink } from '@/components/ProteinStudyLink'

export default function Home() {
  return <main className="talent-dossier">
    <DossierHero />
    <TechnicalTranslation />
    <ProteinStudyLink />
    <LiteratureNote />
    <Accolades curated />
    <Opportunity />
  </main>
}
