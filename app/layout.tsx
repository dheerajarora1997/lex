"use client";
// import type { Metadata } from "next";
import "./global.scss";
import Header from "./components/common/header";
import { ReduxProvider } from "./providers/reduxProvider";
import ModalDilogGroup from "./ModalDilogGroup";
import "./styles/getBootstrap.scss";
import "./styles/main.scss";
import { ToastContainer } from "react-toastify";

// export const metadata: Metadata = {
//   title: "Create Next App",
//   description: "Generated by create next app",
// };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="pt-5">
        <ReduxProvider>
          <ToastContainer />
          <Header />
          <main className=" d-flex">{children}</main>
          <ModalDilogGroup />
          <script
            src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.11.8/dist/umd/popper.min.js"
            async
          ></script>
          <script
            src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.min.js"
            async
          ></script>
        </ReduxProvider>
      </body>
    </html>
  );
}
