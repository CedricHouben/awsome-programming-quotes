import type { User } from "@prisma/client";
import { Form, Link } from "@remix-run/react";

export interface IAuthenticationSectionProps {
  user: User | undefined;
}
export default function AuthenticationSection({
  user,
}: IAuthenticationSectionProps) {
  return user ? (
    <div className="flex flex-col items-center">
      <Form action="/logout" method="post">
        <button
          type="submit"
          data-qa="authenticationSection-logout-btn"
          className="mr-2 box-border border-2  border-white py-3 px-6 hover:bg-gray-400 active:border-4 active:bg-gray-400 active:py-[10px] active:px-[22px]"
        >
          Logout
        </button>
      </Form>
    </div>
  ) : (
    <div className="flex">
      <Link
        to="/join"
        data-qa="authenticationSection-signUp-btn"
        className={` mr-2 box-border border-2  border-white py-3 px-6 hover:bg-gray-400 active:border-4 active:bg-gray-400 active:py-[10px] active:px-[22px]`}
      >
        Sign up
      </Link>
      <Link
        to="/login"
        data-qa="authenticationSection-login-btn"
        className={`mr-2 box-border border-2  border-white py-3 px-6 hover:bg-gray-400 active:border-4 active:bg-gray-400 active:py-[10px] active:px-[22px]`}
      >
        Login
      </Link>
    </div>
  );
}
