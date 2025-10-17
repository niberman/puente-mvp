import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabaseClient'
import LessonCard from '@/components/LessonCard'

export default function Aprendices() {
  const [completed, setCompleted] = useState<number[]>([])

  const lessons = [
    { id: 1, title: 'Greetings & Phone Etiquette', level: 'A2'},
    { id: 2, title: 'Customer Support Dialogues', level: 'B1'},
    { id: 3, title: 'Workplace Vocabulary (Front Desk)', level: 'B1'}
  ]

  async function completeLesson(id: number) {
    setCompleted(prev => [...new Set(prev.concat(id))])
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      // If user is not signed in, just mark as completed locally
      return
    }
    await supabase.from('lesson_progress').insert({ user_id: user.id, lesson_id: id, completed: true })
  }

  return (
    <div className="py-10 space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold">
          Módulos de Aprendizaje
        </h1>
        <p className="text-slate-300 text-lg max-w-2xl mx-auto">
          Mejora tu inglés con lecciones cortas y prácticas diseñadas para el mundo laboral.
        </p>
      </div>

      <section className="space-y-4">
        <div className="text-2xl font-bold">Lecciones Disponibles</div>
        <p className="text-slate-400">
          Completa estas lecciones para mejorar tu nivel de inglés y acceder a mejores oportunidades laborales.
        </p>
        {lessons.map(l => (
          <LessonCard 
            key={l.id} 
            title={l.title} 
            level={l.level} 
            completed={completed.includes(l.id)} 
            onStart={() => completeLesson(l.id)} 
          />
        ))}
      </section>

      <div className="text-center pt-8">
        <p className="text-slate-400 mb-4">
          ¿Listo para encontrar trabajo?
        </p>
        <a 
          href="/dashboard" 
          className="btn"
        >
          Ver Oportunidades de Trabajo
        </a>
      </div>
    </div>
  )
}