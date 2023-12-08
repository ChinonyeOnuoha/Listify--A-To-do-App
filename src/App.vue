<template>
  <div id="app">
    <router-view/>
</div>
</template>

<script>

export default {
  name: 'App',

  metaInfo() {
    return {
      title: 'My ToDo App - Stay Organized',
      meta: [
        {
          name: 'description',
          content: 'My ToDo App is a responsive and user-friendly application designed to help keep track of daily tasks.'
        },
        {
          property: 'og:title',
          content: 'My ToDo App - Organize Your Day'
        },
        {
          property: 'og:description',
          content: 'Join the community of users who are increasing productivity with My ToDo App.'
        },
        {
          property: 'og:type',
          content: 'website'
        },
        {
          name: 'twitter:title',
          content: 'My ToDo App - Stay Organized'
        },
        {
          name: 'twitter:description',
          content: 'Effortlessly manage your daily tasks with My ToDo App.'
        },
    
      ]
    }
  }
}
</script>


<style>

body, html {
  height: 100%;
  margin: 0;
  background: linear-gradient(95deg, #FFE3E3 0.17%, #FFF0F5 100%);
  overflow-x: hidden; 
}

</style>
