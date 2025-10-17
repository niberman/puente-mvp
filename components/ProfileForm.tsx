
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabaseClient'

export default function ProfileForm() {
  const [form, setForm] = useState({ full_name: '', spanish_level: 'Nativo', english_level: 'A2', experience: '' })
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    ;(async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return
      const { data } = await supabase.from('profiles').select('*').eq('id', user.id).maybeSingle()
      if (data) setForm({
        full_name: data.full_name || '',
        spanish_level: data.spanish_level || 'Nativo',
        english_level: data.english_level || 'A2',
        experience: data.experience || ''
      })
    })()
  }, [])

  async function save() {
    setLoading(true)
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) { alert('Not signed in'); setLoading(false); return }
    const { error } = await supabase.from('profiles').upsert({ id: user.id, ...form })
    setLoading(false)
    alert(error ? error.message : 'Saved')
  }

  return (
    <div className="card">
      <div className="font-semibold mb-3">Your Profile</div>
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="label">Full name</label>
          <input className="input" value={form.full_name} onChange={e=>setForm({...form, full_name:e.target.value})}/>
        </div>
        <div>
          <label className="label">English level</label>
          <select className="input" value={form.english_level} onChange={e=>setForm({...form, english_level:e.target.value})}>
            {['A1','A2','B1','B2','C1','C2'].map(l=> <option key={l} value={l}>{l}</option>)}
          </select>
        </div>
        <div>
          <label className="label">Spanish level</label>
          <select className="input" value={form.spanish_level} onChange={e=>setForm({...form, spanish_level:e.target.value})}>
            {['Principiante','Intermedio','Avanzado','Nativo'].map(l=> <option key={l} value={l}>{l}</option>)}
          </select>
        </div>
        <div className="md:col-span-2">
          <label className="label">Experience (brief)</label>
          <textarea className="input min-h-[100px]" value={form.experience} onChange={e=>setForm({...form, experience:e.target.value})}/>
        </div>
      </div>
      <div className="mt-4">
        <button className="btn" onClick={save} disabled={loading}>{loading ? 'Saving...' : 'Save profile'}</button>
      </div>
    </div>
  )
}
