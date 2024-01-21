import styles from "./page.module.css";

import dynamic from "next/dynamic";

const ClientComponent = dynamic(
  () => import("../components/ClientComponent.js"),
  { ssr: false }
);
const Form = dynamic(() => import("../components/Form.js"), { ssr: false });

export default async function Home() {
  const response = await fetch(
    "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/eur/jpy.json"
  );
  const data = await response.json();

  async function search(formData) {
    "use server";
    const query = formData.get("query");
    console.log(formData);
    console.log(`You searched for '${query}'`);
  }

  const isClient = typeof window !== "undefined";
  return (
    <main className={styles.main}>
      <Form search={search} />
      {data.date}
      {isClient ? "home client" : "home server"}
      <ClientComponent />
    </main>
  );
}
