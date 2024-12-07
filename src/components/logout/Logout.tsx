"use client"
export default function Logout(){
  
  async function handleLogout(){
    fetch("https://exam.elevateegy.com/api/v1/auth/logout")
  }
  return <>
  <button className="px-5 py-2 bg-emerald-400 rounded-xl block ms-auto" onClick={()=>handleLogout()}>
    Logout
  </button>
  </>

  
}