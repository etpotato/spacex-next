import { KeyboardEventHandler, MouseEventHandler, useState, useEffect, Dispatch } from 'react'
import ClientSidePortal from './ClientSidePortal'
import Cross from '../Icons/Cross'

interface props {
  children: React.ReactNode,
  open: boolean,
  setOpen: Dispatch<boolean>
}

const Modal: React.FC<props> = ({ children, open, setOpen }) => {
  const handleClose: MouseEventHandler = (evt) => {
    evt.preventDefault()
    setOpen(false)
  }

  useEffect(() => {
    const handleEsc = (evt: KeyboardEvent) => {
      if (['Ecs', 'Escape'].some(key => key === evt.key)) {
        setOpen(false)
      }
    }

    if (open) document.addEventListener('keydown', handleEsc)
    else document.removeEventListener('keydown', handleEsc)
    return () => document.removeEventListener('keydown', handleEsc)
  }, [open, setOpen])

  return open
    ? (
      <ClientSidePortal selector='#modal'>
        <div className='fixed grid place-content-center overscroll-contain inset-0 overflow-hidden'>
          <div className='fixed inset-0 backdrop-blur-sm bg-black bg-opacity-60'
            onClick={handleClose}></div>
          <div className='relative max-h-full overflow-y-auto select-none'>
            { children }
          </div>
          <button
            className='group text-white absolute top-4 right-4 hover:translate-y-1 focus:translate-y-1 hover:text-cyan-400 focus:text-cyan-400 cursor-pointer'
            type='button'
            onClick={handleClose}>
            <Cross className='block w-8 h-8'/>
          </button>
        </div>
      </ClientSidePortal>
    )
    : null
}

export default Modal
