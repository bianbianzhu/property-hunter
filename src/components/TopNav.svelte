<script lang="ts">
  import { Navbar, NavBrand, NavLi, NavUl } from "flowbite-svelte";
  import logo from "../assets/logo-removebg-preview.png";
</script>

<Navbar class="bg-gray-100">
  <NavBrand href="/">
    <img src={logo} alt="logo" class="h-20 w-20" />
    <span class="whitespace-nowrap text-xl font-semibold text-amber-500">Property-Hunter.com</span>
  </NavBrand>
  <NavUl nonActiveClass="text-gray-500" activeClass="text-amber-500">
    <NavLi href="/" active={true}>Home</NavLi>
    <NavLi href="/">News</NavLi>
    <NavLi href="/">Recommendation</NavLi>
    <NavLi href="/">About us</NavLi>
  </NavUl>
</Navbar>
