import React from "react";
import "../styles/globals.css";

export default function RootLayout({
  children,
}: {
  children: any
}) {
  return (
    <html lang="en">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-sans bg-brand-white text-brand-charcoal">{children}</body>
    </html>
  );
} 