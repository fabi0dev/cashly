import { Container } from "@/components/Container";
import { Code } from "lucide-react";

export const About = () => {
  const yearsExperience = new Date().getFullYear() - 2018;

  return (
    <Container titleHeader="Sobre Mim">
      <div className="bg-background dark:bg-gray-800 p-8 px-10 rounded-2xl">
        <h2 className="text-2xl font-bold flex flex-row items-center justify-center gap-5 w-full">
          Fábio Costa <Code className="text-purple-500" /> Cashly
        </h2>
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
          Vez ou outra, desenvolvo projetos pessoais para testar novas
          tecnologias e aprimorar minhas habilidades. Um desses projetos é o{" "}
          <strong>Cashly</strong>, um dashboard financeiro criado por mim em{" "}
          <strong>2025</strong> para estudo e aprimoramento técnico, focado no
          controle de despesas e receitas de forma eficiente e moderna.
        </p>

        <p className="mt-9">Tecnologias utilizadas</p>
        <p className="mt-1">
          O Cashly foi desenvolvido utilizando <strong>Vite</strong> para um
          ambiente de desenvolvimento rápido e otimizado,
          <strong> React.js</strong> para a interface, <strong>Zustand</strong>{" "}
          para gerenciamento de estado simples e eficiente, além de{" "}
          <strong>Tailwind CSS</strong> para estilização e{" "}
          <strong>TypeScript</strong> para maior segurança no código.
        </p>

        <p className="mt-9">Deploy</p>
        <p className="mt-1">
          O projeto está hospedado na <strong>Vercel</strong>, garantindo alta
          performance, fácil escalabilidade e um fluxo de CI/CD eficiente para
          atualizações rápidas e contínuas.
        </p>

        <div className="mt-10 text-center">
          Copyright © {new Date().getFullYear()}
        </div>
      </div>
    </Container>
  );
};
