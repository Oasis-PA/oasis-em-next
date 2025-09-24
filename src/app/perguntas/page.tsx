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
				value: "1",
				text: "Extremamente ressecados, embaraçam facilmente e sem brilho.",
			},
			{ value: "2", text: "Ressecados e ásperos ao toque." },
			{ value: "3", text: "Macios e com brilho natural." },
			{ value: "4", text: "Um pouco ressecados nas pontas." },
		],
	},
	{
		id: 2,
		question: "Você percebe frizz excessivo ou falta de definição nos cachos/ondulações?",
		subtitle: "Selecione uma resposta",
		image: "/images/perguntas/Img principal.png",
		options: [
			{ value: "a", text: "Pouco frizz, definição boa." },
			{ value: "b", text: "Frizz médio, definição irregular." },
			{ value: "c", text: "Muito frizz e sem definição." },
			{
				value: "d",
				text: "Frizz acentuado e pouca definição, mesmo após finalizar.",
			},
		],
	},
	{
		id: 3,
		question: "Os fios estão elásticos, com quebra fácil ou aspecto 'emborrachado'?",
		subtitle: "Selecione uma resposta",
		image: "/images/perguntas/Img principal.png",
		options: [
			{ value: "a", text: "Não, estão fortes e resistentes." },
			{ value: "b", text: "Um pouco elásticos, com leve quebra." },
			{ value: "c", text: "Sim, quebram com facilidade ao pentear ou lavar." },
			{ value: "d", text: "Elásticos e com quebra notável ao esticar o fio." },
		],
	},
	{
		id: 4,
		question: "Seu cabelo está opaco ou sem brilho natural?",
		subtitle: "Selecione uma resposta",
		image: "/images/perguntas/Img principal.png",
		options: [
			{ value: "a", text: "Brilhante, principalmente após lavar." },
			{ value: "b", text: "Opaco às vezes, dependendo do produto." },
			{ value: "c", text: "Sempre opaco, sem brilho nenhum." },
			{
				value: "d",
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
			{ value: "a", text: "Macio na maior parte do tempo." },
			{ value: "b", text: "Um pouco áspero nas pontas." },
			{ value: "c", text: "Muito áspero, especialmente seco." },
			{
				value: "d",
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
			{ value: "a", text: "Quase nunca." },
			{ value: "b", text: "Às vezes, 1–2 vezes por mês." },
			{
				value: "c",
				text: "Sim, uso com frequência ou tenho química ativa (alisamento, tintura etc).",
			},
			{
				value: "d",
				text: "Uso semanalmente fontes de calor ou tenho química antiga/desbotada.",
			},
		],
	},
	{
		id: 7,
		question: "Seu couro cabeludo apresenta oleosidade, caspa ou seborreia?",
		subtitle: "Selecione uma resposta",
		image: "/images/perguntas/Img principal.png",
		options: [
			{ value: "a", text: "Saudável, sem sintomas." },
			{ value: "b", text: "Pouco oleoso ou com leve descamação." },
			{ value: "c", text: "Muito oleoso, coçando ou com caspa frequente." },
			{ value: "d", text: "Oleosidade constante na raiz e descamação visível." },
		],
	},
	{
		id: 8,
		question: "Com que frequência você lava o cabelo atualmente?",
		subtitle: "Selecione uma resposta",
		image: "/images/perguntas/Img principal.png",
		options: [
			{ value: "a", text: "De 2 a 3 vezes por semana." },
			{ value: "b", text: "1 vez por semana." },
			{ value: "c", text: "A cada 10 dias ou mais." },
			{ value: "d", text: "Lavo com pouca frequência, apenas quando sinto o cabelo muito sujo." },
		],
	},
	{
		id: 9,
		question: "Você costuma usar shampoo com sulfato ou só produtos suaves/co-wash?",
		subtitle: "Selecione uma resposta",
		image: "/images/perguntas/Img principal.png",
		options: [
			{ value: "a", text: "Uso apenas co-wash ou low poo." },
			{ value: "b", text: "Alterno entre shampoo suave e tradicional." },
			{ value: "c", text: "Sempre uso shampoo com sulfato." },
			{ value: "d", text: "Uso majoritariamente shampoo com sulfato, raramente um suave." },
		],
	},
	{
		id: 10,
		question: "Que tipo de máscara capilar você usa com mais frequência?",
		subtitle: "Selecione uma resposta",
		image: "/images/perguntas/Img principal.png",
		options: [
			{ value: "a", text: "Hidratação." },
			{ value: "b", text: "Nutrição." },
			{ value: "c", text: "Reconstrução." },
			{ value: "d", text: "Não tenho o costume de usar máscaras de tratamento." },
		],
	},
	{
		id: 11,
		question: "Você já fez um teste de porosidade?",
		subtitle: "Selecione uma resposta",
		image: "/images/perguntas/Img principal.png",
		options: [
			{ value: "a", text: "Sim, meus fios têm porosidade baixa/média." },
			{ value: "b", text: "Sim, meus fios têm porosidade alta." },
			{ value: "c", text: "Nunca fiz." },
			{ value: "d", text: "Já fiz, mas não entendi o resultado ou não sei como tratar." },
		],
	},
	{
		id: 12,
		question: "Como você finaliza o cabelo após lavar?",
		subtitle: "Selecione uma resposta",
		image: "/images/perguntas/Img principal.png",
		options: [
			{ value: "a", text: "Com creme de pentear ou leave-in leve." },
			{ value: "b", text: "Com óleo vegetal e gel para definição." },
			{ value: "c", text: "Deixo secar naturalmente, sem produto." },
			{ value: "d", text: "Finalizo apenas com produtos inadequados (ex: condicionador sem enxágue)." },
		],
	},
	{
		id: 13,
		question: "Costuma dormir com touca ou fronha de cetim/seda?",
		subtitle: "Selecione uma resposta",
		image: "/images/perguntas/Img principal.png",
		options: [
			{ value: "a", text: "Sempre." },
			{ value: "b", text: "Às vezes." },
			{ value: "c", text: "Nunca." },
			{ value: "d", text: "Raramente, só quando lembro." },
		],
	},
	{
		id: 14,
		question: "Você nota diferença entre mechas: algumas mais secas ou indefinidas?",
		subtitle: "Selecione uma resposta",
		image: "/images/perguntas/Img principal.png",
		options: [
			{ value: "a", text: "Não, os fios são bem uniformes." },
			{ value: "b", text: "Algumas mechas mais secas ou abertas." },
			{ value: "c", text: "Muitas mechas desiguais ou danificadas." },
			{ value: "d", text: "A parte de cima do cabelo é visivelmente mais danificada que a de baixo." },
		],
	},
	{
		id: 15,
		question: "Você faz corte de manutenção regularmente?",
		subtitle: "Selecione uma resposta",
		image: "/images/perguntas/Img principal.png",
		options: [
			{ value: "a", text: "Sim, a cada 2 ou 3 meses." },
			{ value: "b", text: "A cada 6 meses ou mais." },
			{ value: "c", text: "Quase nunca corto." },
			{ value: "d", text: "Só corto o cabelo uma vez por ano." },
		],
	},
];

interface QuizOption {
	value: string;
	text: string;
}

interface QuizQuestion {
	id: number;
	question: string;
	subtitle: string;
	image: string;
	options: QuizOption[];
}

const PerguntaPage = () => {
	const [quizManager] = useState(() => new QuizManager());
	const [currentQuestion, setCurrentQuestion] = useState(1);
	const [selectedOption, setSelectedOption] = useState<string | null>(null);
	const [currentQuestionData, setCurrentQuestionData] = useState<QuizQuestion | null>(null);

	useEffect(() => {
		quizManager.loadFromLocalStorage();
		quizManager.currentQuestion = currentQuestion;
		const questionData = (quizData as QuizQuestion[]).find((q) => q.id === currentQuestion) || null;
		setCurrentQuestionData(questionData);
		const savedAnswer = quizManager.getAnswer(currentQuestion);
		if (savedAnswer) {
			setSelectedOption(savedAnswer);
		} else {
			setSelectedOption(null);
		}
	}, [currentQuestion, quizManager]);

	const handleOptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const value = event.target.value;
		setSelectedOption(value);
		quizManager.saveAnswer(currentQuestion, value);
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

	const handleSubmitQuiz = async () => {
		if (quizManager.isComplete()) {
			const result = await quizManager.submitToDatabase();
			if (result.success) {
				alert("Quiz enviado com sucesso!");
				quizManager.clearData();
				setCurrentQuestion(1);
			} else {
				alert("Erro ao enviar quiz. Tente novamente.");
			}
		} else {
			alert("Por favor, complete todas as perguntas antes de enviar.");
		}
	};

	const showAllAnswers = () => {
		console.log("Todas as respostas:", quizManager.getAllAnswers());
		console.log("Dados para envio:", quizManager.prepareDataForSubmission());
	};

	if (!currentQuestionData) {
		return <div>Carregando...</div>;
	}

	const isLastQuestion = currentQuestion === quizData.length;
	const isFirstQuestion = currentQuestion === 1;

	return (
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
						{currentQuestionData.options.map((option: QuizOption) => (
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

export class QuizManager {
	answers: Record<number, string>;
	currentQuestion: number;
	totalQuestions: number;

	constructor() {
		this.answers = {};
		this.currentQuestion = 1;
		this.totalQuestions = quizData.length;
	}

	saveAnswer(questionId: number, answer: string) {
		this.answers[questionId] = answer;
		this.saveToLocalStorage();
	}

	getAnswer(questionId: number) {
		return this.answers[questionId] || null;
	}

	getAllAnswers() {
		return this.answers;
	}

	saveToLocalStorage() {
		localStorage.setItem("quizAnswers", JSON.stringify(this.answers));
		localStorage.setItem("currentQuestion", this.currentQuestion.toString());
	}

	loadFromLocalStorage() {
		const savedAnswers = localStorage.getItem("quizAnswers");
		const savedCurrentQuestion = localStorage.getItem("currentQuestion");

		if (savedAnswers) {
			this.answers = JSON.parse(savedAnswers);
		}

		if (savedCurrentQuestion) {
			this.currentQuestion = parseInt(savedCurrentQuestion);
		}
	}

	clearData() {
		this.answers = {};
		this.currentQuestion = 1;
		localStorage.removeItem("quizAnswers");
		localStorage.removeItem("currentQuestion");
	}

	isComplete() {
		return Object.keys(this.answers).length === this.totalQuestions;
	}

	prepareDataForSubmission() {
		const submissionData = {
			timestamp: new Date().toISOString(),
			userId: this.generateUserId(),
			answers: this.answers,
			totalQuestions: this.totalQuestions,
			isComplete: this.isComplete(),
		};

		return submissionData;
	}

	generateUserId() {
		return "user_" + Date.now() + "_" + Math.random().toString(36).substr(2, 9);
	}

	async submitToDatabase() {
		const data = this.prepareDataForSubmission();

		try {
			const response = await fetch("/api/quiz-results", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(data),
			});

			if (response.ok) {
				console.log("Dados enviados com sucesso!");
				return { success: true, data: await response.json() };
			} else {
				throw new Error("Erro no envio");
			}
		} catch (error: any) {
			console.error("Erro ao enviar dados:", error);
			return { success: false, error: error.message };
		}
	}

	exportAsJSON() {
		return JSON.stringify(this.prepareDataForSubmission(), null, 2);
	}
}
