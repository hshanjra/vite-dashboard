import { User } from "@/types";
import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";
import { jwtDecode } from "jwt-decode";
import api from "@/lib/api";
import {
  LoginSchema,
  LoginSchemaType,
  RegisterSchema,
  RegisterSchemaType,
} from "@/validators/auth-validator";
import { Roles } from "@/enums";
import { useQueryClient } from "@tanstack/react-query";

type AuthContext = {
  currentUser?: User | null;
  handleLogin: (values: LoginSchemaType) => Promise<void>;
  handleRegister: (values: RegisterSchemaType) => Promise<void>;
  handleLogout: () => Promise<void>;
};

const AuthContext = createContext<AuthContext | undefined>(undefined);

type AuthContextProps = PropsWithChildren;

export default function AuthProvider({ children }: AuthContextProps) {
  const qClient = useQueryClient();
  const [currentUser, setCurrentUser] = useState<User | null>();

  useEffect(() => {
    async function fetchUser() {
      try {
        const { data } = await api.get("/auth/me");
        setCurrentUser(data);
      } catch (e: any) {
        setCurrentUser(null);

        if (e.status === 401) {
          throw new Error("Unauthorize!");
        }
      }
    }
    fetchUser();
  }, []);

  async function handleLogin(values: LoginSchemaType): Promise<void> {
    const parsedValues = LoginSchema.parse(values);

    try {
      const { data } = await api.post("/auth/login", parsedValues);

      const token: string = data?.accessToken;

      // Decrypt access token to extract the user
      const decodedUser = jwtDecode<User>(token);

      setCurrentUser(decodedUser);

      return;
    } catch (error: any) {
      if (error.status === 404) {
        throw new Error(`Couldn't find your account.`);
      }

      if (error?.status === 401) {
        throw new Error("Email or password is incorrect!");
      }

      if (error?.status === 429) {
        throw new Error("Too many attempts. Please try again later.");
      }

      setCurrentUser(null);

      throw new Error("Something went wrong. Please try again later.");
    }
  }
  async function handleRegister(values: RegisterSchemaType) {
    const parsedValues = RegisterSchema.parse(values);

    const registerValues = {
      firstName: parsedValues.firstName,
      lastName: parsedValues.lastName,
      email: parsedValues.email,
      password: parsedValues.password,
      role: Roles.SELLER,
    };

    try {
      const { data } = await api.post("/auth/register", registerValues);

      // Decrypt access token to extract the user
      const decodedUser = jwtDecode(data?.accessToken);
      setCurrentUser(decodedUser as User);
      return;
    } catch (error: any) {
      setCurrentUser(null);
      if (error.status === 409) {
        throw new Error("User already exists. try logging in");
      }

      if (error?.status === 429) {
        throw new Error("Too many attempts. Please try again later.");
      }

      throw new Error("Something went wrong. Please try again later.");
    }
  }

  async function handleLogout() {
    try {
      await api.get("/auth/logout");
      setCurrentUser(null);
      //  clear react query cache
      qClient.removeQueries();
    } catch {
      setCurrentUser(null);
      //  clear react query cache
      qClient.removeQueries();
    }
  }

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        handleLogin,
        handleLogout,
        handleRegister,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
}
