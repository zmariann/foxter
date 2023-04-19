import LeftBar from "@/components/LeftBar";
import RightBar from "@/components/RightBar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <>
      <ToastContainer position="top-center" limit={1} autoClose={900} />
      <div className="flex">
        <LeftBar />
        <main className="w-6/12">{children}</main>
        <RightBar />
      </div>
    </>
  );
}
