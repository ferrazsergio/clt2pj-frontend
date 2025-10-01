# CLT2PJ Frontend

Este projeto é o **frontend** da calculadora CLT vs PJ, que ajuda profissionais a comparar de forma clara e detalhada os regimes CLT e PJ antes de tomar uma decisão importante. O sistema foi inspirado na publicação do [Bruno Prata](https://www.linkedin.com/feed/update/urn:li:activity:7374157284022710272/) e desenvolvido com **React + TypeScript + Vite**.

## Principais Funcionalidades

- **Login Social**: Google e LinkedIn para facilitar o acesso.
- **Simulação de Regimes**: Informe seus salários CLT e PJ, selecione benefícios e veja o comparativo detalhado.
- **Sugestão de Reserva**: Saiba quanto reservar para manter sua segurança financeira ao migrar para PJ.
- **Dashboard com Histórico**: Salve e acompanhe todas as suas simulações.
- **Responsivo**: Funciona bem no desktop e no mobile.

## Como rodar localmente

```bash
git clone https://github.com/ferrazsergio/clt2pj-frontend.git
cd clt2pj-frontend
npm install
npm run dev
```

O backend está em: [clt2pj-backend](https://github.com/ferrazsergio/clt2pj-backend)

## Stack

- React
- TypeScript
- Vite
- Material UI (MUI)
- OAuth Login Social
- Axios