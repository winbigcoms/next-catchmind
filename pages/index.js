import Head from "next/head";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <div className="container">
        <main>
          <h1 className="title">
            Read <Link href="/login">next</Link>
          </h1>
        </main>
      </div>
    </>
  );
}
