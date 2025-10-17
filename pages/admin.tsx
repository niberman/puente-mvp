
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabaseClient'

type Profile = { id: string, full_name: string|null, english_level: string|null }
type Job = { id:number, title:string, company:string, english_level:string }

export default function Admin() {
  const [profiles, setProfiles] = useState<Profile[]>([])
  const [jobs, setJobs] = useState<Job[]>([])

  useEffect(() => {
    ;(async () => {
      const { data: p } = await supabase.from('profiles').select('id, full_name, english_level').limit(50)
      setProfiles(p || [])
      const { data: j } = await supabase.from('jobs').select('*').limit(50)
      setJobs(j || [])
    })()
  }, [])

  async function match(user_id:string, job_id:number) {
    const { error } = await supabase.from('matches').insert({ user_id, job_id, status: 'recommended' })
    alert(error ? error.message : 'Match created')
  }

  return (
    <div className="py-10 grid md:grid-cols-2 gap-6">
      <div className="space-y-3">
        <div className="text-2xl font-bold">Learners</div>
        {profiles.map(p => (
          <div key={p.id} className="card">
            <div className="font-semibold">{p.full_name || 'Learner'}</div>
            <div className="text-sm text-slate-400">English: {p.english_level || 'Unknown'}</div>
          </div>
        ))}
      </div>
      <div className="space-y-3">
        <div className="text-2xl font-bold">Jobs</div>
        {jobs.map(j => (
          <div key={j.id} className="card flex items-center justify-between">
            <div>
              <div className="font-semibold">{j.title}</div>
              <div className="text-sm text-slate-400">{j.company} · Required English {j.english_level}</div>
            </div>
            <button className="btn" onClick={()=>{
              const user_id = prompt('Enter learner user_id to match:')
              if (user_id) match(user_id, j.id)
            }}>Recommend</button>
          </div>
        ))}
      </div>
    </div>
  )
}
