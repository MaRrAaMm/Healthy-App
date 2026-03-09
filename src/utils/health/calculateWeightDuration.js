export const calculateWeightDuration = ({ tdee, dailyCalories, targetLoseKg }) => {
  const deficitPerDay = tdee - dailyCalories;

  const caloriesToLose = targetLoseKg * 7700;

  const days = Math.ceil(caloriesToLose / deficitPerDay);

  const weeks = Math.ceil(days / 7);

  return { days, weeks };

};