import React from 'react'
import { useTranslation } from 'react-i18next'
// useTranslation é um hook 
// que devolve uma função de tradução (t) e a instância do i18n

// Importa as bandeiras (imagens e componente)
import BrasilFlag from '../../public/icons/brasil.png';
import EuaFlag from '../../public/icons/united-states.png'
import Flag from './languageFlag'

const I18n = () => {
  const { i18n } = useTranslation()
  // Instância do i18n

  function handleChangeLanguage(language: string) {
    // Trocando o idioma na chamada da função
    i18n.changeLanguage(language)
  }

  const selectedLanguage = i18n.language // Idioma selecionado
  return (
    <div className="flex m-1 items-center">
      <Flag
        image={BrasilFlag}
        isSelected={selectedLanguage === 'pt-BR'} // Verifica o idioma escolhido
        onClick={() => handleChangeLanguage('pt-BR')} // Troca o idioma para pt-BR
      />
      <Flag
        image={EuaFlag}
        isSelected={selectedLanguage === 'en-US'} // Verifica o idioma escolhido
        onClick={() => handleChangeLanguage('en-US')} // Troca o idioma para en-US
      />
    </div>
  )
}

export default I18n