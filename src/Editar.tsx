import { useRef, FormEvent, useEffect } from "react";
import { api } from "./service/api";
import { useNavigate, useParams } from "react-router-dom";
export default function Editar() {
  const nameRef = useRef<HTMLInputElement | null>(null);
  const emailRef = useRef<HTMLInputElement | null>(null);

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    async function fetchClient() {
      const response = await api.get(`/customerById/${id}`);
      nameRef.current!.value = response.data.name;
      emailRef.current!.value = response.data.email;
    }
    fetchClient();
  }, [id]);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();

    const name = nameRef.current?.value;
    const email = emailRef.current?.value;

    if (!name || !email) {
      return;
    }

    await api.put(`/customer/${id}`, {
      name: name,
      email: email,
    });

    nameRef.current!.value = "";
    emailRef.current!.value = "";

    navigate("/");
  }
  return (
    <div className="w-full min-h-screen bg-gray-900 flex justify-center items-center px-4">
      <main className="my-10 w-full md:max-w-2xl">
        <h1 className="text-4xl text-white font-medium">Clientes</h1>

        <form className="flex flex-col my-6" onSubmit={handleSubmit}>
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

          <div className="flex justify-end">
            <button
              className="cursor-pointer p-2 bg-red-500 rounded font-medium me-4"
              onClick={() => {
                navigate("/");
              }}
            >
              Cancelar
            </button>
            <button className="cursor-pointer p-2 bg-green-500 rounded font-medium">
              Salvar
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}
