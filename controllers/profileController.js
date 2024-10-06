import Profile from "../models/Profile.js";

export const createProfile = async (req, res) => {
  const profile = new Profile({ ...req.body, userId: req.user.id });
  try {
    const savedProfile = await profile.save();
    res.status(201).json({
      message: "Profile created successfully",
      profile: savedProfile,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getProfile = async (req, res) => {
  try {
    const profile = await Profile.findById(req.params.id);
    if (!profile) return res.status(404).json({ message: "Profile not found" });
    res.json(profile);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const profile = await Profile.findById(req.params.id);
    if (!profile) return res.status(404).json({ message: "Profile not found" });

    if (!profile.userId) {
      return res.status(404).json({ message: "User ID not found in profile" });
    }

    if (profile.userId.toString() !== req.user.id) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    Object.assign(profile, req.body);
    await profile.save();
    res.json(profile);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteProfile = async (req, res) => {
  try {
    const profile = await Profile.findById(req.params.id);
    if (!profile) return res.status(404).json({ message: "Profile not found" });

    await profile.remove();
    res.json({ message: "Profile deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
