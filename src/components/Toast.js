import React, {useState} from 'react'
import BSToast from 'react-bootstrap/Toast'

export default ({header, message}) => {
  const [show, setShow] = useState(true);
  return (
    <BSToast onClose={() => setShow(false)} show={show} style={{
      position: 'absolute',
      top: 16,
      right: 16,
    }}>
      <BSToast.Header>
        <strong className="mr-auto">{header}</strong>
      </BSToast.Header>
      <BSToast.Body className="pr-2">{message}</BSToast.Body>
    </BSToast>
  )
}