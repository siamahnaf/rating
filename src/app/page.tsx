import Link from "next/link";
import MyComponent from "@/components/MyComponent";

const Page = () => {
  return (
    <div className="px-10 py-20 text-center">
      <div className="text-center mb-20">
        <h4 className="text-3xl">Next Rating Component</h4>
        <p>A next and reactjs rating component</p>
      </div>
      <div className="w-max mx-auto">
        <MyComponent />
      </div>
      <h4 className="mt-20 text-xl font-bold">Build By Siam Ahnaf</h4>
      <Link href="https://www.siamahnaf.com/" className="text-cyan-600 hover:underline">www.siamahnaf.com</Link>
    </div>
  );
};

export default Page;