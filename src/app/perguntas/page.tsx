"use client";
import React, { useState, useEffect } from "react";
import "@/styles/perguntas.css";

const quizData = [
	{
		id: 1,
		question: "Como está o nível de hidratação dos seus fios?",
		subtitle: "Selecione uma resposta",
		image: "/images/perguntas/Img principal.png",
		options: [
			{
				value: 4,
				text: "Extremamente ressecados, embaraçam facilmente e sem brilho.",
			},
			{ value: 3, text: "Ressecados e ásperos ao toque." },
			{ value: 2, text: "Um pouco ressecados nas pontas." },
			{ value: 1, text: "Macios e com brilho natural." },
		],
	},
	{
		id: 2,
		question:
			"Você percebe frizz excessivo ou falta de definição nos cachos/ondulações?",
		subtitle: "Selecione uma resposta",
		image: "/images/perguntas/Img principal.png",
		options: [
			{ value: 1, text: "Pouco frizz, definição boa." },
			{ value: 2, text: "Frizz médio, definição irregular." },
			{ value: 3, text: "Muito frizz e sem definição." },
			{
				value: 4,
				text: "Frizz acentuado e pouca definição, mesmo após finalizar.",
			},
		],
	},
	{
		id: 3,
		question:
			"Os fios estão elásticos, com quebra fácil ou aspecto 'emborrachado'?",
		subtitle: "Selecione uma resposta",
		image: "/images/perguntas/Img principal.png",
		options: [
			{ value: 1, text: "Não, estão fortes e resistentes." },
			{ value: 2, text: "Um pouco elásticos, com leve quebra." },
			{ value: 3, text: "Sim, quebram com facilidade ao pentear ou lavar." },
			{ value: 4, text: "Elásticos e com quebra notável ao esticar o fio." },
		],
	},
	{
		id: 4,
		question: "Seu cabelo está opaco ou sem brilho natural?",
		subtitle: "Selecione uma resposta",
		image: "/images/perguntas/Img principal.png",
		options: [
			{ value: 1, text: "Brilhante, principalmente após lavar." },
			{ value: 2, text: "Opaco às vezes, dependendo do produto." },
			{ value: 3, text: "Sempre opaco, sem brilho nenhum." },
			{
				value: 4,
				text: "Quase sempre opaco, com brilho mínimo apenas sob luz direta.",
			},
		],
	},
	{
		id: 5,
		question: "Ele está áspero ao toque?",
		subtitle: "Selecione uma resposta",
		image: "/images/perguntas/Img principal.png",
		options: [
			{ value: 1, text: "Macio na maior parte do tempo." },
			{ value: 2, text: "Um pouco áspero nas pontas." },
			{ value: 3, text: "Muito áspero, especialmente seco." },
			{
				value: 4,
				text: "Áspero em grande parte do comprimento, não apenas nas pontas.",
			},
		],
	},
	{
		id: 6,
		question: "Você faz uso frequente de secador, chapinha ou química?",
		subtitle: "Selecione uma resposta",
		image: "/images/perguntas/Img principal.png",
		options: [
			{ value: 1, text: "Quase nunca." },
			{ value: 2, text: "Às vezes, 1–2 vezes por mês." },
			{
				value: 3,
				text: "Uso semanalmente fontes de calor ou tenho química antiga/desbotada.",
			},
			{
				value: 4,
				text: "Sim, uso com frequência ou tenho química ativa (alisamento, tintura etc).",
			},
		],
	},
	{
		id: 7,
		question: "Seu couro cabeludo apresenta oleosidade, caspa ou seborreia?",
		subtitle: "Selecione uma resposta",
		image: "/images/perguntas/Img principal.png",
		options: [
			{ value: 1, text: "Saudável, sem sintomas." },
			{ value: 2, text: "Pouco oleoso ou com leve descamação." },
			{ value: 3, text: "Muito oleoso, coçando ou com caspa frequente." },
			{ value: 4, text: "Oleosidade constante na raiz e descamação visível." },
		],
	},
	{
		id: 8,
		question: "Com que frequência você lava o cabelo atualmente?",
		subtitle: "Selecione uma resposta",
		image: "/images/perguntas/Img principal.png",
		options: [
			{ value: 1, text: "De 2 a 3 vezes por semana." },
			{ value: 2, text: "1 vez por semana." },
			{ value: 3, text: "A cada 10 dias ou mais." },
			{ value: 4, text: "Lavo com pouca frequência, apenas quando sinto o cabelo muito sujo." },
		],
	},
	{
		id: 9,
		question: "Você costuma usar shampoo com sulfato ou só produtos suaves/co-wash?",
		subtitle: "Selecione uma resposta",
		image: "/images/perguntas/Img principal.png",
		options: [
			{ value: 1, text: "Uso apenas co-wash ou low poo." },
			{ value: 2, text: "Alterno entre shampoo suave e tradicional." },
			{ value: 3, text: "Uso majoritariamente shampoo com sulfato, raramente um suave." },
			{ value: 4, text: "Sempre uso shampoo com sulfato." },
		],
	},
	{
		id: 10,
		question: "Que tipo de máscara capilar você usa com mais frequência?",
		subtitle: "Selecione uma resposta",
		image: "/images/perguntas/Img principal.png",
		options: [
			{ value: 1, text: "Hidratação." },
			{ value: 2, text: "Nutrição." },
			{ value: 3, text: "Reconstrução." },
			{ value: 4, text: "Não tenho o costume de usar máscaras de tratamento." },
		],
	},
	{
		id: 11,
		question: "Você já fez um teste de porosidade?",
		subtitle: "Selecione uma resposta",
		image: "/images/perguntas/Img principal.png",
		options: [
			{ value: 1, text: "Sim, meus fios têm porosidade baixa/média." },
			{ value: 2, text: "Sim, meus fios têm porosidade alta." },
			{ value: 3, text: "Nunca fiz." },
			{ value: 4, text: "Já fiz, mas não entendi o resultado ou não sei como tratar." },
		],
	},
	{
		id: 12,
		question: "Como você finaliza o cabelo após lavar?",
		subtitle: "Selecione uma resposta",
		image: "/images/perguntas/Img principal.png",
		options: [
			{ value: 1, text: "Com creme de pentear ou leave-in leve." },
			{ value: 2, text: "Com óleo vegetal e gel para definição." },
			{ value: 3, text: "Deixo secar naturalmente, sem produto." },
			{ value: 4, text: "Finalizo apenas com produtos inadequados (ex: condicionador sem enxágue)." },
		],
	},
	{
		id: 13,
		question: "Costuma dormir com touca ou fronha de cetim/seda?",
		subtitle: "Selecione uma resposta",
		image: "/images/perguntas/Img principal.png",
		options: [
			{ value: 1, text: "Sempre." },
			{ value: 2, text: "Às vezes." },
			{ value: 3, text: "Raramente, só quando lembro." },
			{ value: 4, text: "Nunca." },
		],
	},
	{
		id: 14,
		question: "Você nota diferença entre mechas: algumas mais secas ou indefinidas?",
		subtitle: "Selecione uma resposta",
		image: "/images/perguntas/Img principal.png",
		options: [
			{ value: 1, text: "Não, os fios são bem uniformes." },
			{ value: 2, text: "Algumas mechas mais secas ou abertas." },
			{ value: 3, text: "Muitas mechas desiguais ou danificadas." },
			{ value: 4, text: "A parte de cima do cabelo é visivelmente mais danificada que a de baixo." },
		],
	},
	{
		id: 15,
		question: "Você faz corte de manutenção regularmente?",
		subtitle: "Selecione uma resposta",
		image: "/images/perguntas/Img principal.png",
		options: [
			{ value: 1, text: "Sim, a cada 2 ou 3 meses." },
			{ value: 2, text: "A cada 6 meses ou mais." },
			{ value: 3, text: "Quase nunca corto." },
			{ value: 4, text: "Só corto o cabelo uma vez por ano." },
		],
	},
];

