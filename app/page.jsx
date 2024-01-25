// import AssetContainer from "../components/AssetContainer/AssetContainer";
import dynamic from "next/dynamic";

const AssetContainer = dynamic(
  () => import("../components/AssetContainer/AssetContainer"),
  {
    ssr: true,
  }
);

export default function Home() {
  // const response = await fetch(
  //   "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/eur/jpy.json"
  // );
  // const data = await response.json();

  // async function search(formData) {
  //   "use server";
  //   const query = formData.get("query");
  //   console.log(formData);
  // }

  const isClient = typeof window !== "undefined";
  return (
    <main>
      <AssetContainer />
    </main>
  );
}
