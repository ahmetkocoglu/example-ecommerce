// ** Redux Imports
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// ** Axios Imports
import axios from 'axios'

// ** Login User
export const login = createAsyncThunk('loginUser/fetchToken', async (payload:any) => {
    const response = await axios.post('/users/login', {email: 'abc@xyz.com', password: '12345678'})

    return response.data
})

export const appLoginSlice = createSlice({
    name: 'appUsers',
    initialState: {
        data: [],
        isLoginLoading: 'idle',
    },
    reducers: {},
    extraReducers: builder => {
        builder.addCase(login.pending, (state) => {
            state.isLoginLoading = 'pending'
        })
        builder.addCase(login.fulfilled, (state, action) => {
            if (action.payload.status){
                state.isLoginLoading = 'succeeded'
            }
        })
        builder.addCase(login.rejected, (state, action) => {
            state.isLoginLoading = 'failed'
        })
    }
})

export default appLoginSlice.reducer