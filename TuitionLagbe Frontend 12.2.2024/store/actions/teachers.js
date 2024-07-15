export const SET_IN_APP_ID ='SET_IN_APP_ID';
export const SET_TEACHER ='SET_TEACHER';
export const RESET_IN_APP_ID ='RESET_IN_APP_ID';
export const SET_TUITIONS = 'SET_TUITIONS';
export const SET_TEACHERS='SET_TEACHERS';
export const RESET_TEACHERS ='RESET_TEACHERS';

export const setInAppId =(inAppId) =>{
    return {type: SET_IN_APP_ID, inAppId: inAppId};
};
export const setTeacher = (isTeacher) =>{
    return {type:SET_TEACHER,isTeacher:isTeacher};
}
export const resetInAppId = () => ({
    type: RESET_IN_APP_ID,
  });
  
export const setTuitions = (tuitions) => {
    return {
      type: SET_TUITIONS,
      tuitions,
    };
  };
  export const setTeachers = (teachers) => {
    return {
      type: SET_TEACHERS,
      teachers,
    };
  };

  export const resetTeachers = () => ({
    type: RESET_TEACHERS,
  });
  