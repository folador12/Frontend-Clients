import { useState, useEffect, useRef, FormEvent } from "react";
import { FiTrash, FiCheckCircle, FiEdit2 } from "react-icons/fi";
import { api } from "./service/api";
import { useNavigate } from "react-router-dom";

interface CustommerProps {
  id: string;
  name: string;
  email: string;
  status: string;
  created_at: string;
  updated_at: string;
}

function App() {
  const [customers, setCustomers] = useState<CustommerProps[]>([]);

  const nameRef = useRef<HTMLInputElement | null>(null);
  const emailRef = useRef<HTMLInputElement | null>(null);

  const navigate = useNavigate();

  useEffect(() => {
    async function fetchClients() {
      const response = await api.get("/customers");
      setCustomers(response.data);
    }
    fetchClients();
  }, []);

  async function handleFilter(e: FormEvent) {
    e.preventDefault();
    const name = nameRef.current?.value;
    const email = emailRef.current?.value;

    const response = await api.get("/customers", {
      params: {
        name: name,
        email: email,
      },
    });

    setCustomers(response.data);
  }

  async function handleDelete(id: string) {
    console.log(id);
    await api.delete(`/customer/${id}`);
    setCustomers((prevState) =>
      prevState.filter((customer) => customer.id !== id)
    );
  }

  async function handleUpdateStatus(id: string, stat: string) {
    const status = stat === "a" ? "i" : "a";
    await api.put(`/customer/status/${id}`, {
      status: status,
    });

    setCustomers((prevState) =>
      prevState.map((item) => (item.id === id ? { ...item, status } : item))
    );
  }

  return (
    <div className="w-full min-h-screen bg-gray-900 flex justify-center px-4">
      <main className="my-10 w-full md:max-w-2xl">
        <h1 className="text-4xl text-white font-medium">Clientes</h1>

        <form className="flex flex-col my-6" onSubmit={handleFilter}>
          <label className="font-medium text-white">Nome:</label>
          <input
            type="text"
            placeholder="Digite o nome completo do cliente..."
            className="w-full mb-5 p-2 rounded"
            ref={nameRef}
          />

          <label className="font-medium text-white">Email:</label>
          <input
            type="text"
            placeholder="Digite o email do cliente..."
            className="w-full mb-5 p-2 rounded"
            ref={emailRef}
          />

          <button className="cursor-pointer p-2 bg-green-500 rounded font-medium w-full">
            Filtrar
          </button>
        </form>

        <div className="flex justify-end">
          <button
            className="cursor-pointer p-2 rounded bg-green-500 font-medium  "
            onClick={() => {
              navigate("/cadastro");
            }}
          >
            Cadastrar Novo Cliente
          </button>
        </div>

        <section className="flex flex-col mt-5">
          {customers.map((customer) => (
            <article
              key={customer.id}
              className={`w-full ${
                customer.status === "i" ? "bg-red-500" : "bg-white"
              } rounded p-2 relative hover:scale-105 duration-200 mb-6 cursor-pointer`}
            >
              <p className=" mt-3">
                <span className="font-medium ">Nome:</span> {customer.name}
              </p>
              <p>
                <span className="font-medium ">Email:</span> {customer.email}
              </p>
              <button
                className="bg-red-600 w-7 h-7 flex items-center justify-center rounded-lg absolute right-0 -top-2"
                onClick={() => handleDelete(customer.id)}
              >
                <FiTrash size={18} color="#FFF" />
              </button>
              <button
                className=" bg-blue-600 w-7 h-7 flex items-center justify-center rounded-lg absolute left-0 -top-2"
                onClick={() => {
                  navigate(`/editar/${customer.id}`);
                }}
              >
                <FiEdit2 size={18} color="#FFF" />
              </button>
              <button
                className=" bg-green-500 w-7 h-7 flex items-center justify-center rounded-lg absolute right-0 -bottom-2"
                onClick={() => handleUpdateStatus(customer.id, customer.status)}
              >
                <FiCheckCircle size={18} color="#FFF" />
              </button>
            </article>
          ))}
        </section>
      </main>
    </div>
  );
}

export default App;
