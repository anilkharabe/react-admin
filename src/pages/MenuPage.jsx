// useState  << useReducer for managing complex data

import { useReducer } from "react";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import {
  createMenu,
  getMenu,
  deleteMenu,
  updateMenu,
} from "../services/menuServices";
import Input from "../common/Input";
import Button from "../common/Button";

const initialState = {
  name: "",
  price: "",
  description: "",
  category: "",
  isVeg: true,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "ADD_FIELD":
      return {
        ...state,
        [action.field]: action.value,
      };

    case "UPDATE_FIELD":
      return {
        ...state,
        ...action.payload,
      };

    case "RESET":
      return initialState;

    default:
      return state;
  }
};

const MenuPage = () => {
  const restaurantId = "69fc9d0e2dad5918ed16831d";
  const [state, dispatch] = useReducer(reducer, initialState);

  const queryClient = useQueryClient();

  // reading Menu
  const {
    data: menuData = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["menus", restaurantId],
    queryFn: () => getMenu(restaurantId),
  });

  console.log("menuData", menuData);

  // adding Menu
  const { mutate: createMutation, isLoading: isApproving } = useMutation({
    mutationFn: createMenu,
    onSuccess: () => {
      console.log("Menu added successfully");
      queryClient.invalidateQueries(["menus", restaurantId]);
    },
    onError: (error) => {
      console.error("Error while adding menu:", error);
    },
  });

  // delete menu
  const { mutate: deleteMutation, isLoading: isDeleting } = useMutation({
    mutationFn: deleteMenu,
    onSuccess: () => {
      console.log("Menu deleted successfully");
      queryClient.invalidateQueries(["menus", restaurantId]);
    },
    onError: (error) => {
      console.error("Error while adding menu:", error);
    },
  });

  // update menu
  const { mutate: updateMutation, isLoading: isUpdating } = useMutation({
    mutationFn: updateMenu,
    onSuccess: () => {
      console.log("Menu updated successfully");
      queryClient.invalidateQueries(["menus", restaurantId]);
    },
    onError: (error) => {
      console.error("Error while updating menu:", error);
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (state.id) {
      updateMutation({
        id: state.id,
        data: {
          name: state.name,
          price: state.price,
          description: state.description,
          category: state.category,
          isVeg: state.isVeg,
        },
      });
      return;
    }

    createMutation({
      ...state,
      restaurant: restaurantId,
    });
  };

  return (
    <div>
      Menu Management
      <div>
        <form onSubmit={handleSubmit}>
          <Input
            label="Name"
            name="name"
            value={state.name}
            onChange={(e) => {
              dispatch({
                type: "ADD_FIELD",
                field: "name",
                value: e.target.value,
              });
            }}
          ></Input>

          <Input
            label="Price"
            name="price"
            value={state.price}
            onChange={(e) => {
              dispatch({
                type: "ADD_FIELD",
                field: "price",
                value: e.target.value,
              });
            }}
          ></Input>

          <Input
            label="Description"
            name="description"
            value={state.description}
            onChange={(e) => {
              dispatch({
                type: "ADD_FIELD",
                field: "description",
                value: e.target.value,
              });
            }}
          ></Input>

          <Input
            label="Category"
            name="category"
            value={state.category}
            onChange={(e) => {
              dispatch({
                type: "ADD_FIELD",
                field: "category",
                value: e.target.value,
              });
            }}
          ></Input>

          <label>Is Veg</label>
          <input
            type="checkbox"
            checked={state.isVeg}
            onChange={(e) => {
              dispatch({
                type: "ADD_FIELD",
                field: "isVeg",
                value: e.target.checked,
              });
            }}
          />

          <Button text="Add Menu" type="submit"></Button>
        </form>

        {/* Menu List */}
        <div className="my-5">
          {menuData.map((menu) => (
            <div key={menu._id} className="flex justify-between my-4">
              <h2>{menu.name}</h2>
              <h2>{menu.price}</h2>
              <h2>{menu.description}</h2>
              <h2>{menu.category}</h2>
              <h2>{menu.isVeg ? "Veg" : "Non Veg"}</h2>

              <Button
                text="Update"
                onClick={() =>
                  dispatch({
                    type: "UPDATE_FIELD",
                    payload: {
                      id: menu._id,
                      name: menu.name,
                      price: menu.price,
                      description: menu.description,
                      category: menu.category,
                      isVeg: menu.isVeg,
                    },
                  })
                }
              >
                Update
              </Button>

              <Button text="Delete" onClick={() => deleteMutation(menu._id)}>
                Delete
              </Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MenuPage;
