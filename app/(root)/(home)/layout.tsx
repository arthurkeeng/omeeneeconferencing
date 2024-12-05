import Navbar from "@/components/ui/Navbar"
import Sidebar from "@/components/ui/Sidebar"
import { Metadata } from "next";
import { ReactNode } from "react"

export const metadata: Metadata = {
  title: "omeeneeconferencing",
  description: "for all your conferencing needs",
};

const HomeLayout = ({children} : {children : ReactNode}) => {
  return (
    <main className="relative ">
      <Navbar/>

      <div className="flex">
        <Sidebar/>

        <section className="flex min-h-screen flex-1 flex-col px-6 pt-20 max-md:pb-14 sm:px-14">
          <div className="w-full">

          {children}
          </div>
        </section>
      </div>
    </main>
  )
}

export default HomeLayout