const PerguntaPage = () => {
	const [currentQuestion, setCurrentQuestion] = useState<number>(1);
	const [selectedOption, setSelectedOption] = useState<number | null>(null);
	const [answers, setAnswers] = useState<Record<number, number>>({});

	useEffect(() => {
		const savedAnswer = answers[currentQuestion];
		setSelectedOption(savedAnswer || null);
	}, [currentQuestion, answers]);

	const currentQuestionData = quizData.find((q) => q.id === currentQuestion);

	const handleOptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const value = parseInt(event.target.value);
		setSelectedOption(value);
		setAnswers((prev) => ({
			...prev,
			[currentQuestion]: value,
		}));
	};

	const handleNext = () => {
		if (currentQuestion < quizData.length) {
			setCurrentQuestion(currentQuestion + 1);
		}
	};

	const handlePrev = () => {
		if (currentQuestion > 1) {
			setCurrentQuestion(currentQuestion - 1);
		}
	};

	const calculateTotalScore = () => {
		return Object.values(answers).reduce((sum, val) => (sum as number) + (val as number), 0);
	};

	const getRedirectPage = (score: number) => {
		if (score <= 15) {
			return "/respostas1";
		} else if (score <= 30) {
			return "/respostas2";
		} else if (score <= 45) {
			return "/respostas3";
		} else {
			return "/respostas4";
		}
	};

	const handleSubmitQuiz = () => {
		const totalAnswered = Object.keys(answers).length;
		if (totalAnswered < quizData.length) {
			alert(
				`Por favor, responda todas as perguntas. Você respondeu ${totalAnswered} de ${quizData.length}.`    </div>
  );

			return;
		}
		const totalScore = calculateTotalScore();
		const redirectPage = getRedirectPage(Number(totalScore));
		window.location.href = redirectPage;
	};

	if (!currentQuestionData) {
		return <div>Carregando...</div>;
	}

	const isLastQuestion = currentQuestion === quizData.length;
	const isFirstQuestion = currentQuestion === 1;

	return (
    <div className="page-perguntas-wrapper">
		<main>
			<section className="esquerda">
				<div className="content">
					<button className="seta" onClick={() => setCurrentQuestion(1)}>
						<img src="/images/perguntas/setinha.png" alt="" />
						<p>Página Inicial</p>
					</button>

					<div className="pergunta-header">
						<div className="pergunta-titulo">
							<h1>
								Pergunta {currentQuestion}/{quizData.length}
							</h1>
							<div className="pergunta-subtitulo">
								<h2>{currentQuestionData.question}</h2>
								<h3>{currentQuestionData.subtitle}</h3>
							</div>
						</div>
					</div>

					<img id="logo" src="/images/logobranca.png" alt="" />
				</div>
			</section>

			<section className="direita">
				<div className="conteudo">
					<img src={currentQuestionData.image} alt="" />

					<div className="respostas">
						{currentQuestionData.options.map((option) => (
							<label
								key={option.value}
								className={selectedOption === option.value ? "selected" : ""}
							>
								<input
									type="radio"
									name="opcao"
									value={option.value}
									checked={selectedOption === option.value}
									onChange={handleOptionChange}
								/>
								<span>{option.text}</span>
							</label>
						))}
					</div>

					<div className="botoes">
						{!isFirstQuestion && (
							<button onClick={handlePrev} id="number_one">
								Anterior
							</button>
						)}
						{!isLastQuestion ? (
							<button onClick={handleNext} id="number_two">
								Próximo
							</button>
						) : (
							<button
								onClick={handleSubmitQuiz}
								id="number_two"
								className="finalizar-quiz-btn"
							>
								Finalizar Quiz
							</button>
						)}
					</div>
				</div>
			</section>
		</main>
	);
};

export default PerguntaPage;