import "./index.css";
import { useState } from "react"
import Swal from "sweetalert2";
import usuarioService from "../../services/usuario-service";

function Login() {

    const [email, setEmail] = useState("admin@admin.com");
    const [senha, setSenha] = useState("123456");


    const autenticar = () => {

        if(!email || !senha){
            Swal.fire({
                icon: 'error',
                text: "Os campos de e-mail e senha são obrigatórios, verifique!"
            });
        }

        usuarioService.autenticar(email, senha)
        .then(response => {
            usuarioService.salvarToken(response.data.token);
            usuarioService.salvarUsuario(response.data.usuario);
            window.location = "/";
        })
        .catch(erro => { 
            console.log(erro)
        });
    };

    return (
        <div className="caixa-login">

            {/* Titulo da tela de login  */}
            <div className="titulo-login">
                <h1>Login</h1>
            </div>

            {/* Grupo do email */}
            <div className="grupo">
                <label>E-mail:</label> <br/>
                <input id="email" value={email} onChange={(e) => setEmail(e.target.value)} type="text" placeholder="Digite seu e-mail"/>
            </div>

            {/* Grupo do senha */}
            <div className="grupo">
                <label>Senha:</label> <br/>
                <input id="senha" value={senha} onChange={(e) => setSenha(e.target.value)} type="password" placeholder="Digite sua senha"/>
            </div>

            {/* Link para recuperar a senha */}
            <div className="esqueci-minha-senha">
                <a href="#">Esqueci minha senha</a>
            </div>

            {/* Botão de entrar  */}
            <button id="btn-entrar" onClick={autenticar}>Entrar</button>

        </div>
    );
}

export default Login;