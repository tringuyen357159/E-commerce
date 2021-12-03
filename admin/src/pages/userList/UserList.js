import React, { useState,useEffect } from 'react';
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { userRows } from "../../utils/data";
import { Link } from "react-router-dom";
import './UserList.scss';
import { useDispatch, useSelector } from "react-redux";
import { deleteUser, handleFetchUsersAction } from '../../redux/action/userAction';


const UserList = () => {
    const users = useSelector((state) => state.user.users);
    const dispatch = useDispatch();

    const handleDelete = (id) => {
      dispatch(deleteUser(id))
    };

    useEffect(() => { 

      dispatch(handleFetchUsersAction());

    }, [dispatch]);

    const columns = [
        { field: "_id", headerName: "ID", width: 200 },
        {
          field: "user",
          headerName: "User",
          width: 200,
          renderCell: (params) => {
            return (
              <div className="userListUser">
                <img className="userListImg" src={params.row.avatar} alt="" />
                {params.row.username}
              </div>
            );
          },
        },
        { field: "email", headerName: "Email", width: 250 },
        {
          field: "action",
          headerName: "Action",
          width: 150,
          renderCell: (params) => {
            return (
              <>
                <Link to={"/user/" + params.row._id}>
                  <button className="userListEdit">Edit</button>
                </Link>
                <DeleteOutline
                  className="userListDelete"
                  onClick={() => { if (window.confirm('Are you sure wish to delete this user?')) handleDelete(params.row._id)}}
                />
              </>
            );
          },
        },
        {
          
        }
    ];
    
    return (
        <div className="userList">
            <div className="userList__title">
                <h1 className="userTitle">List User</h1>
                <Link to="/newUser">
                  <button className="userAddButton">Create</button>
                </Link>
            </div>
            <DataGrid
              rows={users}
              disableSelectionOnClick
              columns={columns}
              pageSize={8}
              rowsPerPageOptions={[8]}
              checkboxSelection
              getRowId={(row) => row._id}
            />
        </div>
    )
}

export default UserList
