// CommonPage.js
import React, { useState, useEffect } from "react";
import useFetchData from "../hooks/useFetchData";

const UnauthorizedBadge = () => {
  return (
    <div className="absolute inset-0 bg-gray-500 opacity-50 flex items-center justify-center  text-white text-base font-semibold">
      Unauthorized
    </div>
  );
};

const UnauthorizedPage = () => {
  return (
    <div className="flex-grow flex items-center justify-center bg-gray-100 bg-gradient-to-b  from-blue-300 to-green-300">
      <div className="bg-white max-w-md rounded-lg shadow-md p-6 mt-4">
        <h1 className="text-2xl font-semibold text-gray-800 mb-4">
          Unauthorized Page
        </h1>
        <p className="text-gray-600">
          Sorry, you are not authorized to view this page.
        </p>
      </div>
    </div>
  );
};

function CommonPage({ pageTitle }) {
  const userId = window.sessionStorage.getItem("userId");
  console.log(userId);
  // if (userId == null) navigate to login

  const [isAuthorized, setIsAuthorized] = useState(true);

  const [userPermissions, userPermissionsLoading, userPermissionsError] =
    useFetchData("block-permissions?id=" + userId);

  const [pageData, pageDataLoading, pageDataError] = useFetchData("pages");




  useEffect(() => {
    if (userPermissions) {
		console.log(userPermissions[0][pageTitle])
    	setIsAuthorized(userPermissions[0][pageTitle]);
    }
  }, [userPermissions, pageTitle]);

  return (
    <div className="flex-grow  flex">
      {pageDataLoading || userPermissionsLoading ? (
        <div className="flex flex-grow text-xl items-center justify-center">
        	Loading...
      	</div>
      ) : !isAuthorized ? (
        <UnauthorizedPage />
      ) : (
        <div className="w-full p-7 flex-grow  bg-gradient-to-b  from-blue-300 to-green-300">
          <div className="flex flex-col items-center ">
            {
				pageData[pageTitle].map((item) => {
              		const authorizedBlock = userPermissions[0]['blocks'].find((block) => block.id == item.id).permission;
					

					return (
						<div
						key={item.id}
						className={`relative bg-white rounded-s shadow-md p-2 mb-4 ${authorizedBlock ? "transition-transform transform hover:scale-105" : ""}`}
						>
						{!authorizedBlock && <UnauthorizedBadge />} 
						<img
							src={item.img_url}
							alt={item.id}
							className="w-full h-auto max-w-[500pt]" 
						/>
						</div>
					);
            })}
          </div>
        </div>
      )}
    </div>
  );
}


export default CommonPage;
