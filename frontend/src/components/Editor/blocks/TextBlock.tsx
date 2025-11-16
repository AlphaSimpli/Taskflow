import React, { useRef } from 'react'
import { Block } from '../../../store/editorStore'
import { useEditorStore } from '../../../store/editorStore'

const TextBlock: React.FC<{ block: Block }> = ({ block }) => {
  const update = useEditorStore(s => s.updateBlock)
  const ref = useRef<HTMLDivElement | null>(null)

  const onInput = (e: React.FormEvent<HTMLDivElement>) => {
    update(block.id, { content: (e.target as HTMLDivElement).innerText })
  }

  const onKeyDown = (e: React.KeyboardEvent) => {
    // Slash command
    if (e.key === '/' && (e.target as HTMLDivElement).innerText.trim() === '') {
      // TODO: open slash menu at this block
    }

    // Markdown shortcuts
    if (e.key === 'Enter') {
      const text = ref.current?.innerText || ''
      if (text.startsWith('# ')) {
        update(block.id, { type: 'heading', content: text.replace(/^#\s+/, '') })
        e.preventDefault()
      }
      if (text.startsWith('- ')) {
        update(block.id, { type: 'todo', content: text.replace(/^-\s+/, ''), checked: false })
        e.preventDefault()
      }
    }
  }

  return (
    <div
      ref={ref}
      contentEditable
      suppressContentEditableWarning
      onInput={onInput}
      onKeyDown={onKeyDown}
      className="min-h-[1.4rem] outline-none"
    >
      {block.content}
    </div>
  )
}

export default TextBlock
