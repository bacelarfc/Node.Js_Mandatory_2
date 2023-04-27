<script>
  import "../../styles/signUp.css";
  import { navigate } from "svelte-navigator";
  import "toastr/build/toastr.min.css";
  import toastr from "toastr";
  import { signUp } from "../../utils/auth.js";

  toastr.options = {
    closeButton: true,
    progressBar: true,
    positionClass: "toast-top-center",
    showDuration: "300",
    hideDuration: "1000",
    timeOut: "5000",
    extendedTimeOut: "1000",
    tapToDismiss: false,
    preventDuplicates: true,
  };

  let email = "";
  let password = "";
  let confirmPassword = "";

  async function doSignUp() {
    try {
      if (password !== confirmPassword) {
        toastr.error("Passwords do not match");
        throw new Error("Passwords do not match");
      }

      const response = await signUp(email, password);
      toastr.success("Registered successfully");
      navigate("/login");
    } catch (error) {
      console.error(error.message);
      toastr.error("Registration failed: " + error.message);
      throw new Error("Registration failed: " + error.message);
    }
  }
</script>

<div class="register">
  <div class="register-triangle" />
  <form class="register-container" on:submit|preventDefault={doSignUp}>
    <h3>Create your account</h3>
    <label for="email">Email:</label>
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
    <br>
    <label for="confirm-password">Confirm Password:</label>
    <input
      class="input-field"
      type="password"
      bind:value={confirmPassword}
      placeholder="Confirm Password"
      required
    />
    <button class="log-in" type="button"
      ><a href="#/">Already a user? Log in!</a></button
    >
    <input id="submit-button" type="submit" value="Sign up"/>
  </form>
</div>
