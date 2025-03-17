import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid"; // Import UUID
import "./App.css";
import { CircleDollarSign } from "lucide-react";

function App() {
  const [moedas, setMoedas] = useState(0);
  const [opcoes, setOpcoes] = useState(0);
  const [selectedValue, setSelectedValue] = useState("");
  const [valorInputOrigem, setValorInputOrigem] = useState("");
  const [valorInputDestino, setValorInputDestino] = useState("");
  const formatador = new Intl.NumberFormat("pt-BR", {
    maximumFractionDigits: 2,
  });

  useEffect(() => {
    async function fetchTasks() {
      const response = await fetch(
        "https://economia.awesomeapi.com.br/last/USD-BRL,EUR-BRL,BTC-BRL",
        { method: "GET" }
      );
      const data = await response.json();
      const opcoes_ = [];
      setMoedas(data);

      for (let [key, value] of Object.entries(data)) {
        opcoes_.push(
          <option key={key} value={key}>
            {value.name}
          </option>
        );
      }
      setOpcoes(opcoes_);
    }
    fetchTasks();
  }, []);

  const handleSelectChange = (event) => {
    onChangeGetData(event.target.value);
  };

  function onChangeGetData(filterData) {
    const result = Object.entries(moedas).filter(
      ([key, value]) => key == filterData
    );
    console.log(result[0]);
    setSelectedValue(result[0][1]);
    console.log(selectedValue);
  }

  const handleKeyDown = (event) => {
    setValorInputOrigem(event.target.value);
    console.log(valorInputOrigem);
  };

  return (
    <div className="w-screen h-screen flex justify-center items-center bg-gradient-to-br from-sky-50 to-gray-200">
      <div className="w-[400px] h-[400px] rounded-xl bg-white shadow-xl p-10 space-y-4">
        <div className="w-full text-blue-500 flex space-x-3 justify-center text-2xl">
          <CircleDollarSign size={32} />
          <div className="font-bold">Exchange App</div>
        </div>
        <select
          onChange={handleSelectChange}
          className="w-full bg-blue-100 border border-blue-200 text-gray-700 py-2 px-4 pr-8 rounded leading-tight focus:outline-none focus:border-blue-500"
        >
          <option value="" defaultValue>
            Selecione uma opção para começar
          </option>
          {opcoes}
        </select>
        <div className="w-full border border-blue-200 text-gray-700 flex">
          <div className="text-1xl text-blue-400 text-right w-full">
            <p className="py-2 px-4 text-center">
              1 {selectedValue.code} é igual a{" "}
              {formatador.format(selectedValue.bid)} {selectedValue.codein}
            </p>
          </div>
        </div>
        <div className="w-full border border-blue-200 text-gray-700 flex">
          <div className="text-3xl font-bold bg-blue-400 text-white text-center">
            <p className="py-2 px-4 w-[100px]">{selectedValue.code}</p>
          </div>
          <div className="text-3xl font-bold text-right">
            <input
              type="text"
              className="py-2 px-4 w-full outline-0"
              onKeyUp={handleKeyDown}
            />
          </div>
        </div>
        <div className="w-full border border-blue-200 text-gray-700 flex">
          <div className="text-3xl font-bold bg-blue-400 text-white text-center ">
            <p className="py-2 px-4 w-[100px]">{selectedValue.codein}</p>
          </div>
          <div className="text-3xl font-bold text-right">
            <input
              disabled
              type="text"
              className="py-2 px-4 w-full outline-0 bg-slate-100"
              value={formatador.format(valorInputOrigem * selectedValue.bid)}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
