import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
// import type { RootState } from "../store/store";

export type TUser = {
  id: number;
  name: string;
  email: string;
  course: string;
  img: string;
  phone: number;
  city: string;
};

interface IInitialState {
  users: TUser[];
  addModal: boolean;
  idDel: number;
  deleteModal: boolean;
  search: string;
}

const initialState: IInitialState = {
  users: [
    {
      id: 1,
      name: "Dovud Aliev",
      course: "ACTIVE",
      email: "email@gmail.com",
      img: "https://avatars.mds.yandex.net/i?id=f93dd86001284598838b533c6b486180ce14c1ab-9226182-images-thumbs&n=13",
      phone: 992222222,
      city: "Dushanbe",
    },
    {
      id: 2,
      name: "Amir Boboev",
      email: "email@gmail.com",
      course: "INACTIVE",
      img: "https://avatars.mds.yandex.net/i?id=91085b4def5583c999dd374c9e450f444d23f395-9699933-images-thumbs&n=13",
      phone: 987788788,
      city: "Khujand",
    }
  ],
  addModal: false,
  idDel: 0,
  deleteModal: false,
  search: "",
};

export const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    changeModal(
      state: IInitialState,
      action: PayloadAction<{
        type: "addModal" | "deleteModal";
        value: boolean;
      }>
    ) {
      state[action.payload.type] = action.payload.value;
    },
    changeValue(
      state: IInitialState,
      action: PayloadAction<{ type: "idDel"; value: number }>
    ) {
      state[action.payload.type] = action.payload.value;
    },
    changeString(
      state: IInitialState,
      action: PayloadAction<{ type: "search"; value: string }>
    ) {
      state[action.payload.type] = action.payload.value;
    },
    deleteUser(state: IInitialState, action: PayloadAction<number>) {
      state.users = state.users.filter((user: TUser) => {
        return user.id !== action.payload;
      });
    },
    addUser(state: IInitialState, action: PayloadAction<{ event: any }>) {
      const event = action.payload.event;
      event.preventDefault();
      if (
        event.target["name"].value.trim().length !==0 &&
        event.target["surname"].value.trim().length !==0 &&
        event.target["phone"].value.length === 9
      ) {
        const newUser: TUser = {
          id: Date.now(),
          name: `${event.target["name"].value.trim()} ${event.target[
            "surname"
          ].value.trim()}`,
          email: event.target["email"].value.trim(),
          course: event.target["course"].value,
          img: event.target["img"].value,
          phone: event.target["phone"].value,
          city: event.target["city"].value,
        };
        console.log(newUser);
        state.users.push(newUser);
        state.addModal = false;
      } else {
        if (event.target["phone"].value.length !== 9) alert(`Wrong phone number! Example: 900123456 >> 9-numbers`);
        else alert("Please fill out the form");
      }
    },
  },
});

export const { changeModal, changeValue, deleteUser, addUser, changeString } =
  userSlice.actions;
// export const selectCount = (state: RootState) => state.counter.value;
export default userSlice.reducer;
