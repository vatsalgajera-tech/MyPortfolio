import { useEffect, useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { CalendarDays, GitBranch, Star, Users } from 'lucide-react'

const USERNAME = 'vatsalgajera-tech'

function formatEvent(event) {
  if (event.type === 'PushEvent') {
    return `Pushed ${event.payload.commits?.length || 0} commit${event.payload.commits?.length === 1 ? '' : 's'}`
  }
  if (event.type === 'PullRequestEvent') {
    return `${event.payload.action} a pull request`
  }
  if (event.type === 'IssueCommentEvent') {
    return 'Commented on an issue'
  }
  if (event.type === 'CreateEvent') {
    return `Created ${event.payload.ref_type}`
  }
  return event.type.replace('Event', '')
}

function timeAgo(dateString) {
  const date = new Date(dateString)
  const seconds = Math.floor((Date.now() - date.getTime()) / 1000)
  const ranges = [
    { label: 'y', value: 31536000 },
    { label: 'mo', value: 2592000 },
    { label: 'd', value: 86400 },
    { label: 'h', value: 3600 },
    { label: 'm', value: 60 },
  ]

  for (const range of ranges) {
    const amount = Math.floor(seconds / range.value)
    if (amount >= 1) return `${amount}${range.label} ago`
  }

  return 'just now'
}

export default function GithubHeatmap({ disableAnimations = false }) {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [profile, setProfile] = useState(null)
  const [events, setEvents] = useState([])
  const [starCount, setStarCount] = useState(0)

  useEffect(() => {
    let mounted = true

    async function loadGithubData() {
      try {
        setLoading(true)
        setError('')

        const [profileRes, eventsRes, reposRes] = await Promise.all([
          fetch(`https://api.github.com/users/${USERNAME}`),
          fetch(`https://api.github.com/users/${USERNAME}/events/public?per_page=8`),
          fetch(`https://api.github.com/users/${USERNAME}/repos?per_page=100&sort=updated`),
        ])

        if (!profileRes.ok || !eventsRes.ok || !reposRes.ok) {
          throw new Error('Failed to fetch latest GitHub activity')
        }

        const [profileJson, eventsJson, reposJson] = await Promise.all([
          profileRes.json(),
          eventsRes.json(),
          reposRes.json(),
        ])

        const stars = reposJson.reduce((total, repo) => total + repo.stargazers_count, 0)

        if (!mounted) return
        setProfile(profileJson)
        setEvents(eventsJson)
        setStarCount(stars)
      } catch (err) {
        if (!mounted) return
        setError(err.message || 'Unable to fetch GitHub data right now.')
      } finally {
        if (mounted) setLoading(false)
      }
    }

    loadGithubData()
    const refresh = setInterval(loadGithubData, 120000)

    return () => {
      mounted = false
      clearInterval(refresh)
    }
  }, [])

  const stats = useMemo(() => {
    if (!profile) return []
    return [
      { label: 'Followers', value: profile.followers, icon: Users },
      { label: 'Public Repos', value: profile.public_repos, icon: GitBranch },
      { label: 'Total Stars', value: starCount, icon: Star },
      { label: 'Member Since', value: new Date(profile.created_at).getFullYear(), icon: CalendarDays },
    ]
  }, [profile, starCount])

  if (loading) {
    return (
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-3">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-20 rounded-xl bg-slate-200/60 dark:bg-slate-800/70 animate-pulse" />
          ))}
        </div>
        <div className="space-y-2">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-14 rounded-xl bg-slate-200/60 dark:bg-slate-800/70 animate-pulse" />
          ))}
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="section-shell">
        <p className="text-sm text-rose-700 dark:text-rose-300">{error}</p>
        <p className="mono text-xs mt-2 opacity-70">GitHub API might be rate-limited temporarily.</p>
      </div>
    )
  }

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {stats.map((item, index) => {
          const Icon = item.icon
          return (
            <motion.div
              key={item.label}
              initial={disableAnimations ? false : { opacity: 0, y: 8 }}
              whileInView={disableAnimations ? undefined : { opacity: 1, y: 0 }}
              viewport={disableAnimations ? undefined : { once: true }}
              transition={disableAnimations ? undefined : { duration: 0.25, delay: index * 0.05 }}
              className="rounded-xl border border-slate-300/40 dark:border-slate-600/40 bg-white/60 dark:bg-slate-900/50 p-3"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="mono text-[10px] uppercase tracking-wider opacity-70">{item.label}</span>
                <Icon size={14} className="opacity-70" />
              </div>
              <p className="text-lg font-bold">{item.value}</p>
            </motion.div>
          )
        })}
      </div>

      <div className="space-y-2.5">
        {events.slice(0, 6).map((event, index) => (
          <motion.a
            key={event.id}
            href={`https://github.com/${event.repo.name}`}
            target="_blank"
            rel="noopener noreferrer"
            initial={disableAnimations ? false : { opacity: 0, x: -6 }}
            whileInView={disableAnimations ? undefined : { opacity: 1, x: 0 }}
            viewport={disableAnimations ? undefined : { once: true }}
            transition={disableAnimations ? undefined : { duration: 0.25, delay: index * 0.04 }}
            className="block rounded-xl border border-slate-300/40 dark:border-slate-600/40 bg-white/55 dark:bg-slate-900/45 p-3 hover:border-teal-500/60 hover:-translate-y-0.5 transition-all"
          >
            <div className="flex items-center justify-between gap-3">
              <p className="text-sm font-medium truncate">{event.repo.name}</p>
              <span className="mono text-[11px] opacity-70 whitespace-nowrap">{timeAgo(event.created_at)}</span>
            </div>
            <p className="text-xs mt-1 opacity-80">{formatEvent(event)}</p>
          </motion.a>
        ))}
      </div>
    </div>
  )
}
