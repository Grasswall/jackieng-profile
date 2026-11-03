import { TechnicalTranslation } from '@/components/TechnicalTranslation'
import { DiscoveryPipeline } from '@/components/DiscoveryPipeline'
import { Accolades } from '@/components/Accolades'
import { LiteratureNote, Opportunity } from '@/components/ResearchDossier'
import { FounderLens } from '@/components/motion/FounderLens'
import { ResearchEvidence } from '@/components/ResearchEvidence'
import { StructuralWork } from '@/components/StructuralWork'
import { TasteMotion } from '@/components/TasteMotion'
import './dossier.css'
import './protein-benchmark.css'
import './taste-restored.css'
import './interactive-hero.css'
import { ProteinStudyLink } from '@/components/ProteinStudyLink'

export default function Home() {
  return <main className="talent-dossier taste-restored" data-visual-release="interactive-lens">
    <FounderLens />
    <ResearchEvidence />
    <DiscoveryPipeline />
    <TechnicalTranslation />
    <StructuralWork expanded />
    <ProteinStudyLink />
    <LiteratureNote />
    <Accolades />
    <Opportunity />
    <TasteMotion />
  </main>
}
