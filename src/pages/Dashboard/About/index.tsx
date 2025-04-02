import { Container } from "@/components/Container";
import { Logo } from "@/components/Logo";

export const About = () => {
  const yearsExperience = new Date().getFullYear() - 2018;

  return (
    <Container titleHeader="Sobre">
      <div className="bg-background dark:bg-gray-800 p-8 px-10 rounded-2xl">
        <div className="flex justify-center">
          <Logo className="w-[190px]" />
        </div>
        <p className="mt-4">Sobre mim</p>
        <p className="mt-1">
          Desenvolvedor Full Stack Sênior com mais de {yearsExperience} anos de
          experiência na construção de aplicações mobile e mais de{" "}
          {yearsExperience + 5} anos com desenvolvimento web. Especialista em
          JavaScript, com domínio completo do front-end usando React e do
          back-end com Node.js.
        </p>

        <p className="mt-9">Sobre o Cashly</p>
        <p className="mt-1">
          Vez ou outra, desenvolvo projetos pessoais para testar tecnologias e
          aprimorar minhas habilidades. Um desses projetos é o <b>Cashly</b>, um
          dashboard financeiro criado por mim em <b>2025</b> para estudo e
          aprimoramento técnico, focado no controle de despesas e receitas de
          forma eficiente e moderna.
        </p>

        <p className="mt-9">Tecnologias utilizadas</p>
        <p className="mt-1">
          O <b>Cashly</b> foi desenvolvido utilizando um stack moderno e
          performático. No front-end, utilizei <b>React.js</b> com <b>Vite</b>{" "}
          para um desenvolvimento rápido e otimizado, aliado ao{" "}
          <b>TypeScript</b> para maior segurança no código. O gerenciamento de
          estado é feito com <b>Zustand</b>, proporcionando uma solução leve e
          eficiente. A interface foi construída com <b>Tailwind CSS</b> para
          estilização ágil e componentes acessíveis do <b>Shadcn</b>. O backend
          se comunica com a aplicação via <b>React Query</b>, otimizando o
          carregamento e sincronização de dados. Além disso, o sistema conta com{" "}
          <b>Axios</b> para requisições HTTP, <b>Luxon</b> para manipulação de
          datas e <b>Recharts</b> para visualização de dados.
        </p>

        <p className="mt-9">Deploy</p>
        <p className="mt-1">
          O projeto está hospedado na <b>Vercel</b>, garantindo alta
          performance, fácil escalabilidade e um fluxo de CI/CD eficiente para
          atualizações rápidas e contínuas.
        </p>

        <div className="mt-16 text-center">
          Copyright © {new Date().getFullYear()} <br /> Desenvolvido por Fábio
          Costa
        </div>
      </div>
    </Container>
  );
};
