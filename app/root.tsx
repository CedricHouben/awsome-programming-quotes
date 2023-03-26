import type { LinksFunction, LoaderArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";

import tailwindStylesheetUrl from "./styles/tailwind.css";
import main from "./styles/main.css";
import { getUser } from "./session.server";
import Navbar from "./components/Navbar";
import { useOptionalUser } from "./utils";
import Footer from "./components/Footer";

export const links: LinksFunction = () => {
  return [
    { rel: "stylesheet", href: main },
    { rel: "stylesheet", href: tailwindStylesheetUrl },
  ];
};

export async function loader({ request }: LoaderArgs) {
  return json({
    user: await getUser(request),
  });
}

export default function App() {
  const user = useOptionalUser();
  return (
    <html lang="en" className="h-full">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body className="h-full">
        <Navbar user={user} />
        <Outlet />
        <Footer />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
