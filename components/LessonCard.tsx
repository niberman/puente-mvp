
type Props = {
  title: string
  level: string
  onStart: () => void
  completed?: boolean
}
export default function LessonCard({ title, level, onStart, completed }: Props) {
  return (
    <div className="card flex items-start justify-between gap-3">
      <div>
        <div className="text-lg font-semibold">{title}</div>
        <div className="text-sm text-slate-400">Nivel: {level}</div>
        {completed && <div className="mt-1 text-xs text-green-400">Completado ✓</div>}
      </div>
      <button className="btn" onClick={onStart}>
        {completed ? 'Repasar' : 'Comenzar'}
      </button>
    </div>
  )
}
