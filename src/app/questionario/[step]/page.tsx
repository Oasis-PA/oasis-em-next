import QuestionarioPage from "@/components/QuestionarioPage";

interface QuestionarioProps {
  params: Promise<{ step: string }>;
}

export default async function Page({ params }: QuestionarioProps) {
  const { step } = await params;
  const stepNum = parseInt(step, 10);

  // Validar se é um número válido (1-4)
  if (isNaN(stepNum) || stepNum < 1 || stepNum > 4) {
    return (
    <div className="page-questionario-wrapper">
      <div style={{ textAlign: 'center', padding: '2rem' }}>
        <h1>Questionário não encontrado</h1>
        <p>Acesse um dos questionários disponíveis: /questionario/1, /questionario/2, /questionario/3 ou /questionario/4</p>
      </div>
    </div>
    );
  }

  return <QuestionarioPage step={stepNum} />;
}
