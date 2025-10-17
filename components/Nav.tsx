
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabaseClient'

export default function Nav() {
  const [signedIn, setSignedIn] = useState(false)

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => setSignedIn(!!data.session))
    const { data: sub } = supabase.auth.onAuthStateChange((_e, session) => setSignedIn(!!session))
    return () => { sub.subscription.unsubscribe() }
  }, [])

  return (
    <nav className="container py-4 flex items-center justify-between">
      <Link href="/" className="font-bold text-xl">Puente</Link>
      <div className="flex gap-3">
        <Link href="/dashboard" className="hover:underline">Learner</Link>
        <Link href="/employer" className="hover:underline">Employer</Link>
        <Link href="/admin" className="hover:underline">Admin</Link>
        {signedIn ? (
          <button className="btn" onClick={async () => { await supabase.auth.signOut() }}>Sign out</button>
        ) : (
          <button className="btn" onClick={async () => {
            const email = prompt('Enter email for magic link login:')
            if (!email) return
            const { error } = await supabase.auth.signInWithOtp({ email })
            alert(error ? 'Login error: ' + error.message : 'Check your email for a magic link.')
          }}>Sign in</button>
        )}
      </div>
    </nav>
  )
}
