<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Tela de cadastro 2</title>
    <link rel="stylesheet" href="../styles/tela de cadastro.css">
    <link rel="stylesheet" href= "../src/fontes/fontes.css">
    <link rel="shortcut icon" href="../src/Imagens/logo-oasis-icon.ico" type="image/x-icon">
</head>
<body>
   
    <figure class="figure-padding-cadastro">
        <img src="../src/Imagens/tela-de-cadastro/imagem-tela-login-roxo.png" alt="imagem-tela-login-roxo">
    </figure>

    <main id="main-margin-cadastro2">
        <section>
            <h1>Agora, crie sua senha!</h1>
            <p>sua senha deve ser <strong>forte</strong>, contendo números, <br class="hide-on-mobile"> letras maiúsculas e minúsculas e caracteres.</p>

            <form>
                <label for="senha">Senha</label>
                <input type="password" id="senha" name="senha" autocomplete="off" class="padding-form">
                
                <label for="csenha">Confirme sua senha</label>
                <input type="password" id="csenha" name="csenha" autocomplete="off" class="padding-form">
        
                <a href="../index.html"><input class="botaocontinue" type="button" value="CRIE SUA CONTA"></a>
                
                <section id="section-checkbox-cadastro">
                    <input type="checkbox" id="checkbox-cadastro" name="checkboxt">
                    <span>aceito os termos de condição para criação da conta</span>
                </section>
            </form>
        </section>
    </main>
</body>
</html>