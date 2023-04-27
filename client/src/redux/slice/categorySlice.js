
import {createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosClient from "../../utils/axiosClient";

export const fetchCategories = createAsyncThunk("api/categories", async (body, thunkAPI) => {
    try {
        const response = await axiosClient.get("/categories?populate=image");
        console.log("fetchCategories() thunk: ", response.data.data);
        return response.data.data;
    } catch(error) {
        console.log(error);
        return Promise.reject(error);
    }
});

const categorySlice = createSlice({
    name: "categorySlice",
    initialState: {
        categories: [],
    },
    reducers: {
        clearCategory: (state, action) => {
            state.categories = [];
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchCategories.fulfilled, (state, action) => {
            state.categories = action.payload;
        });
    }
});

export default categorySlice.reducer;
export const {clearCategory} = categorySlice.actions;