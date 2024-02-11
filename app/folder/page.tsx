import Link from "next/link";
import dynamic from "next/dynamic";

const TestComponent = dynamic(() => import("@/components/TestComponent"), {
  ssr: false,
});

export default function Page() {
  return (
    <div>
      <h1>Home</h1>
      <Link href="/about">About</Link>
      <div>
      <TestComponent />
      </div>
    </div>
  );
}
