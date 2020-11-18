<script>
	import "smelte/src/tailwind.css";
	import Canvas from './components/common/Canvas.svelte';
	import SimpleLogin from './components/login_register/SimpleLogin.svelte';
	import Register from './components/login_register/Register.svelte';
	import NewPassword from './components/login_register/NewPassword.svelte';
	import WorkingArea from './views/main/WorkingArea.svelte';
</script>

<Canvas>
   <!-- <WorkingArea /> -->
   <SimpleLogin />
</Canvas>