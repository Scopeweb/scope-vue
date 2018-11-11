<template lang="pug">
  header.navbar(
    :class="{ 'navbar-hidden': isNavbarHidden, 'navbar--filed': isNavbarFilled }",
    data-navbar="",
  )
    .row-align-middle.align-justify
      .shrink-columns
        router-link(:to="$routeByName('Home')", data-navbar="link--home-1")
          img(src="~assets/scopeweb.svg", :alt="$t('common.ScopeWeb')")
      .shrink-columns
        button.navbar__nav-button(
          :class="{ 'navbar__nav-button--active': isNavOpen }",
          @click="toggleNav()",
        )
          span Toggle nav
        nav.navbar__nav(:class="{ 'navbar__nav--active a-fade-in': isNavOpen }")
          h1.hidden {{ $t('navbar.title') }}
          ul.navbar__links.list-reset
            router-link.navbar__link(
              :to="$routeByName('Home')",
              :exact="true",
              active-class="navbar__link--active",
              data-navbar="link--home-2",
            ) {{ $t('home.title') }}
            router-link.navbar__link(
              :to="$routeByName('About')",
              :exact="true",
              active-class="navbar__link--active",
              data-navbar="link--about",
            ) {{ $t('about.title') }}
            router-link.navbar__link(
              :to="$routeByName('Services')",
              :exact="true",
              active-class="navbar__link--active",
              data-navbar="link--services",
            ) {{ $t('services.title') }}
            router-link.navbar__link(
              :to="$routeByName('Blog')",
              :exact="true",
              active-class="navbar__link--active",
              data-navbar="link--blog",
            ) {{ $t('blog.title') }}
            router-link.navbar__link(
              :to="$routeByName('Estimate')",
              :exact="true",
              active-class="navbar__link--active",
              data-navbar="link--estimate",
            )
            span.fs-16.transition {{ $t('common.estimateProject') }}
</template>

<script>

</script>
