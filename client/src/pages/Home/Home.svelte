<script>
    import "../../styles/global.css";
    import Nav from "../../components/Nav.svelte";
    import { onMount } from "svelte";
    import { getUserEmail } from "../../utils/auth.js";

    let userEmail = "";
    onMount(async () => {
        userEmail = await getUserEmail();
    });
</script>

<Nav />

<div class="content">
    Welcome, {userEmail}!
</div>
