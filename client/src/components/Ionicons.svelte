<script>
    import { onMount } from 'svelte';
  
    onMount(() => {
      const script = document.createElement('script');
      script.src = 'https://unpkg.com/ionicons@5.1.2/dist/ionicons.js';
      script.async = true;
      document.body.appendChild(script);
    });
  </script>
  