import { useAppDispatch, useAppSelector } from "./hooks/hooks";
import { TUser, addUser, changeModal, changeString, changeValue, deleteUser } from "./reducers/userSlice";

import picture1 from "./assets/1.svg"
import picture2 from "./assets/2.svg"
import { useState } from "react";

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";

const App = () => {
  const dispatch = useAppDispatch();
  const users = useAppSelector<TUser[]>((state) => state.users.users);
  const addModal = useAppSelector<boolean>((state) => state.users.addModal);
  const idDel = useAppSelector<number>((state) => state.users.idDel);
  const deleteModal = useAppSelector<boolean>(
    (state) => state.users.deleteModal
  );

    const [fil, setFil] = useState<string>("");
    const [city, setCity] = useState<string>("");

    const handleChange1 = (event: SelectChangeEvent) => {
      setCity(event.target.value);
    };
  
    const handleChange = (event: SelectChangeEvent) => {
      setFil(event.target.value);
    };
  
  const [search, setSearch] = useState<string>("")

      const handleClickOpen = () => {
        setModal(true);
      };

      const handleClose = () => {
        setModal(false);
  };
  
        const handleClose1= () => {
          setModal1(false);
        };

  const [modal,setModal]=useState<boolean>(false)
  const [modal1,setModal1]=useState<boolean>(false)

  return (
    <div className=" p-[20px] bg-white">
      {/* btn add */}
      <div className="px-[20px] py-[10px] flex justify-end">
        <button
          onClick={() => {
            dispatch(changeModal({ type: "addModal", value: true }));
          }}
          className="bg-green-400 rounded-[8px] px-[10px] text-[20px] font-[700] text-white"
        >
          Add
        </button>
      </div>
      {/* filter */}
      <div className=" flex items-center  justify-between">
        <div className=" flex gap-[20px]">
          <div>
            <Select
              labelId="demo-select-small-label"
              id="demo-select-small"
              value={fil}
              label="Age"
              onChange={handleChange}
            >
              <MenuItem value=""></MenuItem>
              <MenuItem value="All Status">All Status</MenuItem>
              <MenuItem value="ACTIVE">ACTIVE</MenuItem>
              <MenuItem value="INACTIVE">INACTIVE</MenuItem>
            </Select>
          </div>
          <div>
            <Select
              labelId="demo-select-small-label"
              id="demo-select-small"
              value={city}
              label="Age"
              onChange={handleChange1}
            >
              <MenuItem value="All Cityes">All Cityes</MenuItem>
              <MenuItem value="Dushanbe">Dushanbe</MenuItem>
              <MenuItem value="Khujand">Khujand</MenuItem>
            </Select>
          </div>
        </div>
        <div>
          <input
            type="text"
            className=" p-[15px] border-[1px] rounded-md"
            placeholder="Name"
            value={search}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              setSearch(event.target.value);
            }}
            name=""
            id=""
          />
        </div>
      </div>
      {/* box */}
      <div className=" px-[20px] mt-[20px] py-[10px]">
        {/* info */}
        <img src={picture1} alt="" />
        {/* map users */}
        <div className=" mt-[5px]">
          {users

            //filter Status

            .filter((e) => {
              if (fil === "ACTIVE") {
                return e.course === "ACTIVE";
              } else if (fil === "INACTIVE") {
                return e.course === "INACTIVE";
              } else {
                return e;
              }
            })

            //filter City
            .filter((e) => {
              if (city === "Dushanbe") {
                return e.city === "Dushanbe";
              } else if (city === "Khujand") {
                return e.city === "Khujand";
              } else {
                return e;
              }
            })
            // search
            .filter((user: TUser) => {
              // if (user.name.toLowerCase().includes(search.toLowerCase().trim())) {}
              if (search.trim().length  ) {
                return (
                  user.name
                    .toLowerCase()
                    .includes(search.toLowerCase().trim()) || 
                  user.city 
                    .toLowerCase()
                    .includes(search.toLowerCase().trim()) ||
                  user.email
                    .toLowerCase()
                    .includes(search.toLowerCase().trim()) ||
                  user.phone.toString().toLowerCase()
                    .includes(search.toLowerCase().trim())
                )
              } else return user;
            })
            .map((user: TUser) => {
              return (
                <div
                  key={user.id}
                  // className={`${user.id % 2 ? "bg-gray-100" : "bg-gray-300"} grid py-[2px] items-center grid-cols-[50px_100px_110px_100px_100px_50px_50px] gap-[10px]`}
                >
                  <div className=" flex items-center justify-between bg-slate-400 p-[10px]">
                    <div className=" flex items-center  mt-[20px]">
                      <div className="">
                        <img
                          src={user.img}
                          className="w-[60px] rounded-full border-[2px] border-sky-600 h-[60px]"
                        />
                      </div>
                      <div>
                        <p className="text-[14px] leading-[15px] font-[500]">
                          {user.name}
                        </p>
                        <p className="text-[12px] leading-[15px]">
                          {user.email}
                        </p>
                      </div>
                    </div>
                    <div>
                      <p className="text-[14px]">{user.city}</p>
                    </div>
                    <div>
                      {user.course === "ACTIVE" ? (
                        <p className="text-[14px] p-[7px] text-center text-white bg-[#259323]">
                          {user.course}
                        </p>
                      ) : (
                        <p className="  p-[7px] text-white flex justify-center bg-[#748998]">
                          {user.course}
                        </p>
                      )}
                    </div>
                    <div>
                      <p className="text-[12px]">{user.phone}</p>
                    </div>
                    <div>
                      <img
                        onClick={() => setModal(true)}
                        src={picture2}
                        alt=""
                      />
                    </div>
                    {/* <div>
                    <button
                      onClick={() => {
                        dispatch(
                          changeValue({ type: "idDel", value: user.id })
                        );
                        dispatch(
                          changeModal({ type: "deleteModal", value: true })
                        );
                      }}
                      className="border rounded-[8px] font-[700] text-[12px] text-white bg-[red]/60"
                    >
                      del
                    </button>
                  </div>
                  <div>
                    <button className="border rounded-[8px] font-[700] text-[12px] text-white bg-[green]/60">
                      edit
                    </button>
                  </div> */}
                  </div>
                  {modal ? (
                    <Dialog
                      open={modal}
                      onClose={handleClose}
                      aria-labelledby="alert-dialog-title"
                      aria-describedby="alert-dialog-description"
                    >
                      <DialogTitle id="alert-dialog-title">
                        <div>
                          <button
                            onClick={() => {
                              dispatch(
                                changeValue({ type: "idDel", value: user.id })
                              );
                              setModal(false);
                              dispatch(
                                changeModal({
                                  type: "deleteModal",
                                  value: true,
                                })
                              );
                            }}
                            className=" bg-red-500 p-[10px] rounded-[5px] font-[700] text-[18px] text-white "
                          >
                            delete
                          </button>
                          <div>
                            <button
                              onClick={() => {
                                setModal1(true);
                                setModal(false);
                              }}
                              className=" bg-slate-300 mt-[10px] pl-[12px] pr-[12px] pt-[7px] pb-[7px] rounded-[5px] text-[18px] text-white "
                            >
                              Profile
                            </button>
                          </div>
                        </div>
                      </DialogTitle>
                      <DialogContent>
                        <DialogContentText id="alert-dialog-description"></DialogContentText>
                      </DialogContent>
                      <DialogActions></DialogActions>
                    </Dialog>
                  ) : null}
                  {modal1 ? (
                    <Dialog
                      open={modal1}
                      onClose={handleClose1}
                      aria-labelledby="alert-dialog-title"
                      aria-describedby="alert-dialog-description"
                    >
                      <DialogTitle id="alert-dialog-title">
                        <div>
                          <img
                            className=" rounded-full w-[200px] h-[200px]"
                            src={user.img}
                            alt=""
                          />
                          <p className=" text-center">{user.name}</p>
                          <p className=" text-center text-[16px] text-gray- 400">
                            {user.email}
                          </p>
                        </div>
                        <div className=" flex justify-between">
                          <p>City</p>
                          <p>{user.city}</p>
                        </div>
                        <div className=" flex justify-between">
                          <p>Status</p>
                          <p>{user.course}</p>
                        </div>
                        <div className=" flex justify-between">
                          <p>Phone</p>
                          <p>{user.phone}</p>
                        </div>
                      </DialogTitle>
                      <DialogContent>
                        <DialogContentText id="alert-dialog-description"></DialogContentText>
                      </DialogContent>
                      <DialogActions></DialogActions>
                    </Dialog>
                  ) : null}
                </div>
              );
            })}

          {/* add modal */}
          {addModal && (
            <div className="absolute top-0 w-full h-screen left-0 flex justify-center items-center bg-black/50">
              <form
                onSubmit={(event: React.FormEvent<HTMLFormElement>) => {
                  dispatch(addUser({ event: event }));
                }}
                className="px-[40px] py-[20px] flex flex-col gap-[8px] bg-gray-200 shadow-xl rounded-[10px]"
              >
                <div className="flex justify-end">
                  <span
                    onClick={() => {
                      dispatch(changeModal({ type: "addModal", value: false }));
                    }}
                    className="cursor-pointer"
                  >
                    X
                  </span>
                </div>
                <p className="text-center font-[700] text-[18px]">Form add</p>
                <input
                  type="text"
                  name="img"
                  placeholder="Img"
                  className="px-[10px] rounded"
                  required
                />
                <input
                  type="text"
                  name="name"
                  placeholder="mkjnh"
                  className="px-[10px] rounded"
                  required
                />
                <input
                  type="text"
                  name="surname"
                  placeholder="Surname:"
                  className="px-[10px] rounded"
                  required
                />

                <select name="course" className="px-[5px]">
                  <option disabled selected>
                    Course
                  </option>
                  <option selected value="ACTIVE">
                    ACTIVE
                  </option>
                  <option selected value="INACTIVE">
                    INACTIVE
                  </option>
                </select>
                <input
                  type="email"
                  name="email"
                  placeholder="Email: "
                  className="px-[10px] rounded"
                  required
                />
                <select name="city" className="px-[5px]">
                  <option disabled selected>
                    City
                  </option>
                  <option selected value="Dushanbe">
                    Dushanbe
                  </option>
                  <option value="Khujand">Khujand</option>
                </select>
                <input
                  type="number"
                  name="phone"
                  placeholder="Phone: 900110011"
                  className="px-[10px] rounded"
                  required
                />
                <button className="flex gap-[10px] justify-center">
                  <button type="reset">Reset</button>
                  <button type="submit">SAVE</button>
                </button>
              </form>
            </div>
          )}
          {/* delete modal */}
          {deleteModal && (
            <div className="absolute top-0 w-full h-screen left-0 flex justify-center items-center bg-black/50">
              <div className="bg-red-200 p-5 rounded-[10px] shadow-lg">
                <p className="text-center">Delete ?</p>
                <div className="flex gap-[20px] mt-[5px]">
                  <button
                    onClick={() => {
                      dispatch(
                        changeModal({ type: "deleteModal", value: false })
                      );
                      dispatch(deleteUser(idDel));
                    }}
                    className="bg-red-600 px-[10px]  font-[700] text-white"
                  >
                    YES
                  </button>
                  <button
                    onClick={() =>
                      dispatch(
                        changeModal({ type: "deleteModal", value: false })
                      )
                    }
                    className="bg-green-600 px-[10px] rounded-[8px] font-[700] text-white"
                  >
                    NO
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
