//import GitHubProvider from 'next-auth/providers/github'
import CredentialsProvider from 'next-auth/providers/credentials'

export const options = {
    providers: [
        // GitHubProvider({
        //     clientId: process.env.GITHUB_ID,
        //     clientSecret: process.env.GITHUB_SECRET,
        // }),
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
                const user = {id: "1", email: process.env.USER_EMAIL, password: process.env.USER_PASSWORD}
                if (credentials?.email === user.email && credentials?.password === user.password) {
                    return {id: user.id, email: user.email, name: "Admin"}
                } else {
                    return null
                }
            }
              
        })
    ],
}