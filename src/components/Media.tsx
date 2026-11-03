export interface MediaCard {id:string;type:'large'|'regular'|'text-only';title:string;outlet:string;badge?:string;photo?:string;description?:string}
export interface SpeakingEngagement {org:string;title:string}
export function Media({cards,speaking}:{cards:MediaCard[];speaking:SpeakingEngagement[]}){return <><section className="u-section u-section-field" aria-labelledby="media-heading"><h2 id="media-heading">Conversations beyond the bench.</h2><div className="proof-grid">{cards.map(card=><article key={card.id} className="proof-item">{card.photo&&(
// eslint-disable-next-line @next/next/no-img-element
<img src={card.photo} width="640" height="480" alt={`${card.outlet}: ${card.title}`} loading="lazy"/>
)}<h3>{card.title}</h3><p>{card.outlet}</p>{card.description&&<p>{card.description}</p>}</article>)}</div></section><section className="u-section u-section-cream"><h2>Speaking and participation.</h2><div className="u-records">{speaking.map(eng=><article key={eng.title}><h3>{eng.org}</h3><p>{eng.title}</p></article>)}</div></section></>}
