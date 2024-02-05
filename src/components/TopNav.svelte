<script lang="ts">
  import { Navbar, NavBrand, NavLi, NavUl } from "flowbite-svelte";
</script>

<Navbar class="bg-gray-100">
  <NavBrand href="/">
    <span class="whitespace-nowrap text-xl font-semibold text-green-400">Book.com</span>
  </NavBrand>
  <NavUl nonActiveClass="text-gray-500" activeClass="text-green-400">
    <NavLi href="/" active={true}>Home</NavLi>
    <NavLi href="/">Book Type</NavLi>
    <NavLi href="/">Recommendation</NavLi>
    <NavLi href="/">Popular</NavLi>
  </NavUl>
</Navbar>
