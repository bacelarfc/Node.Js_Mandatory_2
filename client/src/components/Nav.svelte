<script>
    import '../styles/global.css';
    import '../styles/navbar.css';
    
    import { Link } from 'svelte-navigator';
    import { removeToken } from '../utils/auth.js'; 
  import { navigate } from 'svelte-navigator'; 

  function handleLogout() {
    removeToken();
    navigate('/login');
  }
</script>
<nav>
  <ul>
      <li><Link to="/">Home</Link></li>
      <li><Link to="/myList">My List</Link></li>
    </ul>
    <button on:click={handleLogout}>Log out</button>
  </nav>
  

  