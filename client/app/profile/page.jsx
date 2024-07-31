import ProfileLayout from "./layout";
import SimpleLayout from "./layout";
import sidNav from "./sideNav";
import React from "react";

export default function Profile() {
  return (
    <ProfileLayout>
      <div className="min-h-screen px-8 mt-5 ">
        <sidNav />
        Profile
      </div>
    </ProfileLayout>
  );
}
