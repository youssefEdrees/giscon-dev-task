import React, {  useEffect, useState } from "react";
import useFetchData from "../hooks/useFetchData";
import SinglePagePermissionComponent from "./SinglePagePermissionComponent";
import { BASE_API_URL, USER_NOT_SELECTED } from "../constants";

import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


// ideally i would only send the selected blocks and the backend would easily handle it, but i want it to work with the mock server 
// so i will save all the blocks and add the ones that are not selected as false
const handleSubmitWrapper = (e,pagesData) => {
  // Prevent the browser from reloading the page
  e.preventDefault();


  
  
  // Read the form data


  const selectedId = e.target.userId.value
  
  if ( selectedId === USER_NOT_SELECTED){
    toast.error('please select a member')
    return
  }

  const form = e.target;
  const formData = new FormData(form);

  
  
  
  const formJson = Object.fromEntries(formData.entries());

  const entries = Object.entries(formJson);

  const filteredPagesEntries = entries.filter(pair => pair[1] === "pageOn")
  const pagesIds = filteredPagesEntries.map((pair) =>{return pair[0]});

  const filteredBlocksEntries = entries.filter(pair => pair[1] === "on")
  const allowedBlocksIds = filteredBlocksEntries.map((pair) =>{return pair[0]});

  let all_block_ids = []
  for (var key of Object.keys(pagesData)) {
    all_block_ids  = [...all_block_ids ,...pagesData[key].map((block)=>{return block.id.toString()})]
  }

  const unauthorizedBlocksIds = all_block_ids.filter(x => !allowedBlocksIds.includes(x)); //difference between the 2 arrays
  
  const blocksPermissionObjectListAuthorized = allowedBlocksIds.map((id)=>{return {id:id,permission:1}})
  const blocksPermissionObjectListUnauthorized  = unauthorizedBlocksIds.map((id)=>{return {id:id,permission:0}})
  
 
  const fullBlocksArray = blocksPermissionObjectListAuthorized.concat(blocksPermissionObjectListUnauthorized)

  let updatePermissionsObject = {
    id:formJson.userId,
    page1:pagesIds.includes("page1"),
    page2:pagesIds.includes("page2"),
    blocks:fullBlocksArray
  }



  fetch(BASE_API_URL + `block-permissions/`+updatePermissionsObject.id, {
    method: 'PATCH',
    body: JSON.stringify(updatePermissionsObject),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  })
     .then((response) => response.json())
     .then((data) => {
        console.log(data);
        toast.success('update successful')
        // Handle data
     })
     .catch((err) => {
        console.log(err.message);
        toast.error("Update Unsuccessful");

     });


}










const AdminPage = () => {
  const [membersRequestData, membersRequestLoading, membersRequestError] = useFetchData("members");
  const [selectedUser, setSelectedUser] = useState();
  const [selectedUserPermissions, selectedUserPermissionsLoading, selectedUserPermissionsError] = useFetchData("block-permissions?id=" + selectedUser);
  const [pagesData, pagesLoading, pagesError] = useFetchData("pages");


  useEffect(() => {
    console.log(selectedUserPermissions);
  
  }, [selectedUserPermissions])
  
  
  
  
  return (
    <div className="gradient-background flex h-full justify-center items-center">
      <form 
        method="post"
        onSubmit={(e) => {
          handleSubmitWrapper(e, pagesData);
        }}
        className="bg-gray-100 p-6 rounded-lg shadow-md  w-1/3"
      >
        <select
          name="userId"
          required
          onChange={(e) => setSelectedUser(e.target.value)}
          className="block w-full p-2 border border-gray-300 rounded-lg mb-4"
        >
          <option disabled selected value={USER_NOT_SELECTED}>
            -- Select a user --
          </option>
          {membersRequestLoading ? (
            <option>Loading...</option>
          ) : (
            membersRequestData &&
            membersRequestData.map((member) => (
              <option value={member.id} key={member.id}>
                {member.name}
              </option>
            ))
          )}
        </select>

        <SinglePagePermissionComponent
          pageId={"page1"}
          userPermissions={selectedUserPermissions}
          pageBlocks={pagesData ? pagesData["page1"] : null}
          permissionLoading={selectedUserPermissionsLoading}
          blocksLoading={pagesLoading}
        />

        <SinglePagePermissionComponent
          pageId={"page2"}
          userPermissions={selectedUserPermissions}
          pageBlocks={pagesData ? pagesData["page2"] : null}
          permissionLoading={selectedUserPermissionsLoading}
          blocksLoading={pagesLoading}
        />

        <input
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full mt-4"
          type="submit"
          value="Update"
        />
      </form>
    </div>
  );
};


export default AdminPage;
