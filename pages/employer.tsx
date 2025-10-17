
import EmployerJobForm from '@/components/EmployerJobForm'
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabaseClient'

type Candidate = { id: string, full_name: string|null, english_level: string|null, experience: string|null }

export default function Employer() {
  const [cands, setCands] = useState<Candidate[]>([])

  useEffect(() => {
    ;(async () => {
      const { data } = await supabase.from('profiles').select('id, full_name, english_level, experience').limit(10)
      setCands(data || [])
    })()
  }, [])

  return (
    <div className="py-10 space-y-8">
      <EmployerJobForm />
      <section className="space-y-3">
        <div className="text-2xl font-bold">Prequalified candidates</div>
        {cands.length === 0 && <div className="text-slate-400">No candidates yet.</div>}
        <div className="grid md:grid-cols-2 gap-4">
          {cands.map(c => (
            <div key={c.id} className="card">
              <div className="font-semibold">{c.full_name || 'Candidate'}</div>
              <div className="text-sm text-slate-400">English: {c.english_level || 'Unknown'}</div>
              <div className="text-sm text-slate-300 mt-2 whitespace-pre-wrap">{c.experience || ''}</div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
