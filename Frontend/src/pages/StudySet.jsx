import React, { useContext, useEffect } from 'react'
import Cards from '../components/Cards'
import { StudySetsContext } from '../context/StudySetsContext'

function StudySet() {
  // const {getStudySetData} = useContext(StudySetsContext);

  // useEffect(() => {
  //   getStudySetData();
  // }, [])


  return (
    <div>
      <Cards />
    </div>
  )
}

export default StudySet
