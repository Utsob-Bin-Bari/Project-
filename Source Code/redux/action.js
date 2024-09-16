import { setEmployeeBio, setEmployeeSkill, setEmployeeId, clearEmployee as clearEmployeeAction } from './slice';

export const updateEmployeeBio = (bioData) => (dispatch) => { 
  dispatch(setEmployeeBio(bioData));
};

export const updateEmployeeSkill = (skillData) => (dispatch) => {
  dispatch(setEmployeeSkill(skillData));
};

export const updateEmployeeId = (id) => (dispatch) => {
  dispatch(setEmployeeId(id));
};

export const clearEmployee = () => (dispatch) => {
  dispatch(clearEmployeeAction());
  console.log("Redux is cleared!");
};


