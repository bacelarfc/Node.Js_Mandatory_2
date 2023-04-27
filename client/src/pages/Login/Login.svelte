<script>
  import "toastr/build/toastr.min.css";
  import toastr from "toastr";
  import "../../styles/login.css";

  import { login, setToken } from "../../utils/auth.js";
  import { navigate } from "svelte-navigator";

  let email = "";
  let password = "";

  async function doLogin() {
    try {
      const response = await login(email, password);
      setToken(response.token);
      toastr.success("Logged in successfully!");
      navigate("/", { replace: true }); 
    } catch (error) {
      console.error("Error logging in", error.message);
      toastr.error("Error logging in: " + error.message);
    }
  }
</script>

<div class="login">
  <div class="login-triangle" />
  <form
    class="login-container"
    on:submit|preventDefault={doLogin}
    method="POST">
    <ion-icon name="flower-outline" class="login__icon" />
    <label for="username">Username:</label>
    <input
      class="input-field"
      type="email"
      bind:value={email}
      placeholder="Email"
      required
    />
    <br>
    <label for="password">Password:</label>
    <input
      class="input-field"
      type="password"
      bind:value={password}
      placeholder="Password"
      required
    />
    <button class="sign-up" type="button"
      ><a href="/signUp">Not a member? Sign up!</a>
      </button>
    <br>
    <input id="submit-button" type="submit" value="Submit"/>
  </form>
</div>