export async function fetchDishes(category = "Beef") {
  try {
    const res = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`);
    const data = await res.json();
    
    const chefs = ["Chef Almaz", "Chef Dawit", "Chef Tigist", "Chef Yohannes"];
    const spiceScales = ["Mild", "Medium Berbere", "Flaming Hot"];

    return (data.meals || []).map((meal, idx) => ({
      id: meal.idMeal,
      title: meal.strMeal,
      image: meal.strMealThumb,
      price: 240 + (idx * 35), // ETB
      chef: chefs[idx % chefs.length],
      isFasting: category === "Vegetarian",
      spice: spiceScales[idx % spiceScales.length],
      prepTime: "25-35 mins",
      rating: (4.6 + (idx % 4) * 0.1).toFixed(1)
    }));
  } catch (error) {
    console.error("Failed fetching live meals:", error);
    return [];
  }
}