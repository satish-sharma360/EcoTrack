import React, { useContext, useState } from 'react'
import { Authcontext } from '../../context/Authcontext'

const Auth = () => {
  const [auth , setAuth] = useState('Login')
  const {login ,signup} = useContext(Authcontext)
  const [form ,setForm] = useState({
    name:'',
    email:'',
    password:''
  })

  const handleChnage = (e) =>{
    setForm({...form ,[e.target.name] : e.target.value})
  }

  const handleSubmit = async (e) =>{
    e.preventDefault()

    if (auth === "Login") {
      await login(form.email , form.password)
    }else{
      await signup(form.name ,form.email , form.password)
    }
  }

  return (
    <div className="w-full h-screen bg-[#86c63875] flex items-center justify-center">
      <form onSubmit={handleSubmit} className="bg-white shadow-2xl rounded-xl w-[500px] p-8">
        {/* Logo + Title */}
        <div className="flex items-center justify-center flex-col mb-6">
          <img className="w-[60%] mb-4" src="./logo.png" alt="logo" />
          <h1 className="text-2xl font-bold text-gray-800">
            {auth === "Login" ? "Login" : "Sign Up"}
          </h1>
        </div>

        {/* Inputs */}
        <div className="flex flex-col space-y-4">
          {auth === "Signup" && (
            <div className="flex flex-col">
              <label className="text-gray-700 font-medium">Name</label>
              <input
                type="text"
                name="name"
                className="border-2 border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
                placeholder="Enter your name"
                value={form.name}
                onChange={handleChnage}
              />
            </div>
          )}

          <div className="flex flex-col">
            <label className="text-gray-700 font-medium">Email</label>
            <input
              type="email"
              name="email"
              className="border-2 border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
              placeholder="Enter your email"
              value={form.email}
              onChange={handleChnage}
            />
          </div>

          <div className="flex flex-col">
            <label className="text-gray-700 font-medium">Password</label>
            <input
              type="password"
              name="password"
              className="border-2 border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
              placeholder="Enter your password"
              value={form.password}
              onChange={handleChnage}
            />
          </div>
        </div>

        {/* Button */}
        <button
          type="submit"
          className="w-full bg-[#86c638] hover:bg-[#93db3a] text-white font-semibold py-2 rounded-lg mt-6 transition duration-300"
        >
          {auth === "Login" ? "Login" : "Sign Up"}
        </button>

        {/* Toggle link */}
        <p className="text-center text-gray-600 mt-4">
          {auth === "Login" ? (
            <>
              Don’t have an account?{" "}
              <span
                className="text-green-600 cursor-pointer hover:underline"
                onClick={() => setAuth("Signup")}
              >
                Sign Up
              </span>
            </>
          ) : (
            <>
              Already have an account?{" "}
              <span
                className="text-green-600 cursor-pointer hover:underline"
                onClick={() => setAuth("Login")}
              >
                Login
              </span>
            </>
          )}
        </p>
      </form>
    </div>
  )
}

export default Auth
