import React from "react";

export const metadata = {
  title: "Auth",
};

export default function Authlayout({ children }) {
  return (
      <body>
        <main>{children}</main>
      </body>
  );
}
