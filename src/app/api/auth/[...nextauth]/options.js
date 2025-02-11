import CredentialsProvider from 'next-auth/providers/credentials';

export const options = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: {
                    label: "Email",
                    type: "text",
                    placeholder: "email@example.com"
                },
                password: {
                    label: "Password",
                    type: "password",
                    placeholder: "********"
                }
            },
            async authorize(credentials) {
                const user = { id: "1", email: process.env.USER_EMAIL, password: process.env.USER_PASSWORD };
                if (credentials?.email === user.email && credentials?.password === user.password) {
                    return { id: user.id, email: user.email, name: "Admin" };
                } else {
                    return null;
                }
            }
        })
    ],
    session: {
        strategy: "jwt",
        maxAge: 1800, 
        updateAge: 600, 
    },
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
                token.email = user.email;
            }
            return token;
        },
        async session({ session, token }) {
            session.user.id = token.id;
            session.user.email = token.email;
            return session;
        }
    }
};