<script>
  import Ionicons from './components/Ionicons.svelte';

  import { Router, Route, Link, useLocation } from 'svelte-navigator';
  import AuthWrapper from './pages/AuthWrapper.svelte';
  import Home from './pages/Home/Home.svelte';
  import Login from './pages/Login/Login.svelte';
  import SignUp from './pages/SignUp/SignUp.svelte';
  import MyList from './pages/MyList/MyList.svelte';

  
</script>

<Router>
  <Route path="/login" component="{Login}" />
  <Route path="/signUp" component="{SignUp}" />
  <Route path="/" let:params>
    <AuthWrapper>
      <Home />
    </AuthWrapper>
  </Route>
  <Route path="/myList" let:params>
    <AuthWrapper>
      <MyList />
    </AuthWrapper>
  </Route>
</Router>

<Ionicons /> 
