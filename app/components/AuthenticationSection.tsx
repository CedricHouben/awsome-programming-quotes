import type { User } from "@prisma/client";
import { Form } from "@remix-run/react";
import SecondaryLink from "./SecondaryLink";

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
      <SecondaryLink to="/join" dataQa="authenticationSection-signUp-btn">
        Sign up
      </SecondaryLink>
      <SecondaryLink to="/login" dataQa="authenticationSection-login-btn">
        Login
      </SecondaryLink>
    </div>
  );
}
