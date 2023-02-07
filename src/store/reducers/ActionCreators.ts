import { IUser } from './../../models/IUser'
import { AppDispatch } from './../store'
import axios from 'axios'
import { userSlice } from './UseSlice'
import { createAsyncThunk } from '@reduxjs/toolkit'

// export const fetchUsers = () => {
//   return async (dispatch: AppDispatch) => {
//     try {
//       dispatch(userSlice.actions.usersFetching())

//       const response = await axios.get<IUser[]>(
//         'https://jsonplaceholder.typicode.com/users'
//       )

//       dispatch(userSlice.actions.usersFetchingSuccess(response.data))
//     } catch (e: any) {
//       dispatch(userSlice.actions.usersFetchingError(e.message))
//     }
//   }
// }

export const fetchUsers = createAsyncThunk(
  'user/fetchAll',
  async (_, thunkAPI) => {
    try {
      const response = await axios.get<IUser[]>(
        'https://jsonplaceholder.typicode.com/users'
      )
      return response.data
    } catch (e) {
      return thunkAPI.rejectWithValue('Не удалось загрузить посты')
    }
  }
)
