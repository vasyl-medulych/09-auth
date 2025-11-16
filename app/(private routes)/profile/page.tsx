import Link from "next/link";
import css from "./ProfilePage.module.css";
import Image from "next/image";
import { Metadata } from "next";
import { getMeServer } from "@/lib/api/serverApi";

const title = "NoteHub Profile";
const description = "This is a private NoteHub profile";

export const metadata: Metadata = {
  title,
  description,
  openGraph: {
    title,
    description,
    url: `${process.env.NEXT_PUBLIC_SITE_URL}/profile`,
    siteName: title,
    images: [
      {
        url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
        width: 1200,
        height: 630,
        alt: title,
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["https://ac.goit.global/fullstack/react/notehub-og-meta.jpg"],
  },
};

const ProfilePage = async () => {
  const data = await getMeServer();
  return (
    <main className={css.mainContent}>
      <div className={css.profileCard}>
        <div className={css.header}>
          <h1 className={css.formTitle}>Profile Page</h1>
          <Link href="/profile/edit" className={css.editProfileButton}>
            Edit Profile
          </Link>
        </div>
        <div className={css.avatarWrapper}>
          <Image
            src={data.avatar}
            alt={data.username}
            width={120}
            height={120}
            className={css.avatar}
          />
        </div>
        <div className={css.profileInfo}>
          <p>Username: {data.username}</p>
          <p>Email: {data.email}</p>
        </div>
      </div>
    </main>
  );
};

export default ProfilePage;
