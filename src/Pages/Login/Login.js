import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { SIGN_IN} from './Data/config'

import './Login.scss';
import '../../Styles/reset.scss';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      id:"",
      password:"",
      hiddenPw: true
    }
  }

  CheckPassword = () => {
    this.setState({hiddenPw : !this.state.hiddenPw});
  }

  LoginInput = e => {
    const { id, value } = e.target;
    
    this.setState({ [id] : value})
  }

  LoginButton = () => {
    const { id, password} = this.state;

    fetch(SIGN_IN,{
      method: "POST",
      body: JSON.stringify({
        email: id,
        password: password,
      })
    })
      .then(res => res.json())
      .then(result => {
        localStorage.setItem("token", result.token);
        console.log(result);
        if(result.error === "INVALID_EMAIL"){
          alert("아이디가 잘못 입력 됬습니다.");
          return;
        }
        if(result.error === "INVALID_PASSWORD"){
          alert("비밀번호를 잘못 입력 하셨습니다.");
          return;
        }
        if(result.message === "SUCCESS") {
          alert("로그인 성공!");
          this.props.history.push('/main');

        }
      })
  }

  render() {
    const {id, password, hiddenPw} = this.state;
    const icon = hiddenPw ? "fas fa-eye-slash" : "fas fa-eye";
    console.log({id, password})

    return (
      <div className="Login">
        <h1>로그인</h1>
        <div className="loginContainer"> 
          <div className="loginCont">
            <h1>AGEOSTE 통합회원</h1>
            <div className="loginForm">
              <label>
                <i className="far fa-user" id="idIcon"/>
              </label>
              <input 
                id="id"
                type="text"
                className="idInput input__padding"
                placeholder="아이디"
                value={id}
                onChange={this.LoginInput}
              />
            </div>
            <div className="pwForm">
              <label className="pwIcon">
                <i className="fas fa-lock" id="pwIcon"/>
              </label>
              <input 
                id="password"
                type={hiddenPw ? "password" : "text"}
                className="pwInput input__padding"
                placeholder="비밀번호"
                value={password}
                onChange={this.LoginInput}
              />
              <label className="show" onClick={this.CheckPassword}>
                <i key={icon}>
                  <span className={icon} />
                </i>
              </label>
            </div>
            <div className="Remember">
              <div className="rememberId">
                <input 
                  type="checkbox" 
                />
                <span>아이디저장</span>
              </div>
              <div className="forgetPw">
                <Link to='/'><span>비밀번호를 잊으셨나요?</span></Link>
              </div>
            </div>
            <div className="loginButton">
              <button
                type="submit"
                onClick={this.LoginButton}
              >
                로그인
              </button>
            </div>
          </div>
          <div className="signupCont">
            <div className="signupForm">
              <h1>아직 AGEOSTE 회원이 아니신가요?</h1>
              <div className="benifit">
                <span>지금 AGEOSTE에 회원가입하시면</span>
                <span>다양한 멤버쉽 혜택을 누리실 수 있습니다.</span>
              </div>
              <img alt="아거스테 로고" src="images/Membership.png" className="Logo" />
              <div className="SignupBtn">
                <Link to='/signup'><button>회원가입</button></Link>
              </div>
            </div>
          </div>
        </div>
      </div>  
    );
  }
}

export default Login;