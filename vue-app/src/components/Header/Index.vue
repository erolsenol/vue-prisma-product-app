<template>
  <header class="header rounded-bottom-4">
    <div class="container d-flex flex-wrap justify-content-center py-3 mb-4">
      <a
        href="/"
        class="d-flex align-items-center mb-3 mb-md-0 me-md-auto link-body-emphasis text-decoration-none"
      >
        <svg class="bi me-2" width="40" height="32">
          <use xlink:href="#bootstrap"></use>
        </svg>
        <span class="fs-4" v-t="'header_title'"></span>
      </a>

      <ul
        class="nav col-12 col-lg-auto my-2 justify-content-center my-md-0 text-small"
      >
        <li>
          <a href="#" class="nav-link text-secondary">
            <svg class="bi d-block mx-auto mb-1" width="24" height="24">
              <use xlink:href="#home"></use>
            </svg>
            Home
          </a>
        </li>
        <li>
          <a href="#" class="nav-link text-white">
            <svg class="bi d-block mx-auto mb-1" width="24" height="24">
              <use xlink:href="#speedometer2"></use>
            </svg>
            Dashboard
          </a>
        </li>
        <li>
          <a href="#" class="nav-link text-white">
            <svg class="bi d-block mx-auto mb-1" width="24" height="24">
              <use xlink:href="#table"></use>
            </svg>
            Orders
          </a>
        </li>
        <li>
          <a href="#" class="nav-link text-white">
            <svg class="bi d-block mx-auto mb-1" width="24" height="24">
              <use xlink:href="#grid"></use>
            </svg>
            Products
          </a>
        </li>
        <li>
          <a href="#" class="nav-link text-white">
            <svg class="bi d-block mx-auto mb-1" width="24" height="24">
              <use xlink:href="#people-circle"></use>
            </svg>
            Customers
          </a>
        </li>

        <HeaderItem text="QWEQW" icon="ri-file-list-3-line" :size="30" />
      </ul>
    </div>
  </header>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component"
import HeaderItem from "./HeaderItem.vue"

@Options({
  name: "Header",
  components: { HeaderItem },
})
export default class Header extends Vue {}
</script>
