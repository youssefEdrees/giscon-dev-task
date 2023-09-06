import { Routes, Route, redirect, Navigate, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import CommonPage from "./commonPage";
import { Link } from 'react-router-dom';
import useFetchData from "../hooks/useFetchData";
import { USER_NOT_SELECTED } from "../constants";
import {toast} from 'react-toastify'


const UserSelectionPage = () => {
  return (
    <div className="flex h-full justify-center items-center gradient-background">
      <div className="flex flex-col items-center p-8 rounded-lg bg-white shadow-lg">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Welcome</h1>
        <p className="text-lg text-gray-600 mb-8">
          Please select your role to continue:
        </p>
        <div className="flex space-x-4">
          <Link
            to="/admin"
            className="my-custom-button"
          >
            Admin
          </Link>
          <Link
            to="/login/member"
            className="my-custom-button"
          >
            Member
          </Link>
        </div>
      </div>
    </div>
  );
};

export default UserSelectionPage;
const MemberSelectionPage = () => {
  const [membersRequestData, membersRequestLoading] = useFetchData("members");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const selectedUserId = e.target.userId.value;

    if (selectedUserId === USER_NOT_SELECTED) {
      toast.error("Please select a member");
      return;
    }

    window.sessionStorage.setItem("userId", selectedUserId);
    navigate("/member/page1");
  };

  return (
    <div className="flex h-full justify-center items-center gradient-background">
      <form
        className="white-window p-8 text-center"
        onSubmit={handleSubmit}
      >
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Welcome</h1>
        <p className="text-lg text-gray-600 mb-8">
          Please select your name to continue:
        </p>
        <select
          name="userId"
          className="w-full p-2 mb-4 border border-gray-300 rounded-md"
        >
          <option value={USER_NOT_SELECTED}> -- Select a member -- </option>
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
        <button
          type="submit"
          className="my-custom-button"
        >
          Continue
        </button>
      </form>
    </div>
  );
};

const MemberPage = () => {
    return (
        <div className="h-screen flex flex-col">
            <Navbar/>
            <Routes>
                <Route path="page1"  element={<CommonPage pageTitle="page1" />}/>
                <Route path="page2"  element={<CommonPage pageTitle="page2" />}/>
            </Routes>
        </div>
    );
}

export {UserSelectionPage,MemberPage,MemberSelectionPage};