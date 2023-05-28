import { useState, useEffect } from "react";
import axios from "../axios-instance";
import { Link, useNavigate } from "react-router-dom";
import AddCategoryForm from '../add-categorie';
import useLoggedUser from "../auth/use-logged-user";

export default function Categories({ onChange }) {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(-1);
  const { user } = useLoggedUser();

  useEffect(() => {
    axios.get("/categories")
      .then(res => {
        console.log(res.data.categories);
        setCategories([...res.data.categories]);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  function changeCategory(category) {
    setSelectedCategory(category.toLowerCase());
  }

  function isSelected(id) {
    return selectedCategory == id;
  }

  function handleChange(id) {
    setSelectedCategory(id);
    onChange(id);
  }

  return (
    <div className="w-full">
      <h1 className="border-b border-slate-300 text-slate-500 font-semibold px-3 py-1.5">Categories</h1>
      <div className="flex flex-wrap px-3 py-2">
        <div
          onClick={() => handleChange(-1)}
          className={`p-1 px-2 py-1 space-y-1 border cursor-pointer rounded-full ${isSelected(-1) ? "text-teal-500 border-teal-500 bg-teal-100" : "text-slate-800 border-transparent"}`}>
          All
        </div>
        {categories.map((category, index) => (
          <div
            onClick={() => handleChange(category.id)}
            className={`p-1 px-2 py-1 space-y-1 border cursor-pointer rounded-full ${isSelected(category.id) ? "text-teal-500 border-teal-500 bg-teal-100" : "text-slate-800 border-transparent"}`}
            key={index}>
            {category.nom}
          </div>
        ))}
        <br />
        {user.role === "ADMIN" && (
          <>
            <br />
            <div className="flex justify-center">
              <Link to="/add-categorie" className="primary-btn ml-8">Ajouter une catégorie</Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
