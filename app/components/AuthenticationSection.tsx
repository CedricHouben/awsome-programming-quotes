import type { User } from "@prisma/client";
import { Form, Link } from "@remix-run/react";

export interface IAuthenticationSectionProps {
  user: User | undefined;
}
export default function AuthenticationSection({
  user,
}: IAuthenticationSectionProps) {
  return user ? (
    <div className="mt-2 flex flex-col items-center">
      <pre className="mb-2">welcome: {user.email}</pre>
      <Form action="/logout" method="post">
        <button
          type="submit"
          className="box-border border-2 border-black  py-3 px-6 hover:bg-gray-200 active:border-4 active:bg-gray-200 active:py-[10px] active:px-[22px]"
        >
          Logout
        </button>
      </Form>
    </div>
  ) : (
    <div className="mt-2 flex">
      <Link
        to="/join"
        className={` box-border border-2 border-black  py-3 px-6 hover:bg-gray-200 active:border-4 active:bg-gray-200 active:py-[10px] active:px-[22px]`}
      >
        Sign up
      </Link>
      <Link
        to="/login"
        className={` box-border border-2 border-black  py-3 px-6 hover:bg-gray-200 active:border-4 active:bg-gray-200 active:py-[10px] active:px-[22px]`}
      >
        Log In
      </Link>
    </div>
  );
}
