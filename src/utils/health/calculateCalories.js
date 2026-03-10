export const calculateDailyCalories = ({
  gender,
  age,
  height,
  weight,
  activityLevel,
  goal,
}) => {

  let bmr;
  if (gender === "male") {
    bmr = 10 * weight + 6.25 * height - 5 * age + 5;
  } else {
    bmr = 10 * weight + 6.25 * height - 5 * age - 161;
  }

  const activityMultiplier = {
    low: 1.2,
    moderate: 1.55,
    high: 1.725,
  };

  const tdee = bmr * activityMultiplier[activityLevel];
  let calories = tdee;
  if (goal === "lose") {

    const deficitMap = {
      low: 400,
      moderate: 500,
      high: 600
    };

    calories = tdee - deficitMap[activityLevel];
  }

  if (goal === "gain") {
    calories = tdee + 400;
  }

  return {
    dailyCalories: Math.round(calories),
    tdee: Math.round(tdee)
  };

};