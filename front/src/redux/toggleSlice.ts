import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ToggleState {
  isSidebarToggled: boolean;
}

const initialState: ToggleState = {
  isSidebarToggled: false,
};

const toggleSlice = createSlice({
  name: 'toggle',
  initialState,
  reducers: {
    toggleSidebar: (state) => {
      state.isSidebarToggled = !state.isSidebarToggled;
    },
    setSidebar: (state, action: PayloadAction<boolean>) => {
      state.isSidebarToggled = action.payload;
    },
  },
});

export const { toggleSidebar, setSidebar } = toggleSlice.actions;
export default toggleSlice.reducer;
