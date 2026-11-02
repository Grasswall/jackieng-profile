import { DiscoveryPipeline } from '@/components/DiscoveryPipeline'
import { StructuralWork } from '@/components/StructuralWork'
import { Accolades } from '@/components/Accolades'
import { DossierHero, LiteratureNote, Opportunity } from '@/components/ResearchDossier'
import './dossier.css'

export default function Home() {
  return <main className="talent-dossier">
    <DossierHero />
    <StructuralWork />
    <DiscoveryPipeline />
    <LiteratureNote />
    <Accolades curated />
    <Opportunity />
  </main>
}
