import Link from 'next/link'
import Image from 'next/image'
import { BASE } from './motion/motionUtils'
const items=[
 {title:'Lindau',desc:'Nobel Laureate Meeting · selected participant',image:'lindau-1.jpg'},
 {title:'Shaw Prize Forum',desc:'Academic representative · Laureates Roundtable',image:'shaw-1.jpg'},
 {title:'RTHK',desc:'尋找創科的故事 · featured',image:'rthk-broadcast.jpg'},
]
export function UnifiedProof(){return <section id="proof" className="u-section u-section-cream"><p className="u-kicker">Beyond the lab</p><h2>Science in company.</h2><div className="proof-grid">{items.map(item=><figure key={item.title} className="proof-item"><Image src={`${BASE}/images/gallery/${item.image}`} width="640" height="480" alt={`${item.title} · event photograph`} loading="lazy"/><figcaption><h3>{item.title}</h3><p>{item.desc}</p></figcaption></figure>)}</div><Link href="/speaking" className="benchmark-link">Speaking, media and scientific participation ↗</Link></section>}
