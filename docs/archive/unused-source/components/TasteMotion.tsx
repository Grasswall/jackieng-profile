"use client"
import { useEffect } from 'react'
export function TasteMotion(){useEffect(()=>{
 const root=document.querySelector('.taste-restored');if(!root)return
 const media=matchMedia('(prefers-reduced-motion: reduce)')
 const observed=root.querySelectorAll('.translation-story h2,.translation-steps li,.structural-work h2,.structural-work figure,.benchmark-teaser-inner>*,#proof li,.dossier-literature>*,.dossier-opportunity>*')
 const observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting&&!media.matches)e.target.animate([{opacity:.35,transform:'translateY(22px)'},{opacity:1,transform:'translateY(0)'}],{duration:650,easing:'cubic-bezier(.2,.7,.2,1)'});if(e.isIntersecting)observer.unobserve(e.target)}),{threshold:.12})
 observed.forEach(el=>observer.observe(el));return ()=>observer.disconnect()
 },[]);return null}
