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

  const deficit = {
    low: 700,
    moderate: 850,
    high: 1000
  };

  const surplus = {
    low: 600,
    moderate: 750,
    high: 900
  };

  let calories = tdee;

  if (goal === "lose") {
    calories = tdee - deficit[activityLevel];
    console.log("DEFICIT", deficit[activityLevel])
  }

  if (goal === "gain") {
    calories = tdee + surplus[activityLevel];
  }

  return {
    dailyCalories: Math.round(calories),
    tdee: Math.round(tdee),
  };
};