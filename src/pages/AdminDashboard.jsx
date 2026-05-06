import React from "react";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { getPendingUsers, approveUser } from "../services/adminService";
import Button from "../common/Button";

const AdminDashboard = () => {
  // user the user data
  // list of pending users

  const queryClient = useQueryClient();

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["pendingOwners"],
    queryFn: getPendingUsers,
  });

  const { mutate: approveUserMutation, isLoading: isApproving } = useMutation({
    mutationFn: approveUser,
    onSuccess: () => {
      console.log("User approved successfully");
      queryClient.invalidateQueries(["pendingOwners"]);
    },
    onError: (error) => {
      console.error("Error approving user:", error);
    },
  });

  if (isLoading) {
    return <h2>Loading ....</h2>;
  }

  if (isError) {
    return <h2>Something went wrong</h2>;
  }
  console.log("data", data);
  return (
    <div className="p-5">
      <h1 className="text-3xl font-bold">Pending Onwers</h1>
      {data.length === 0 ? (
        <h1>No Pending Users</h1>
      ) : (
        <div>
          {data.map((currentOwner) => (
            <div key={currentOwner._id} className="flex justify-between">
              <h2>{currentOwner.name}</h2>
              <h2>{currentOwner.email}</h2>
              <h2>{currentOwner.status}</h2>
              <Button  text="Approve" onClick={() => approveUserMutation(currentOwner._id)}>
                Approve
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
