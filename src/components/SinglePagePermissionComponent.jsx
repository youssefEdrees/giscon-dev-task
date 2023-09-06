import { useEffect, useState } from "react";



const SinglePagePermissionComponent = (props) => {
    const { pageBlocks, pageId, userPermissions, permissionLoading, blocksLoading} = props;
  
    const [pageChecked, setPageChecked] = useState(false);
    

    
    const doesDataExist = (userPermissions,pageBlocks) => {
      
      const userPermCheck = (userPermissions!==null) && (Object.keys(userPermissions).length > 0)
      
      const check =(userPermCheck && !!pageBlocks)
      
      if (check)
        console.log("aaaaaazzzzz");
        console.log(userPermissions[0]);
      return check
    }
    const isItLoading = (permissionLoading,blocksLoading) => {
      const check =(permissionLoading || blocksLoading)
      // console.log("loading :"+check)
      return check
    }
  
    useEffect(()=>{
      if (userPermissions)
          setPageChecked(userPermissions[pageId])
    },[userPermissions,pageId]);
    return (
      <div className="white-window">
        {isItLoading(permissionLoading, blocksLoading) ? (
          <p>Loading...</p>
        ) : !doesDataExist(userPermissions, pageBlocks) ? (
          <p>Nothing selected</p>
        ) : (
          <div>
            <input
              type="checkbox"
              name={pageId}
              onChange={(e) => {
                const newValue = e.target.checked;
                setPageChecked(newValue);
              }}
              checked={pageChecked}
              value={"pageOn"}
            />
            <label className="ml-2">{pageId}</label>
  
            <br />
            {pageBlocks.map((block) => (
              <div key={block.id} className="ml-4 flex items-center mt-2">
                <input
                  type="checkbox"
                  name={block.id}
                  defaultChecked={userPermissions[0].blocks.find(
                    (blockPermission) => blockPermission.id == block.id
                  ).permission}
                  disabled={!pageChecked}
                  className="mr-2"
                />
                <label>{"block" + block.id}</label>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };
  
  export default SinglePagePermissionComponent;