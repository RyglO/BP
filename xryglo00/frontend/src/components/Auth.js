import { redirect } from "react-router-dom"

const AUTH_TOKEN_NAME = "JWT"

class Auth {
    static logout = async () => {
      sessionStorage.removeItem(AUTH_TOKEN_NAME)
      window.location.href = "/login";
    }
  
    static setJwt = async (jwt) => {

        sessionStorage.setItem(AUTH_TOKEN_NAME, jwt)
    }
  
    static getJwt = () => {
      return sessionStorage.getItem(AUTH_TOKEN_NAME)
    }
    static isAuthenticated = () => Boolean(Auth.getJwt())
  
    //Might be usefull later
    // static getUserIdFromJWT = (jwt: string) => {
    //   const payload = (jwt.split('.') ?? [])[1]
    //   if (!payload) {
    //     return ''
    //   }
  
    //   // id and userType is undefined for SSO users
    //   const { id, userType, username } = JSON.parse(atob(payload))
  
    //   return `${userType ?? 'Manager'}:${id ?? username}`
    // }
  }

  export default Auth