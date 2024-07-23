// useEffect: persistent state
// http://localhost:3000/isolated/exercise/02.js

import * as React from 'react'

function useLocalStorageState(keyName, defaultValue) {
  if (typeof keyName === 'undefined') {
    throw new Error('You must specify a key name')
  }
  const [value, setValue] = React.useState(
    () => window.localStorage.getItem(keyName) ?? defaultValue,
  )

  React.useEffect(() => {
    window.localStorage.setItem(keyName, value)
  }, [keyName, value])

  return [value, setValue]
}

function Greeting({initialName = ''}) {
  const [name, setName] = useLocalStorageState('name', initialName)

  function handleChange(event) {
    setName(event.target.value)
  }
  return (
    <div>
      <form>
        <label htmlFor="name">Name: </label>
        <input value={name} onChange={handleChange} id="name" />
      </form>
      {name ? <strong>Hello {name}</strong> : 'Please type your name'}
    </div>
  )
}

function App() {
  return <Greeting />
}

export default App
