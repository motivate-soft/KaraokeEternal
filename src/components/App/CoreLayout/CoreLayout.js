import React, { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import useResizeObserver from 'use-resize-observer'
// global stylesheets should be imported before any
// components that will import their own modular css
import '../../../styles/global.css'
import Header from 'components/Header'
import Navigation from 'components/Navigation'
import Modal from 'components/Modal'
import SongInfo from 'components/SongInfo'
import Routes from '../Routes'
import { clearErrorMessage, setFooterHeight, setHeaderHeight } from 'store/modules/ui'

const CoreLayout = (props) => {
  const dispatch = useDispatch()
  const headerRef = React.useRef()
  const navRef = React.useRef()

  useResizeObserver({
    onResize: ({ width, height }) => { dispatch(setHeaderHeight(height)) },
    ref: headerRef,
  })

  useResizeObserver({
    onResize: ({ width, height }) => { dispatch(setFooterHeight(height)) },
    ref: navRef,
  })

  const ui = useSelector(state => state.ui)
  const closeError = useCallback(() => dispatch(clearErrorMessage()), [dispatch])

  return (
    <>
      <Header ref={headerRef}/>

      <Routes/>

      <Navigation ref={navRef}/>

      <SongInfo/>

      <Modal
        isVisible={ui.isErrored}
        onClose={closeError}
        title='Oops...'
        buttons=<button onClick={closeError}>OK</button>
      >
        <p style={{ '-webkit-user-select': 'text', userSelect: 'text' }}>
          {ui.errorMessage}
        </p>
      </Modal>
    </>
  )
}

export default CoreLayout
