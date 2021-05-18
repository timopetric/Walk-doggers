import {createContext} from "react";

const AuthContext = createContext({
    signIn: ({email, password}: LoginProps) => {
    },
    signUp: ({email, password, firstName, lastName}: RegisterProps) => {
    },
    signOut: () => {
    },
    getJwt: () => {
    },
    getRoles: async () => {
    },
    isAdmin: (): boolean => {
    },
    isModerator: (): boolean => {
    },
    isReporter: (): boolean => {
    },
});

export type LoginProps = {
    email: string;
    password: string;
}

export interface RegisterProps extends LoginProps {
    firstName: string;
    lastName: string;
}

export default AuthContext;
