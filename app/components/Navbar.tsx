import type { User } from "@prisma/client";
import { Link } from "@remix-run/react";
import colors from "~/theme/colors";
import AuthenticationSection from "./AuthenticationSection";
import { QuoteIcon } from "./icons";

export interface INavbar {
  user: User | undefined;
}

export default function Navbar({ user }: INavbar) {
  return (
    <header className="flex items-center justify-between bg-black p-4 text-white">
      <Link to="/" className="font-retro font-bold">
        <QuoteIcon width={40} height={40} fill={colors.white} />
      </Link>

      <p>{user?.email}</p>
      <AuthenticationSection user={user} />
    </header>
  );
}
