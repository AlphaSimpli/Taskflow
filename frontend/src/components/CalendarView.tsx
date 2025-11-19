import React, { useEffect, useState } from 'react'
import { Calendar, dateFnsLocalizer, Views } from 'react-big-calendar'
import { parseISO } from 'date-fns'
import format from 'date-fns/format'
import getDay from 'date-fns/getDay'
import startOfWeek from 'date-fns/startOfWeek'
import enUS from 'date-fns/locale/en-US'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import api from '../services/api'
import { motion } from 'framer-motion'

const locales = { 'en-US': enUS }
const localizer = dateFnsLocalizer({ format, parse: (str, _fmt) => parseISO(str), startOfWeek, getDay, locales })

interface TaskEvent {
  id: number
  title: string
  start: Date
  end: Date
  allDay?: boolean
  resource?: any
}

export default function CalendarView() {
  const [events, setEvents] = useState<TaskEvent[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchTasks()
  }, [])

  const fetchTasks = async () => {
    try {
      setLoading(true)
      const res = await api.get('/admin/tasks', { params: { per_page: 1000 } })
      const items = res.data?.items || []
      const ev = items.map((t: any) => {
        const start = t.scheduled_day ? new Date(t.scheduled_day) : new Date(t.due_date || t.created_at)
        const end = t.due_date ? new Date(t.due_date) : new Date(start)
        return {
          id: t.id,
          title: t.title,
          start,
          end,
          resource: t
        }
      })
      setEvents(ev)
    } catch (err) {
      console.error('Failed to load calendar tasks', err)
    } finally {
      setLoading(false)
    }
  }

  const eventStyleGetter = (event: any) => {
    const status = event.resource?.status || 'todo'
    const bg = status === 'done' ? '#D1FAE5' : status === 'in_progress' ? '#E0E7FF' : '#FEF3C7'
    const color = status === 'done' ? '#065F46' : status === 'in_progress' ? '#3730A3' : '#92400E'
    return { style: { backgroundColor: bg, color, borderRadius: 12, padding: '4px 8px', border: 'none' } }
  }

  const onSelectEvent = (event: any) => {
    // Simple modal: alert for now — can be replaced with a styled modal
    const t = event.resource
    alert(`${t.title}\nStatus: ${t.status}\nDue: ${t.due_date || '—'}\nScheduled: ${t.scheduled_day || '—'}`)
  }

  return (
    <div className="bg-white rounded-2xl shadow p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">Calendar</h3>
      </div>
      {loading ? (
        <div className="text-sm text-gray-500">Loading calendar...</div>
      ) : (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <Calendar
            localizer={localizer}
            events={events}
            startAccessor="start"
            endAccessor="end"
            style={{ height: 600 }}
            views={[Views.MONTH, Views.WEEK, Views.DAY]}
            onSelectEvent={onSelectEvent}
            eventPropGetter={eventStyleGetter}
          />
        </motion.div>
      )}
    </div>
  )
}
