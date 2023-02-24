import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";

export default NextAuth({
    session:{
  strategy:'jwt',
    },
    providers: [
        CredentialsProvider({
          // The name to display on the sign in form (e.g. "Sign in with...")
          id:'credentials',
          name: "Ecommerce",
          // `credentials` is used to generate a form on the sign in page.
          // You can specify which fields should be submitted, by adding keys to the `credentials` object.
          // e.g. domain, username, password, 2FA token, etc.
          // You can pass any HTML attribute to the <input> tag through the object.
          credentials: {

          },
          async authorize(credentials) {
            // Add logic here to look up the user from the credentials supplied
          const authResponse =await fetch('http://localhost:3000/api/users/login',{
            method:'POST',
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(credentials)
          })
      
            if (!authResponse.ok) {
              // Any object returned will be saved in `user` property of the JWT
              return null
            } 
            const user = await authResponse.json()
            return user
          },
          
        })
      ],secret:process.env.NEXTAUTH_SECRET,
      pages:{
        signIn:'/login',
      },
      callbacks:{
        jwt:async({token,user})=>{
            user && (token.user =user)
            return token
        },
        session:async({session,token})=>{
             session.user=token.user
             return session
        }
      },
      debug:process.env.NODE_ENV ==='development'
      
})