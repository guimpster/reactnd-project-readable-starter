const initialCategories = [{name: "teste"}]

export const getCategories = (categories = []) => 
    categories.map(category => ({ ...category, url: `/${category.path}`}))



const categories = (state = initialCategories, action) => {
//const { day, recipe, meal } = action

// switch (action.type) {
//   case ADD_RECIPE:
//     return {
//       ...state,
//       [day]: {
//         ...state[day],
//         [meal]: recipe.label
//       }
//     };
//   case REMOVE_FROM_CALENDAR:
//     return {
//       ...state,
//       [day]: {
//         ...state[day],
//         [meal]: null
//       }
//     };
//   default:
//     return state
// }

return state
}

export default categories
  