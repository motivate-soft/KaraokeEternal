import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchPrefs } from 'store/modules/prefs'
import SignedInView from './SignedInView'
import SignedOutView from './SignedOutView'
import styles from './AccountView.css'

const AccountView = props => {
  const isSignedIn = useSelector(state => state.user.userId !== null)
  const ui = useSelector(state => state.ui)
  const dispatch = useDispatch()

  // once per mount
  // (do this here instead of Prefs component to detect firstRun)
  useEffect(() => {
    dispatch(fetchPrefs())
  }, [dispatch])

  return (
    <div className={styles.container} style={{
      paddingTop: ui.headerHeight,
      paddingBottom: ui.footerHeight,
      width: ui.contentWidth,
      height: ui.innerHeight,
    }}>
      {isSignedIn &&
        <SignedInView />
      }

      {!isSignedIn &&
        <SignedOutView />
      }
    </div>
  )
}

export default AccountView
