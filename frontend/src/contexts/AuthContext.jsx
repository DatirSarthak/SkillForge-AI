import {
    createContext,
    useContext,
    useEffect,
    useState,
} from "react";

import {
    login as loginService,
    register as registerService,
    logout as logoutService,
    getCurrentUser,
    isAuthenticated as checkAuthentication,
} from "../services/authService";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(getCurrentUser());
    const [loading, setLoading] = useState(false);
    const [authenticated, setAuthenticated] = useState(
        checkAuthentication()
    );

    useEffect(() => {
        const currentUser = getCurrentUser();
        const authenticatedUser = checkAuthentication();

        setUser(currentUser);
        setAuthenticated(authenticatedUser);
    }, []);

    const login = async (credentials) => {
        setLoading(true);

        try {
            const response = await loginService(credentials);

            if (response?.success && response?.data) {
                if (response.data.user) {
                    setUser(response.data.user);
                }

                setAuthenticated(
                    Boolean(response.data.accessToken)
                );
            }

            return response;
        } finally {
            setLoading(false);
        }
    };

    const register = async (userData) => {
        setLoading(true);

        try {
            const response = await registerService(userData);

            if (response?.success && response?.data) {
                if (response.data.user) {
                    setUser(response.data.user);
                }

                setAuthenticated(
                    Boolean(response.data.accessToken)
                );
            }

            return response;
        } finally {
            setLoading(false);
        }
    };

    const signOut = () => {
        logoutService();

        setUser(null);
        setAuthenticated(false);
    };

    const value = {
        user,
        loading,
        isAuthenticated: authenticated,
        login,
        register,
        signOut,
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error(
            "useAuth must be used inside AuthProvider"
        );
    }

    return context;
};