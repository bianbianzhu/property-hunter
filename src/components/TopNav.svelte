<script lang="ts">
  import { Navbar, NavBrand, NavLi, NavUl } from "flowbite-svelte";
  import logo from "../assets/logo-removebg-preview.png";

  let RECOMMENDATION_URL =
    "https://www.corelogic.com.au/news-research?collection=ce4a1be2-7b51-43fe-a7af-73dfeb2db83a~sp-search&profile=news-research-search&start_rank=1&f.Topic%7Ctopic=research";

  let LINKEDIN_URL = "https://www.linkedin.com/in/tianyi-li-jason/";
</script>

<Navbar class="bg-gray-100">
  <NavBrand href="/">
    <img src={logo} alt="logo" class="h-20 w-20" />
    <span class="whitespace-nowrap text-xl font-semibold text-amber-500">Property-Hunter.com</span>
  </NavBrand>
  <NavUl nonActiveClass="text-gray-500" activeClass="text-amber-500">
    <NavLi href="/" active={true}>Home</NavLi>
    <NavLi href="/history">History</NavLi>
    <NavLi href={`${RECOMMENDATION_URL}`}>Recommendation</NavLi>
    <NavLi href={`${LINKEDIN_URL}`}>About us</NavLi>
  </NavUl>
</Navbar>
