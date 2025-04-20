import React from 'react'
import {Link} from "react-router-dom"
const NotFound = () => {
  return (
    <section>
      <div className="page notfound">
        <img src="/notfound.png" alt="notfound" />
        <Link to={"/"}>RETURN TO HOME</Link>
      </div>
    </section>
  )
}

export default NotFound
