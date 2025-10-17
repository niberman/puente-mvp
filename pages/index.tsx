// pages/index.tsx
import Link from 'next/link'

export default function Home() {
  return (
    <div className="container py-20">
      <div className="mx-auto max-w-4xl text-center">
        <h1 className="text-4xl md:text-6xl font-bold leading-tight">
          Puente
        </h1>
        <p className="text-slate-300 mt-3">
          English learning & bilingual hiring — simple, fast, effective.
        </p>
        <p className="text-slate-300 mt-3">
          Aprendizaje de inglés y contratación bilingüe: simple, rápido y efectivo.

        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6 mt-16">
        {/* Learner (Spanish) */}
        <div className="card flex flex-col items-start">
          <h2 className="text-2xl font-bold">
            ¿Eres aprendiz que quiere mejorar su inglés para trabajar?
          </h2>
          <p className="text-slate-300 mt-2">
            Lecciones cortas, progreso claro y oportunidades laborales para hispanohablantes.
          </p>
          <Link href="/aprendices" className="btn mt-6">
            Sí, soy aprendiz
          </Link>
        </div>

        {/* Employer (English) */}
        <div className="card flex flex-col items-start">
          <h2 className="text-2xl font-bold">
            Are you an employer looking for bilingual talent?
          </h2>
          <p className="text-slate-300 mt-2">
            Post jobs and discover pre-qualified Spanish-English candidates.
          </p>
          <Link href="/employers" className="btn mt-6">
            I’m an employer
          </Link>
        </div>
      </div>

      <div className="mt-14 text-center text-sm text-slate-400">
        Choose your path to continue.
      </div>
    </div>
  )
}