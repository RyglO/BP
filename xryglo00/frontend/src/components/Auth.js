import { redirect } from "react-router-dom"

const AUTH_TOKEN_NAME = "JWT"

class Auth {
    static logout = async () => {
      sessionStorage.removeItem(AUTH_TOKEN_NAME)
      sessionStorage.removeItem("userName")
      sessionStorage.removeItem("customerID")
      window.location.href = "/login";
    }
  
    static setJwt = async (jwt) => {

        sessionStorage.setItem(AUTH_TOKEN_NAME, jwt)
    }
  
    static getJwt = () => {
      return sessionStorage.getItem(AUTH_TOKEN_NAME)
    }

    static setUserName = async (username) => {
      sessionStorage.setItem("userName", username)
    }

    static getUserName = () => {
      return sessionStorage.getItem("userName")
    }

    static setCustomerId = async (customerID) => {
      sessionStorage.setItem("customerID", customerID)
    }

    static getCustomerID = () => {
      return sessionStorage.getItem("customerID")
    }

    static isAuthenticated = () => Boolean(Auth.getJwt())
  }

  export default Auth