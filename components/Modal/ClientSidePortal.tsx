import { useRef, useEffect, useState } from 'react'
import { createPortal } from 'react-dom'

interface props {
  children: React.ReactNode,
  selector: string,
}

const ClientSidePortal: React.FC<props> = ({ children, selector }) => {
  const ref = useRef<Element | null>(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    ref.current = document.querySelector(selector)
    setMounted(true)
  }, [selector])

  return (mounted && ref.current) ? createPortal(children, ref.current) : null
}

export default ClientSidePortal
