"use client";

export default function ClientComponent() {
  const isClient = typeof window !== "undefined";
  return (
    <div>
      {isClient ? "client new" : "server"}
      <p>
        To make it work without errors i need explicitly disable pre-rendering:
      </p>
      <pre>
        <code>
          {
            "const ClientComponent = dynamic(() => import('../components/ClientComponent.js'),{ ssr: false }"
          }
        </code>
      </pre>
      https://github.com/vercel/next.js/discussions/60918
      https://nextjs.org/docs/messages/react-hydration-error
    </div>
  );
}
