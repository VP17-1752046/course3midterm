import mongoose from "mongoose";

const profileSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true },
    dateOfBirth: { type: Date, required: true },
    placeOfBirth: { type: String, required: true },
    nationality: { type: String, required: true },
    education: { type: String },
    skills: [String],
    projects: [
      {
        projectName: { type: String },
        description: { type: String },
        role: { type: String },
        startDate: { type: Date },
        endDate: { type: Date, default: null },
      },
    ],
    workExperience: [
      {
        companyName: { type: String },
        role: { type: String },
        startDate: { type: Date },
        endDate: { type: Date, default: null },
      },
    ],
    hobby: [String],
    goal: [String],
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

const Profile = mongoose.model("Profile", profileSchema);
export default Profile;
