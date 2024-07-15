import { SET_IN_APP_ID,SET_TEACHER,RESET_IN_APP_ID,SET_TUITIONS,SET_TEACHERS,RESET_TEACHERS} from '../actions/teachers';

const initialState = {
    availableTuitions: [],
    filteredTuitions: [],
    availableTeachers:[],
    filteredTeachers:[],
    isTeacher:false,
    inAppId:0,
};

export default (state = initialState, action) => {  
    switch (action.type) {
      case SET_IN_APP_ID:
        if (action.inAppId !== 0) {
          return {
            ...state,
            inAppId: action.inAppId, 
          };
        }
        return state;

      case SET_TEACHER:
          return {
            ...state,
            isTeacher: action.isTeacher, 
          };
      
      case RESET_IN_APP_ID:
        return {
          ...state,
          inAppId:0,
        };
      case SET_TUITIONS:
      return {
        ...state,
        availableTuitions: action.tuitions,
        filteredTeachers: action.tuitions.filter((tuition) => tuition.cariculam === 'Bangla Medium'),
      };
      case SET_TEACHERS:
        return {
          ...state,
          availableTeachers: action.teachers,
          filteredTeachers: action.teachers.filter((teacher) => teacher.cariculam === 'Bangla Medium'),
        };
      
        case RESET_TEACHERS:
          return {
            ...state,
            availableTeachers:[],
          };
  
      default:
        return state;
    }
  };