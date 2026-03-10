import { UserProfile } from "../../DB/models/userProfile.model.js";
import { calculateDailyCalories } from "../../utils/health/calculateCalories.js";
import { calculateMacros } from "../../utils/health/calculateMacros.js";
import { calculateWeightChangeDuration } from "../../utils/health/calculateWeightDuration.js";
import { User } from "../../DB/models/user.model.js";


export const upsertProfile = async (req, res, next) =>{
  const userId = req.authUser._id;
  const{ dailyCalories, tdee} = calculateDailyCalories(req.body);
  const macros = calculateMacros(dailyCalories);
  let estimatedWeightChange = null;

  if(req.body.goal === "lose" && req.body.targetLoseKg){
    estimatedWeightChange = calculateWeightChangeDuration({
      tdee,
      dailyCalories,
      targetKg: req.body.targetLoseKg,
      type: "lose"
    });
  }
  if(req.body.goal === "gain" && req.body.targetGainKg){
  estimatedWeightChange = calculateWeightChangeDuration({
    tdee,
    dailyCalories,
    targetKg: req.body.targetGainKg,
    type: "gain"
  });

}

  const profile = await UserProfile.findOneAndUpdate(
  { userId },
  { ...req.body, dailyCalories, macros },
  { new: true, upsert: true }
  );

  return res.status(200).json({
    success: true,
    data: profile,
    estimatedWeightChange
  });

};

export const getMyProfile =async(req, res, next)=>{
  const profile = await UserProfile.findOne({userId:req.authUser._id});
  if(!profile)return next(new Error("profile not found",{cause:404}));
  return res.status(200).json({success:true,data:profile});
};

export const deleteAccount =async(req, res, next)=>{
  const userId = req.authUser._id;
  await User.findByIdAndUpdate(userId,{
    isDeleted:true,
    deletedAt:new Date(),
  });

  return res.status(200).json({
    success: true,
    message: "Account deleted successfully",
  });
};