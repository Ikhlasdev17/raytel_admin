import React from 'react'
import Button from './Button'

const Modal = ({ title, content, footer, onClose }) => {

    window.addEventListener('click', (e) => {
        if (e.target.className === 'modal-overlay' && e.target.className !== 'modal') {
            onClose()
        }
    })

  return (
    //   MODAL WINDOW 
    <div className='modal-overlay'>
        {/* MODAL */}
        <div className="modal">
            {/* MODAL HEADING */}
            <h2 className='modal__heading'>
                { title }
            </h2>

            {/* MODAL CONTENT */}
            <div className='modal__content'>
                { content() }
            </div>

            {/* MODAL FOOTER */}
            <div className='modal__footer'>
                { footer() }
            </div>
        </div>
    </div>
  )
}

export default Modal