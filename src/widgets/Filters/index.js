import React from 'react'
import { atom, useRecoilState } from 'recoil'
import TextField from '@material-ui/core/TextField'

export const filterTextState = atom({
  key: 'filterText',
  default: ''
});

const Index = () => {
  const [bodyText, setBodyText] = useRecoilState(filterTextState)

  return (
    <div className="Filters">
      <TextField
        label="Body text"
        value={bodyText}
        onChange={(e) => setBodyText(e.target.value)}
      />
    </div>
  )
}

export default Index
