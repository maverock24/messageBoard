import React, {useEffect, useState} from 'react';
import {ProfileViewProps, UserProfile} from './types';

const ProfileView: React.FC<ProfileViewProps> = ({
  onSubmit,
  existingProfile,
  onClose,
}) => {
  const [profileData, setProfileData] = useState<UserProfile>({
    name: '',
    description: '',
    role: '',
    hobbies: '',
    profilePicture: null,
  });
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  // Load existing profile data when component mounts or existingProfile changes
  useEffect(() => {
    if (existingProfile) {
      setProfileData(existingProfile);
      // Set preview URL if there's an existing profile picture
      if (existingProfile.profilePicture) {
        setPreviewUrl(existingProfile.profilePicture);
      }
    }
  }, [existingProfile]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const {name, value} = e.target;
    setProfileData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Create preview URL
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);

      // Convert to base64 for storage
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileData((prev) => ({
          ...prev,
          profilePicture: reader.result as string,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (profileData.name.trim()) {
      onSubmit(profileData);
    }
  };

  return (
    <div className='profile-view-overlay'>
      <div className='profile-view'>
        <div className='profile-header'>
          <div>
            <h2>
              {existingProfile
                ? 'Edit Your Profile ✏️'
                : 'Create Your Profile 🎨'}
            </h2>
            <p>
              {existingProfile
                ? 'Update your information below.'
                : 'Tell us about yourself! You only need to do this once.'}
            </p>
          </div>
          {existingProfile && onClose && (
            <button
              type='button'
              className='close-button'
              onClick={onClose}
              title='Close'
            >
              ✕
            </button>
          )}
        </div>

        <form onSubmit={handleSubmit} className='profile-form'>
          {/* Profile Picture */}
          <div className='form-group profile-picture-group'>
            <label>Profile Picture:</label>
            <div className='profile-picture-upload'>
              {previewUrl ? (
                <img
                  src={previewUrl}
                  alt='Profile preview'
                  className='profile-preview'
                />
              ) : (
                <div className='profile-preview-placeholder'>
                  📷 Click to add photo
                </div>
              )}
              <input
                type='file'
                accept='image/*'
                onChange={handleFileChange}
                className='file-input'
              />
            </div>
          </div>

          {/* Name */}
          <div className='form-group'>
            <label htmlFor='name'>Full Name: *</label>
            <input
              type='text'
              id='name'
              name='name'
              value={profileData.name}
              onChange={handleInputChange}
              placeholder='Enter your full name'
              maxLength={50}
              required
            />
          </div>

          {/* Description */}
          <div className='form-group'>
            <label htmlFor='description'>About You:</label>
            <textarea
              id='description'
              name='description'
              value={profileData.description}
              onChange={handleInputChange}
              placeholder='Tell us something about yourself...'
              maxLength={200}
              rows={3}
            />
          </div>

          {/* Role */}
          <div className='form-group'>
            <label htmlFor='role'>Role/Position:</label>
            <input
              type='text'
              id='role'
              name='role'
              value={profileData.role}
              onChange={handleInputChange}
              placeholder='e.g., Software Developer, Marketing Manager'
              maxLength={50}
            />
          </div>

          {/* Hobbies */}
          <div className='form-group'>
            <label htmlFor='hobbies'>Hobbies & Interests:</label>
            <input
              type='text'
              id='hobbies'
              name='hobbies'
              value={profileData.hobbies}
              onChange={handleInputChange}
              placeholder='e.g., Reading, Gaming, Cooking, Travel'
              maxLength={100}
            />
          </div>

          <button
            type='submit'
            className='submit-button'
            disabled={!profileData.name.trim()}
          >
            {existingProfile ? 'Update Profile' : 'Create Profile'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProfileView;
