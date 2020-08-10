<template>
  <div class="home container">
    <div class="card" v-for="smoothie in smoothies" :key="smoothie.id">
      <div class="card-content">
        <i class="material-icons trash" @click="deleteSmoothie(smoothie.id)">delete</i>
        <h2 class="indigo-text">{{smoothie.title}}</h2>
        <div class="ingredients">
          <li v-for="(ing, index) in smoothie.ingredients" :key="index">
            <span class="chip">{{ing}}</span>
          </li>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Home",
  data() {
    return {
      smoothies: [
        {
          title: "Ninja Brew",
          slug: "nonja-brew",
          ingredients: ["banana", "coffe", "milk", "yoghurt"],
          id: "1",
        },
        {
          title: "Morning Mood",
          slug: "morning-mood",
          ingredients: ["mamgo", "lime", "juice"],
          id: "2",
        },
      ],
    };
  },
  methods: {
    deleteSmoothie(id) {
      this.smoothies = this.smoothies.filter((smoothie) => {
        return smoothie.id != id;
      });
    },
  },
};
</script>

<style scoped>
.home {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 30px;
  margin-top: 60px;
}

h2 {
  font-size: 1.8em;
  text-align: center;
  margin-top: 0;
}

.ingredients {
  margin: 30px auto;
}

.ingredients li {
  display: inline-block;
}

.trash {
  position: absolute;
  top: 4px;
  right: 4px;
  cursor: pointer;
  color: #aaa;
  font-size: 1.4em;
}
</style>

