import { useEffect, useState } from "react";
import Header from "../components/header";
import api from 'axios';
import moment from 'moment';
import { useTranslation } from 'react-i18next';
import { ConvertCard } from "../components/convertCard";
import ModalLoader from '../components/loaderModal'

interface CurrencyType {
  id: string
  name: string;
  coin: string;
  symbol: string;
}

const auxCurrencies: CurrencyType[] = [
  { id: 'USD', name: 'Dollar', coin: 'USD', symbol: '$' },
  { id: 'EUR', name: 'Euro', coin: 'EUR', symbol: '€' },
  { id: 'BRL', name: 'Reais', coin: 'BRL', symbol: 'R$' },
  { id: 'CAD', name: 'Canadian Dollar', coin: 'CAD', symbol: 'CAD' }
];

interface Results {
  id: string,
  coinName: string,
  symbol: string,
  coin: string,
  tax: number,
  total: number,
}

function classNames(...classes: any) {
  return classes.filter(Boolean).join(' ')
}

export default function App() {
  const [currencies, setCurrencies] = useState<CurrencyType[]>(auxCurrencies);
  const [selectedCurrency, setSelectedCurrency] = useState(currencies[0]);
  const [amountValue, setAmountValue] = useState(undefined);
  const [results, setResults] = useState<Results[]>([]);
  const { t } = useTranslation();
  const [showLoader, setShowLoader] = useState<boolean>(false);

  const changeSelectedCurrency = (event: any) => {
    const valueToParse = event.target.value;
    const itemSelected = JSON.parse(valueToParse);
    setSelectedCurrency(itemSelected);
    return;
  }

  const convertMoney = async (e: any) => {
    try {
      e.preventDefault();
      setShowLoader(true);

      if (!amountValue) {
        return
      }
      await api.get(`api/convert?coinFrom=${selectedCurrency.coin}&amount=${amountValue}`)
        .then((response) => {
          setResults(response.data);
        })
        .catch((error) => {
          console.log('Error: ' + error.toString())
        })
    }
    catch (e) {
      console.log(e);
    }
    finally{
      setShowLoader(false);
    }
  }

  useEffect(() => {
    api.get('api/coin-list')
      .then((response) => {
        setCurrencies(response.data);
        setSelectedCurrency(response.data[0]);
      })
      .catch((error) => {
        console.log('Erro request coin list: ' + error.toString());
      })
  }, []);

  return (
    <>
      <title>ConvertMoney</title>
      <Header page='Convert' />
      <ModalLoader showLoader={showLoader} setShowLoader={setShowLoader} text="Aguarde..." />
      <main className="h-full flex flex-col">
        <div className="flex justify-center items-center w-1/2  mx-auto py-6 sm:px-6 lg:px-8">
          <div className="flex justify-center px-2 sm:px-0 w-full">
            <form className=" flex space-around" onSubmit={convertMoney}>
              <div className="flex w-full space-around border border-gray-100 shadow-lg sm:rounded-md sm:overflow-hidden ">
                <div className="px-4 py-2 flex bg-gray-800  flex-row justify-between  sm:p-2">
                  <div className="px-12 py-2 flex flex-col max-w-xs space-around">
                    <label htmlFor="price" className=" text-lg block text-sm font-medium text-white my-2">
                      {t('convertPage.yourAmount')}
                    </label>
                    <div className="mt-1 relative rounded-md shadow-sm">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <span className="text-gray-500 sm:text-sm">{selectedCurrency.symbol}</span>
                      </div>

                      <input
                        type="number"
                        name="price"
                        id="price"
                        className=" without_number text-xl focus:ring-indigo-500 focus:border-indigo-500 block w-full h-8 pl-10 pr-12 sm:text-sm border border-gray-200 rounded-md shadow-md"
                        placeholder="0.00"
                        value={amountValue}
                        onChange={(e) => {
                          let value = e.target.value
                          {/* @ts-ignore */ }
                          setAmountValue(value);
                        }}
                      />
                      <div className="absolute inset-y-0 right-0 flex items-center">
                        <label htmlFor="currency" className="sr-only">
                          Currency
                        </label>
                        <select
                          id="currency"
                          name="currency"
                          className="focus:ring-indigo-500 focus:border-indigo-500 h-full py-0 pl-2 pr-7 border-transparent bg-transparent text-gray-500 sm:text-sm rounded-md"
                          onChange={changeSelectedCurrency}
                        >
                          {
                            currencies.map((c) => {
                              return <option key={c.coin} value={JSON.stringify(c)} >{c.coin}</option>
                            })
                          }
                        </select>
                      </div>
                    </div>
                  </div>
                  <div className="px-12 flex items-center justify-center">
                    <button
                      className="flex justify-center py-2 px-4 border border-transparent shadow-md text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"

                    >
                      {t('convertPage.convertButton')}
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
        <div className="flex justify-center items-center w-full">
          <div className=" flex flex-col justify-center items-center w-full max-w-4xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
            <div className="flex mx-auto w-full mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8 space-around items-center">
              {results.map((result) => (
                <ConvertCard id={result.id} coinName={result.coinName} total={result.total} tax={result.tax} coin={result.coin}/>
              ))}
            </div>
          </div>
        </div>
      </main>
    </>
  )
}