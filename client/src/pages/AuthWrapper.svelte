<script>
  import { navigate } from 'svelte-navigator';
  import { getToken } from '../utils/auth.js';

  if (!getToken()) {
    navigate('/login', { replace: true });
  }
</script>
<slot />

