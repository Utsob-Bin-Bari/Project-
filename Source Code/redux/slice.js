import { createSlice } from '@reduxjs/toolkit'; 

const employeeSlice = createSlice({
  name: 'employee',
  initialState: {
    employeeData: {
      id: null,
      bio: {},
      skills: {},
    },
  },
  reducers: {
    setEmployeeBio(state, action) {
      state.employeeData.bio = { ...state.employeeData.bio, ...action.payload };
    },
    setEmployeeSkill(state, action) {
      state.employeeData.skills = { ...state.employeeData.skills, ...action.payload };
    },    
    setEmployeeId(state, action) {
      state.employeeData.id = action.payload;
    },
    clearEmployee(state) {
      state.employeeData = { id: null, bio: {}, skills: {} };
    },
  },
});

export const { setEmployeeBio, setEmployeeSkill, setEmployeeId, clearEmployee } = employeeSlice.actions;
export default employeeSlice.reducer;
