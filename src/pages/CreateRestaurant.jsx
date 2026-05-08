import { useState } from "react";
import Button from "../common/Button";
import Input from "../common/Input";
import { useNavigate, Link } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { createRestaurant } from "../services/restaurantService";

const CreateRestaurant = () => {
  const [form, setForm] = useState({
    name: "",
    cuisine: "",
    address: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const { mutate } = useMutation({
    mutationFn: createRestaurant,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      mutate(form, {
        onSuccess: (data) => {
          navigate("/dashboard");
        },
        onError: (err) => {
          console.log("error while adding restaurant");
        },
      });
    } catch (error) {
      console.error("Adding resturant error", error);
    }
  };

  return (
    <div className="flex items-center justify-center py-5 bg-gray-300">
      <form onSubmit={handleSubmit}>
        <h2 className="text-xl">Add Restaurant</h2>
        <Input
          label="Name"
          name="name"
          value={form.name}
          onChange={handleChange}
        ></Input>
        <Input
          label="Cuisine"
          name="cuisine"
          value={form.cuisine}
          onChange={handleChange}
        ></Input>
        <Input
          label="Address"
          name="address"
          value={form.address}
          onChange={handleChange}
        ></Input>
        <Button text="Create Resturant" type="submit"></Button>
      </form>
    </div>
  );
};
export default CreateRestaurant;
