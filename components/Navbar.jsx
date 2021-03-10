import React, { useState } from 'react'
import { useRouter } from 'next/router'

import styles from '../styles/Navbar.module.css'

function Navbar({ setLoading }) {
  const [region, setRegion] = useState('euw1')
  const [summoner, setSummoner] = useState('')

  const router = useRouter()

  function searchForSummoner(e) {
    e.preventDefault()
    setLoading(true)
    router.push(`/${region}/${summoner}`)
  }

  return (
    <nav className={styles.main}>
      <form className={styles.container} onSubmit={(e) => searchForSummoner(e)}>
        <select
          className={styles.dropdown}
          name='region'
          id='region'
          value={region}
          onChange={(e) => setRegion(e.target.value)}
        >
          <option value='euw1' className={styles.option}>
            EUW
          </option>
          <option value='na1' className={styles.option}>
            NA
          </option>
          <option value='eun1' className={styles.option}>
            EUNE
          </option>
          <option value='br1' className={styles.option}>
            BR
          </option>
          <option value='kr' className={styles.option}>
            KR
          </option>
          <option value='jp1' className={styles.option}>
            JP
          </option>
        </select>
        <input
          className={styles.input}
          placeholder='Summoner name'
          type='text'
          value={summoner}
          maxLength={16}
          onChange={(e) => setSummoner(e.target.value)}
        />
        <button type='submit' className={styles.btn}>
          Search
        </button>
      </form>
    </nav>
  )
}

export default Navbar
