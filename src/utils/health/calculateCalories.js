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

  let calories = bmr * activityMultiplier[activityLevel];

  if (goal === "lose") calories -= 400;
  if (goal === "gain") calories += 400;

  return Math.round(calories);
};
