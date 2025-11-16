"use client";
import { getMe, updateMe } from "@/lib/api/clientApi";
import css from "./EditProfile.module.css";
import Image from "next/image";
import { useEffect, useState } from "react";
import { User } from "@/types/user";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/lib/store/authStore";
import { isAxiosError } from "axios";

const EditProfile = () => {
  const [editUser, setEditUser] = useState<User | null>(null);
  const router = useRouter();
  const setUser = useAuthStore((state) => state.setAuth);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    const getUserData = async () => {
      try {
        const data = await getMe();
        if (data) {
          setEditUser(data);
        }
      } catch (error) {
        toast.error(`Failed user data, ${error}`);
      }
    };
    getUserData();
  }, []);

  const handleSubmit = async (formData: FormData) => {
    const newUsername = formData.get("username") as string;
    try {
      if (editUser?.email) {
        const updatedUser = await updateMe({
          email: editUser.email,
          username: newUsername,
        });
        setUser(updatedUser);
        router.push("/profile");
      }
    } catch (error) {
      if (isAxiosError(error) && error.response) {
        setErrorMessage(error.response.data.message);
        toast.error(errorMessage);
      } else {
        setErrorMessage("An unexpected error occurred");
        toast.error(errorMessage);
      }
    }
  };

  const handleCancel = () => {
    router.push("/profile");
  };

  return (
    <main className={css.mainContent}>
      <div className={css.profileCard}>
        <h1 className={css.formTitle}>Edit Profile</h1>

        {editUser?.avatar && (
          <Image
            src={editUser?.avatar}
            alt={`${editUser?.username} Avatar`}
            width={120}
            height={120}
            className={css.avatar}
          />
        )}

        <form className={css.profileInfo} action={handleSubmit}>
          <div className={css.usernameWrapper}>
            <label htmlFor="username">Username:</label>
            <input
              id="username"
              type="text"
              name="username"
              defaultValue={editUser?.username}
              className={css.input}
            />
          </div>

          <p>Email: {editUser?.email}</p>

          <div className={css.actions}>
            <button type="submit" className={css.saveButton}>
              Save
            </button>
            <button
              type="button"
              className={css.cancelButton}
              onClick={handleCancel}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </main>
  );
};

export default EditProfile;
