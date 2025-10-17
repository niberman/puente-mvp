
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabaseClient'
import LessonCard from '@/components/LessonCard'
import JobCard from '@/components/JobCard'
import ProfileForm from '@/components/ProfileForm'

type Job = { id: number, title: string, company: string, location: string, pay?: string, english_level: string }

export default function Dashboard() {
  const [completed, setCompleted] = useState<number[]>([])
  const [jobs, setJobs] = useState<Job[]>([])

  useEffect(() => {
    ;(async () => {
      const { data } = await supabase.from('jobs').select('*').limit(5)
      setJobs(data || [])
    })()
  }, [])

  const lessons = [
    { id: 1, title: 'Greetings & Phone Etiquette', level: 'A2'},
    { id: 2, title: 'Customer Support Dialogues', level: 'B1'},
    { id: 3, title: 'Workplace Vocabulary (Front Desk)', level: 'B1'}
  ]

  async function completeLesson(id:number){
    setCompleted(prev => [...Array.from(new Set(prev.concat(id)))])
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return
    await supabase.from('lesson_progress').insert({ user_id: user.id, lesson_id: id, completed: true })
  }

  async function apply(job: Job){
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) { alert('Sign in to apply'); return }
    const { error } = await supabase.from('applications').insert({ user_id: user.id, job_id: job.id, status:'applied' })
    alert(error ? error.message : 'Applied!')
  }

  return (
    <div className="py-10 space-y-8">
      <ProfileForm />
      <section className="space-y-3">
        <div className="text-2xl font-bold">Lessons</div>
        {lessons.map(l=>(
          <LessonCard key={l.id} title={l.title} level={l.level} completed={completed.includes(l.id)} onStart={()=>completeLesson(l.id)} />
        ))}
      </section>

      <section className="space-y-3">
        <div className="text-2xl font-bold">Jobs matched for you</div>
        {jobs.length === 0 && <div className="text-slate-400">No jobs yet. Check back soon.</div>}
        {jobs.map(j => (
          <JobCard key={j.id} title={j.title} company={j.company} location={j.location} pay={j.pay} englishLevel={j.english_level} onApply={() => apply(j)} />
        ))}
      </section>
    </div>
  )
}
