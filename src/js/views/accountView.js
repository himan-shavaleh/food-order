import View from "./View";

class accountView extends View {
  _parentElement = document.querySelector("#meals");
  gotoRegisterPageHandlerClick() {
    this._parentElement.addEventListener("click", (e) => {
      if (e.target.closest(".signUpBtn")) {
        this._parentElement.innerHTML = "";
        this._parentElement.innerHTML = `
          <section id="login-section">
          <div class="box">
            
            <h1>sign up</h1>
            <form class="form">
              <div class="input-group">
                <span>نام</span>
                <input type="text" id="first-name" name="firstName" />
              </div>
              <div class="input-group">
                <span>last name</span>
                <input type="text" id="last-name" name="lastName" />
              </div>
              <div class="input-group">
                <span>email</span>
                <input type="email" id="email" name="email" />
                <span class="emailMessage my-1 text-danger"></span>
              </div>
              <div class="input-group">
                <span>phone number</span>
                <input type="tel" id="phone" name="phone" />
                <span class="phoneMessage my-1 text-danger"></span>
              </div>
              <div class="input-group">
                <span>password</span>
                <input type="password" id="password" name="password" />
                <span class="passMessage my-1 text-danger"
                  >
                  password(at least 7 charcters 1 uppercase)
                  </span
                >
              </div>
              <div class="input-group">
                <span>repeat pass</span>
                <input type="password" id="repass" name="repass" />
                <span class="repassMessage my-1 text-danger"></span>
              </div>
              <a href="#" class="submit registerBtn">register</a>
            </form>
          </div>
        </section>
          `;
      }
    });
  }

  signupBtnHandlerClick(render, manageData) {
    if (document.querySelector(".registerBtn")) {
      const registerBtn = document.querySelector(".registerBtn");
      const validPhoneNumber =
        /^\(?([0-9]{4})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
      // email expression vallidation
      const validRegex =
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
      const validPassword = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;
      const email = document.querySelector("#email");
      const phone = document.querySelector("#phone");
      const password = document.querySelector("#password");
      let emailValue, phoneValue, passwordValue;
      // emailValidation
      email.addEventListener("focusout", (e) => {
        if (!e.target.value.match(validRegex)) {
          e.target.style.border = "2px solid rgb(248, 108, 108)";
          document.querySelector(".emailMessage").innerHTML =
            "inserted email is not valid";
        } else {
          emailValue = e.target.value;
        }
      });
      // phone Validation
      phone.addEventListener("focusout", (e) => {
        if (!e.target.value.match(validPhoneNumber)) {
          e.target.style.border = "2px solid rgb(248, 108, 108)";
          document.querySelector(".phoneMessage").innerHTML =
            "inserted phone number is not valid";
        } else {
          phoneValue = e.target.value;
        }
      });
      password.addEventListener("focusout", (e) => {
        if (!e.target.value.match(validPassword)) {
          e.target.style.border = "2px solid rgb(248, 108, 108)";
          document.querySelector(".passwordMessage").innerHTML =
            "inserted password is not valid";
        } else {
          passwordValue = e.target.value;
        }
      });
      this._parentElement.addEventListener("click", (e) => {
        console.log();
        if (e.target.closest(".registerBtn")) {
          const firstName = document.querySelector("#first-name").value;
          const lastName = document.querySelector("#last-name").value;
          const repass = document.querySelector("#repass").value;
          if (!firstName) {
            document.querySelector("#first-name").focus();
            document.querySelector("#first-name").style.border =
              "2px solid rgb(248, 108, 108)";
          }
          if (!lastName) {
            document.querySelector("#last-name").focus();
            document.querySelector("#last-name").style.border =
              "2px solid rgb(248, 108, 108)";
          }
          if (passwordValue !== repass) {
            document.querySelector("#repass").focus();
            document.querySelector("#repass").style.border =
              "2px solid rgb(248, 108, 108)";
            document.querySelector(".repassMessage").innerHTML =
              "رمز وارد شده یکسان نیست";
          }

          if (
            firstName &&
            lastName &&
            emailValue &&
            phoneValue &&
            passwordValue &&
            passwordValue === repass
          ) {
            const user = {
              firstName: firstName,
              lastName: lastName,
              email: emailValue,
              password: passwordValue,
              phone: phoneValue,
              id: Math.trunc(Math.random() * 10 * (Math.random() * 10)),
            };
            document.querySelector(
              ".account",
            ).textContent = `${user.firstName}`;
            render(user);
            manageData(user);
          }
        }
      });
    }
  }
  loginBtnHandlerClick(handler) {
    this._parentElement.addEventListener("click", (e) => {
      if (e.target.closest(".loginBtn")) {
        const emailORphone = document.querySelector("#userName").value;
        const pass = document.querySelector("#password").value;

        const activeUser = this._data.users.find(
          (user) => user.phone == emailORphone || user.email === emailORphone,
        );
        if (activeUser && activeUser.password == pass) {
          document.querySelector(
            ".account",
          ).textContent = `${activeUser.firstName}`;
          handler(activeUser);
        } else {
          document.querySelector(".message").innerHTML =
            "user name or pass is wrong";
        }
      }
    });
  }
  _generateMarkup() {
    this._parentElement.innerHTML = "";
    this._parentElement.classList.add("meal-view-grid");
    let markup;
    if (this._data.isLoggedIn) {
    }
    if (!this._data.isLoggedIn) {
      markup = `
        <section id="login-section">
       
      <div class="box">
          
          
        <h1>log into yout account</h1>
        <form class="form">
          <p class="message mx-2 text-danger"></p>
          <div class="input-group">
            <span>phone number or email</span>
            <input type="text" id="userName" name="userName" />
          </div>

          <div class="input-group">
            <span>password</span>
            <input type="password" id="password" name="password" />
          </div>
          <div class="remember-group">
            <input type="checkbox" id="remember" name="remember" />
            <p>remember me</p>
          </div>
          <a href="#" class="submit loginBtn">login</a>
        </form>
        <div class="signUp">
            <p>if you don't have account sign up from below link</p>
            <a href="./register.html" class="submit signUpBtn">sign up</a>
        </div>
        <div class="social">
          <h4>follow us in social media</h4>
          <div class="social-icons">
            <a href="#">
              <i class="bx bxl-telegram"></i>
            </a>
            <a href="#">
              <i class="bx bxl-instagram"></i>
            </a>
            <a href="#">
              <i class="bx bxl-telegram"></i>
            </a>
          </div>
        </div>
      </div>
    </section>
        `;
    }

    document.querySelector("#pagination").innerHTML = "";
    return markup;
  }
}
export default new accountView();
