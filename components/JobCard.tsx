
type Props = {
  title: string
  company: string
  location: string
  pay?: string
  englishLevel: string
  onApply: () => void
}
export default function JobCard({ title, company, location, pay, englishLevel, onApply }: Props) {
  return (
    <div className="card">
      <div className="flex items-center justify-between">
        <div>
          <div className="font-semibold text-lg">{title}</div>
          <div className="text-slate-400 text-sm">{company} · {location}</div>
          <div className="text-slate-400 text-sm">Required English: {englishLevel}{pay ? ` · Pay: ${pay}` : ''}</div>
        </div>
        <button className="btn" onClick={onApply}>Apply</button>
      </div>
    </div>
  )
}
