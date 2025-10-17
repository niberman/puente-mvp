
import { useState } from 'react'
import { supabase } from '@/lib/supabaseClient'

export default function EmployerJobForm() {
  const [form, setForm] = useState({ title:'Bilingual Customer Support', company:'ACME Co', location:'Denver, CO', pay:'$20/hr', english_level:'B1' })
  const [loading, setLoading] = useState(false)

  async function createJob() {
    setLoading(true)
  }
  return (
    <div className="card">
      <div className="font-semibold mb-3">Post a Job</div>
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="label">Job title</label>
          <input className="input" value={form.title} onChange={e=>setForm({...form, title:e.target.value})}/>
        </div>
        <div>
          <label className="label">Company</label>
          <input className="input" value={form.company} onChange={e=>setForm({...form, company:e.target.value})}/>
        </div>
        <div>
          <label className="label">Location</label>
          <input className="input" value={form.location} onChange={e=>setForm({...form, location:e.target.value})}/>
        </div>
        <div>
          <label className="label">Pay (optional)</label>
          <input className="input" value={form.pay} onChange={e=>setForm({...form, pay:e.target.value})}/>
        </div>
        <div>
          <label className="label">Required English level</label>
          <select className="input" value={form.english_level} onChange={e=>setForm({...form, english_level:e.target.value})}>
            {['A1','A2','B1','B2','C1','C2'].map(l=> <option key={l} value={l}>{l}</option>)}
          </select>
        </div>
      </div>
      <div className="mt-4">
        <button className="btn" onClick={async ()=>{
          setLoading(true)
          const { error } = await supabase.from('jobs').insert(form)
          setLoading(false)
          alert(error ? error.message : 'Job posted')
        }} disabled={loading}>{loading ? 'Posting...' : 'Post job'}</button>
      </div>
    </div>
  )
}
