import React, { useContext, useEffect } from 'react'
import { AuthContext } from '../context/AuthContext';
import { useParams } from 'react-router-dom';
import StartPracticeButtons from '../components/StartPracticeButtons';
import StudySetStatistic from '../components/StudySetStatistic';

function UserStudySet() {
    const {getUserInfo, user} = useContext(AuthContext);

    const {id} = useParams();
    

    useEffect(() => {
       getUserInfo();
    }, [])

    const studySet = user?.savedStudySets?.filter(studySet => studySet._id === id)[0];
    
  return (
    <section className='p-[30px] flex flex-col gap-[20px]'>
            {studySet && (
                <>
                    <StudySetStatistic />
                    <StartPracticeButtons edit={studySet?.edit} studySetId={studySet?._id} userId={user?._id}/>
                </>
            )}
        </section>
  )
}

export default UserStudySet