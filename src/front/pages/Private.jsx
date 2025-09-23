import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";

export const Private = () => {

  const Navigate = useNavigate();

  const [user, setUser] = useState()

  const url = import.meta.env.VITE_BACKEND_URL

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      Navigate("/login");
    }

    checkUser()
  }, []);

  const checkUser = async () => {
    try {
      const response = await fetch(`${url}/api/private`, {
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + localStorage.getItem("token")
        },
      })
      if (!response.ok) throw new Error("Hubo un error en el pedido")
      const data = await response.json()
      setUser(data)
    } catch (error) {
      console.log(error)

    }
  }

  return (
    <div className="d-flex flex-column align-items-center">
      <h1 className="text-center">Pagina privada</h1>
      <button onClick={() => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        Navigate("/");
      }}>Cerrar sesion</button>
    </div>
  )
}