import moment from "moment";
import { useTranslation } from 'react-i18next';

interface ConvertCardProps {
    id: string,
    coinName: string,
    symbol?: string,
    coin?: string,
    tax: number,
    total: number,
}

export function ConvertCard (props: ConvertCardProps) {
    const { t } = useTranslation();

    return (
        <div key={props.id} className="group relative bg-gray-800 rounded-md h-full p-6 text-white shadow-lg">
              <div className="flex w-full justify-center items-center">
                <h2 >{t(`convertCard.coins.${props.coin}`)}</h2>
              </div>
              <div className="flex justify-center items-center m-auto mt-4 w-48 h-32 bg-gray-900 rounded-md p-4">
                <p className="text-4xl ">{props.total}</p>
              </div>
              <div className="mt-4 flex justify-between">
                <div>
                  <h3 className=" ">
                    {t(`convertCard.tax`)}
                  </h3>
                </div>
                <p className="text-sm font-medium ">{props.tax}</p>
              </div>
              <div className="mt-4 flex justify-between">
                <div>
                  <h3 className=" ">
                    {t(`convertCard.date`)}
                  </h3>
                </div>
                <p className="text-sm font-medium ">{moment().format(t('global.dateFormat'))}</p>
              </div>
        </div>
    )
}