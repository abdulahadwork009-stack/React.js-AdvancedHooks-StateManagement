import App from "../App";

export function meta() {
  return [
    { title: "Product Manager" },
    { name: "description", content: "Browse products and manage your cart." },
  ];
}

export default function Home() {
  return <App />;
}