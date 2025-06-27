import { useState, useEffect } from "react";
import { UserProfile } from "../types";
import { useLocalStorage } from "./useStorage";

const STORAGE_KEY = "messageBoardUserProfile";

export const useUserProfile = () => {
  const [showProfileView, setShowProfileView] = useState<boolean>(false);
  const [userProfile, setUserProfile, removeUserProfile] =
    useLocalStorage<UserProfile | null>(STORAGE_KEY, null);

  useEffect(() => {
    if (userProfile && userProfile.name) {
      setShowProfileView(false);
    } else {
      setShowProfileView(true);
    }
  }, [userProfile]);

  const saveUserProfile = (profileData: UserProfile): void => {
    if (profileData.name.trim()) {
      setUserProfile(profileData);
      setShowProfileView(false);
    }
  };

  const clearUserProfile = (): void => {
    removeUserProfile();
    setShowProfileView(true);
  };

  return {
    userProfile,
    showProfileView,
    saveUserProfile,
    clearUserProfile,
  };
};
