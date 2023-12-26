import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";

export const GlobalContext = createContext(null);

export default function GlobalState({ children }) {
  const [searchParam, setSearchParam] = useState("");
  const [recipeList, setRecipeList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [recipeDetailsData, setRecipeDetailsData] = useState(null);
  const[favoritesList, setFavoritesList] = useState([]);
  const navigate = useNavigate()

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      const response = await fetch(
        `https://forkify-api.herokuapp.com/api/v2/recipes?search=${searchParam}`
      );
      const data = await response.json();
      if (data?.data?.recipes) {
        setRecipeList(data?.data?.recipes);
        setLoading(false);
        setSearchParam("");
        navigate('/')
      }
    } catch (e) {
      console.log(e);
      setLoading(false);
      setSearchParam("");
    }
  }
  const handleAddToFavorite=(getCurrentItem)=>{
    console.log(getCurrentItem)
    let copyFavoriteList = [...favoritesList]
    const index = copyFavoriteList.findIndex(item=> item.id===getCurrentItem.id)
    if(index === -1){
      copyFavoriteList.push(getCurrentItem)
    }else{
      copyFavoriteList.splice(index)
    }
    setFavoritesList(copyFavoriteList)

  }
  console.log(favoritesList, 'favoriteList')

  return (
    <GlobalContext.Provider
      value={{
        searchParam,
        setSearchParam,
        handleSubmit,
        loading,
        recipeList,
        recipeDetailsData,
        setRecipeDetailsData,
        handleAddToFavorite,
        favoritesList,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}
