import React from "react";

// components


import FooterSmall from "components/Footers/FooterSmall.js";
import IndexNavbar from "components/Navbars/IndexNavbar.js";
import StudentNavbar from "components/Navbars/StudentNavbar";
import CompanyNavbar from "components/Navbars/CompanyNavbar";
import Admin from "components/Navbars/Admin";

const Navbar = () => {
  if (typeof window !== "undefined") {
    // Perform localStorage action
    const item = localStorage.getItem("type");
    return item;
  } else {
    return false;
  }
};

export default function Auth({ children }) {


  const navbar = Navbar();
  console.log(navbar);
  return (
    <>
      {navbar === "student" && <StudentNavbar fixed />}

      {navbar === "company" && <CompanyNavbar />}
      {navbar === "admin" && <Admin />}
      {!navbar && <IndexNavbar fixed />}
      <main>
        <section className="relative w-full h-full py-40 min-h-screen">
          <div
            className="absolute top-0 w-full h-full  bg-no-repeat bg-full"
            // style={{
            //   backgroundImage: "url('/img/register_bg_2.png')",
            // }}
          ></div>
          {children}
          <FooterSmall absolute />
        </section>
      </main>
    </>
  );
}
