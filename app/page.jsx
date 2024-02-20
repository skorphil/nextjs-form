// import AssetContainer from "../components/AssetContainer/AssetContainer";
import dynamic from "next/dynamic";
import { RecordForm } from "~/RecordForm";

export default function Home() {
  // const isClient = typeof window !== "undefined";
  return (
    <main>
      <RecordForm />
    </main>
  );
}
